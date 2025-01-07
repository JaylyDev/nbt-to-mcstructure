import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { AcaciaHangingSignStates, OakHangingSignStates, WallSignStates } from "@minecraft/vanilla-data";

const signsMap = new Map<string, string>()
    .set("minecraft:dark_oak_wall_sign", "minecraft:darkoak_wall_sign")
    .set("minecraft:oak_wall_sign", "minecraft:wall_sign");

export interface JavaCeilingHangingSignProperties {
    attached: string; // true, false
    rotation: string; // 0-15
    waterlogged: string; // true, false
}

export interface JavaWallSignProperties {
    facing: string;
    waterlogged: string;
}

export interface JavaWallHangingSignProperties extends JavaWallSignProperties {}

export type BedrockCeilingHangingSignProperties = Required<AcaciaHangingSignStates>;
export type BedrockWallHangingSignProperties = Required<OakHangingSignStates>;
export type BedrockWallSignProperties = Required<WallSignStates>;

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

        const bedrockId = signsMap.get(id) ?? id;

        return {
            name: bedrockId,
            properties: states,
        };
    }
}
