import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { DetectorRailStates, GoldenRailStates, RailStates } from "@minecraft/vanilla-data";

// shape=north_south -> rail_direction=0
// shape=east_west -> rail_direction=1
// shape=ascending_east -> rail_direction=2
// shape=ascending_west -> rail_direction=3
// shape=ascending_north -> rail_direction=4
// shape=ascending_south -> rail_direction=5
// shape=south_east -> rail_direction=6
// shape=south_west -> rail_direction=7
// shape=north_west -> rail_direction=8
// shape=north_east -> rail_direction=9
export interface JavaRailProperties {
    shape:
        | "north_south"
        | "east_west"
        | "ascending_east"
        | "ascending_west"
        | "ascending_north"
        | "ascending_south"
        | "south_east"
        | "south_west"
        | "north_west"
        | "north_east";

    waterlogged: "true" | "false";
}

export interface JavaDetectorRailProperties {
    powered: "true" | "false";
    shape: "north_south" | "east_west" | "ascending_east" | "ascending_west" | "ascending_north" | "ascending_south";
    waterlogged: "true" | "false";
}

export interface JavaPoweredRailProperties extends JavaDetectorRailProperties {}

export type BedrockRailProperties = Required<RailStates>;
export type BedrockPoweredRailProperties = Required<GoldenRailStates>;
export type BedrockDetectorRailProperties = Required<DetectorRailStates>;

export class RailTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaRailProperties): BedrockBlock<BedrockRailProperties> {
        const states: BedrockRailProperties = {
            rail_direction: 0,
        };

        switch (properties.shape) {
            case "north_south":
                states.rail_direction = 0;
                break;
            case "east_west":
                states.rail_direction = 1;
                break;
            case "ascending_east":
                states.rail_direction = 2;
                break;
            case "ascending_west":
                states.rail_direction = 3;
                break;
            case "ascending_north":
                states.rail_direction = 4;
                break;
            case "ascending_south":
                states.rail_direction = 5;
                break;
            case "south_east":
                states.rail_direction = 6;
                break;
            case "south_west":
                states.rail_direction = 7;
                break;
            case "north_west":
                states.rail_direction = 8;
                break;
            case "north_east":
                states.rail_direction = 9;
                break;
            default:
                break;
        }

        if (id === "minecraft:powered_rail") {
            return {
                name: "minecraft:golden_rail",
                properties: states,
            };
        } else {
            return {
                name: id,
                properties: states,
            };
        }
    }
}
