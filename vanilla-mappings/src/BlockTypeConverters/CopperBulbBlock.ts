import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { WaxedCopperBulbStates } from "@minecraft/vanilla-data";
export interface JavaCopperBulbBlockProperties {
    lit: "true" | "false";
    powered: "true" | "false";
}
export type BedrockCopperBulbBlockProperties = Required<WaxedCopperBulbStates>;
export class CopperBulbBlockTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCopperBulbBlockProperties): BedrockBlock<BedrockCopperBulbBlockProperties> {
        const state: BedrockCopperBulbBlockProperties = {
            lit: false,
            powered_bit: false,
        };
        if (properties.lit === "true") {
            state.lit = true;
        }
        if (properties.powered === "true") {
            state.powered_bit = true;
        }

        // implement
        return { name: id, properties: state };
    }
}
