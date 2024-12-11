from time import time
import os
import json, re
from pynbt import (
    NBTFile,
    TAG_Compound,
    TAG_Int,
    TAG_List,
    TAG_String,
    TAG_Byte,
    TAG_Short,
    TAG_Float,
)
from progress_bar import track

assets_dir = os.path.abspath('./assets/')

# Construct full paths to your files
blocksj2b_path = os.path.join(assets_dir, "blocksJ2B.json")
bedsj2b_path = os.path.join(assets_dir, "bedsJ2B.json")
skullj2b_path = os.path.join(assets_dir, "skullJ2B.json")
blockstates_path = os.path.join(assets_dir, "blockstates.json")

# Load JSON files
with open(blocksj2b_path, "r") as f:
    blocksj2b = json.load(f)

with open(bedsj2b_path, "r") as f:
    bedsj2b = json.load(f)

with open(skullj2b_path, "r") as f:
    skullj2b = json.load(f)

with open(blockstates_path, "r") as f:
    blockstates = json.load(f)

MC_VERSION = "1.21.0.03"

def checkEntry(blocks, entry):
    for block in blocks:
        if block["state"].value == entry:
            return block


def getItems(items):
    itemsList = []

    for index in range(len(items)):
        itemsList.append(
            {
                "Count": TAG_Byte(items[index].get("Count").value),
                "Damage": TAG_Short(0),
                "Name": TAG_String(items[index].get("id").value),
                "Slot": TAG_Byte(items[index].get("Slot").value),
                "WasPickedUp": TAG_Byte(0),
            }
        )

    return itemsList


def createDefaultBlockEntity(block, id):
    return TAG_Compound(
        {
            "block_entity_data": TAG_Compound(
                {
                    "id": TAG_String(id),
                    "isMovable": TAG_Byte(1),
                    "x": block["pos"][0],
                    "y": block["pos"][1],
                    "z": block["pos"][2],
                }
            )
        }
    )


def getHex(n):
    output = hex(int(n))[2:]
    if len(output) < 2:
        output = "0" + output
    return output

def getVersion(versionString: str) -> int:
    version = versionString.split(".")
    return eval(f"0x{''.join(map(getHex, version))}")


def getStructureBlockIndex(distY, distZ, x, y, z):
    return ((distY * distZ) * x) + ((distZ) * y) + z


def getDynamicBlockIdentifier(blockobject):
    baseidentifier = "minecraft:air"
    stateslist = {
        # {name: 'direction', value: '0'}
    }

    if "name" in blockobject:
        # Bedrock palette object
        baseidentifier = blockobject["name"].value
        for statename in blockobject["states"].value:
            state = blockobject["states"].value[statename]
            stateslist[statename] = state.value

    elif "Name" in blockobject:
        # Java palette object
        baseidentifier = blockobject["Name"].value
        if "Properties" in blockobject:
            for statename in blockobject["Properties"].value:
                state = blockobject["Properties"].value[statename]
                stateslist[statename] = state.value

    else:  # Unrecognizable palette object.
        return

    # Create dynamic properties list
    properties = []
    for statename in sorted(stateslist):
        properties.append(statename + "=" + stateslist[statename])

    return baseidentifier + "[" + ",".join(properties) + "]"


def getBlockObject(dynamicblockid: str, format="bedrock"):
    baseidentifier = dynamicblockid.split("[")[0]
    properties = dynamicblockid.split("[")[1].replace("]", "") if "[" in dynamicblockid else ""
    if properties:
        properties = properties.split(",")
    else:
        properties = []

    stateslist = {}
    for property in properties:
        stateslist[property.split("=")[0]] = property.split("=")[1]

    if format == "java":
        object = {"Properties": TAG_Compound({}), "Name": TAG_String(baseidentifier)}
        for statename in stateslist:
            object["Properties"].value[statename] = TAG_String(stateslist[statename])

        if len(object["Properties"].value) == 0:
            object.pop("Properties")

        return object
    else:
        object = {
            "name": TAG_String(baseidentifier),
            "states": TAG_Compound({}),
            "version": TAG_Int(getVersion(MC_VERSION)),
        }

        for statename in stateslist:
            # Find bedrock edition state type
            statevalue = stateslist[statename]
            statetype = blockstates[statename]["type"]
            validValues = blockstates[statename]["values"]

            if statetype == "bool" and statevalue == "true":
                object["states"].value[statename] = TAG_Byte(1)
            elif statetype == "bool" and statevalue == "false":
                object["states"].value[statename] = TAG_Byte(0)
            elif statetype == "int" and int(statevalue) in validValues:
                object["states"].value[statename] = TAG_Int(int(statevalue))
            elif statetype == "string" and statevalue in validValues:
                object["states"].value[statename] = TAG_String(statevalue)
            else:
                print(f"Warning: State name {statename} with value {statevalue} is not a valid state for {baseidentifier}. Valid values: {validValues}.")
        return object

