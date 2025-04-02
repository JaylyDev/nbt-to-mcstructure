import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BrewingStandStates } from "@minecraft/vanilla-data";
export interface JavaBrewingStandProperties {
    has_bottle_0: "true" | "false";
    has_bottle_1: "true" | "false";
    has_bottle_2: "true" | "false";
}
export type BedrockBrewingStandProperties = Required<BrewingStandStates>;
export class BrewingStandTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBrewingStandProperties): BedrockBlock<BedrockBrewingStandProperties> {
        const state: BedrockBrewingStandProperties = {
            brewing_stand_slot_a_bit: false,
            brewing_stand_slot_b_bit: false,
            brewing_stand_slot_c_bit: false,
        };
        if (properties.has_bottle_0 === "true") {
            state.brewing_stand_slot_a_bit = true;
        }
        if (properties.has_bottle_1 === "true") {
            state.brewing_stand_slot_b_bit = true;
        }
        if (properties.has_bottle_2 === "true") {
            state.brewing_stand_slot_c_bit = true;
        }
        // implement
        return { name: id, properties: state };
    }
}
