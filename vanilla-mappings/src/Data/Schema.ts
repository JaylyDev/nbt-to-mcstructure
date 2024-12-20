export interface JavaBlockDefinition {
    type: string;
    properties: {};
    block_set_type?: string;
    color?: string;
}

export interface JavaBlockState {
    default?: true;
    id: number;
    properties?: Record<string, string>;
}

export interface JavaBlock {
    definition: JavaBlockDefinition;
    properties?: Record<string, string[]>;
    states: JavaBlockState[];
}

export interface BlockType {
    properties: Record<string, string[]>;
}

export interface BedrockBlockPropertyValue {
    value: string | number | boolean;
}

export interface BedrockBlockProperty {
    name: string;
    type: "int" | "bool" | "string";
    values: BedrockBlockPropertyValue[];
}

export interface BedrockDataItemProperty {
    name: string;
}

export interface BedrockDataItem {
    name: string;
    properties: BedrockDataItemProperty[];
    raw_id: number;
    serialization_id: number;
}

export interface MojangBlocks {
    block_properties: BedrockBlockProperty[];
    data_items: BedrockDataItem[];
    module_type: "vanilla_data";
    name: "mojang-block";
    vanilla_data_type: "block";
}
