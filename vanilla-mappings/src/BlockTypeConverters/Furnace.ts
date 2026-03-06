import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { FurnaceStates } from "@minecraft/vanilla-data";
export interface JavaFurnaceProperties {
    facing: "north" | "south" | "west" | "east";
    lit: "true" | "false";
}
export type BedrockFurnaceProperties = Required<FurnaceStates>;
export class FurnaceTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaFurnaceProperties): BedrockBlock<BedrockFurnaceProperties> {
        const state: BedrockFurnaceProperties = {
            "minecraft:cardinal_direction": properties.facing,
        };
        // implement
        return { name: id, properties: state };
    }
}
