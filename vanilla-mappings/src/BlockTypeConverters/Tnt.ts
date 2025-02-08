import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { TntStates } from "@minecraft/vanilla-data";
export interface JavaTntProperties {
    unstable: "true" | "false";
}
export type BedrockTntProperties = Required<TntStates>;
export class TntTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaTntProperties): BedrockBlock<BedrockTntProperties> {
        const state: BedrockTntProperties = {};
        // implement
        return { name: id, properties: state };
    }
}