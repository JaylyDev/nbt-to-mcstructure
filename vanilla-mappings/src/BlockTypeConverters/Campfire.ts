import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CampfireStates } from "@minecraft/vanilla-data";
export interface JavaCampfireProperties {
    facing: "north" | "south" | "west" | "east";
    lit: "true" | "false";
    signal_fire: "true" | "false";
    waterlogged: "true" | "false";
}
export type BedrockCampfireProperties = Required<CampfireStates>;
export class CampfireTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCampfireProperties): BedrockBlock<BedrockCampfireProperties> {
        const state: BedrockCampfireProperties = {
            "minecraft:cardinal_direction": properties.facing,
            extinguished: false,
        };
        // lit is false if extinguished is true
        if (properties.lit === "false") {
            state.extinguished = true;
        }
        return { name: id, properties: state };
    }
}
