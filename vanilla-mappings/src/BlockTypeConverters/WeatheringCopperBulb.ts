import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CopperBulbStates } from "@minecraft/vanilla-data";
export interface JavaWeatheringCopperBulbProperties {
    lit: "true" | "false";
    powered: "true" | "false";
}
export type BedrockWeatheringCopperBulbProperties = Required<CopperBulbStates>;
export class WeatheringCopperBulbTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaWeatheringCopperBulbProperties): BedrockBlock<BedrockWeatheringCopperBulbProperties> {
        const state: BedrockWeatheringCopperBulbProperties = {};
        // implement
        return { name: id, properties: state };
    }
}