import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { ChainCommandBlockStates } from "@minecraft/vanilla-data";
export interface JavaCommandProperties {
    conditional: "true" | "false";
    facing: "north" | "east" | "south" | "west" | "up" | "down";
}
export type BedrockCommandProperties = Required<ChainCommandBlockStates>;
export class CommandTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCommandProperties): BedrockBlock<BedrockCommandProperties> {
        const state: BedrockCommandProperties = {
            conditional_bit: false,
            facing_direction: 0,
        };
        if (properties.conditional === "true") {
            state.conditional_bit = true;
        }
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
