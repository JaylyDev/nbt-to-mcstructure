import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { HopperStates } from "@minecraft/vanilla-data";
export interface JavaHopperProperties {
    enabled: "true" | "false";
    facing: "down" | "north" | "south" | "west" | "east";
}
export type BedrockHopperProperties = Required<HopperStates>;
export class HopperTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaHopperProperties): BedrockBlock<BedrockHopperProperties> {
        const state: BedrockHopperProperties = {
            facing_direction: 0,
            toggle_bit: false,
        };
        // implement
        switch (properties.facing) {
            case "down":
                state.facing_direction = 0;
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
        if (properties.enabled === "true") {
            state.toggle_bit = true;
        }
        return { name: id, properties: state };
    }
}
