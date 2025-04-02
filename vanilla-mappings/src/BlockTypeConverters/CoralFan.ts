import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BrainCoralFanStates } from "@minecraft/vanilla-data";
export interface JavaCoralFanProperties {
    waterlogged: "true" | "false";
}
export type BedrockCoralFanProperties = Required<BrainCoralFanStates>;
export class CoralFanTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCoralFanProperties): BedrockBlock<BedrockCoralFanProperties> {
        const state: BedrockCoralFanProperties = {};
        // implement
        return { name: id, properties: state };
    }
}