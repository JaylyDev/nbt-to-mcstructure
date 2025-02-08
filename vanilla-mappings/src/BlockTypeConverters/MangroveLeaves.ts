import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { MangroveLeavesStates } from "@minecraft/vanilla-data";
export interface JavaMangroveLeavesProperties {
    distance: "1" | "2" | "3" | "4" | "5" | "6" | "7";
    persistent: "true" | "false";
    waterlogged: "true" | "false";
}
export type BedrockMangroveLeavesProperties = Required<MangroveLeavesStates>;
export class MangroveLeavesTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaMangroveLeavesProperties): BedrockBlock<BedrockMangroveLeavesProperties> {
        const state: BedrockMangroveLeavesProperties = {};
        // implement
        return { name: id, properties: state };
    }
}