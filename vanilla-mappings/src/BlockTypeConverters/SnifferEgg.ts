import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { SnifferEggStates } from "@minecraft/vanilla-data";
export interface JavaSnifferEggProperties {
    hatch: "0" | "1" | "2";
}
export type BedrockSnifferEggProperties = Required<SnifferEggStates>;
export class SnifferEggTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaSnifferEggProperties): BedrockBlock<BedrockSnifferEggProperties> {
        const state: BedrockSnifferEggProperties = {};
        // implement
        return { name: id, properties: state };
    }
}