import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { EnderChestStates } from "@minecraft/vanilla-data";
export interface JavaEnderChestProperties {
    facing: "north" | "south" | "west" | "east";
    waterlogged: "true" | "false";
}
export type BedrockEnderChestProperties = Required<EnderChestStates>;
export class EnderChestTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaEnderChestProperties): BedrockBlock<BedrockEnderChestProperties> {
        const state: BedrockEnderChestProperties = {};
        // implement
        return { name: id, properties: state };
    }
}