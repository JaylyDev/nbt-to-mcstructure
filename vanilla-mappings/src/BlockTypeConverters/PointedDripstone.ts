import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { PointedDripstoneStates } from "@minecraft/vanilla-data";
export interface JavaPointedDripstoneProperties {
    thickness: "tip_merge" | "tip" | "frustum" | "middle" | "base";
    vertical_direction: "up" | "down";
    waterlogged: "true" | "false";
}
export type BedrockPointedDripstoneProperties = Required<PointedDripstoneStates>;
export class PointedDripstoneTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaPointedDripstoneProperties): BedrockBlock<BedrockPointedDripstoneProperties> {
        const state: BedrockPointedDripstoneProperties = {};
        // implement
        return { name: id, properties: state };
    }
}