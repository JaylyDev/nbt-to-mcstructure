import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BrainCoralFanStates } from "@minecraft/vanilla-data";
export interface JavaCoralFanProperties {
    waterlogged: "true" | "false";
}
export type BedrockCoralFanProperties = Required<BrainCoralFanStates>;
export class CoralFanTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCoralFanProperties): BedrockBlock<BedrockCoralFanProperties> {
        const state: BedrockCoralFanProperties = {
            coral_fan_direction: 0,
        };
        // implement
        return { name: id, properties: state };
    }
}
