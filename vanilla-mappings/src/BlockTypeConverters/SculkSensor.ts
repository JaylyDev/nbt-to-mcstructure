import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { SculkSensorStates } from "@minecraft/vanilla-data";
export interface JavaSculkSensorProperties {
    power: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15";
    sculk_sensor_phase: "inactive" | "active" | "cooldown";
    waterlogged: "true" | "false";
}
export type BedrockSculkSensorProperties = Required<SculkSensorStates>;
export class SculkSensorTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaSculkSensorProperties): BedrockBlock<BedrockSculkSensorProperties> {
        const state: BedrockSculkSensorProperties = {};
        // implement
        return { name: id, properties: state };
    }
}