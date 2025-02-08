import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { ChorusFlowerStates } from "@minecraft/vanilla-data";
export interface JavaChorusFlowerProperties {
    age: "0" | "1" | "2" | "3" | "4" | "5";
}
export type BedrockChorusFlowerProperties = Required<ChorusFlowerStates>;
export class ChorusFlowerTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaChorusFlowerProperties): BedrockBlock<BedrockChorusFlowerProperties> {
        const state: BedrockChorusFlowerProperties = {};
        // implement
        return { name: id, properties: state };
    }
}