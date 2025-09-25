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

script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct full paths to your files
blocksj2b_path = os.path.join(script_dir, "blocksJ2B.json")
bedsj2b_path = os.path.join(script_dir, "bedsJ2B.json")
skullj2b_path = os.path.join(script_dir, "skullJ2B.json")
blockstates_path = os.path.join(script_dir, "blockstates.json")

# Load JSON files
with open(blocksj2b_path, "r") as f:
    blocksj2b = json.load(f)

with open(bedsj2b_path, "r") as f:
    bedsj2b = json.load(f)

with open(skullj2b_path, "r") as f:
    skullj2b = json.load(f)

with open(blockstates_path, "r") as f:
    blockstates = json.load(f)

MC_VERSION = "1.21.70.03"

def checkEntry(blocks, entry):
    for block in blocks:
        if block["state"].value == entry:
            return block


def getItems(items):
    itemsList = []

    for index in range(len(items)):
        itemsList.append(
            {
                "Count": TAG_Byte(items[index].get("count", items[index].get("Count")).value),
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

def javaToBedrock(structure: NBTFile, structure_id: str, block_mapping: dict):
    blocks: TAG_List = structure["blocks"].value
    palette: TAG_List = structure["palette"].value
    oldsize: TAG_List = structure["size"].value
    entities: TAG_List = structure["entities"].value
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
        if blockId in block_mapping:
            mapped_id = block_mapping[blockId]
            newPalette.append(getBlockObject(mapped_id, "bedrock"))
        # Check for base identifier match in custom mapping (ignore brackets)
        elif baseBlockId in block_mapping:
            mapped_id = block_mapping[baseBlockId]
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

    startTime = time()
    block_position_data = {}

    for index, entry in enumerate(track(newBlocks,description="[green]Applying block entity")):
        if entry != -1:
            match newPalette[entry]["name"].value:
                case "minecraft:bed":
                    block = checkEntry(blocks, entry)
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "Bed"
                    )
                    block_position_data[str(index)]["block_entity_data"].update(
                        {"color": TAG_Byte(bedsj2b[palette[entry]["Name"].value])}
                    )
                    continue
                case "minecraft:brewing_stand":
                    block = checkEntry(blocks, entry)
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
                    block = checkEntry(blocks, entry)
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
                    block = checkEntry(blocks, entry)
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "Comparator"
                    )
                    block_position_data[str(index)]["block_entity_data"].update(
                        {"OutputSignal": TAG_Int(block["nbt"]["OutputSignal"].value)}
                    )
                    continue
                case "minecraft:flower_pot":
                    block = checkEntry(blocks, entry)
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "FlowerPot"
                    )
                    if "azalea" in palette[block["state"].value]["Name"].value:
                        potted_plant = palette[block["state"].value]["Name"].value[17:-5]
                    else:
                        potted_plant = palette[block["state"].value]["Name"].value[17:]
                    block_position_data[str(index)]["block_entity_data"].update(
                        {
                            "PlantBlock": TAG_Compound(
                                {"name": TAG_String(f"minecraft:{potted_plant}")}
                            )
                        }
                    )
                    continue
                case "minecraft:furnace" | "minecraft:lit_furnace" | "minecraft:blast_furnace" | "minecraft:lit_blast_furnace" | "minecraft:smoker" | "minecraft:lit_smoker":
                    block = checkEntry(blocks, entry)
                    if newPalette[entry]["name"].value in ["minecraft:furnace", "minecraft:lit_furnace"]:
                        block_position_data[str(index)] = createDefaultBlockEntity(
                            block, "Furnace"
                        )
                    elif newPalette[entry]["name"].value in ["minecraft:blast_furnace", "minecraft:lit_blast_furnace"]:
                        block_position_data[str(index)] = createDefaultBlockEntity(
                            block, "BlastFurnace"
                        )
                    else:
                        block_position_data[str(index)] = createDefaultBlockEntity(
                            block, "Smoker"
                        )
                    block_position_data[str(index)]["block_entity_data"].update(
                        {
                            "BurnTime": TAG_Short(block["nbt"].get("lit_time_remaining",block["nbt"].get("BurnTime")).value),
                            "CookTime": TAG_Short(block["nbt"].get("cooking_time_spent",block["nbt"].get("CookTime")).value),
                            "BurnDuration": TAG_Short(
                                block["nbt"].get("lit_total_time",block["nbt"].get("CookTimeTotal")).value
                            ),
                            "Items": TAG_List(
                                TAG_Compound, getItems(block["nbt"]["Items"])
                            ),
                        }
                    )
                    continue
                case "minecraft:standing_banner" | "minecraft:wall_banner":
                    block = checkEntry(blocks, entry)
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "Banner"
                    )
                    patterns_data = {"Patterns": []}
                    if "patterns" in block["nbt"]:
                        for pattern in block["nbt"]["patterns"]:
                            pattern_data = {
                                "Color": TAG_Int(banner_color(pattern["color"].value)),
                                "Pattern": TAG_String(banner_pattern(pattern["pattern"].value))
                            }
                            patterns_data["Patterns"].append(pattern_data)
                    block_position_data[str(index)]["block_entity_data"].update(
                        {
                            "Base": TAG_Int(banner_base(palette[entry]["Name"].value)),
                            "Patterns": TAG_List(TAG_Compound, patterns_data["Patterns"]),
                            "Type": TAG_Int(0),
                            "id": TAG_String("Banner"),
                            "isMoveable": TAG_Byte(1)
                        }
                    )
                case "minecraft:jigsaw":
                    block = checkEntry(blocks, entry)
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
                    if ("selection_priority" in block["nbt"]):
                        block_position_data[str(index)]["block_entity_data"].update(
                            {
                                "selection_priority": TAG_Int(
                                    block["nbt"]["selection_priority"].value
                                ),
                            }
                        )
                    else:
                        block_position_data[str(index)]["block_entity_data"].update(
                            {
                                "selection_priority": TAG_Int(0),
                            }
                        )

                    if ("placement_priority" in block["nbt"]):
                        block_position_data[str(index)]["block_entity_data"].update(
                            {
                                "placement_priority": TAG_Int(
                                    block["nbt"]["placement_priority"].value
                                ),
                            }
                        )
                    else:
                        block_position_data[str(index)]["block_entity_data"].update(
                            {
                                "placement_priority": TAG_Int(0),
                            }
                        )

                    if "pool" in block["nbt"]:
                        block_position_data[str(index)]["block_entity_data"].update(
                            {
                                "target_pool": TAG_String(
                                    block["nbt"]["pool"].value
                                ),
                            }
                        )
                    continue
                case "minecraft:mob_spawner":
                    block = checkEntry(blocks, entry)
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "MobSpawner"
                    )
                    block_position_data[str(index)]["block_entity_data"].update(
                        {
                            "EntityIdentifier": TAG_String(
                                block["nbt"]["SpawnData"]["entity"]["id"].value if "entity" in block["nbt"]["SpawnData"] and "id" in block["nbt"]["SpawnData"]["entity"] else ""
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
                case "minecraft:skeleton_skull" | "minecraft:wither_skeleton_skull" | "minecraft:zombie_head" | "minecraft:player_head" | "minecraft:creeper_head" | "minecraft:dragon_head" | "minecraft:piglin_head":
                    block = checkEntry(blocks, entry)
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "Skull"
                    )
                    try:
                        block_position_data[str(index)]["block_entity_data"].update(
                            {
                                "Rotation": TAG_Float(
                                    float(palette[entry]["Properties"]["rotation"].value) * 22.5
                                ),
                                "SkullType": TAG_Byte(-1
                                    # skullj2b[palette[entry]["Name"].value]
                                ),
                            }
                        )
                    except:
                        block_position_data[str(index)]["block_entity_data"].update(
                            {
                                "SkullType": TAG_Byte(-1
                                    # skullj2b[palette[entry]["Name"].value]
                                ),
                            }
                        )
                    
                    continue
                case "minecraft:structure_block":
                    block = checkEntry(blocks, entry)
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
    print(f"Finished applying block entity in {round((time() - startTime) * 1000, 2)} ms")
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
def banner_pattern(pattern):
    match pattern:
        case "minecraft:square_bottom_left":
            return "bl"
        case "minecraft:square_bottom_right":
            return "br"
        case "minecraft:square_top_left":
            return "tl"
        case "minecraft:square_top_right":
            return "tr"
        case "minecraft:stripe_bottom":
            return "bs"
        case "minecraft:stripe_top":
            return "ts"
        case "minecraft:stripe_left":
            return "vh"
        case "minecraft:stripe_right":
            return "vhr"
        case "minecraft:stripe_center":
            return "cs"
        case "minecraft:stripe_middle":
            return "ms"
        case "minecraft:stripe_downright":
            return "drs"
        case "minecraft:stripe_downleft":
            return "dls"
        case "minecraft:small_stripes":
            return "ss"
        case "minecraft:cross":
            return "cr"
        case "minecraft:straight_cross":
            return "sc"
        case "minecraft:circle":
            return "mc"
        case "minecraft:rhombus":
            return "mr"
        case "minecraft:border":
            return "bo"
        case "minecraft:triangle_bottom":
            return "bt"
        case "minecraft:triangle_top":
            return "tt"
        case "minecraft:triangles_bottom":
            return "bts"
        case "minecraft:triangles_top":
            return "tts"
        case "minecraft:half_horizontal_bottom":
            return "hhb"
        case "minecraft:half_horizontal":
            return "hh"
        case "minecraft:diagonal_left":
            return "ld"
        case "minecraft:diagonal_up_right":
            return "rd"
        case "minecraft:diagonal_up_left":
            return "lud"
        case "minecraft:diagonal_right":
            return "rud"
        case "minecraft:gradient_up":
            return "gru"
        case "minecraft:gradient":
            return "gra"
        case "minecraft:half_vertical":
            return "vh"
        case "minecraft:half_vertical_right":
            return "vhr"
        

def banner_color(color):
    match color:
        case "white":
            return 15
        case "light_gray":
            return 7
        case "gray":
            return 8
        case "black":
            return 0
        case "brown":
            return 3
        case "red":
            return 1
        case "orange":
            return 14
        case "yellow":
            return 11
        case "lime":
            return 10
        case "green":
            return 2
        case "cyan":
            return 6
        case "light_blue":
            return 12
        case "blue":
            return 4
        case "purple":
            return 5
        case "magenta":
            return 13
        case "pink":
            return 9

def banner_base(banner):
    match banner:
        case "minecraft:white_banner" |  "minecraft:white_wall_banner":
            return 15
        case "minecraft:light_gray_banner" |  "minecraft:light_gray_wall_banner":
            return 7
        case "minecraft:gray_banner" |  "minecraft:gray_wall_banner":
            return 8
        case "minecraft:black_banner" |  "minecraft:black_wall_banner":
            return 0
        case "minecraft:brown_banner" |  "minecraft:brown_wall_banner":
            return 3
        case "minecraft:red_banner" |  "minecraft:red_wall_banner":
            return 1
        case "minecraft:orange_banner" |  "minecraft:orange_wall_banner":
            return 14
        case "minecraft:yellow_banner" |  "minecraft:yellow_wall_banner":
            return 11
        case "minecraft:lime_banner" |  "minecraft:lime_wall_banner":
            return 10
        case "minecraft:green_banner" |  "minecraft:green_wall_banner":
            return 2
        case "minecraft:cyan_banner" |  "minecraft:cyan_wall_banner":
            return 6
        case "minecraft:light_blue_banner" |  "minecraft:light_blue_wall_banner":
            return 12
        case "minecraft:blue_banner" |  "minecraft:blue_wall_banner":
            return 4
        case "minecraft:purple_banner" |  "minecraft:purple_wall_banner":
            return 5
        case "minecraft:magenta_banner" |  "minecraft:magenta_wall_banner":
            return 13
        case "minecraft:pink_banner" |  "minecraft:pink_wall_banner":
            return 9