import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { SmokerStates } from "@minecraft/vanilla-data";
export interface JavaSmokerProperties {
    facing: "north" | "south" | "west" | "east";
    lit: "true" | "false";
}
export type BedrockSmokerProperties = Required<SmokerStates>;
export class SmokerTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaSmokerProperties): BedrockBlock<BedrockSmokerProperties> {
        const state: BedrockSmokerProperties = {};
        // implement
        return { name: id, properties: state };
    }
}