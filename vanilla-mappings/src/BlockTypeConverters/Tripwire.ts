import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaTripwireProperties {
    attached: "true" | "false";
    disarmed: "true" | "false";
    east: "true" | "false";
    north: "true" | "false";
    powered: "true" | "false";
    south: "true" | "false";
    west: "true" | "false";
}
export type BedrockTripwireProperties = Required<object>;
export class TripwireTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaTripwireProperties): BedrockBlock<BedrockTripwireProperties> {
        const state: BedrockTripwireProperties = {};
        // implement
        return { name: id, properties: state };
    }
}