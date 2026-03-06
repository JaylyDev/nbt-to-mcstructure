import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { RedstoneTorchStates } from "@minecraft/vanilla-data";
export interface JavaRedstoneTorchProperties {
    lit: "true" | "false";
}
export type BedrockRedstoneTorchProperties = Required<RedstoneTorchStates>;
export class RedstoneTorchTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaRedstoneTorchProperties): BedrockBlock<BedrockRedstoneTorchProperties> {
        const state: BedrockRedstoneTorchProperties = {};
        // implement
        return { name: id, properties: state };
    }
}