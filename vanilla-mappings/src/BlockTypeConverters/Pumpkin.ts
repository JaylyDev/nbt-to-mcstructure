import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { PumpkinStates } from "@minecraft/vanilla-data";

export interface JavaPumpkinProperties {}

export interface JavaJackOLanternProperties {
    facing: "north" | "south" | "east" | "west";
}

export type BedrockPumpkinProperties = Required<PumpkinStates>;

export type BedrockJackOLanternProperties = Required<PumpkinStates>;

export class PumpkinTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaPumpkinProperties): BedrockBlock<BedrockPumpkinProperties> {
        const states: BedrockPumpkinProperties = {
            "minecraft:cardinal_direction": "north",
        };
        return { name: id, properties: states };
    }
}

export class JackOLanternTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaJackOLanternProperties): BedrockBlock<BedrockJackOLanternProperties> {
        const states: BedrockJackOLanternProperties = {
            "minecraft:cardinal_direction": properties.facing,
        };
        if (id === "minecraft:jack_o_lantern") return { name: "minecraft:lit_pumpkin", properties: states };
        else return { name: id, properties: states };
    }
}
