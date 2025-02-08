import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { WaxedCopperBulbStates } from "@minecraft/vanilla-data";
export interface JavaCopperBulbBlockProperties {
    lit: "true" | "false";
    powered: "true" | "false";
}
export type BedrockCopperBulbBlockProperties = Required<WaxedCopperBulbStates>;
export class CopperBulbBlockTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCopperBulbBlockProperties): BedrockBlock<BedrockCopperBulbBlockProperties> {
        const state: BedrockCopperBulbBlockProperties = {};
        // implement
        return { name: id, properties: state };
    }
}