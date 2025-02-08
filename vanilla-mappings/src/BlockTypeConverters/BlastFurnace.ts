import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BlastFurnaceStates } from "@minecraft/vanilla-data";
export interface JavaBlastFurnaceProperties {
    facing: "north" | "south" | "west" | "east";
    lit: "true" | "false";
}
export type BedrockBlastFurnaceProperties = Required<BlastFurnaceStates>;
export class BlastFurnaceTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBlastFurnaceProperties): BedrockBlock<BedrockBlastFurnaceProperties> {
        const state: BedrockBlastFurnaceProperties = {
            "minecraft:cardinal_direction": properties.facing,
        };
        // implement
        return { name: id, properties: state };
    }
}
