import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { PinkPetalsStates } from "@minecraft/vanilla-data";
export interface JavaPinkPetalsProperties {
    facing: "north" | "south" | "west" | "east";
    flower_amount: "1" | "2" | "3" | "4";
}
export type BedrockPinkPetalsProperties = Required<PinkPetalsStates>;
export class PinkPetalsTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaPinkPetalsProperties): BedrockBlock<BedrockPinkPetalsProperties> {
        const state: BedrockPinkPetalsProperties = {};
        // implement
        return { name: id, properties: state };
    }
}