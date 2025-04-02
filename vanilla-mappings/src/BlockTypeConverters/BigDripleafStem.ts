import { BigDripleafStates } from "@minecraft/vanilla-data";
import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaBigDripleafStemProperties {
    facing: "north" | "south" | "west" | "east";
    waterlogged: "true" | "false";
}
export type BedrockBigDripleafStemProperties = Required<BigDripleafStates>;
export class BigDripleafStemTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBigDripleafStemProperties): BedrockBlock<BedrockBigDripleafStemProperties> {
        const state: BedrockBigDripleafStemProperties = {
            big_dripleaf_head: false,
            big_dripleaf_tilt: "",
            "minecraft:cardinal_direction": "",
        };
        // implement
        state.big_dripleaf_tilt = "none";
        state.big_dripleaf_head = false;
        state["minecraft:cardinal_direction"] = properties.facing;
        return { name: "minecraft:big_dripleaf", properties: state };
    }
}
