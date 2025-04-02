import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BambooStates } from "@minecraft/vanilla-data";

export interface JavaBambooStalkProperties {
    age: string;
    leaves: string;
    stage: string;
}

export type BedrockBambooStalkProperties = Required<BambooStates>;

export class BambooStalkTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBambooStalkProperties): BedrockBlock<BedrockBambooStalkProperties> {
        const states: BedrockBambooStalkProperties = {
            age_bit: false,
            bamboo_leaf_size: "",
            bamboo_stalk_thickness: "",
        };
        if (properties.leaves == "none") {
            states.bamboo_leaf_size = "no_leaves";
        } else if (properties.leaves == "small") {
            states.bamboo_leaf_size = "small_leaves";
        } else if (properties.leaves == "large") {
            states.bamboo_leaf_size = "large_leaves";
        }
        if (properties.stage == "0") {
            states.bamboo_stalk_thickness = "thin";
        } else if (properties.stage == "1") {
            states.bamboo_stalk_thickness = "thick";
        }
        return { name: id, properties: states };
    }
}
