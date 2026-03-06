import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { PaleHangingMossStates } from "@minecraft/vanilla-data";
export interface JavaHangingMossProperties {
    tip: "true" | "false";
}
export type BedrockHangingMossProperties = Required<PaleHangingMossStates>;
export class HangingMossTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaHangingMossProperties): BedrockBlock<BedrockHangingMossProperties> {
        const state: BedrockHangingMossProperties = {
            tip: false,
        };
        if (properties.tip === "true") state.tip = true;
        // implement
        return { name: id, properties: state };
    }
}
