import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { DispenserStates } from "@minecraft/vanilla-data";
export interface JavaDispenserProperties {
    facing: "north" | "east" | "south" | "west" | "up" | "down";
    triggered: "true" | "false";
}
export type BedrockDispenserProperties = Required<DispenserStates>;
export class DispenserTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaDispenserProperties): BedrockBlock<BedrockDispenserProperties> {
        const state: BedrockDispenserProperties = {
            triggered_bit: false,
            facing_direction: 0,
        };
        switch (properties.facing) {
            case "down":
                state.facing_direction = 0;
                break;
            case "up":
                state.facing_direction = 1;
                break;
            case "north":
                state.facing_direction = 2;
                break;
            case "south":
                state.facing_direction = 3;
                break;
            case "west":
                state.facing_direction = 4;
                break;
            case "east":
                state.facing_direction = 5;
                break;
        }
        if (properties.triggered === "true") {
            state.triggered_bit = true;
        }
        // implement
        return { name: id, properties: state };
    }
}
