import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { GrindstoneStates } from "@minecraft/vanilla-data";
export interface JavaGrindstoneProperties {
    face: "floor" | "wall" | "ceiling";
    facing: "north" | "south" | "west" | "east";
}
export type BedrockGrindstoneProperties = Required<GrindstoneStates>;
export class GrindstoneTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaGrindstoneProperties): BedrockBlock<BedrockGrindstoneProperties> {
        const state: BedrockGrindstoneProperties = {
            direction: 0,
            attachment: "", // standing, hanging, side, multiple
        };
        /**
         * 0: South facing
1: West facing
2: North facing
3: East facing
         */
        switch (properties.facing) {
            case "south":
                state.direction = 0;
                break;
            case "west":
                state.direction = 1;
                break;
            case "north":
                state.direction = 2;
                break;
            case "east":
                state.direction = 3;
                break;
        }
        switch (properties.face) {
            case "floor":
                state.attachment = "standing";
                break;
            case "wall":
                state.attachment = "side";
                break;
            case "ceiling":
                state.attachment = "hanging";
                break;
        }

        return { name: id, properties: state };
    }
}
