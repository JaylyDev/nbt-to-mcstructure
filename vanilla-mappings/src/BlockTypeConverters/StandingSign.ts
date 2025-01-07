import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { StandingSignStates } from "@minecraft/vanilla-data";

const signsMap = new Map<string, string>()
    .set("minecraft:dark_oak_sign", "minecraft:darkoak_standing_sign")
    .set("minecraft:oak_sign", "minecraft:standing_sign");

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

        const bedrockId = signsMap.get(id) ?? id.replace("_sign", "_standing_sign");
        return { name: bedrockId, properties: states };
    }
}
