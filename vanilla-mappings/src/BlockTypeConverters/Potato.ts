import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { PotatoesStates } from "@minecraft/vanilla-data";
export interface JavaPotatoProperties {
    age: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
}
export type BedrockPotatoProperties = Required<PotatoesStates>;
export class PotatoTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaPotatoProperties): BedrockBlock<BedrockPotatoProperties> {
        const state: BedrockPotatoProperties = {};
        // implement
        return { name: id, properties: state };
    }
}