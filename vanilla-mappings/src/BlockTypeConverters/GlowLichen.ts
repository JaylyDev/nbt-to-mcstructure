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
        const state: BedrockGlowLichenProperties = {
            multi_face_direction_bits: 0,
        };
        // east = 32
        // north = 16
        // west = 8
        // south = 4
        // up = 2
        // down = 1
        if (properties.east === "true") {
            state.multi_face_direction_bits += 32;
        }
        if (properties.north === "true") {
            state.multi_face_direction_bits += 16;
        }
        if (properties.west === "true") {
            state.multi_face_direction_bits += 8;
        }
        if (properties.south === "true") {
            state.multi_face_direction_bits += 4;
        }
        if (properties.up === "true") {
            state.multi_face_direction_bits += 2;
        }
        if (properties.down === "true") {
            state.multi_face_direction_bits += 1;
        }
        return { name: id, properties: state };
    }
}
