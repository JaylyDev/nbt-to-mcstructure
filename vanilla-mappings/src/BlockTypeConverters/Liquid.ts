import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { LavaStates } from "@minecraft/vanilla-data";
export interface JavaLiquidProperties {
    level: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15";
}
export type BedrockLiquidProperties = Required<LavaStates>;
export class LiquidTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaLiquidProperties): BedrockBlock<BedrockLiquidProperties> {
        const state: BedrockLiquidProperties = {};
        // implement
        return { name: id, properties: state };
    }
}