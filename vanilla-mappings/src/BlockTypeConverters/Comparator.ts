import { PoweredComparatorStates, UnpoweredComparatorStates } from "@minecraft/vanilla-data";
import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaComparatorProperties {
    facing: "north" | "south" | "west" | "east";
    mode: "compare" | "subtract";
    powered: "true" | "false";
}
export type BedrockComparatorProperties = Required<PoweredComparatorStates | UnpoweredComparatorStates>;
export class ComparatorTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaComparatorProperties): BedrockBlock<BedrockComparatorProperties> {
        const state: BedrockComparatorProperties = {
            "minecraft:cardinal_direction": properties.facing,
            output_lit_bit: false,
            output_subtract_bit: false,
        };
        if (properties.powered === "true") {
            state.output_lit_bit = true;
        }
        if (properties.mode === "subtract") {
            state.output_subtract_bit = true;
        }
        // implement
        return { name: id, properties: state };
    }
}
