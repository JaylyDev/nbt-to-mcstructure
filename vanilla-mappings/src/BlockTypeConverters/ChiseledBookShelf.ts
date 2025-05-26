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
        const state: BedrockChiseledBookShelfProperties = {
            books_stored: 0,
            direction: 0,
        };

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

        // 1, 2, 4, 8, 16, 32
        if (properties.slot_0_occupied === "true") {
            state.books_stored += 2 ** 0;
        }
        if (properties.slot_1_occupied === "true") {
            state.books_stored += 2 ** 1;
        }
        if (properties.slot_2_occupied === "true") {
            state.books_stored += 2 ** 2;
        }
        if (properties.slot_3_occupied === "true") {
            state.books_stored += 2 ** 3;
        }
        if (properties.slot_4_occupied === "true") {
            state.books_stored += 2 ** 4;
        }
        if (properties.slot_5_occupied === "true") {
            state.books_stored += 2 ** 5;
        }

        // implement
        return { name: id, properties: state };
    }
}
