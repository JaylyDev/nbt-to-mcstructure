import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { OakDoubleSlabStates, OakSlabStates } from "@minecraft/vanilla-data";

export interface JavaSlabProperties {
    type: "top" | "down" | "double";
    waterlogged: string;
}

// vertical_half: bottom (default) or top
export type BedrockSlabProperties = Required<OakSlabStates>;
export type BedrockDoubleSlabProperties = Required<OakDoubleSlabStates>;

export class SlabTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaSlabProperties): BedrockBlock<BedrockSlabProperties | BedrockDoubleSlabProperties> {
        if (properties.type === "double") {
            return {
                name: id.replace("_slab", "_double_slab"),
                properties: {
                    "minecraft:vertical_half": "bottom",
                },
            };
        } else {
            return {
                name: id,
                properties: {
                    "minecraft:vertical_half": properties.type,
                },
            };
        }
    }
}
