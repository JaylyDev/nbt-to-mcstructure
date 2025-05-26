import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { LargeFernStates } from "@minecraft/vanilla-data";
export interface JavaDoublePlantProperties {
    half: "upper" | "lower";
}
export type BedrockDoublePlantProperties = Required<LargeFernStates>;
export class DoublePlantTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaDoublePlantProperties): BedrockBlock<BedrockDoublePlantProperties> {
        const state: BedrockDoublePlantProperties = {
            upper_block_bit: false,
        };
        if (properties.half === "upper") state.upper_block_bit = true;
        // implement
        return { name: id, properties: state };
    }
}
