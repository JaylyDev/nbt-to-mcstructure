import { StandingBannerStates } from "@minecraft/vanilla-data";
import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";

export interface JavaBannerProperties {
    rotation: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15";
}
export type BedrockBannerProperties = Required<StandingBannerStates>;
export class BannerTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaBannerProperties): BedrockBlock<BedrockBannerProperties> {
        const rotation = parseInt(properties.rotation);
        // implement
        return {
            name: "minecraft:standing_banner",
            properties: {
                ground_sign_direction: rotation,
            },
        };
    }
}
