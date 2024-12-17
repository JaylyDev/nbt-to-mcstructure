import * as fs from "fs";
import * as path from "path";
import { ButtonTypeConverter } from "./BlockTypeConverters/Button";
import { BlockTypeConverterBase, EmptyBlockTypeConverter } from "./BlockTypeConverters/BaseClass";
import { blockIdsMap } from "./Mappings/blocks";
import { DoorTypeConverter } from "./BlockTypeConverters/Door";
import { FenceGateTypeConverter } from "./BlockTypeConverters/FenceGate";
import { CeilingHangingSignTypeConverter } from "./BlockTypeConverters/CeilingHangingSign";
import { RedstoneWireTypeConverter } from "./BlockTypeConverters/RedstoneWire";
import { javaBlocks, bedrockBlocks, scriptDir } from "./Data/MinecraftBlocks";
import { JavaBlock, BlockType, MojangBlocks } from "./Data/Schema";
import { FlowerPotTypeConverter } from "./BlockTypeConverters/FlowerPot";
import { SkullTypeConverter } from "./BlockTypeConverters/Skull";
import { LeavesTypeConverter } from "./BlockTypeConverters/Leaves";
import { RotatedPillarTypeConverter } from "./BlockTypeConverters/RotatedPillar";

function getJavaBlockTypes(javaBlocks: Record<string, JavaBlock>): Record<string, BlockType> {
    const blockTypes: Record<string, BlockType> = {};

    for (const blockId in javaBlocks) {
        const block: JavaBlock = javaBlocks[blockId];

        if (block.definition.type in blockTypes === false && block.properties) {
            blockTypes[block.definition.type] = {
                properties: block.properties,
            };
        }
    }

    return blockTypes;
}

function getJavaBlockProperties(javaBlocks: Record<string, JavaBlock>): Record<string, string[]> {
    const blockProperties: Record<string, string[]> = {};
    for (const blockId in javaBlocks) {
        const block: JavaBlock = javaBlocks[blockId];

        if (block.properties) {
            for (const property in block.properties) {
                if (blockProperties[property] === undefined) {
                    blockProperties[property] = [];
                }
                for (const value of block.properties[property]) {
                    if (blockProperties[property].includes(value) === false) {
                        blockProperties[property].push(value);
                    }
                }
            }
        }
    }
    return blockProperties;
}

function createBlocksJ2B(
    javaBlocks: Record<string, JavaBlock>,
    bedrockBlocks: MojangBlocks,
    blockTypeConverters: Map<string, BlockTypeConverterBase>
): Record<string, string> {
    const blocksJ2B: Record<string, string> = {};
    for (const blockId in javaBlocks) {
        const block: JavaBlock = javaBlocks[blockId];
        const { definition, states } = block;
        const blockTypeConverter = blockTypeConverters.get(definition.type);
        const bedrockBlockID = blockIdsMap.get(blockId) ?? blockId;

        if (!blockTypeConverter) {
            console.error(`[BlockJ2B] No block type converter found for block type '${definition.type}'`);
            continue;
        }

        if (!bedrockBlocks.data_items.find((item) => item.name === bedrockBlockID)) {
            console.error(`[BlockJ2B] No bedrock block found for block id '${blockId}'`);
            continue;
        }

        for (const state of states) {
            if (state.properties) {
                const properties = blockTypeConverter.convert(blockId, state.properties);
                // Required format: minecraft:block[key=value,key=value]
                const javaStateString = Object.entries(state.properties)
                    .map(([key, value]) => `${key}=${value}`)
                    .join(",");
                const bedrockStateString = Object.entries(properties)
                    .map(([key, value]) => `${key}=${value}`)
                    .join(",");
                blocksJ2B[blockId + "[" + javaStateString + "]"] = bedrockBlockID + "[" + bedrockStateString + "]";
            } else {
                blocksJ2B[blockId + "[]"] = bedrockBlockID + "[]";
            }
        }
    }
    return blocksJ2B;
}

function assertBlockTypeConverters(converters: Map<string, BlockTypeConverterBase>, javaBlocks: Record<string, JavaBlock>) {
    const blockTypes = getJavaBlockTypes(javaBlocks);
    for (const blockType in blockTypes) {
        if (!converters.has(blockType)) {
            console.warn(`[Registry] Block type converter '${blockType}' is not registered in BlockTypeConverters map`);
        }
    }
}

