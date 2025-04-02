import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaWallBannerProperties {
    facing: "north" | "south" | "west" | "east";
}
export type BedrockWallBannerProperties = Required<object>;
export class WallBannerTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaWallBannerProperties): BedrockBlock<BedrockWallBannerProperties> {
        const state: BedrockWallBannerProperties = {};
        // implement
        return { name: id, properties: state };
    }
}