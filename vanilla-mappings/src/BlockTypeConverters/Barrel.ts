import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BarrelStates } from "@minecraft/vanilla-data";
export interface JavaBarrelProperties {
    facing: "north" | "east" | "south" | "west" | "up" | "down";
    open: "true" | "false";
}
export type BedrockBarrelProperties = Required<BarrelStates>;
export class BarrelTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBarrelProperties): BedrockBlock<BedrockBarrelProperties> {
        const states: BedrockBarrelProperties = {
            facing_direction: 0,
            open_bit: false,
        };
        switch (properties.facing) {
            case "north":
                states.facing_direction = 2;
                break;
            case "east":
                states.facing_direction = 5;
                break;
            case "south":
                states.facing_direction = 3;
                break;
            case "west":
                states.facing_direction = 4;
                break;
            case "up":
                states.facing_direction = 1;
                break;
            case "down":
                states.facing_direction = 0;
                break;
        }
        if (properties.open === "true") {
            states.open_bit = true;
        }
        return { name: id, properties: states };
    }
}
