import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { LanternStates } from "@minecraft/vanilla-data";
export interface JavaLanternProperties {
    hanging: "true" | "false";
    waterlogged: "true" | "false";
}
export type BedrockLanternProperties = Required<LanternStates>;
export class LanternTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaLanternProperties): BedrockBlock<BedrockLanternProperties> {
        const state: BedrockLanternProperties = {};
        // implement
        return { name: id, properties: state };
    }
}