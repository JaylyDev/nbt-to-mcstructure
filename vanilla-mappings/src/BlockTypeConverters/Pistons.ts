import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { PistonArmCollisionStates, PistonStates, StickyPistonArmCollisionStates, StickyPistonStates } from "@minecraft/vanilla-data";

export interface JavaPistonProperties {
    facing: "north" | "south" | "east" | "west";
    type?: "normal" | "sticky"; // for piston head blocks
}

export type BedrockPistonHeadProperties = Required<PistonArmCollisionStates | StickyPistonArmCollisionStates | PistonStates | StickyPistonStates>;

export class PistonTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaPistonProperties): BedrockBlock<BedrockPistonHeadProperties> {
        const states: BedrockPistonHeadProperties = {
            facing_direction: 0,
        };

        if (properties.facing === "north") {
            states.facing_direction = 3;
        } else if (properties.facing === "south") {
            states.facing_direction = 2;
        } else if (properties.facing === "west") {
            states.facing_direction = 5;
        } else if (properties.facing === "east") {
            states.facing_direction = 4;
        }

        if (properties.type === "sticky") {
            return {
                name: "minecraft:sticky_piston_arm_collision",
                properties: states,
            };
        } else if (properties.type === "normal") {
            return {
                name: "minecraft:piston_arm_collision",
                properties: states,
            };
        } else {
            return {
                name: id,
                properties: states,
            };
        }
    }
}
