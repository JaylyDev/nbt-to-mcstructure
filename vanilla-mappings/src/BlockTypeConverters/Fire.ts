import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { FireStates } from "@minecraft/vanilla-data";
export interface JavaFireProperties {
    age: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15";
    east: "true" | "false";
    north: "true" | "false";
    south: "true" | "false";
    up: "true" | "false";
    west: "true" | "false";
}
export type BedrockFireProperties = Required<FireStates>;
export class FireTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaFireProperties): BedrockBlock<BedrockFireProperties> {
        const state: BedrockFireProperties = {};
        // implement
        return { name: id, properties: state };
    }
}