import { BlockTypeConverterBase } from "./BaseClass";
import { BedStates } from "@minecraft/vanilla-data";

export interface JavaBedProperties {
    facing: "north" | "south" | "east" | "west";
    part: "head" | "foot";
    occupied: "true" | "false";
}

export type BedrockBedProperties = Required<BedStates>;

export class BedTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBedProperties): BedrockBedProperties {
        const states: BedrockBedProperties = {
            direction: 0,
            head_piece_bit: false,
            occupied_bit: false,
        };

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

        switch (properties.part) {
            case "head":
                states.head_piece_bit = true;
                break;

            default:
                break;
        }

        switch (properties.occupied) {
            case "true":
                states.occupied_bit = true;
                break;

            default:
                break;
        }

        return states;
    }
}
