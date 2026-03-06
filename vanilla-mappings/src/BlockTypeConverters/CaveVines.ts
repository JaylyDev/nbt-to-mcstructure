import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CaveVinesHeadWithBerriesStates, CaveVinesStates } from "@minecraft/vanilla-data";
export interface JavaCaveVinesProperties {
    age:
        | "0"
        | "1"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "8"
        | "9"
        | "10"
        | "11"
        | "12"
        | "13"
        | "14"
        | "15"
        | "16"
        | "17"
        | "18"
        | "19"
        | "20"
        | "21"
        | "22"
        | "23"
        | "24"
        | "25";
    berries: "true" | "false";
}
export type BedrockCaveVinesProperties = Required<CaveVinesStates | CaveVinesHeadWithBerriesStates>;
export class CaveVinesTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCaveVinesProperties): BedrockBlock<BedrockCaveVinesProperties> {
        const state: BedrockCaveVinesProperties = {
            growing_plant_age: parseInt(properties.age),
        };
        // implement
        if (properties.berries === "true") {
            return { name: "minecraft:cave_vines_head_with_berries", properties: state };
        } else {
            return { name: id, properties: state };
        }
    }
}
