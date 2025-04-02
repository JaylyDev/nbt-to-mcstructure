import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { FarmlandStates } from "@minecraft/vanilla-data";
export interface JavaFarmProperties {
    moisture: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
}
export type BedrockFarmProperties = Required<FarmlandStates>;
export class FarmTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaFarmProperties): BedrockBlock<BedrockFarmProperties> {
        const state: BedrockFarmProperties = {};
        // implement
        return { name: id, properties: state };
    }
}