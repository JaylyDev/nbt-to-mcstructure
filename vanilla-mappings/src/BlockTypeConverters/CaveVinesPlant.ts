import { CaveVinesBodyWithBerriesStates } from "@minecraft/vanilla-data";
import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaCaveVinesPlantProperties {
    berries: "true" | "false";
}
export type BedrockCaveVinesPlantProperties = Required<CaveVinesBodyWithBerriesStates>;
export class CaveVinesPlantTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCaveVinesPlantProperties): BedrockBlock<BedrockCaveVinesPlantProperties> {
        const state: BedrockCaveVinesPlantProperties = {
            growing_plant_age: 0,
        };
        // implement
        if (properties.berries === "true") {
            return { name: "minecraft:cave_vines_body_with_berries", properties: state };
        } else {
            return { name: id, properties: state };
        }
    }
}
