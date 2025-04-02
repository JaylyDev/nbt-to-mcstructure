import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CopperTrapdoorStates } from "@minecraft/vanilla-data";
export interface JavaWeatheringCopperTrapDoorProperties {
    facing: "north" | "south" | "west" | "east";
    half: "top" | "bottom";
    open: "true" | "false";
    powered: "true" | "false";
    waterlogged: "true" | "false";
}
export type BedrockWeatheringCopperTrapDoorProperties = Required<CopperTrapdoorStates>;
export class WeatheringCopperTrapDoorTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaWeatheringCopperTrapDoorProperties): BedrockBlock<BedrockWeatheringCopperTrapDoorProperties> {
        const state: BedrockWeatheringCopperTrapDoorProperties = {};
        // implement
        return { name: id, properties: state };
    }
}