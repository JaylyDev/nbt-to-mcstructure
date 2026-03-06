import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BeeNestStates } from "@minecraft/vanilla-data";
export interface JavaBeehiveProperties {
    facing: "north" | "south" | "west" | "east";
    honey_level: "0" | "1" | "2" | "3" | "4" | "5";
}
export type BedrockBeehiveProperties = Required<BeeNestStates>;
export class BeehiveTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBeehiveProperties): BedrockBlock<BedrockBeehiveProperties> {
        const states: BedrockBeehiveProperties = {
            direction: 0,
            honey_level: 0,
        };
        switch (properties.facing) {
            case "north":
                states.direction = 2;
                break;
            case "east":
                states.direction = 3;
                break;
            case "south":
                states.direction = 0;
                break;
            case "west":
                states.direction = 1;
                break;
        }
        states.honey_level = parseInt(properties.honey_level);
        return { name: id, properties: states };
    }
}
