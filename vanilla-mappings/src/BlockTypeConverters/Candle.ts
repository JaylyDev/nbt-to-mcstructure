import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BlackCandleStates } from "@minecraft/vanilla-data";
export interface JavaCandleProperties {
    candles: "1" | "2" | "3" | "4";
    lit: "true" | "false";
    waterlogged: "true" | "false";
}
export type BedrockCandleProperties = Required<BlackCandleStates>;
export class CandleTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCandleProperties): BedrockBlock<BedrockCandleProperties> {
        const state: BedrockCandleProperties = {
            candles: parseInt(properties.candles) - 1,
            lit: false,
        };
        // lit is false if candles is 0
        if (properties.lit === "true") {
            state.lit = true;
        }
        // implement
        return { name: id, properties: state };
    }
}
