import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BrownMushroomBlockStates } from "@minecraft/vanilla-data";
export interface JavaHugeMushroomProperties {
    down: "true" | "false";
    east: "true" | "false";
    north: "true" | "false";
    south: "true" | "false";
    up: "true" | "false";
    west: "true" | "false";
}
export type BedrockHugeMushroomProperties = Required<BrownMushroomBlockStates>;
export class HugeMushroomTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaHugeMushroomProperties): BedrockBlock<BedrockHugeMushroomProperties> {
        const state: BedrockHugeMushroomProperties = {};
        // implement
        return { name: id, properties: state };
    }
}