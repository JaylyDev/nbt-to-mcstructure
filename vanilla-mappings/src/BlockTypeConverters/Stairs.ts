import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { OakStairsStates } from "@minecraft/vanilla-data";

export interface JavaStairsProperties {
    facing: "north" | "south" | "west" | "east";
    half: "top" | "bottom";
    shape: "straight" | "inner_left" | "inner_right" | "outer_left" | "outer_right";
    waterlogged: "true" | "false";
}

// vertical_half: bottom (default) or top
export type BedrockStairsProperties = Required<OakStairsStates>;

export class StairsTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaStairsProperties): BedrockBlock<BedrockStairsProperties> {
        const states: BedrockStairsProperties = {
            upside_down_bit: false,
            weirdo_direction: 0,
        };

        switch (properties.half) {
            case "top":
                states.upside_down_bit = true;
                break;

            default:
                break;
        }

        switch (properties.facing) {
            case "west":
                states.weirdo_direction = 1;
                break;

            case "north":
                states.weirdo_direction = 3;
                break;

            case "south":
                states.weirdo_direction = 2;
                break;

            default:
                break;
        }

        return {
            name: id,
            properties: states,
        };
    }
}