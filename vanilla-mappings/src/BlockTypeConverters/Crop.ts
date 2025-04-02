import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { WheatStates } from "@minecraft/vanilla-data";
export interface JavaCropProperties {
    age: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
}
export type BedrockCropProperties = Required<WheatStates>;
export class CropTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCropProperties): BedrockBlock<BedrockCropProperties> {
        const state: BedrockCropProperties = {};
        // implement
        return { name: id, properties: state };
    }
}