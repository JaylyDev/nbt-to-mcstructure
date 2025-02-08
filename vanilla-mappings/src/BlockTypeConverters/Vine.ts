import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { VineStates } from "@minecraft/vanilla-data";
export interface JavaVineProperties {
    east: "true" | "false";
    north: "true" | "false";
    south: "true" | "false";
    up: "true" | "false";
    west: "true" | "false";
}
export type BedrockVineProperties = Required<VineStates>;
export class VineTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaVineProperties): BedrockBlock<BedrockVineProperties> {
        const state: BedrockVineProperties = {};
        // implement
        return { name: id, properties: state };
    }
}