import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { ChainCommandBlockStates } from "@minecraft/vanilla-data";
export interface JavaCommandProperties {
    conditional: "true" | "false";
    facing: "north" | "east" | "south" | "west" | "up" | "down";
}
export type BedrockCommandProperties = Required<ChainCommandBlockStates>;
export class CommandTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCommandProperties): BedrockBlock<BedrockCommandProperties> {
        const state: BedrockCommandProperties = {};
        // implement
        return { name: id, properties: state };
    }
}