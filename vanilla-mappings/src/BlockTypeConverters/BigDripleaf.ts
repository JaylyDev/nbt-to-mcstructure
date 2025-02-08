import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BigDripleafStates } from "@minecraft/vanilla-data";
export interface JavaBigDripleafProperties {
    facing: "north" | "south" | "west" | "east";
    tilt: "none" | "unstable" | "partial" | "full";
    waterlogged: "true" | "false";
}
export type BedrockBigDripleafProperties = Required<BigDripleafStates>;
export class BigDripleafTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBigDripleafProperties): BedrockBlock<BedrockBigDripleafProperties> {
        const state: BedrockBigDripleafProperties = {
            "minecraft:cardinal_direction": properties.facing,
            big_dripleaf_head: false,
            big_dripleaf_tilt: "",
        };

        if (properties.tilt === "full") {
            state.big_dripleaf_tilt = "full_tilt";
        } else if (properties.tilt === "partial") {
            state.big_dripleaf_tilt = "partial_tilt";
        } else if (properties.tilt === "unstable") {
            state.big_dripleaf_tilt = "unstable";
        } else {
            state.big_dripleaf_tilt = "none";
        }
        state.big_dripleaf_head = true;
        return { name: id, properties: state };
    }
}
