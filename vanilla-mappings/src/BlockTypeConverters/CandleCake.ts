import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BlackCandleCakeStates } from "@minecraft/vanilla-data";
export interface JavaCandleCakeProperties {
    lit: "true" | "false";
}
export type BedrockCandleCakeProperties = Required<BlackCandleCakeStates>;
export class CandleCakeTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCandleCakeProperties): BedrockBlock<BedrockCandleCakeProperties> {
        const state: BedrockCandleCakeProperties = {
            lit: false,
        };
        // implement
        if (properties.lit === "true") {
            state.lit = true;
        }
        return { name: id, properties: state };
    }
}
