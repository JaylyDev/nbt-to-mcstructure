import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BubbleColumnStates } from "@minecraft/vanilla-data";
export interface JavaBubbleColumnProperties {
    drag: "true" | "false";
}
export type BedrockBubbleColumnProperties = Required<BubbleColumnStates>;
export class BubbleColumnTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBubbleColumnProperties): BedrockBlock<BedrockBubbleColumnProperties> {
        const state: BedrockBubbleColumnProperties = {
            drag_down: false,
        };
        // implement
        if (properties.drag === "true") {
            state.drag_down = true;
        }
        return { name: id, properties: state };
    }
}
