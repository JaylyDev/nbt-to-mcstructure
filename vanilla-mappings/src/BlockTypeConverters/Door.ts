import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { AcaciaDoorStates } from "@minecraft/vanilla-data";

export interface JavaDoorProperties {
    facing: string; // north, south, west, east
    half: string; // upper, lower
    hinge: string; // left, right
    open: string; // true, false
    powered: string; // true, false
}

export type BedrockDoorProperties = Required<AcaciaDoorStates>;

export class DoorTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaDoorProperties): BedrockBlock<BedrockDoorProperties> {
        const { facing, half, hinge, open, powered } = properties;
        const states: BedrockDoorProperties = {
            direction: 0,
            door_hinge_bit: false,
            open_bit: false,
            upper_block_bit: false,
        };

        switch (facing) {
            case "north":
                states.direction = 3;
                break;
            case "south":
                states.direction = 1;
                break;
            case "west":
                states.direction = 2;
                break;
            default:
                break;
        }
        switch (hinge) {
            case "right":
                states.door_hinge_bit = true;
                break;

            default:
                break;
        }
        switch (open) {
            case "true":
                states.open_bit = true;
                break;

            default:
                break;
        }
        switch (half) {
            case "upper":
                states.upper_block_bit = true;
                break;

            default:
                break;
        }

        return { name: id, properties: states };
    }
}
