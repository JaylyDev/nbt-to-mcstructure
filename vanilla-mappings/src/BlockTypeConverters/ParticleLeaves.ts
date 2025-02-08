import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CherryLeavesStates } from "@minecraft/vanilla-data";
export interface JavaParticleLeavesProperties {
    distance: "1" | "2" | "3" | "4" | "5" | "6" | "7";
    persistent: "true" | "false";
    waterlogged: "true" | "false";
}
export type BedrockParticleLeavesProperties = Required<CherryLeavesStates>;
export class ParticleLeavesTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaParticleLeavesProperties): BedrockBlock<BedrockParticleLeavesProperties> {
        const state: BedrockParticleLeavesProperties = {};
        // implement
        return { name: id, properties: state };
    }
}