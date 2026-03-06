import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { SculkShriekerStates } from "@minecraft/vanilla-data";
export interface JavaSculkShriekerProperties {
    can_summon: "true" | "false";
    shrieking: "true" | "false";
    waterlogged: "true" | "false";
}
export type BedrockSculkShriekerProperties = Required<SculkShriekerStates>;
export class SculkShriekerTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaSculkShriekerProperties): BedrockBlock<BedrockSculkShriekerProperties> {
        const state: BedrockSculkShriekerProperties = {};
        // implement
        return { name: id, properties: state };
    }
}