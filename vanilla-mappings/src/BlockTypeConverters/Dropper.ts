import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { DropperStates } from "@minecraft/vanilla-data";
export interface JavaDropperProperties {
    facing: "north" | "east" | "south" | "west" | "up" | "down";
    triggered: "true" | "false";
}
export type BedrockDropperProperties = Required<DropperStates>;
export class DropperTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaDropperProperties): BedrockBlock<BedrockDropperProperties> {
        const state: BedrockDropperProperties = {
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
        // implement
        return { name: id, properties: state };
    }
}
