import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { ChorusFlowerStates } from "@minecraft/vanilla-data";
export interface JavaChorusFlowerProperties {
    age: "0" | "1" | "2" | "3" | "4" | "5";
}
export type BedrockChorusFlowerProperties = Required<ChorusFlowerStates>;
export class ChorusFlowerTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaChorusFlowerProperties): BedrockBlock<BedrockChorusFlowerProperties> {
        const state: BedrockChorusFlowerProperties = {
            age: 0,
        };
        switch (properties.age) {
            case "0":
                state.age = 0;
                break;
            case "1":
                state.age = 1;
                break;
            case "2":
                state.age = 2;
                break;
            case "3":
                state.age = 3;
                break;
            case "4":
                state.age = 4;
                break;
            case "5":
                state.age = 5;
                break;
        }
        // implement
        return { name: id, properties: state };
    }
}
