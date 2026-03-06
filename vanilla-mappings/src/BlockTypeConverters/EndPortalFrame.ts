import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { EndPortalFrameStates } from "@minecraft/vanilla-data";
export interface JavaEndPortalFrameProperties {
    eye: "true" | "false";
    facing: "north" | "south" | "west" | "east";
}
export type BedrockEndPortalFrameProperties = Required<EndPortalFrameStates>;
export class EndPortalFrameTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaEndPortalFrameProperties): BedrockBlock<BedrockEndPortalFrameProperties> {
        const state: BedrockEndPortalFrameProperties = {
            "minecraft:cardinal_direction": properties.facing,
            end_portal_eye_bit: false,
        };
        if (properties.eye === "true") {
            state.end_portal_eye_bit = true;
        }
        // implement
        return { name: id, properties: state };
    }
}
