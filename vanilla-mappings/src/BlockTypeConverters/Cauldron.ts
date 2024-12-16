import { BlockTypeConverterBase } from "./BaseClass";

export interface JavaCauldronProperties {}

export type BedrockCauldronProperties = {};

export class CauldronTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCauldronProperties): BedrockCauldronProperties {
        return {};
    }
}
