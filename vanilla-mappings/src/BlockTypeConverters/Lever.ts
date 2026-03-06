import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { LeverStates } from "@minecraft/vanilla-data";
export interface JavaLeverProperties {
    face: "floor" | "wall" | "ceiling";
    facing: "north" | "south" | "west" | "east";
    powered: "true" | "false";
}
export type BedrockLeverProperties = Required<LeverStates>;
export class LeverTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaLeverProperties): BedrockBlock<BedrockLeverProperties> {
        const state: BedrockLeverProperties = {};
        // implement
        return { name: id, properties: state };
    }
}