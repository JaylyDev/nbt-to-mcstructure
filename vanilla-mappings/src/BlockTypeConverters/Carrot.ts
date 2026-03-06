import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CarrotsStates } from "@minecraft/vanilla-data";
export interface JavaCarrotProperties {
    age: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
}
export type BedrockCarrotProperties = Required<CarrotsStates>;
export class CarrotTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCarrotProperties): BedrockBlock<BedrockCarrotProperties> {
        const state: BedrockCarrotProperties = {
            growth: parseInt(properties.age),
        };
        // implement

        return { name: id, properties: state };
    }
}
