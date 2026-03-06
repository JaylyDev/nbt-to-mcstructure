import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaTallSeagrassProperties {
    half: "upper" | "lower";
}
export type BedrockTallSeagrassProperties = Required<object>;
export class TallSeagrassTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaTallSeagrassProperties): BedrockBlock<BedrockTallSeagrassProperties> {
        const state: BedrockTallSeagrassProperties = {};
        // implement
        return { name: id, properties: state };
    }
}