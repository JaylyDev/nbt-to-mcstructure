import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CauldronStates } from "@minecraft/vanilla-data";

export interface JavaCauldronProperties {
    level: string; // 0-3, or null if lava cauldron
}

export type BedrockCauldronProperties = Required<CauldronStates>;

export class CauldronTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCauldronProperties): BedrockBlock<BedrockCauldronProperties> {
        const states: BedrockCauldronProperties = {
            cauldron_liquid: "water",
            fill_level: 0,
        };

        if (id === "minecraft:lava_cauldron") {
            states.cauldron_liquid = "lava";
            states.fill_level = 6;
            return { name: "minecraft:cauldron", properties: states };
        } else if (id === "minecraft:powder_snow_cauldron") {
            states.cauldron_liquid = "powder_snow";
        }

        if (properties.level === "1") {
            states.fill_level = 3;
        } else if (properties.level === "2") {
            states.fill_level = 4;
        }
        if (properties.level === "3") {
            states.fill_level = 6;
        }
        return { name: "minecraft:cauldron", properties: states };
    }
}
