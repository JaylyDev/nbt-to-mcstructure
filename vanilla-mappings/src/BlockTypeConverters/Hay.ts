import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { HayBlockStates } from "@minecraft/vanilla-data";
export interface JavaHayProperties {
    axis: "x" | "y" | "z";
}
export type BedrockHayProperties = Required<HayBlockStates>;
export class HayTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaHayProperties): BedrockBlock<BedrockHayProperties> {
        const state: BedrockHayProperties = {
            pillar_axis: properties.axis,
            deprecated: 0,
        };
        // implement
        return { name: id, properties: state };
    }
}
