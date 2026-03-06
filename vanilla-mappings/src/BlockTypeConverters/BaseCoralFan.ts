import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { FireCoralFanStates } from "@minecraft/vanilla-data";

export interface JavaBaseCoralFanProperties {
    waterlogged: string;
}

export type BedrockBaseCoralFanProperties = Required<FireCoralFanStates>;

export class BaseCoralFanTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBaseCoralFanProperties): BedrockBlock<BedrockBaseCoralFanProperties> {
        const states: BedrockBaseCoralFanProperties = {
            coral_fan_direction: 0,
        };
        return { name: id, properties: states };
    }
}
