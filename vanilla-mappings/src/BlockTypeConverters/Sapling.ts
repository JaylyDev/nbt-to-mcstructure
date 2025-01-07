import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { BambooSaplingStates, OakSaplingStates } from "@minecraft/vanilla-data";

export interface JavaSaplingProperties {
    stage: "0" | "1";
}
export interface JavaBambooSaplingProperties {}

export type BedrockSaplingProperties = Required<OakSaplingStates>;
export type BedrockBambooSaplingProperties = Required<BambooSaplingStates>;

export class SaplingTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaSaplingProperties): BedrockBlock<BedrockSaplingProperties> {
        const states: BedrockSaplingProperties = {
            age_bit: false,
        };

        switch (properties.stage) {
            case "1":
                states.age_bit = true;
                break;

            default:
                break;
        }

        return { name: id, properties: states };
    }
}

export class BambooSaplingTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBambooSaplingProperties): BedrockBlock<BedrockBambooSaplingProperties> {
        const states: BedrockBambooSaplingProperties = {
            age_bit: false,
        };

        return { name: id, properties: states };
    }
}
