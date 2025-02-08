import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { GrindstoneStates } from "@minecraft/vanilla-data";
export interface JavaGrindstoneProperties {
    face: "floor" | "wall" | "ceiling";
    facing: "north" | "south" | "west" | "east";
}
export type BedrockGrindstoneProperties = Required<GrindstoneStates>;
export class GrindstoneTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaGrindstoneProperties): BedrockBlock<BedrockGrindstoneProperties> {
        const state: BedrockGrindstoneProperties = {};
        // implement
        return { name: id, properties: state };
    }
}