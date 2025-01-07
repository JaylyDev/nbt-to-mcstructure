import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { AcaciaHangingSignStates, OakHangingSignStates, StandingSignStates, WallSignStates } from "@minecraft/vanilla-data";

const wallSignsMap = new Map<string, string>()
    .set("minecraft:dark_oak_wall_sign", "minecraft:darkoak_wall_sign")
    .set("minecraft:oak_wall_sign", "minecraft:wall_sign");

const standingSignsMap = new Map<string, string>()
    .set("minecraft:dark_oak_sign", "minecraft:darkoak_standing_sign")
    .set("minecraft:oak_sign", "minecraft:standing_sign");

export interface JavaCeilingHangingSignProperties {
    attached: string; // true, false
    rotation: string; // 0-15
    waterlogged: string; // true, false
}

export interface JavaWallSignProperties {
    facing: string;
    waterlogged: string;
}

export interface JavaStandingSignProperties {
    rotation: string; // 0-15
    waterlogged: string;
}

export interface JavaWallHangingSignProperties extends JavaWallSignProperties {}

export type BedrockCeilingHangingSignProperties = Required<AcaciaHangingSignStates>;
export type BedrockWallHangingSignProperties = Required<OakHangingSignStates>;
export type BedrockWallSignProperties = Required<WallSignStates>;
export type BedrockStandingSignProperties = Required<StandingSignStates>;

export class CeilingHangingSignTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCeilingHangingSignProperties): BedrockBlock<BedrockCeilingHangingSignProperties> {
        const { attached, rotation } = properties;
        const states: BedrockCeilingHangingSignProperties = {
            attached_bit: false,
            facing_direction: 0,
            ground_sign_direction: 0,
            hanging: false,
        };

        switch (attached) {
            case "true":
                states.attached_bit = true;
                break;
            default:
                break;
        }

        switch (rotation) {
            case "0":
                states.facing_direction = 3;
                break;

            case "4":
                states.facing_direction = 4;
                break;

            case "12":
                states.facing_direction = 5;
                break;

            default:
                states.facing_direction = 2;
                break;
        }

        states.ground_sign_direction = parseInt(rotation);
        states.hanging = true;

        return {
            name: id,
            properties: states,
        };
    }
}

export class WallHangingSignTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaWallHangingSignProperties): BedrockBlock<BedrockWallHangingSignProperties> {
        const { facing } = properties;
        const states: BedrockWallHangingSignProperties = {
            attached_bit: false,
            facing_direction: 0,
            ground_sign_direction: 0,
            hanging: false,
        };

        if (facing === "north") {
            states.facing_direction = 2;
            states.ground_sign_direction = 8;
        } else if (facing === "south") {
            states.facing_direction = 3;
            states.ground_sign_direction = 0;
        } else if (facing === "west") {
            states.facing_direction = 4;
            states.ground_sign_direction = 4;
        } else if (facing === "east") {
            states.facing_direction = 5;
            states.ground_sign_direction = 12;
        }

        states.attached_bit = true;

        return {
            name: id.replace("_wall", ""),
            properties: states,
        };
    }
}

export class WallSignTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaWallSignProperties): BedrockBlock<BedrockWallSignProperties> {
        const { facing } = properties;
        const states: BedrockWallSignProperties = {
            facing_direction: 0,
        };

        if (facing === "north") {
            states.facing_direction = 2;
        } else if (facing === "south") {
            states.facing_direction = 3;
        } else if (facing === "west") {
            states.facing_direction = 4;
        } else if (facing === "east") {
            states.facing_direction = 5;
        }

        const bedrockId = wallSignsMap.get(id) ?? id;

        return {
            name: bedrockId,
            properties: states,
        };
    }
}

export class StandingSignTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaStandingSignProperties): BedrockBlock<BedrockStandingSignProperties> {
        const states: BedrockStandingSignProperties = {
            ground_sign_direction: parseInt(properties.rotation),
        };

        const bedrockId = standingSignsMap.get(id) ?? id.replace("_sign", "_standing_sign");
        return { name: bedrockId, properties: states };
    }
}
