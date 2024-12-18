import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { FlowerPotStates } from "@minecraft/vanilla-data";

export interface JavaFlowerPotProperties {}

export type BedrockFlowerPotProperties = Required<FlowerPotStates>;

export class FlowerPotTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaFlowerPotProperties): BedrockBlock<BedrockFlowerPotProperties> {
        const states: BedrockFlowerPotProperties = {
            update_bit: false,
        };

        return { name: id, properties: states };
    }
}
