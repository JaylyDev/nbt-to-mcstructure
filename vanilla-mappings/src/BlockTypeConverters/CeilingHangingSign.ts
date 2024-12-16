import { BlockTypeConverterBase } from "./BaseClass";
import { AcaciaHangingSignStates } from "@minecraft/vanilla-data";

export interface JavaCeilingHangingSignProperties {
    attached: string; // true, false
    rotation: string; // 0-15
    waterlogged: string; // true, false
}

export type BedrockCeilingHangingSignProperties = Required<AcaciaHangingSignStates>;

export class CeilingHangingSignTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCeilingHangingSignProperties): BedrockCeilingHangingSignProperties {
        const { attached, rotation, waterlogged } = properties;
        const states: BedrockCeilingHangingSignProperties = {
            attached_bit: false,
            facing_direction: 0,
            ground_sign_direction: 0,
            hanging: false,
        };

        switch (attached) {
            case "true":
                states.attached_bit = true;
                break;
            default:
                break;
        }

        switch (rotation) {
            case "0":
                states.facing_direction = 3;
                break;

            case "4":
                states.facing_direction = 4;
                break;

            case "12":
                states.facing_direction = 5;
                break;

            default:
                states.facing_direction = 2;
                break;
        }

        states.ground_sign_direction = parseInt(rotation);
        states.hanging = true;

        return states;
    }
}
