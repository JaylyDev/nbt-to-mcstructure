import * as fs from "fs";
import * as path from "path";
import { ButtonTypeConverter } from "./BlockTypeConverters/Button";
import { BlockTypeConverterBase } from "./BlockTypeConverters/BaseClass";
import { blockIdsMap } from "./Mappings/blocks";

interface JavaBlockDefinition {
    type: string;
    properties: {};
    block_set_type?: string;
    color?: string;
}

interface JavaBlockState {
    id: number;
    properties: Record<string, string>;
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
            console.error(`No block type converter found for block type ${definition.type}`);
            continue;
        }

        if (!bedrockBlocks.data_items.find((item) => item.name === bedrockBlockID)) {
            console.error(`No bedrock block found for block id ${blockId}`);
            continue;
        }

        if (states) {
            for (const state of states) {
                const properties = blockTypeConverter.convert(blockId, state.properties);
                // Required format: minecraft:block[key=value,key=value]
                const javaStateString = Object.entries(state.properties)
                    .map(([key, value]) => `${key}=${value}`)
                    .join(",");
                const bedrockStateString = Object.entries(properties)
                    .map(([key, value]) => `${key}=${value}`)
                    .join(",");
                blocksJ2B[blockId + "[" + javaStateString + "]"] = bedrockBlockID + "[" + bedrockStateString + "]";
            }
        } else {
            blocksJ2B[blockId + "[]"] = blockId + "[]";
        }
    }
    return blocksJ2B;
}

function main() {
    // Load data files
    const scriptDir: string = path.join(__dirname, "..");
    const javaBlocks: Record<string, JavaBlock> = JSON.parse(fs.readFileSync(path.join(scriptDir, "data/java-blocks.json"), "utf-8"));
    const bedrockBlocks: MojangBlocks = JSON.parse(fs.readFileSync(path.join(scriptDir, "data/bedrock-blocks.json"), "utf-8"));
    const blockTypeConverters = new Map<string, BlockTypeConverterBase>().set("minecraft:button", new ButtonTypeConverter());

    // Convert
    const blocksJ2B: Record<string, string> = createBlocksJ2B(javaBlocks, bedrockBlocks, blockTypeConverters);
    fs.writeFileSync(path.join(scriptDir, "dist/blocksJ2B.json"), JSON.stringify(blocksJ2B, null, 4));
}

main();
