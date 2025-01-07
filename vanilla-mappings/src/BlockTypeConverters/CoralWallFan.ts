import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { FireCoralWallFanStates } from "@minecraft/vanilla-data";

export interface JavaCoralWallFanProperties {
    facing: string;
    waterlogged: string;
}

export type BedrockCoralWallFanProperties = Required<FireCoralWallFanStates>;

export class CoralWallFanTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCoralWallFanProperties): BedrockBlock<BedrockCoralWallFanProperties> {
        const states: BedrockCoralWallFanProperties = {
            coral_direction: 0,
        };

        switch (properties.facing) {
            case "north":
                states.coral_direction = 2;
                break;
            case "south":
                states.coral_direction = 3;
                break;
            case "west":
                states.coral_direction = 0;
                break;
            case "east":
                states.coral_direction = 1;
                break;
        }

        return { name: id, properties: states };
    }
}
