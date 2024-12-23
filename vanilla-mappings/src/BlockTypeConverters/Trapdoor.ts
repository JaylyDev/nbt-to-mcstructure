import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { AcaciaTrapdoorStates } from "@minecraft/vanilla-data";

export interface JavaTrapdoorProperties {
    facing: string; // north, south, west, east
    half: string; // top, bottom
    open: string; // true, false
    powered: string; // true, false
    waterlogged: string;
}

export type BedrockTrapdoorProperties = Required<AcaciaTrapdoorStates>;

export class TrapdoorTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaTrapdoorProperties): BedrockBlock<BedrockTrapdoorProperties> {
        const states: BedrockTrapdoorProperties = {
            direction: 0,
            open_bit: false,
            upside_down_bit: false,
        };

        switch (properties.half) {
            case "top":
                states.upside_down_bit = true;
                break;

            default:
                break;
        }

        switch (properties.open) {
            case "true":
                states.open_bit = true;
                break;

            default:
                break;
        }

        switch (properties.facing) {
            case "north":
                states.direction = 2;
                break;
            case "south":
                states.direction = 0;
                break;
            case "east":
                states.direction = 3;
                break;
            case "west":
                states.direction = 1;
                break;
        }

        return { name: id, properties: states };
    }
}
