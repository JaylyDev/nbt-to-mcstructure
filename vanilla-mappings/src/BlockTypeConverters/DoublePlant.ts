import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { LargeFernStates } from "@minecraft/vanilla-data";
export interface JavaDoublePlantProperties {
    half: "upper" | "lower";
}
export type BedrockDoublePlantProperties = Required<LargeFernStates>;
export class DoublePlantTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaDoublePlantProperties): BedrockBlock<BedrockDoublePlantProperties> {
        const state: BedrockDoublePlantProperties = {};
        // implement
        return { name: id, properties: state };
    }
}