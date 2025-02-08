import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CrafterStates } from "@minecraft/vanilla-data";
export interface JavaCrafterProperties {
    crafting: "true" | "false";
    orientation: "down_east" | "down_north" | "down_south" | "down_west" | "up_east" | "up_north" | "up_south" | "up_west" | "west_up" | "east_up" | "north_up" | "south_up";
    triggered: "true" | "false";
}
export type BedrockCrafterProperties = Required<CrafterStates>;
export class CrafterTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCrafterProperties): BedrockBlock<BedrockCrafterProperties> {
        const state: BedrockCrafterProperties = {};
        // implement
        return { name: id, properties: state };
    }
}