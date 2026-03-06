import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CactusStates } from "@minecraft/vanilla-data";
export interface JavaCactusProperties {
    age: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15";
}
export type BedrockCactusProperties = Required<CactusStates>;
export class CactusTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCactusProperties): BedrockBlock<BedrockCactusProperties> {
        const state: BedrockCactusProperties = {
            age: parseInt(properties.age),
        };
        // implement
        return { name: id, properties: state };
    }
}