def javaToBedrock(structure: NBTFile, structure_id: str, custom_mapping: dict):
    blocks: TAG_List = structure["blocks"].value
    palette: TAG_List = structure["palette"].value
    oldsize: TAG_List = structure["size"].value
    size: int = oldsize[0].value * oldsize[1].value * oldsize[2].value

    newBlocks = []
    newBlocks2 = []
    newPalette = []

    # new blocks
    startTime = time()
    for i in track(sequence=range(size), description="[green]Allocating Items"):
        newBlocks.append(-1)
        newBlocks2.append(-1)
    print(
        f"Finished allocating empty blocks in {round((time() - startTime) * 1000, 2)} ms"
    )

    # applying blocks
    startTime = time()
    applyWaterloggedBlock = False
    for block in track(sequence=blocks, description="[green]Applying Blocks"):
        pos = block["pos"].value

        index = getStructureBlockIndex(
            oldsize[1].value, oldsize[2].value, pos[0].value, pos[1].value, pos[2].value
        )
        newBlocks[index] = block["state"].value        
        blockobject = palette[block["state"].value]

        # Apply waterlogged block operation (waterlogged block is appended to pallete list last)
        if "Properties" in blockobject and "waterlogged" in blockobject["Properties"] and blockobject["Properties"]["waterlogged"].value == "true":
            newBlocks2[index] = len(palette)
            applyWaterloggedBlock = True

    print(f"Finished applying blocks in {round((time() - startTime) * 1000, 2)} ms")

    # applying palette
    startTime = time()
    for i in track(sequence=palette, description="[green]Applying Palette"):
        blockId = getDynamicBlockIdentifier(i)
        baseBlockId = blockId.split("[")[0]  # Get the base block identifier

        # Check for exact match in custom mapping (with brackets)
        if blockId in custom_mapping:
            mapped_id = custom_mapping[blockId]
            newPalette.append(getBlockObject(mapped_id, "bedrock"))
        # Check for base identifier match in custom mapping (ignore brackets)
        elif baseBlockId in custom_mapping:
            mapped_id = custom_mapping[baseBlockId]
            newPalette.append(getBlockObject(mapped_id, "bedrock"))
        # Fallback to default mapping
        elif blockId in blocksj2b:
            javaId = blocksj2b[blockId]
            newPalette.append(getBlockObject(javaId, "bedrock"))
        # Fallback to air if no mapping found
        else:
            newPalette.append(getBlockObject("minecraft:air[]", "bedrock"))

    if applyWaterloggedBlock:
        newPalette.append(getBlockObject("minecraft:water[liquid_depth=0]", "bedrock"))
    print(f"Finished applying palette in {round((time() - startTime) * 1000, 2)} ms")

    block_position_data = {}

    for index, entry in enumerate(newBlocks):
        if entry != -1:
            block = checkEntry(blocks, entry)
            match newPalette[entry]["name"].value:
                case "minecraft:bed":
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "Bed"
                    )
                    block_position_data[str(index)]["block_entity_data"].update(
                        {"color": TAG_Byte(bedsj2b[palette[entry]["Name"].value])}
                    )
                    continue
                case "minecraft:brewing_stand":
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "BrewingStand"
                    )
                    block_position_data[str(index)]["block_entity_data"].update(
                        {
                            "CookTime": TAG_Short(block["nbt"]["BrewTime"].value),
                            "Items": TAG_List(
                                TAG_Compound, getItems(block["nbt"]["Items"])
                            ),
                        }
                    )
                    continue
                case "minecraft:chest" | "minecraft:trapped_chest" | "minecraft:barrel":
                    if newPalette[entry]["name"].value == "minecraft:barrel":
                        block_position_data[str(index)] = createDefaultBlockEntity(
                            block, "Barrel"
                        )
                    else:
                        block_position_data[str(index)] = createDefaultBlockEntity(
                            block, "Chest"
                        )

                    block_position_data[str(index)]["block_entity_data"].update(
                        {"Findable": TAG_Byte(0)}
                    )

                    if "LootTable" in block["nbt"]:
                        block_position_data[str(index)]["block_entity_data"].update(
                            {
                                "LootTable": TAG_String(
                                    f"loot_tables/{block['nbt']['LootTable'].value[10:]}.json"
                                )
                            }
                        )
                    else:
                        block_position_data[str(index)]["block_entity_data"].update(
                            {
                                "Items": TAG_List(
                                    TAG_Compound, getItems(block["nbt"]["Items"])
                                )
                            }
                        )
                    continue
                case "minecraft:comparator":
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "Comparator"
                    )
                    block_position_data[str(index)]["block_entity_data"].update(
                        {"OutputSignal": TAG_Int(block["nbt"]["OutputSignal"].value)}
                    )
                    continue
                case "minecraft:flower_pot":
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "FlowerPot"
                    )
                    potted_plant = palette[block["state"].value]["Name"].value[17:]
                    block_position_data[str(index)]["block_entity_data"].update(
                        {
                            "PlantBlock": TAG_Compound(
                                {"name": TAG_String(f"minecraft:{potted_plant}")}
                            )
                        }
                    )
                    continue
                case "minecraft:furnace" | "minecraft:blast_furnace" | "minecraft:smoker":
                    if newPalette[entry]["name"].value == "minecraft:furnace":
                        block_position_data[str(index)] = createDefaultBlockEntity(
                            block, "Furnace"
                        )
                    elif newPalette[entry]["name"].value == "minecraft:blast_furnace":
                        block_position_data[str(index)] = createDefaultBlockEntity(
                            block, "BlastFurnace"
                        )
                    else:
                        block_position_data[str(index)] = createDefaultBlockEntity(
                            block, "Smoker"
                        )

                    block_position_data[str(index)]["block_entity_data"].update(
                        {
                            "BurnTime": TAG_Short(block["nbt"]["BurnTime"].value),
                            "CookTime": TAG_Short(block["nbt"]["CookTime"].value),
                            "BurnDuration": TAG_Short(
                                block["nbt"]["CookTimeTotal"].value
                            ),
                            "Items": TAG_List(
                                TAG_Compound, getItems(block["nbt"]["Items"])
                            ),
                        }
                    )
                    continue
                case "minecraft:jigsaw":
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "JigsawBlock"
                    )
                    block_position_data[str(index)]["block_entity_data"].update(
                        {
                            "name": TAG_String(block["nbt"]["name"].value),
                            "target": TAG_String(block["nbt"]["target"].value),
                            "final_state": TAG_String(
                                block["nbt"]["final_state"].value
                            ),
                            "joint": TAG_String(block["nbt"]["joint"].value),
                        }
                    )

                    if "target_pool" in block["nbt"]:
                        block_position_data[str(index)]["block_entity_data"].update(
                            {
                                "target_pool": TAG_String(
                                    block["nbt"]["target_pool"].value
                                ),
                            }
                        )
                    continue
                case "minecraft:mob_spawner":
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "MobSpawner"
                    )
                    block_position_data[str(index)]["block_entity_data"].update(
                        {
                            "EntityIdentifier": TAG_String(
                                block["nbt"]["SpawnData"]["id"].value
                            ),
                            "Delay": TAG_Short(block["nbt"]["Delay"].value),
                            "MinSpawnDelay": TAG_Short(
                                block["nbt"]["MinSpawnDelay"].value
                            ),
                            "MaxSpawnDelay": TAG_Short(
                                block["nbt"]["MaxSpawnDelay"].value
                            ),
                            "SpawnCount": TAG_Short(block["nbt"]["SpawnCount"].value),
                            "MaxNearbyEntities": TAG_Short(
                                block["nbt"]["MaxNearbyEntities"].value
                            ),
                            "RequiredPlayerRange": TAG_Short(
                                block["nbt"]["RequiredPlayerRange"].value
                            ),
                            "SpawnRange": TAG_Short(block["nbt"]["SpawnRange"].value),
                        }
                    )
                    continue
                case "minecraft:skull":
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "Skull"
                    )
                    block_position_data[str(index)]["block_entity_data"].update(
                        {
                            "rotation": TAG_Float(
                                float(palette[entry]["Properties"]["rotation"].value)
                            ),
                            "SkullType": TAG_Byte(
                                skullj2b[palette[entry]["Name"].value]
                            ),
                        }
                    )
                    continue
                case "minecraft:structure_block":
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "StructureBlock"
                    )
                    block_position_data[str(index)]["block_entity_data"].update(
                        {
                            "structureName": TAG_String(block["nbt"]["name"].value),
                            "xStructureOffset": TAG_Int(block["nbt"]["posX"].value),
                            "yStructureOffset": TAG_Int(block["nbt"]["posY"].value),
                            "zStructureOffset": TAG_Int(block["nbt"]["posZ"].value),
                            "xStructureSize": TAG_Int(block["nbt"]["sizeX"].value),
                            "yStructureSize": TAG_Int(block["nbt"]["sizeY"].value),
                            "zStructureSize": TAG_Int(block["nbt"]["sizeZ"].value),
                        }
                    )
                    continue
                case _:
                    continue

    newStructure = {
        "format_version": TAG_Int(1),
        "size": TAG_List(TAG_Int, oldsize),
        "structure_world_origin": TAG_List(TAG_Int, [0, 0, 0]),
        "structure": TAG_Compound(
            {
                "block_indices": TAG_List(
                    TAG_List,
                    [TAG_List(TAG_Int, newBlocks), TAG_List(TAG_Int, newBlocks2)],
                ),
                "entities": TAG_List(TAG_Compound, []),
                "palette": TAG_Compound(
                    {
                        "default": TAG_Compound(
                            {
                                "block_palette": TAG_List(TAG_Compound, newPalette),
                                "block_position_data": TAG_Compound(
                                    block_position_data
                                ),
                            }
                        )
                    }
                ),
            }
        ),
    }

    return NBTFile(value=newStructure), size * 8
