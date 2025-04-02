import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CakeStates } from "@minecraft/vanilla-data";
export interface JavaCakeProperties {
    bites: "0" | "1" | "2" | "3" | "4" | "5" | "6";
}
export type BedrockCakeProperties = Required<CakeStates>;
export class CakeTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaCakeProperties): BedrockBlock<BedrockCakeProperties> {
        const state: BedrockCakeProperties = {
            bite_counter: parseInt(properties.bites),
        };
        // implement
        return { name: id, properties: state };
    }
}
