import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { MangrovePropaguleStates } from "@minecraft/vanilla-data";
export interface JavaMangrovePropaguleProperties {
    age: "0" | "1" | "2" | "3" | "4";
    hanging: "true" | "false";
    stage: "0" | "1";
    waterlogged: "true" | "false";
}
export type BedrockMangrovePropaguleProperties = Required<MangrovePropaguleStates>;
export class MangrovePropaguleTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaMangrovePropaguleProperties): BedrockBlock<BedrockMangrovePropaguleProperties> {
        const state: BedrockMangrovePropaguleProperties = {};
        // implement
        return { name: id, properties: state };
    }
}