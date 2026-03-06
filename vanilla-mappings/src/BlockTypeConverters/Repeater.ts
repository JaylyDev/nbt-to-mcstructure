import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaRepeaterProperties {
    delay: "1" | "2" | "3" | "4";
    facing: "north" | "south" | "west" | "east";
    locked: "true" | "false";
    powered: "true" | "false";
}
export type BedrockRepeaterProperties = Required<object>;
export class RepeaterTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaRepeaterProperties): BedrockBlock<BedrockRepeaterProperties> {
        const state: BedrockRepeaterProperties = {};
        // implement
        return { name: id, properties: state };
    }
}