import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { ObserverStates } from "@minecraft/vanilla-data";
export interface JavaObserverProperties {
    facing: "north" | "east" | "south" | "west" | "up" | "down";
    powered: "true" | "false";
}
export type BedrockObserverProperties = Required<ObserverStates>;
export class ObserverTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaObserverProperties): BedrockBlock<BedrockObserverProperties> {
        const state: BedrockObserverProperties = {};
        // implement
        return { name: id, properties: state };
    }
}