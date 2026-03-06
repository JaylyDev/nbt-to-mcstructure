import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaSmallDripleafProperties {
    facing: "north" | "south" | "west" | "east";
    half: "upper" | "lower";
    waterlogged: "true" | "false";
}
export type BedrockSmallDripleafProperties = Required<object>;
export class SmallDripleafTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaSmallDripleafProperties): BedrockBlock<BedrockSmallDripleafProperties> {
        const state: BedrockSmallDripleafProperties = {};
        // implement
        return { name: id, properties: state };
    }
}