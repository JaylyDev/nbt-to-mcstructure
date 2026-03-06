import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { NetherWartStates } from "@minecraft/vanilla-data";
export interface JavaNetherWartProperties {
    age: "0" | "1" | "2" | "3";
}
export type BedrockNetherWartProperties = Required<NetherWartStates>;
export class NetherWartTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaNetherWartProperties): BedrockBlock<BedrockNetherWartProperties> {
        const state: BedrockNetherWartProperties = {};
        // implement
        return { name: id, properties: state };
    }
}