import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { LadderStates } from "@minecraft/vanilla-data";
export interface JavaLadderProperties {
    facing: "north" | "south" | "west" | "east";
    waterlogged: "true" | "false";
}
export type BedrockLadderProperties = Required<LadderStates>;
export class LadderTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaLadderProperties): BedrockBlock<BedrockLadderProperties> {
        const state: BedrockLadderProperties = {};
        // implement
        return { name: id, properties: state };
    }
}