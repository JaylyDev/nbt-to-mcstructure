import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CreakingHeartStates } from "@minecraft/vanilla-data";
export interface JavaCreakingHeartProperties {
    active: "true" | "false";
    axis: "x" | "y" | "z";
    natural: "true" | "false";
}
export type BedrockCreakingHeartProperties = Required<CreakingHeartStates>;
export class CreakingHeartTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCreakingHeartProperties): BedrockBlock<BedrockCreakingHeartProperties> {
        const state: BedrockCreakingHeartProperties = {};
        // implement
        return { name: id, properties: state };
    }
}