import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CopperDoorStates } from "@minecraft/vanilla-data";
export interface JavaWeatheringCopperDoorProperties {
    facing: "north" | "south" | "west" | "east";
    half: "upper" | "lower";
    hinge: "left" | "right";
    open: "true" | "false";
    powered: "true" | "false";
}
export type BedrockWeatheringCopperDoorProperties = Required<CopperDoorStates>;
export class WeatheringCopperDoorTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaWeatheringCopperDoorProperties): BedrockBlock<BedrockWeatheringCopperDoorProperties> {
        const state: BedrockWeatheringCopperDoorProperties = {};
        // implement
        return { name: id, properties: state };
    }
}