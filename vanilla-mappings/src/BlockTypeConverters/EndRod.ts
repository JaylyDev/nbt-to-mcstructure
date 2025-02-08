import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { EndRodStates } from "@minecraft/vanilla-data";
export interface JavaEndRodProperties {
    facing: "north" | "east" | "south" | "west" | "up" | "down";
}
export type BedrockEndRodProperties = Required<EndRodStates>;
export class EndRodTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaEndRodProperties): BedrockBlock<BedrockEndRodProperties> {
        const state: BedrockEndRodProperties = {};
        // implement
        return { name: id, properties: state };
    }
}