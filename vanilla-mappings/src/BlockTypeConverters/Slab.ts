import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { CutCopperSlabStates, DoubleCutCopperSlabStates, OakDoubleSlabStates, OakSlabStates } from "@minecraft/vanilla-data";

const doubleSlabsMapping = new Map<string, string>()
    .set("minecraft:acacia_slab", "minecraft:acacia_double_slab")
    .set("minecraft:andesite_slab", "minecraft:andesite_double_slab")
    .set("minecraft:bamboo_slab", "minecraft:bamboo_double_slab")
    .set("minecraft:bamboo_mosaic_slab", "minecraft:bamboo_mosaic_double_slab")
    .set("minecraft:birch_slab", "minecraft:birch_double_slab")
    .set("minecraft:blackstone_slab", "minecraft:blackstone_double_slab")
    .set("minecraft:brick_slab", "minecraft:brick_double_slab")
    .set("minecraft:cherry_slab", "minecraft:cherry_double_slab")
    .set("minecraft:cobbled_deepslate_slab", "minecraft:cobbled_deepslate_double_slab")
    .set("minecraft:cobblestone_slab", "minecraft:cobblestone_double_slab")
    .set("minecraft:crimson_slab", "minecraft:crimson_double_slab")
    .set("minecraft:cut_red_sandstone_slab", "minecraft:cut_red_sandstone_double_slab")
    .set("minecraft:cut_sandstone_slab", "minecraft:cut_sandstone_double_slab")
    .set("minecraft:dark_oak_slab", "minecraft:dark_oak_double_slab")
    .set("minecraft:dark_prismarine_slab", "minecraft:dark_prismarine_double_slab")
    .set("minecraft:deepslate_brick_slab", "minecraft:deepslate_brick_double_slab")
    .set("minecraft:deepslate_tile_slab", "minecraft:deepslate_tile_double_slab")
    .set("minecraft:diorite_slab", "minecraft:diorite_double_slab")
    .set("minecraft:cut_copper_slab", "minecraft:double_cut_copper_slab")
    .set("minecraft:end_stone_brick_slab", "minecraft:end_stone_brick_double_slab")
    .set("minecraft:exposed_cut_copper_slab", "minecraft:exposed_double_cut_copper_slab")
    .set("minecraft:granite_slab", "minecraft:granite_double_slab")
    .set("minecraft:jungle_slab", "minecraft:jungle_double_slab")
    .set("minecraft:mangrove_slab", "minecraft:mangrove_double_slab")
    .set("minecraft:mossy_cobblestone_slab", "minecraft:mossy_cobblestone_double_slab")
    .set("minecraft:mossy_stone_brick_slab", "minecraft:mossy_stone_brick_double_slab")
    .set("minecraft:mud_brick_slab", "minecraft:mud_brick_double_slab")
    .set("minecraft:nether_brick_slab", "minecraft:nether_brick_double_slab")
    .set("minecraft:normal_stone_slab", "minecraft:normal_stone_double_slab")
    .set("minecraft:oak_slab", "minecraft:oak_double_slab")
    .set("minecraft:oxidized_cut_copper_slab", "minecraft:oxidized_double_cut_copper_slab")
    .set("minecraft:pale_oak_slab", "minecraft:pale_oak_double_slab")
    .set("minecraft:petrified_oak_slab", "minecraft:petrified_oak_double_slab")
    .set("minecraft:polished_andesite_slab", "minecraft:polished_andesite_double_slab")
    .set("minecraft:polished_blackstone_brick_slab", "minecraft:polished_blackstone_brick_double_slab")
    .set("minecraft:polished_blackstone_slab", "minecraft:polished_blackstone_double_slab")
    .set("minecraft:polished_deepslate_slab", "minecraft:polished_deepslate_double_slab")
    .set("minecraft:polished_diorite_slab", "minecraft:polished_diorite_double_slab")
    .set("minecraft:polished_granite_slab", "minecraft:polished_granite_double_slab")
    .set("minecraft:polished_tuff_slab", "minecraft:polished_tuff_double_slab")
    .set("minecraft:prismarine_brick_slab", "minecraft:prismarine_brick_double_slab")
    .set("minecraft:prismarine_slab", "minecraft:prismarine_double_slab")
    .set("minecraft:purpur_slab", "minecraft:purpur_double_slab")
    .set("minecraft:quartz_slab", "minecraft:quartz_double_slab")
    .set("minecraft:red_nether_brick_slab", "minecraft:red_nether_brick_double_slab")
    .set("minecraft:red_sandstone_slab", "minecraft:red_sandstone_double_slab")
    .set("minecraft:resin_brick_slab", "minecraft:resin_brick_double_slab")
    .set("minecraft:sandstone_slab", "minecraft:sandstone_double_slab")
    .set("minecraft:smooth_quartz_slab", "minecraft:smooth_quartz_double_slab")
    .set("minecraft:smooth_red_sandstone_slab", "minecraft:smooth_red_sandstone_double_slab")
    .set("minecraft:smooth_sandstone_slab", "minecraft:smooth_sandstone_double_slab")
    .set("minecraft:smooth_stone_slab", "minecraft:smooth_stone_double_slab")
    .set("minecraft:spruce_slab", "minecraft:spruce_double_slab")
    .set("minecraft:stone_brick_slab", "minecraft:stone_brick_double_slab")
    .set("minecraft:tuff_brick_slab", "minecraft:tuff_brick_double_slab")
    .set("minecraft:tuff_slab", "minecraft:tuff_double_slab")
    .set("minecraft:warped_slab", "minecraft:warped_double_slab")
    .set("minecraft:waxed_cut_copper_slab", "minecraft:waxed_double_cut_copper_slab")
    .set("minecraft:waxed_exposed_cut_copper_slab", "minecraft:waxed_exposed_double_cut_copper_slab")
    .set("minecraft:waxed_oxidized_cut_copper_slab", "minecraft:waxed_oxidized_double_cut_copper_slab")
    .set("minecraft:waxed_weathered_cut_copper_slab", "minecraft:waxed_weathered_double_cut_copper_slab")
    .set("minecraft:weathered_cut_copper_slab", "minecraft:weathered_double_cut_copper_slab")
    .set("minecraft:stone_slab", "minecraft:normal_stone_double_slab");

