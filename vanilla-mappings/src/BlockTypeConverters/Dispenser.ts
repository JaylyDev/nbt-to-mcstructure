import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { DispenserStates } from "@minecraft/vanilla-data";
export interface JavaDispenserProperties {
    facing: "north" | "east" | "south" | "west" | "up" | "down";
    triggered: "true" | "false";
}
export type BedrockDispenserProperties = Required<DispenserStates>;
export class DispenserTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaDispenserProperties): BedrockBlock<BedrockDispenserProperties> {
        const state: BedrockDispenserProperties = {};
        // implement
        return { name: id, properties: state };
    }
}