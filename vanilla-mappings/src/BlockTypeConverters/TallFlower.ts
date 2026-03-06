import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { LilacStates } from "@minecraft/vanilla-data";
export interface JavaTallFlowerProperties {
    half: "upper" | "lower";
}
export type BedrockTallFlowerProperties = Required<LilacStates>;
export class TallFlowerTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaTallFlowerProperties): BedrockBlock<BedrockTallFlowerProperties> {
        const state: BedrockTallFlowerProperties = {};
        // implement
        return { name: id, properties: state };
    }
}