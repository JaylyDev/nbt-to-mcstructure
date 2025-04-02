import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { DecoratedPotStates } from "@minecraft/vanilla-data";
export interface JavaDecoratedPotProperties {
    cracked: "true" | "false";
    facing: "north" | "south" | "west" | "east";
    waterlogged: "true" | "false";
}
export type BedrockDecoratedPotProperties = Required<DecoratedPotStates>;
export class DecoratedPotTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaDecoratedPotProperties): BedrockBlock<BedrockDecoratedPotProperties> {
        const state: BedrockDecoratedPotProperties = {};
        // implement
        return { name: id, properties: state };
    }
}