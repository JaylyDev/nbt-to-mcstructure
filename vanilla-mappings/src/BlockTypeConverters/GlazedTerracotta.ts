import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BlackGlazedTerracottaStates } from "@minecraft/vanilla-data";
export interface JavaGlazedTerracottaProperties {
    facing: "north" | "south" | "west" | "east";
}
export type BedrockGlazedTerracottaProperties = Required<BlackGlazedTerracottaStates>;
export class GlazedTerracottaTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaGlazedTerracottaProperties): BedrockBlock<BedrockGlazedTerracottaProperties> {
        const state: BedrockGlazedTerracottaProperties = {
            facing_direction: 0,
        };

        switch (properties.facing) {
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
