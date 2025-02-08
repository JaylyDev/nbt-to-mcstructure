import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { LecternStates } from "@minecraft/vanilla-data";
export interface JavaLecternProperties {
    facing: "north" | "south" | "west" | "east";
    has_book: "true" | "false";
    powered: "true" | "false";
}
export type BedrockLecternProperties = Required<LecternStates>;
export class LecternTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaLecternProperties): BedrockBlock<BedrockLecternProperties> {
        const state: BedrockLecternProperties = {};
        // implement
        return { name: id, properties: state };
    }
}