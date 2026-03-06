import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { PaleMossCarpetStates } from "@minecraft/vanilla-data";
export interface JavaMossyCarpetProperties {
    bottom: "true" | "false";
    east: "none" | "low" | "tall";
    north: "none" | "low" | "tall";
    south: "none" | "low" | "tall";
    west: "none" | "low" | "tall";
}
export type BedrockMossyCarpetProperties = Required<PaleMossCarpetStates>;
export class MossyCarpetTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaMossyCarpetProperties): BedrockBlock<BedrockMossyCarpetProperties> {
        const state: BedrockMossyCarpetProperties = {};
        // implement
        return { name: id, properties: state };
    }
}