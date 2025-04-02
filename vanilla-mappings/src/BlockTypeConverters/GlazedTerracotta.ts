import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BlackGlazedTerracottaStates } from "@minecraft/vanilla-data";
export interface JavaGlazedTerracottaProperties {
    facing: "north" | "south" | "west" | "east";
}
export type BedrockGlazedTerracottaProperties = Required<BlackGlazedTerracottaStates>;
export class GlazedTerracottaTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaGlazedTerracottaProperties): BedrockBlock<BedrockGlazedTerracottaProperties> {
        const state: BedrockGlazedTerracottaProperties = {};
        // implement
        return { name: id, properties: state };
    }
}