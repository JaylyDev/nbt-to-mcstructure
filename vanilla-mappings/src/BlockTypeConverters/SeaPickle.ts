import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { SeaPickleStates } from "@minecraft/vanilla-data";
export interface JavaSeaPickleProperties {
    pickles: "1" | "2" | "3" | "4";
    waterlogged: "true" | "false";
}
export type BedrockSeaPickleProperties = Required<SeaPickleStates>;
export class SeaPickleTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaSeaPickleProperties): BedrockBlock<BedrockSeaPickleProperties> {
        const state: BedrockSeaPickleProperties = {};
        // implement
        return { name: id, properties: state };
    }
}