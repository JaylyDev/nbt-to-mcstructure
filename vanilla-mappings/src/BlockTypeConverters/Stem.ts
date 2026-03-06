import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { MelonStemStates } from "@minecraft/vanilla-data";
export interface JavaStemProperties {
    age: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
}
export type BedrockStemProperties = Required<MelonStemStates>;
export class StemTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaStemProperties): BedrockBlock<BedrockStemProperties> {
        const state: BedrockStemProperties = {};
        // implement
        return { name: id, properties: state };
    }
}