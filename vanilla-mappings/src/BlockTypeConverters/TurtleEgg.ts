import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { TurtleEggStates } from "@minecraft/vanilla-data";
export interface JavaTurtleEggProperties {
    eggs: "1" | "2" | "3" | "4";
    hatch: "0" | "1" | "2";
}
export type BedrockTurtleEggProperties = Required<TurtleEggStates>;
export class TurtleEggTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaTurtleEggProperties): BedrockBlock<BedrockTurtleEggProperties> {
        const state: BedrockTurtleEggProperties = {};
        // implement
        return { name: id, properties: state };
    }
}