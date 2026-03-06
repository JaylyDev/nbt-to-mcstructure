import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { TorchStates } from "@minecraft/vanilla-data";

export interface JavaTorchProperties {
    facing: "north" | "south" | "east" | "west";
    lit: string; // true, false
}

export type BedrockTorchProperties = Required<TorchStates>;

export class TorchTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaTorchProperties): BedrockBlock<BedrockTorchProperties> {
        const states: BedrockTorchProperties = {
            torch_facing_direction: "top",
        };

        switch (properties.facing) {
            case "north":
                states.torch_facing_direction = "south";
                break;
            case "south":
                states.torch_facing_direction = "north";
                break;
            case "east":
                states.torch_facing_direction = "west";
                break;
            case "west":
                states.torch_facing_direction = "east";
                break;
            default:
                break;
        }

        if (properties.lit === "false" && id === "minecraft:redstone_wall_torch") {
            return { name: "minecraft:unlit_redstone_torch", properties: states };
        } else {
            return { name: "minecraft:redstone_torch", properties: states };
        }
    }
}
7;
