import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { JigsawStates } from "@minecraft/vanilla-data";
export interface JavaJigsawProperties {
    orientation: "down_east" | "down_north" | "down_south" | "down_west" | "up_east" | "up_north" | "up_south" | "up_west" | "west_up" | "east_up" | "north_up" | "south_up";
}
export type BedrockJigsawProperties = Required<JigsawStates>;
export class JigsawTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaJigsawProperties): BedrockBlock<BedrockJigsawProperties> {
        const state: BedrockJigsawProperties = {};
        // implement
        return { name: id, properties: state };
    }
}