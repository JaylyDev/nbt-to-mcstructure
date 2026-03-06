import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { PitcherCropStates } from "@minecraft/vanilla-data";
export interface JavaPitcherCropProperties {
    age: "0" | "1" | "2" | "3" | "4";
    half: "upper" | "lower";
}
export type BedrockPitcherCropProperties = Required<PitcherCropStates>;
export class PitcherCropTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaPitcherCropProperties): BedrockBlock<BedrockPitcherCropProperties> {
        const state: BedrockPitcherCropProperties = {};
        // implement
        return { name: id, properties: state };
    }
}