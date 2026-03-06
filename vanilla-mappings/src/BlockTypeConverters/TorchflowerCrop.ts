import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { TorchflowerCropStates } from "@minecraft/vanilla-data";
export interface JavaTorchflowerCropProperties {
    age: "0" | "1";
}
export type BedrockTorchflowerCropProperties = Required<TorchflowerCropStates>;
export class TorchflowerCropTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaTorchflowerCropProperties): BedrockBlock<BedrockTorchflowerCropProperties> {
        const state: BedrockTorchflowerCropProperties = {};
        // implement
        return { name: id, properties: state };
    }
}