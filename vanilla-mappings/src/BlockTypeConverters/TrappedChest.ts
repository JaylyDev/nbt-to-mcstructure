import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { TrappedChestStates } from "@minecraft/vanilla-data";
export interface JavaTrappedChestProperties {
    type: "single" | "left" | "right";
    facing: "north" | "south" | "west" | "east";
    waterlogged: "true" | "false";
}
export type BedrockTrappedChestProperties = Required<TrappedChestStates>;
export class TrappedChestTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaTrappedChestProperties): BedrockBlock<BedrockTrappedChestProperties> {
        const state: BedrockTrappedChestProperties = {};
        // implement
        return { name: id, properties: state };
    }
}