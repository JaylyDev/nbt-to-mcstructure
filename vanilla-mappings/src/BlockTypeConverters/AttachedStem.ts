import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { PumpkinStemStates } from "@minecraft/vanilla-data";

export interface JavaAttachedStemProperties {
    facing: string;
}

export type BedrockAttachedStemProperties = Required<PumpkinStemStates>;

export class AttachedStemTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaAttachedStemProperties): BedrockBlock<BedrockAttachedStemProperties> {
        const { facing } = properties;
        const states: BedrockAttachedStemProperties = {
            facing_direction: 0,
            growth: 7,
        };
        if (facing === "north") {
            states.facing_direction = 2;
        } else if (facing === "south") {
            states.facing_direction = 3;
        } else if (facing === "west") {
            states.facing_direction = 4;
        } else if (facing === "east") {
            states.facing_direction = 5;
        }
        return { name: id, properties: states };
    }
}
