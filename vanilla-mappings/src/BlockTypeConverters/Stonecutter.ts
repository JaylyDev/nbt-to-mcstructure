import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaStonecutterProperties {
    facing: "north" | "south" | "west" | "east";
}
export type BedrockStonecutterProperties = Required<object>;
export class StonecutterTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaStonecutterProperties): BedrockBlock<BedrockStonecutterProperties> {
        const state: BedrockStonecutterProperties = {};
        // implement
        return { name: id, properties: state };
    }
}