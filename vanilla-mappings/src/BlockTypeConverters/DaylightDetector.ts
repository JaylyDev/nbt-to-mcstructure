import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { DaylightDetectorStates } from "@minecraft/vanilla-data";

export interface JavaDaylightDetectorProperties {
    inverted: string;
    power: string;
}

export type BedrockDaylightDetectorProperties = Required<DaylightDetectorStates>;

export class DaylightDetectorTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaDaylightDetectorProperties): BedrockBlock<BedrockDaylightDetectorProperties> {
        const states: BedrockDaylightDetectorProperties = {
            redstone_signal: 0,
        };

        states.redstone_signal = parseInt(properties.power);

        if (properties.inverted === "true") {
            return { name: "minecraft:daylight_detector_inverted", properties: states };
        } else {
            return { name: "minecraft:daylight_detector", properties: states };
        }
    }
}
