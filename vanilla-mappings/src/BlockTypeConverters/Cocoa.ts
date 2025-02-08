import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CocoaStates } from "@minecraft/vanilla-data";
export interface JavaCocoaProperties {
    age: "0" | "1" | "2";
    facing: "north" | "south" | "west" | "east";
}
export type BedrockCocoaProperties = Required<CocoaStates>;
export class CocoaTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCocoaProperties): BedrockBlock<BedrockCocoaProperties> {
        const state: BedrockCocoaProperties = {};
        // implement
        return { name: id, properties: state };
    }
}