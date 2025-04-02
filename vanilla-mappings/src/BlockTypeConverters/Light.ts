import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaLightProperties {
    level: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15";
    waterlogged: "true" | "false";
}
export type BedrockLightProperties = Required<object>;
export class LightTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaLightProperties): BedrockBlock<BedrockLightProperties> {
        const state: BedrockLightProperties = {};
        // implement
        return { name: id, properties: state };
    }
}