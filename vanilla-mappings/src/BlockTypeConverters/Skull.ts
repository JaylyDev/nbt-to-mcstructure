import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { SkeletonSkullStates } from "@minecraft/vanilla-data";

export interface JavaSkullProperties {}

export interface JavaWallSkullProperties {
    facing: "north" | "south" | "east" | "west";
}

export type BedrockSkullProperties = Required<SkeletonSkullStates>;

export class SkullTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaSkullProperties): BedrockBlock<BedrockSkullProperties> {
        const states: BedrockSkullProperties = {
            facing_direction: 1,
        };

        return { name: id, properties: states };
    }
}

export class WallSkullTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaWallSkullProperties): BedrockBlock<BedrockSkullProperties> {
        const states: BedrockSkullProperties = {
            facing_direction: 0,
        };

        if (properties.facing === "north") {
            states.facing_direction = 2;
        } else if (properties.facing === "south") {
            states.facing_direction = 3;
        } else if (properties.facing === "west") {
            states.facing_direction = 4;
        } else if (properties.facing === "east") {
            states.facing_direction = 5;
        }

        return { name: id.replace("_wall", ""), properties: states };
    }
}
