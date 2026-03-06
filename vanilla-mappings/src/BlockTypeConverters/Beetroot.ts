import { BeetrootStates } from "@minecraft/vanilla-data";
import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaBeetrootProperties {
    age: "0" | "1" | "2" | "3";
}
export type BedrockBeetrootProperties = Required<BeetrootStates>;
export class BeetrootTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBeetrootProperties): BedrockBlock<BedrockBeetrootProperties> {
        const states: BedrockBeetrootProperties = {
            growth: 0,
        };
        // 0, 3, 4, 7
        switch (properties.age) {
            case "0":
                states.growth = 0;
                break;
            case "1":
                states.growth = 3;
                break;
            case "2":
                states.growth = 4;
                break;
            case "3":
                states.growth = 7;
                break;
        }
        return { name: id, properties: states };
    }
}
