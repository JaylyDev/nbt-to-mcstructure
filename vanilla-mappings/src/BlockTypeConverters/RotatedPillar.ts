import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { AcaciaLogStates } from "@minecraft/vanilla-data";

export interface JavaRotatedPillarProperties {
    axis: "x" | "y" | "z";
}

export type BedrockRotatedPillarProperties = Required<AcaciaLogStates>;

export class RotatedPillarTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaRotatedPillarProperties): BedrockBlock<BedrockRotatedPillarProperties> {
        const states: BedrockRotatedPillarProperties = {
            pillar_axis: properties.axis ?? "y",
        };

        return { name: id, properties: states };
    }
}
7;
