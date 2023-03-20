from time import time
import json, re
from pynbt import (
    NBTFile,
    TAG_Compound,
    TAG_Int,
    TAG_List,
    TAG_String,
    TAG_Byte,
    TAG_Short,
)
from progress_bar import track

blocksj2b = json.loads(open("./assets/blocksJ2B.json", "r").read())
bedsj2b = json.loads(open("./assets/bedsJ2B.json", "r").read())
data = {
    "blockstates": {
        "byte": [
            "output_subtract_bit",
            "upside_down_bit",
            "wall_post_bit",
            "top_slot_bit",
            "hanging",
            "open_bit",
            "lit",
            "powered_bit",
            "output_lit_bit",
            "in_wall_bit",
            "button_pressed_bit",
            "door_hinge_bit",
            "upper_block_bit",
            "update_bit",
        ],
        "int": [
            "weirdo_direction",
            "facing_direction",
            "direction",
            "repeater_delay",
            "redstone_signal",
            "candles",
            "age",
            "rotation",
            "deprecated",
            "vine_direction_bits",
            "liquid_depth",
            "composter_fill_level",
            "growth",
            "moisturized_amount",
        ],
    }
}
MC_VERSION = "1.19.70.02"


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
                    "Findable": TAG_Byte(0),
                    "id": TAG_String(id),
                    "isMovable": TAG_Byte(1),
                    "x": block["pos"][0],
                    "y": block["pos"][1],
                    "z": block["pos"][2],
                }
            )
        }
    )


def getVersion(versionString: str) -> int:
    def getHex(n):
        output = hex(int(n))[2:]
        if len(output) < 2:
            output = "0" + output
        return output

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
    properties = dynamicblockid.split("[")[1].replace("]", "")
    if properties.split(",")[0] != "":
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
            if data["blockstates"]["byte"].count(statename):
                if statevalue == "true":
                    object["states"].value[statename] = TAG_Byte(1)
                else:
                    object["states"].value[statename] = TAG_Byte(0)
            elif data["blockstates"]["int"].count(statename):
                object["states"].value[statename] = TAG_Int(int(statevalue))
            else:
                object["states"].value[statename] = TAG_String(statevalue)

        return object


def javaToBedrock(structure: NBTFile):
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
    for block in track(sequence=blocks, description="[green]Applying Blocks"):
        pos = block["pos"].value

        index = getStructureBlockIndex(
            oldsize[1].value, oldsize[2].value, pos[0].value, pos[1].value, pos[2].value
        )
        newBlocks[index] = block["state"].value
        # newBlocks2[index] = -1 represent air
    print(f"Finished applying blocks in {round((time() - startTime) * 1000, 2)} ms")

    # applying palette
    startTime = time()
    for i in track(sequence=palette, description="[green]Applying Palette"):
        # Using prismarine-data, find the java edition ID
        if not getDynamicBlockIdentifier(i) in blocksj2b:
            newPalette.append(getBlockObject("minecraft:air[]", "bedrock"))
        else:
            javaId = blocksj2b[getDynamicBlockIdentifier(i)]
            newPalette.append(getBlockObject(javaId, "bedrock"))
    print(f"Finished applying palette in {round((time() - startTime) * 1000, 2)} ms")

    block_position_data = {}

    for index, entry in enumerate(newBlocks):
        if entry != -1:
            block = checkEntry(blocks, entry)
            match newPalette[entry]["name"].value:
                case "minecraft:brewing_stand":
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "BrewingStand"
                    )
                    block_position_data[str(index)]["block_entity_data"][
                        "CookTime"
                    ] = TAG_Short(block["nbt"]["BrewTime"].value)
                    block_position_data[str(index)]["block_entity_data"][
                        "FuelAmount"
                    ] = TAG_Short(block["nbt"]["Fuel"].value)
                    block_position_data[str(index)]["block_entity_data"][
                        "Items"
                    ] = TAG_List(TAG_Compound, getItems(block["nbt"]["Items"]))
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

                    if "LootTable" in block["nbt"]:
                        block_position_data[str(index)]["block_entity_data"][
                            "LootTable"
                        ] = TAG_String(
                            f"loot_tables/{block['nbt']['LootTable'].value[10:]}.json"
                        )
                    else:
                        block_position_data[str(index)]["block_entity_data"][
                            "Items"
                        ] = TAG_List(TAG_Compound, getItems(block["nbt"]["Items"]))
                    continue
                case "minecraft:comparator":
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "Comparator"
                    )
                    block_position_data[str(index)]["block_entity_data"][
                        "OutputSignal"
                    ] = TAG_Int(block["nbt"]["OutputSignal"].value)
                    continue
                case "minecraft:flower_pot":
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "FlowerPot"
                    )
                    potted_plant = palette[block["state"].value]["Name"].value[17:]
                    block_position_data[str(index)]["block_entity_data"][
                        "PlantBlock"
                    ] = TAG_Compound({"name": TAG_String(f"minecraft:{potted_plant}")})
                    print(palette[block["state"].value]["Name"].value[17:])
                    continue
                case "minecraft:furnace" | "minecraft:blast_furnace" | "minecraft:smoker":
                    match newPalette[entry]["name"].value:
                        case "minecraft:furnace":
                            block_position_data[str(index)] = createDefaultBlockEntity(
                                block, "Furnace"
                            )
                            continue
                        case "minecraft:blast_furnace":
                            block_position_data[str(index)] = createDefaultBlockEntity(
                                block, "BlastFurnace"
                            )
                            continue
                        case "minecraft:smoker":
                            block_position_data[str(index)] = createDefaultBlockEntity(
                                block, "Smoker"
                            )
                            continue
                        case _:
                            continue
                    block_position_data[str(index)]["block_entity_data"][
                        "BurnTime"
                    ] = TAG_Short(block["nbt"]["BurnTime"].value)
                    block_position_data[str(index)]["block_entity_data"][
                        "CookTime"
                    ] = TAG_Short(block["nbt"]["CookTime"].value)
                    block_position_data[str(index)]["block_entity_data"][
                        "BurnDuration"
                    ] = TAG_Short(block["nbt"]["CookTimeTotal"].value)
                    block_position_data[str(index)]["block_entity_data"][
                        "Items"
                    ] = TAG_List(TAG_Compound, getItems(block["nbt"]["Items"]))
                    continue
                case "minecraft:bed":
                    block_position_data[str(index)] = createDefaultBlockEntity(
                        block, "Bed"
                    )
                    block_position_data[str(index)]["block_entity_data"][
                        "color"
                    ] = TAG_Byte(bedsj2b[palette[entry]["Name"].value])
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
