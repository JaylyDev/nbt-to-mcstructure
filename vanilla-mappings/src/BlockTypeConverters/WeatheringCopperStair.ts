import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CutCopperStairsStates } from "@minecraft/vanilla-data";
export interface JavaWeatheringCopperStairProperties {
    facing: "north" | "south" | "west" | "east";
    half: "top" | "bottom";
    shape: "straight" | "inner_left" | "inner_right" | "outer_left" | "outer_right";
    waterlogged: "true" | "false";
}
export type BedrockWeatheringCopperStairProperties = Required<CutCopperStairsStates>;
export class WeatheringCopperStairTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaWeatheringCopperStairProperties): BedrockBlock<BedrockWeatheringCopperStairProperties> {
        const state: BedrockWeatheringCopperStairProperties = {};
        // implement
        return { name: id, properties: state };
    }
}