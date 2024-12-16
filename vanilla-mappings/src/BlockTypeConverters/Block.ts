import { BlockTypeConverterBase } from "./BaseClass";

export interface JavaBlockProperties {}

export type BedrockBlockProperties = {};

export class BlockTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBlockProperties): BedrockBlockProperties {
        return {};
    }
}
