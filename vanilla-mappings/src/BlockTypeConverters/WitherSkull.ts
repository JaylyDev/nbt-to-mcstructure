import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { WitherSkeletonSkullStates } from "@minecraft/vanilla-data";
export interface JavaWitherSkullProperties {
    powered: "true" | "false";
    rotation: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15";
}
export type BedrockWitherSkullProperties = Required<WitherSkeletonSkullStates>;
export class WitherSkullTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaWitherSkullProperties): BedrockBlock<BedrockWitherSkullProperties> {
        const state: BedrockWitherSkullProperties = {};
        // implement
        return { name: id, properties: state };
    }
}