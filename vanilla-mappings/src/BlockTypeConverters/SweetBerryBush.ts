import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { SweetBerryBushStates } from "@minecraft/vanilla-data";
export interface JavaSweetBerryBushProperties {
    age: "0" | "1" | "2" | "3";
}
export type BedrockSweetBerryBushProperties = Required<SweetBerryBushStates>;
export class SweetBerryBushTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaSweetBerryBushProperties): BedrockBlock<BedrockSweetBerryBushProperties> {
        const state: BedrockSweetBerryBushProperties = {};
        // implement
        return { name: id, properties: state };
    }
}