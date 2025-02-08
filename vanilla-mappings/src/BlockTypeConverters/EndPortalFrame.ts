import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { EndPortalFrameStates } from "@minecraft/vanilla-data";
export interface JavaEndPortalFrameProperties {
    eye: "true" | "false";
    facing: "north" | "south" | "west" | "east";
}
export type BedrockEndPortalFrameProperties = Required<EndPortalFrameStates>;
export class EndPortalFrameTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaEndPortalFrameProperties): BedrockBlock<BedrockEndPortalFrameProperties> {
        const state: BedrockEndPortalFrameProperties = {};
        // implement
        return { name: id, properties: state };
    }
}