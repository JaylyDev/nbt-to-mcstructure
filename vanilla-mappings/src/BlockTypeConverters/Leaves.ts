import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { AcaciaLeavesStates } from "@minecraft/vanilla-data";

export interface JavaLeavesProperties {
    distance: "1" | "2" | "3" | "4" | "5" | "6" | "7";
    persistent: "true" | "false";
    waterlogged: "true" | "false";
}

export type BedrockLeavesProperties = Required<AcaciaLeavesStates>;

export class LeavesTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaLeavesProperties): BedrockBlock<BedrockLeavesProperties> {
        const { distance, persistent, waterlogged } = properties;
        const states: BedrockLeavesProperties = {
            persistent_bit: false,
            update_bit: false,
        };
        switch (persistent) {
            case "true":
                states.persistent_bit = true;
                break;

            default:
                break;
        }

        if (id === "minecraft:flowering_azalea_leaves") {
            return {
                name: "minecraft:flowering_azalea",
                properties: states,
            };
        }
        return { name: id, properties: states };
    }
}
