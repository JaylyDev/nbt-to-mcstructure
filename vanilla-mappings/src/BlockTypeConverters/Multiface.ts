import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { ResinClumpStates } from "@minecraft/vanilla-data";
export interface JavaMultifaceProperties {
    down: "true" | "false";
    east: "true" | "false";
    north: "true" | "false";
    south: "true" | "false";
    up: "true" | "false";
    waterlogged: "true" | "false";
    west: "true" | "false";
}
export type BedrockMultifaceProperties = Required<ResinClumpStates>;
export class MultifaceTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaMultifaceProperties): BedrockBlock<BedrockMultifaceProperties> {
        const state: BedrockMultifaceProperties = {};
        // implement
        return { name: id, properties: state };
    }
}