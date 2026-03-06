import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { WeepingVinesStates } from "@minecraft/vanilla-data";

export interface JavaWeepingVinesProperties {
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
}

export type BedrockWeepingVinesProperties = Required<WeepingVinesStates>;

export class WeepingVinesTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaWeepingVinesProperties): BedrockBlock<BedrockWeepingVinesProperties> {
        const states: BedrockWeepingVinesProperties = {
            weeping_vines_age: parseInt(properties.age),
        };

        if (id === "minecraft:weeping_vines_plant") {
            return {
                name: "minecraft:weeping_vines",
                properties: {
                    weeping_vines_age: 0,
                },
            };
        } else {
            return { name: id, properties: states };
        }
    }
}
