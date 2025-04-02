import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { SuspiciousGravelStates } from "@minecraft/vanilla-data";
export interface JavaBrushableProperties {
    dusted: "0" | "1" | "2" | "3";
}
export type BedrockBrushableProperties = Required<SuspiciousGravelStates>;
export class BrushableTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBrushableProperties): BedrockBlock<BedrockBrushableProperties> {
        const state: BedrockBrushableProperties = {
            brushed_progress: parseInt(properties.dusted),
            hanging: false,
        };
        // implement
        return { name: id, properties: state };
    }
}
