import { BlockTypeConverterBase } from "./BaseClass";
import { AcaciaButtonStates } from "@minecraft/vanilla-data";

export interface JavaButtonProperties {
    face: string;
    facing: string;
    powered: string;
}

export type BedrockButtonProperties = Required<AcaciaButtonStates>;

export class ButtonTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaButtonProperties): BedrockButtonProperties {
        const { face, facing, powered } = properties;
        const states: BedrockButtonProperties = {
            button_pressed_bit: false,
            facing_direction: 0,
        };

        switch (powered) {
            case "true":
                states.button_pressed_bit = true;
                break;

            default:
                break;
        }

        if (face === "floor") {
            states.facing_direction = 1;
        } else if (face === "wall") {
            if (facing === "north") {
                states.facing_direction = 2;
            } else if (facing === "south") {
                states.facing_direction = 3;
            } else if (facing === "west") {
                states.facing_direction = 4;
            } else if (facing === "east") {
                states.facing_direction = 5;
            }
        }

        return states;
    }
}
