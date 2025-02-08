import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CalibratedSculkSensorStates } from "@minecraft/vanilla-data";
export interface JavaCalibratedSculkSensorProperties {
    facing: "north" | "south" | "west" | "east";
    power: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15";
    sculk_sensor_phase: "inactive" | "active" | "cooldown";
    waterlogged: "true" | "false";
}
export type BedrockCalibratedSculkSensorProperties = Required<CalibratedSculkSensorStates>;
export class CalibratedSculkSensorTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCalibratedSculkSensorProperties): BedrockBlock<BedrockCalibratedSculkSensorProperties> {
        const state: BedrockCalibratedSculkSensorProperties = {
            "minecraft:cardinal_direction": properties.facing,
            sculk_sensor_phase: 0,
        };
        // sculk_sensor_phase: 0 = inactive, 1 = active, 2 = cooldown
        if (properties.sculk_sensor_phase === "active") {
            state.sculk_sensor_phase = 1;
        } else if (properties.sculk_sensor_phase === "cooldown") {
            state.sculk_sensor_phase = 2;
        }
        return { name: id, properties: state };
    }
}
