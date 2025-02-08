import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { HopperStates } from "@minecraft/vanilla-data";
export interface JavaHopperProperties {
    enabled: "true" | "false";
    facing: "down" | "north" | "south" | "west" | "east";
}
export type BedrockHopperProperties = Required<HopperStates>;
export class HopperTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaHopperProperties): BedrockBlock<BedrockHopperProperties> {
        const state: BedrockHopperProperties = {};
        // implement
        return { name: id, properties: state };
    }
}