import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { KelpStates } from "@minecraft/vanilla-data";

export interface JavaKelpProperties {
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

export type BedrockKelpProperties = Required<KelpStates>;

export class KelpTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaKelpProperties): BedrockBlock<BedrockKelpProperties> {
        const states: BedrockKelpProperties = {
            kelp_age: parseInt(properties.age),
        };

        if (id === "minecraft:kelp_plant") {
            return {
                name: "minecraft:kelp",
                properties: {
                    kelp_age: 0,
                },
            };
        } else {
            return { name: id, properties: states };
        }
    }
}
