import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { ScaffoldingStates } from "@minecraft/vanilla-data";
export interface JavaScaffoldingProperties {
    bottom: "true" | "false";
    distance: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
    waterlogged: "true" | "false";
}
export type BedrockScaffoldingProperties = Required<ScaffoldingStates>;
export class ScaffoldingTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaScaffoldingProperties): BedrockBlock<BedrockScaffoldingProperties> {
        const state: BedrockScaffoldingProperties = {};
        // implement
        return { name: id, properties: state };
    }
}