import { RedstoneWireStates } from "@minecraft/vanilla-data";
import { BlockTypeConverterBase } from "./BaseClass";

export interface JavaRedstoneWireProperties {
    east: "up" | "side" | "none";
    north: "up" | "side" | "none";
    power: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15";
    south: "up" | "side" | "none";
    west: "up" | "side" | "none";
}

export type BedrockRedstoneWireProperties = Required<RedstoneWireStates>;

export class RedstoneWireTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaRedstoneWireProperties): BedrockRedstoneWireProperties {
        return {
            redstone_signal: parseInt(properties.power),
        };
    }
}
