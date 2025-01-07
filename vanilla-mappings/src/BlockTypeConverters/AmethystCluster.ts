import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { AmethystClusterStates } from "@minecraft/vanilla-data";

export interface JavaAmethystClusterProperties {
    facing: "north" | "south" | "east" | "west" | "up" | "down";
    waterlogged: string;
}

export type BedrockAmethystClusterProperties = Required<AmethystClusterStates>;

export class AmethystClusterTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaAmethystClusterProperties): BedrockBlock<BedrockAmethystClusterProperties> {
        const states: BedrockAmethystClusterProperties = {
            "minecraft:block_face": properties.facing ?? "up",
        };

        return { name: id, properties: states };
    }
}
