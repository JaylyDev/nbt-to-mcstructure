import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { ChestStates } from "@minecraft/vanilla-data";
export interface JavaChestProperties {
    type: "single" | "left" | "right";
    facing: "north" | "south" | "west" | "east";
    waterlogged: "true" | "false";
}
export type BedrockChestProperties = Required<ChestStates>;
export class ChestTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaChestProperties): BedrockBlock<BedrockChestProperties> {
        const state: BedrockChestProperties = {
            "minecraft:cardinal_direction": properties.facing,
        };
        // implement
        return { name: id, properties: state };
    }
}
