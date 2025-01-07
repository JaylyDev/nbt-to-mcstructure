import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { AnvilStates, ChippedAnvilStates, DamagedAnvilStates } from "@minecraft/vanilla-data";

export interface JavaAnvilProperties {
    facing: "north" | "south" | "east" | "west";
}

export type BedrockAnvilProperties = Required<AnvilStates | ChippedAnvilStates | DamagedAnvilStates>;

export class AnvilTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaAnvilProperties): BedrockBlock<BedrockAnvilProperties> {
        const states: BedrockAnvilProperties = {
            "minecraft:cardinal_direction": properties.facing,
        };
        return { name: id, properties: states };
    }
}
