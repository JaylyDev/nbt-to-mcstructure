import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { ComposterStates } from "@minecraft/vanilla-data";
export interface JavaComposterProperties {
    level: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
}
export type BedrockComposterProperties = Required<ComposterStates>;
export class ComposterTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaComposterProperties): BedrockBlock<BedrockComposterProperties> {
        const state: BedrockComposterProperties = {};
        // implement
        return { name: id, properties: state };
    }
}