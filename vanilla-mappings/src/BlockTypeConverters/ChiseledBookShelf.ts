import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { ChiseledBookshelfStates } from "@minecraft/vanilla-data";
export interface JavaChiseledBookShelfProperties {
    facing: "north" | "south" | "west" | "east";
    slot_0_occupied: "true" | "false";
    slot_1_occupied: "true" | "false";
    slot_2_occupied: "true" | "false";
    slot_3_occupied: "true" | "false";
    slot_4_occupied: "true" | "false";
    slot_5_occupied: "true" | "false";
}
export type BedrockChiseledBookShelfProperties = Required<ChiseledBookshelfStates>;
export class ChiseledBookShelfTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaChiseledBookShelfProperties): BedrockBlock<BedrockChiseledBookShelfProperties> {
        const state: BedrockChiseledBookShelfProperties = {};
        // implement
        return { name: id, properties: state };
    }
}
