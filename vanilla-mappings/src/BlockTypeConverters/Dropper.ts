import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { DropperStates } from "@minecraft/vanilla-data";
export interface JavaDropperProperties {
    facing: "north" | "east" | "south" | "west" | "up" | "down";
    triggered: "true" | "false";
}
export type BedrockDropperProperties = Required<DropperStates>;
export class DropperTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaDropperProperties): BedrockBlock<BedrockDropperProperties> {
        const state: BedrockDropperProperties = {};
        // implement
        return { name: id, properties: state };
    }
}