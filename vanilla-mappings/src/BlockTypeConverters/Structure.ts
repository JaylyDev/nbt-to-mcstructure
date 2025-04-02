import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { StructureBlockStates } from "@minecraft/vanilla-data";
export interface JavaStructureProperties {
    mode: "save" | "load" | "corner" | "data";
}
export type BedrockStructureProperties = Required<StructureBlockStates>;
export class StructureTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaStructureProperties): BedrockBlock<BedrockStructureProperties> {
        const state: BedrockStructureProperties = {};
        // implement
        return { name: id, properties: state };
    }
}