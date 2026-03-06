import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CocoaStates } from "@minecraft/vanilla-data";
export interface JavaCocoaProperties {
    age: "0" | "1" | "2";
    facing: "north" | "south" | "west" | "east";
}
export type BedrockCocoaProperties = Required<CocoaStates>;
export class CocoaTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCocoaProperties): BedrockBlock<BedrockCocoaProperties> {
        const state: BedrockCocoaProperties = {
            age: 0,
            direction: 0,
        };
        switch (properties.age) {
            case "0":
                state.age = 0;
                break;
            case "1":
                state.age = 1;
                break;
            case "2":
                state.age = 2;
                break;
        }
        switch (properties.facing) {
            case "north":
                state.direction = 2;
                break;
            case "south":
                state.direction = 0;
                break;
            case "west":
                state.direction = 1;
                break;
            case "east":
                state.direction = 3;
                break;
        }
        // implement
        return { name: id, properties: state };
    }
}
