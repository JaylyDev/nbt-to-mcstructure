import { BlockTypeConverterBase } from "./BaseClass";
import { FlowerPotStates } from "@minecraft/vanilla-data";

export interface JavaFlowerPotProperties {}

export type BedrockFlowerPotProperties = Required<FlowerPotStates>;

export class FlowerPotTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaFlowerPotProperties): BedrockFlowerPotProperties {
        const states: BedrockFlowerPotProperties = {
            update_bit: false,
        };

        return states;
    }
}
