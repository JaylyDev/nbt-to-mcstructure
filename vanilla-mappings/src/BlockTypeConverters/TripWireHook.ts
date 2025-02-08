import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { TripwireHookStates } from "@minecraft/vanilla-data";
export interface JavaTripWireHookProperties {
    attached: "true" | "false";
    facing: "north" | "south" | "west" | "east";
    powered: "true" | "false";
}
export type BedrockTripWireHookProperties = Required<TripwireHookStates>;
export class TripWireHookTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaTripWireHookProperties): BedrockBlock<BedrockTripWireHookProperties> {
        const state: BedrockTripWireHookProperties = {};
        // implement
        return { name: id, properties: state };
    }
}