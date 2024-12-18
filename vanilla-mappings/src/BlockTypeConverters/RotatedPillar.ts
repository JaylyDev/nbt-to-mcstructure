import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { AcaciaLogStates } from "@minecraft/vanilla-data";

export interface JavaRotatedPillarProperties {
    axis: "x" | "y" | "z";
}

export type BedrockRotatedPillarProperties = Required<AcaciaLogStates>;

export class RotatedPillarTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaRotatedPillarProperties): BedrockBlock<BedrockRotatedPillarProperties> {
        const states: BedrockRotatedPillarProperties = {
            pillar_axis: "y",
        };
        switch (properties.axis) {
            case "x":
                states.pillar_axis = "x";
                break;
            case "y":
                states.pillar_axis = "y";
                break;
            case "z":
                states.pillar_axis = "z";
                break;
            default:
                break;
        }

        return { name: id, properties: states };
    }
}
7