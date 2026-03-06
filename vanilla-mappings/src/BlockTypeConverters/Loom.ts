import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { LoomStates } from "@minecraft/vanilla-data";
export interface JavaLoomProperties {
    facing: "north" | "south" | "west" | "east";
}
export type BedrockLoomProperties = Required<LoomStates>;
export class LoomTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaLoomProperties): BedrockBlock<BedrockLoomProperties> {
        const state: BedrockLoomProperties = {};
        // implement
        return { name: id, properties: state };
    }
}