import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { SculkCatalystStates } from "@minecraft/vanilla-data";
export interface JavaSculkCatalystProperties {
    bloom: "true" | "false";
}
export type BedrockSculkCatalystProperties = Required<SculkCatalystStates>;
export class SculkCatalystTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaSculkCatalystProperties): BedrockBlock<BedrockSculkCatalystProperties> {
        const state: BedrockSculkCatalystProperties = {};
        // implement
        return { name: id, properties: state };
    }
}