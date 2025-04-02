import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { GlowLichenStates } from "@minecraft/vanilla-data";
export interface JavaGlowLichenProperties {
    down: "true" | "false";
    east: "true" | "false";
    north: "true" | "false";
    south: "true" | "false";
    up: "true" | "false";
    waterlogged: "true" | "false";
    west: "true" | "false";
}
export type BedrockGlowLichenProperties = Required<GlowLichenStates>;
export class GlowLichenTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaGlowLichenProperties): BedrockBlock<BedrockGlowLichenProperties> {
        const state: BedrockGlowLichenProperties = {};
        // implement
        return { name: id, properties: state };
    }
}