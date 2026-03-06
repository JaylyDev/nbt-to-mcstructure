import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { ChainStates } from "@minecraft/vanilla-data";
export interface JavaChainProperties {
    axis: "x" | "y" | "z";
    waterlogged: "true" | "false";
}
export type BedrockChainProperties = Required<ChainStates>;
export class ChainTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaChainProperties): BedrockBlock<BedrockChainProperties> {
        const state: BedrockChainProperties = {
            pillar_axis: properties.axis,
        };
        // implement
        return { name: id, properties: state };
    }
}
