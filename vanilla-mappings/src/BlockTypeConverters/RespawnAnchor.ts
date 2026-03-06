import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { RespawnAnchorStates } from "@minecraft/vanilla-data";
export interface JavaRespawnAnchorProperties {
    charges: "0" | "1" | "2" | "3" | "4";
}
export type BedrockRespawnAnchorProperties = Required<RespawnAnchorStates>;
export class RespawnAnchorTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaRespawnAnchorProperties): BedrockBlock<BedrockRespawnAnchorProperties> {
        const state: BedrockRespawnAnchorProperties = {};
        // implement
        return { name: id, properties: state };
    }
}