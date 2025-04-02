import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { LightningRodStates } from "@minecraft/vanilla-data";
export interface JavaLightningRodProperties {
    facing: "north" | "east" | "south" | "west" | "up" | "down";
    powered: "true" | "false";
    waterlogged: "true" | "false";
}
export type BedrockLightningRodProperties = Required<LightningRodStates>;
export class LightningRodTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaLightningRodProperties): BedrockBlock<BedrockLightningRodProperties> {
        const state: BedrockLightningRodProperties = {};
        // implement
        return { name: id, properties: state };
    }
}