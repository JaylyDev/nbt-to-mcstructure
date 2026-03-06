import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaNetherPortalProperties {
    axis: "x" | "z";
}
export type BedrockNetherPortalProperties = Required<object>;
export class NetherPortalTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaNetherPortalProperties): BedrockBlock<BedrockNetherPortalProperties> {
        const state: BedrockNetherPortalProperties = {};
        // implement
        return { name: id, properties: state };
    }
}