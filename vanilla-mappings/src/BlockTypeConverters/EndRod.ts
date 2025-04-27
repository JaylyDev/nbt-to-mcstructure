import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { EndRodStates } from "@minecraft/vanilla-data";
export interface JavaEndRodProperties {
    facing: "north" | "east" | "south" | "west" | "up" | "down";
}
export type BedrockEndRodProperties = Required<EndRodStates>;
export class EndRodTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaEndRodProperties): BedrockBlock<BedrockEndRodProperties> {
        const state: BedrockEndRodProperties = {
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
