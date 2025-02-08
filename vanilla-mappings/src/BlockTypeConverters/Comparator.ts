import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaComparatorProperties {
    facing: "north" | "south" | "west" | "east";
    mode: "compare" | "subtract";
    powered: "true" | "false";
}
export type BedrockComparatorProperties = Required<object>;
export class ComparatorTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaComparatorProperties): BedrockBlock<BedrockComparatorProperties> {
        const state: BedrockComparatorProperties = {};
        // implement
        return { name: id, properties: state };
    }
}