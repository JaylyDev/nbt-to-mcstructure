import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { StandingSignStates } from "@minecraft/vanilla-data";

export interface JavaStandingSignProperties {
    rotation: string; // 0-15
    waterlogged: string;
}

export type BedrockStandingSignProperties = Required<StandingSignStates>;

export class StandingSignTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaStandingSignProperties): BedrockBlock<BedrockStandingSignProperties> {
        const states: BedrockStandingSignProperties = {
            ground_sign_direction: parseInt(properties.rotation),
        };

        return { name: id, properties: states };
    }
}
