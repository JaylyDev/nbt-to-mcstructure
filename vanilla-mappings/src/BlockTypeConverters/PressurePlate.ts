import { BlockTypeConverterBase } from "./BaseClass";
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
    public convert(id: string, properties: JavaPressurePlateProperties): BedrockPressurePlateProperties {
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

        return states;
    }
}

export class WeightedPressurePlateTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaWeightedPressurePlateProperties): BedrockWeightedPressurePlateProperties {
        const states: BedrockWeightedPressurePlateProperties = {
            redstone_signal: 0,
        };

        states.redstone_signal = parseInt(properties.power);

        return states;
    }
}
