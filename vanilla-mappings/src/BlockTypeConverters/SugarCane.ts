import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaSugarCaneProperties {
    age: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15";
}
export type BedrockSugarCaneProperties = Required<object>;
export class SugarCaneTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaSugarCaneProperties): BedrockBlock<BedrockSugarCaneProperties> {
        const state: BedrockSugarCaneProperties = {};
        // implement
        return { name: id, properties: state };
    }
}