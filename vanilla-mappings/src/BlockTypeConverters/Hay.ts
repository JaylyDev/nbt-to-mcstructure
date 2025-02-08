import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { HayBlockStates } from "@minecraft/vanilla-data";
export interface JavaHayProperties {
    axis: "x" | "y" | "z";
}
export type BedrockHayProperties = Required<HayBlockStates>;
export class HayTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaHayProperties): BedrockBlock<BedrockHayProperties> {
        const state: BedrockHayProperties = {};
        // implement
        return { name: id, properties: state };
    }
}