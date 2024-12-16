import { BlockTypeConverterBase } from "./BaseClass";

export interface JavaAirProperties {}

export type BedrockAirProperties = {};

export class AirTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaAirProperties): BedrockAirProperties {
        return {};
    }
}
