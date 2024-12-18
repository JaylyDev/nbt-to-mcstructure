import { BlockTypeConverterBase } from "./BaseClass";
import { BrickWallStates } from "@minecraft/vanilla-data";

export interface JavaWallProperties {
    east: "none" | "low" | "tall";
    north: "none" | "low" | "tall";
    south: "none" | "low" | "tall";
    up: "true" | "false";
    waterlogged: "true" | "false";
    west: "none" | "low" | "tall";
}

export type BedrockWallProperties = Required<BrickWallStates>;

export class WallTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaWallProperties): BedrockWallProperties {
        const states: BedrockWallProperties = {
            wall_connection_type_east: "none",
            wall_connection_type_north: "none",
            wall_connection_type_south: "none",
            wall_connection_type_west: "none",
            wall_post_bit: true,
        };

        switch (properties.east) {
            case "none":
                states.wall_connection_type_east = "none";
                break;

            case "low":
                states.wall_connection_type_east = "short";
                break;

            case "tall":
                states.wall_connection_type_east = "tall";
                break;

            default:
                break;
        }

        switch (properties.west) {
            case "none":
                states.wall_connection_type_west = "none";
                break;

            case "low":
                states.wall_connection_type_west = "short";
                break;

            case "tall":
                states.wall_connection_type_west = "tall";
                break;

            default:
                break;
        }

        switch (properties.south) {
            case "none":
                states.wall_connection_type_south = "none";
                break;

            case "low":
                states.wall_connection_type_south = "short";
                break;

            case "tall":
                states.wall_connection_type_south = "tall";
                break;

            default:
                break;
        }

        switch (properties.north) {
            case "none":
                states.wall_connection_type_north = "none";
                break;

            case "low":
                states.wall_connection_type_north = "short";
                break;

            case "tall":
                states.wall_connection_type_north = "tall";
                break;

            default:
                break;
        }

        switch (properties.up) {
            case "true":
                states.wall_post_bit = true;
                break;

            case "false":
                states.wall_post_bit = false;
                break;

            default:
                break;
        }

        return states;
    }
}
