import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { TwistingVinesStates } from "@minecraft/vanilla-data";

export interface JavaTwistingVinesProperties {
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

export type BedrockTwistingVinesProperties = Required<TwistingVinesStates>;

export class TwistingVinesTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaTwistingVinesProperties): BedrockBlock<BedrockTwistingVinesProperties> {
        const states: BedrockTwistingVinesProperties = {
            twisting_vines_age: parseInt(properties.age),
        };

        if (id === "minecraft:twisting_vines_plant") {
            return {
                name: "minecraft:twisting_vines",
                properties: {
                    twisting_vines_age: 0,
                },
            };
        } else {
            return { name: id, properties: states };
        }
    }
}