function main() {
    // Load data files
    const blockTypeConverters = new Map<string, BlockTypeConverterBase>()
        .set("minecraft:button", new ButtonTypeConverter())
        .set("minecraft:door", new DoorTypeConverter())
        .set("minecraft:fence_gate", new FenceGateTypeConverter())
        .set("minecraft:ceiling_hanging_sign", new CeilingHangingSignTypeConverter())
        .set("minecraft:redstone_wire", new RedstoneWireTypeConverter())
        .set("minecraft:flower_pot", new FlowerPotTypeConverter())
        .set("minecraft:skull", new SkullTypeConverter())
        .set("minecraft:leaves", new LeavesTypeConverter())
        .set("minecraft:rotated_pillar", new RotatedPillarTypeConverter())
        // Following bedrock blocks has zero block properties, skipping.
        .set("minecraft:fence", new EmptyBlockTypeConverter())
        .set("minecraft:block", new EmptyBlockTypeConverter())
        .set("minecraft:air", new EmptyBlockTypeConverter())
        .set("minecraft:flower", new EmptyBlockTypeConverter())
        .set("minecraft:amethyst", new EmptyBlockTypeConverter())
        .set("minecraft:azalea", new EmptyBlockTypeConverter())
        .set("minecraft:barrier", new EmptyBlockTypeConverter())
        .set("minecraft:beacon", new EmptyBlockTypeConverter())
        .set("minecraft:wool_carpet", new EmptyBlockTypeConverter())
        .set("minecraft:concrete_powder", new EmptyBlockTypeConverter())
        .set("minecraft:shulker_box", new EmptyBlockTypeConverter())
        .set("minecraft:stained_glass", new EmptyBlockTypeConverter())
        .set("minecraft:stained_glass_pane", new EmptyBlockTypeConverter())
        .set("minecraft:half_transparent", new EmptyBlockTypeConverter())
        .set("minecraft:coral_plant", new EmptyBlockTypeConverter())
        .set("minecraft:coral", new EmptyBlockTypeConverter())
        .set("minecraft:mushroom", new EmptyBlockTypeConverter())
        .set("minecraft:budding_amethyst", new EmptyBlockTypeConverter())
        .set("minecraft:cartography_table", new EmptyBlockTypeConverter())
        .set("minecraft:weathering_copper_full", new EmptyBlockTypeConverter())
        .set("minecraft:chorus_plant", new EmptyBlockTypeConverter())
        .set("minecraft:eyeblossom", new EmptyBlockTypeConverter())
        .set("minecraft:drop_experience", new EmptyBlockTypeConverter())
        .set("minecraft:conduit", new EmptyBlockTypeConverter())
        .set("minecraft:weathering_copper_grate", new EmptyBlockTypeConverter())
        .set("minecraft:crafting_table", new EmptyBlockTypeConverter())
        .set("minecraft:fungus", new EmptyBlockTypeConverter())
        .set("minecraft:nylium", new EmptyBlockTypeConverter())
        .set("minecraft:roots", new EmptyBlockTypeConverter())
        .set("minecraft:crying_obsidian", new EmptyBlockTypeConverter())
        .set("minecraft:base_coral_plant", new EmptyBlockTypeConverter())
        .set("minecraft:redstone_ore", new EmptyBlockTypeConverter())
        .set("minecraft:dragon_egg", new EmptyBlockTypeConverter())
        .set("minecraft:enchantment_table", new EmptyBlockTypeConverter())
        .set("minecraft:end_portal", new EmptyBlockTypeConverter())
        .set("minecraft:tall_grass", new EmptyBlockTypeConverter())
        .set("minecraft:fletching_table", new EmptyBlockTypeConverter())
        .set("minecraft:transparent", new EmptyBlockTypeConverter())
        .set("minecraft:iron_bars", new EmptyBlockTypeConverter())
        .set("minecraft:grass", new EmptyBlockTypeConverter())
        .set("minecraft:colored_falling", new EmptyBlockTypeConverter())
        .set("minecraft:hanging_roots", new EmptyBlockTypeConverter())
        .set("minecraft:heavy_core", new EmptyBlockTypeConverter())
        .set("minecraft:honey", new EmptyBlockTypeConverter())
        .set("minecraft:ice", new EmptyBlockTypeConverter())
        .set("minecraft:infested", new EmptyBlockTypeConverter())
        .set("minecraft:jukebox", new EmptyBlockTypeConverter())
        .set("minecraft:mangrove_roots", new EmptyBlockTypeConverter())
        .set("minecraft:bonemealable_feature_placer", new EmptyBlockTypeConverter())
        .set("minecraft:carpet", new EmptyBlockTypeConverter())
        .set("minecraft:mud", new EmptyBlockTypeConverter())
        .set("minecraft:mycelium", new EmptyBlockTypeConverter())
        .set("minecraft:nether_sprouts", new EmptyBlockTypeConverter())
        .set("minecraft:netherrack", new EmptyBlockTypeConverter())
        .set("minecraft:snowy_dirt", new EmptyBlockTypeConverter())
        .set("minecraft:powder_snow", new EmptyBlockTypeConverter())
        .set("minecraft:powered", new EmptyBlockTypeConverter())
        .set("minecraft:redstone_lamp", new EmptyBlockTypeConverter())
        .set("minecraft:sculk", new EmptyBlockTypeConverter())
        .set("minecraft:smithing_table", new EmptyBlockTypeConverter())
        .set("minecraft:snow_layer", new EmptyBlockTypeConverter())
        .set("minecraft:soul_sand", new EmptyBlockTypeConverter())
        .set("minecraft:sponge", new EmptyBlockTypeConverter())
        .set("minecraft:spore_blossom", new EmptyBlockTypeConverter())
        .set("minecraft:structure_void", new EmptyBlockTypeConverter())
        .set("minecraft:target", new EmptyBlockTypeConverter())
        .set("minecraft:tinted_glass", new EmptyBlockTypeConverter())
        .set("minecraft:waterlogged_transparent", new EmptyBlockTypeConverter())
        .set("minecraft:wet_sponge", new EmptyBlockTypeConverter())
        .set("minecraft:wither_rose", new EmptyBlockTypeConverter())
        .set("minecraft:note", new EmptyBlockTypeConverter())
        .set("minecraft:jukebox", new EmptyBlockTypeConverter())
        .set("minecraft:iron_bars", new EmptyBlockTypeConverter())
        .set("minecraft:target", new EmptyBlockTypeConverter())
        .set("minecraft:snowy_dirt", new EmptyBlockTypeConverter());

    // Assert
    assertBlockTypeConverters(blockTypeConverters, javaBlocks);

    // Convert
    const blocksJ2B: Record<string, string> = createBlocksJ2B(javaBlocks, bedrockBlocks, blockTypeConverters);
    fs.writeFileSync(path.join(scriptDir, "../cli/data/blocksJ2B.json"), JSON.stringify(blocksJ2B, null, 4));
}

main();
