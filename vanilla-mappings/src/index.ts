import * as fs from "fs";
import * as path from "path";
import { ButtonTypeConverter } from "./BlockTypeConverters/Button";
import { BlockTypeConverterBase } from "./BlockTypeConverters/BaseClass";
import { blockIdsMap } from "./Mappings/blocks";
import { DoorTypeConverter } from "./BlockTypeConverters/Door";
import { FenceTypeConverter } from "./BlockTypeConverters/Fence";
import { FenceGateTypeConverter } from "./BlockTypeConverters/FenceGate";
import { CeilingHangingSignTypeConverter } from "./BlockTypeConverters/CeilingHangingSign";
import { BlockTypeConverter } from "./BlockTypeConverters/Block";
import { CauldronTypeConverter } from "./BlockTypeConverters/Cauldron";
import { AirTypeConverter } from "./BlockTypeConverters/Air";
import { RedstoneWireTypeConverter } from "./BlockTypeConverters/RedstoneWire";

interface JavaBlockDefinition {
    type: string;
    properties: {};
    block_set_type?: string;
    color?: string;
}

interface JavaBlockState {
    default?: true;
    id: number;
    properties?: Record<string, string>;
}

interface JavaBlock {
    definition: JavaBlockDefinition;
    properties?: Record<string, string[]>;
    states: JavaBlockState[];
}

interface BlockType {
    properties: Record<string, string[]>;
}

interface BedrockBlockPropertyValue {
    value: string | number | boolean;
}

interface BedrockBlockProperty {
    name: string;
    type: "int" | "bool" | "string";
    values: BedrockBlockPropertyValue[];
}

interface BedrockDataItemProperty {
    name: string;
}

interface BedrockDataItem {
    name: string;
    properties: BedrockDataItemProperty[];
    raw_id: number;
    serialization_id: number;
}

interface MojangBlocks {
    block_properties: BedrockBlockProperty[];
    data_items: BedrockDataItem[];
    module_type: "vanilla_data";
    name: "mojang-block";
    vanilla_data_type: "block";
}

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
    const scriptDir: string = path.join(__dirname, "..");
    const javaBlocks: Record<string, JavaBlock> = JSON.parse(fs.readFileSync(path.join(scriptDir, "data/java-blocks.json"), "utf-8"));
    const bedrockBlocks: MojangBlocks = JSON.parse(fs.readFileSync(path.join(scriptDir, "data/bedrock-blocks.json"), "utf-8"));
    const blockTypeConverters = new Map<string, BlockTypeConverterBase>()
        .set("minecraft:block", new BlockTypeConverter())
        .set("minecraft:button", new ButtonTypeConverter())
        .set("minecraft:door", new DoorTypeConverter())
        .set("minecraft:fence", new FenceTypeConverter())
        .set("minecraft:fence_gate", new FenceGateTypeConverter())
        .set("minecraft:ceiling_hanging_sign", new CeilingHangingSignTypeConverter())
        .set("minecraft:cauldron", new CauldronTypeConverter())
        .set("minecraft:air", new AirTypeConverter())
        .set("minecraft:redstone_wire", new RedstoneWireTypeConverter());

    // Assert
    assertBlockTypeConverters(blockTypeConverters, javaBlocks);

    // Convert
    const blocksJ2B: Record<string, string> = createBlocksJ2B(javaBlocks, bedrockBlocks, blockTypeConverters);
    fs.writeFileSync(path.join(scriptDir, "../cli/data/blocksJ2B.json"), JSON.stringify(blocksJ2B, null, 4));
}

main();
