import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BellStates } from "@minecraft/vanilla-data";
export interface JavaBellProperties {
    attachment: "floor" | "ceiling" | "single_wall" | "double_wall";
    facing: "north" | "south" | "west" | "east";
    powered: "true" | "false";
}
export type BedrockBellProperties = Required<BellStates>;
export class BellTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBellProperties): BedrockBlock<BedrockBellProperties> {
        const states: BedrockBellProperties = {
            attachment: "",
            direction: 0,
            toggle_bit: false,
        };
        switch (properties.facing) {
            case "north":
                states.direction = 0;
                break;
            case "east":
                states.direction = 1;
                break;
            case "south":
                states.direction = 2;
                break;
            case "west":
                states.direction = 3;
                break;
        }
        // floor = standing, ceiling = hanging, single_wall = side, double_wall = multiple
        switch (properties.attachment) {
            case "floor":
                states.attachment = "standing";
                break;
            case "ceiling":
                states.attachment = "hanging";
                break;
            case "single_wall":
                states.attachment = "side";
                break;
            case "double_wall":
                states.attachment = "multiple";
                break;
        }
        if (properties.powered === "true") {
            states.toggle_bit = true;
        }
        return { name: id, properties: states };
    }
}