export interface JavaSlabProperties {
    type: "top" | "down" | "double";
    waterlogged: string;
}

// vertical_half: bottom (default) or top
export type BedrockSlabProperties = Required<OakSlabStates>;
export type BedrockDoubleSlabProperties = Required<OakDoubleSlabStates>;
export type BedrockWeatheringCopperSlabProperties = Required<CutCopperSlabStates>;
export type BedrockDoubleWeatheringCopperSlabProperties = Required<DoubleCutCopperSlabStates>;

export class SlabTypeConverter extends BlockTypeConverterBase {
    public convert(
        id: string,
        properties: JavaSlabProperties
    ): BedrockBlock<BedrockSlabProperties | BedrockWeatheringCopperSlabProperties | BedrockDoubleSlabProperties | BedrockDoubleWeatheringCopperSlabProperties> {
        if (properties.type === "double") {
            const bedrockId = doubleSlabsMapping.get(id);
            if (!bedrockId) {
                throw new Error("Failed to get bedrock id for block " + id + " in double slabs type mapping");
            }
            return {
                name: bedrockId,
                properties: {
                    "minecraft:vertical_half": "bottom",
                },
            };
        } else if (id === "minecraft:stone_slab") {
            // Bedrock really needs to clarify stone slabs are normal,
            // what about the rest of the slabs, not normal lol??????????
            return {
                name: "minecraft:normal_stone_slab",
                properties: {
                    "minecraft:vertical_half": properties.type,
                },
            };
        } else {
            return {
                name: id,
                properties: {
                    "minecraft:vertical_half": properties.type,
                },
            };
        }
    }
}
