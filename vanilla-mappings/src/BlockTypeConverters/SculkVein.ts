import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { SculkVeinStates } from "@minecraft/vanilla-data";
export interface JavaSculkVeinProperties {
    down: "true" | "false";
    east: "true" | "false";
    north: "true" | "false";
    south: "true" | "false";
    up: "true" | "false";
    waterlogged: "true" | "false";
    west: "true" | "false";
}
export type BedrockSculkVeinProperties = Required<SculkVeinStates>;
export class SculkVeinTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaSculkVeinProperties): BedrockBlock<BedrockSculkVeinProperties> {
        const state: BedrockSculkVeinProperties = {};
        // implement
        return { name: id, properties: state };
    }
}