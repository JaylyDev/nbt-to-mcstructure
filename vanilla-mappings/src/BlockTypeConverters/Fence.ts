import { BlockTypeConverterBase } from "./BaseClass";

export interface JavaFenceProperties {
    east: string; // true, false
    north: string; // true, false
    south: string; // true, false
    waterlogged: string; // true, false
    west: string; // true, false
}

export type BedrockFenceProperties = {};

export class FenceTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaFenceProperties): BedrockFenceProperties {
        return {};
    }
}
