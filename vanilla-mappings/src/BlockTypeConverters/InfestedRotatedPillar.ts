import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { InfestedDeepslateStates } from "@minecraft/vanilla-data";
export interface JavaInfestedRotatedPillarProperties {
    axis: "x" | "y" | "z";
}
export type BedrockInfestedRotatedPillarProperties = Required<InfestedDeepslateStates>;
export class InfestedRotatedPillarTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaInfestedRotatedPillarProperties): BedrockBlock<BedrockInfestedRotatedPillarProperties> {
        const state: BedrockInfestedRotatedPillarProperties = {};
        // implement
        return { name: id, properties: state };
    }
}