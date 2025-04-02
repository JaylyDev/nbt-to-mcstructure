import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { FrostedIceStates } from "@minecraft/vanilla-data";
export interface JavaFrostedIceProperties {
    age: "0" | "1" | "2" | "3";
}
export type BedrockFrostedIceProperties = Required<FrostedIceStates>;
export class FrostedIceTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaFrostedIceProperties): BedrockBlock<BedrockFrostedIceProperties> {
        const state: BedrockFrostedIceProperties = {};
        // implement
        return { name: id, properties: state };
    }
}