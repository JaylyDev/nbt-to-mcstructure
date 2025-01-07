import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { HeavyWeightedPressurePlateStates, StonePressurePlateStates } from "@minecraft/vanilla-data";

export interface JavaPressurePlateProperties {
    powered: "true" | "false";
}

export interface JavaWeightedPressurePlateProperties {
    power: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15";
}

export type BedrockPressurePlateProperties = Required<StonePressurePlateStates>;
export type BedrockWeightedPressurePlateProperties = Required<HeavyWeightedPressurePlateStates>;

export class PressurePlateTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaPressurePlateProperties): BedrockBlock<BedrockPressurePlateProperties> {
        const states: BedrockPressurePlateProperties = {
            redstone_signal: 0,
        };

        switch (properties.powered) {
            case "true":
                states.redstone_signal = 15;
                break;
            case "false":
                states.redstone_signal = 0;
                break;
        }

        if (id === "minecraft:oak_pressure_plate") {
            return { name: "minecraft:wooden_pressure_plate", properties: states };
        } else {
            return { name: id, properties: states };
        }
    }
}

export class WeightedPressurePlateTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaWeightedPressurePlateProperties): BedrockBlock<BedrockWeightedPressurePlateProperties> {
        const states: BedrockWeightedPressurePlateProperties = {
            redstone_signal: 0,
        };

        states.redstone_signal = parseInt(properties.power);

        return { name: id, properties: states };
    }
}
