import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { FenceGateStates } from "@minecraft/vanilla-data";

export interface JavaFenceGateProperties {
    facing: string;
    in_wall: string;
    open: string;
    powered: string;
}

export type BedrockFenceGateProperties = Required<FenceGateStates>;

export class FenceGateTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaFenceGateProperties): BedrockBlock<BedrockFenceGateProperties> {
        const { facing, in_wall, open, powered } = properties;
        const states: BedrockFenceGateProperties = {
            direction: 0,
            in_wall_bit: false,
            open_bit: false,
        };

        switch (facing) {
            case "north":
                states.direction = 2;
                break;
            case "west":
                states.direction = 1;
                break;
            case "east":
                states.direction = 3;
                break;
            default:
                break;
        }

        switch (in_wall) {
            case "true":
                states.in_wall_bit = true;
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

        return { name: id, properties: states };
    }
}
