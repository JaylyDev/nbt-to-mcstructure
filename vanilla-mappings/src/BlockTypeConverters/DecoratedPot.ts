import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { DecoratedPotStates } from "@minecraft/vanilla-data";
export interface JavaDecoratedPotProperties {
    cracked: "true" | "false";
    facing: "north" | "south" | "west" | "east";
    waterlogged: "true" | "false";
}
export type BedrockDecoratedPotProperties = Required<DecoratedPotStates>;
export class DecoratedPotTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaDecoratedPotProperties): BedrockBlock<BedrockDecoratedPotProperties> {
        const state: BedrockDecoratedPotProperties = {
            direction: 0,
        };

        switch (properties.facing) {
            case "north":
                state.direction = 0;
                break;
            case "south":
                state.direction = 2;
                break;
            case "east":
                state.direction = 3;
                break;
            case "west":
                state.direction = 1;
                break;
        }

        // implement
        return { name: id, properties: state };
    }
}
