import {
    BedrockStates,
    CauldronStates,
    ChiseledQuartzBlockStates,
    PurpurBlockStates,
    QuartzBlockStates,
    SeagrassStates,
    SmoothQuartzStates,
    SoulFireStates,
} from "@minecraft/vanilla-data";
import { bedrockBlocks } from "../Data/MinecraftBlocks";

/**
 * Java to Bedrock block id mapping
 */
export const blockIdsMap = new Map<string, string>()
    .set("minecraft:cave_air", "minecraft:air")
    .set("minecraft:void_air", "minecraft:air")
    .set("minecraft:bricks", "minecraft:brick_block")
    .set("minecraft:nether_bricks", "minecraft:nether_brick")
    .set("minecraft:red_nether_bricks", "minecraft:red_nether_brick")
    .set("minecraft:note_block", "minecraft:noteblock")
    .set("minecraft:cobweb", "minecraft:web")
    .set("minecraft:dead_bush", "minecraft:deadbush")
    .set("minecraft:dirt_path", "minecraft:grass_path")
    .set("minecraft:end_stone_bricks", "minecraft:end_bricks")
    .set("minecraft:stonecutter", "minecraft:stonecutter_block")
    .set("minecraft:frogspawn", "minecraft:frog_spawn")
    .set("minecraft:kelp_plant", "minecraft:kelp")
    .set("minecraft:lily_pad", "minecraft:waterlily")
    .set("minecraft:magma_block", "minecraft:magma")
    .set("minecraft:melon", "minecraft:melon_block")
    .set("minecraft:nether_quartz_ore", "minecraft:quartz_ore")
    .set("minecraft:rooted_dirt", "minecraft:dirt_with_roots")
    .set("minecraft:shulker_box", "minecraft:undyed_shulker_box")
    .set("minecraft:slime_block", "minecraft:slime")
    .set("minecraft:snow_block", "minecraft:snow")
    .set("minecraft:spawner", "minecraft:mob_spawner")
    .set("minecraft:waxed_copper_block", "minecraft:waxed_copper")
    .set("minecraft:terracotta", "minecraft:hardened_clay");

// List of bedrock blocks that have been officially made unobtainable.
const unobtainableBlocks = new Set<string>()
    .add("minecraft:glowingobsidian")
    .add("minecraft:info_update")
    .add("minecraft:info_update2")
    .add("minecraft:invisible_bedrock")
    .add("minecraft:reserved6")
    .add("minecraft:stonecutter")
    .add("minecraft:netherreactor")
    .add("minecraft:end_gateway");

export interface BedrockBlock<T extends object = object> {
    name: string;
    properties: T;
}

export abstract class BlockTypeConverterBase {
    public abstract convert(id: string, properties: object): BedrockBlock;
}

export class EmptyBlockTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: object): BedrockBlock {
        const typeId = blockIdsMap.get(id) ?? id;
        const block: BedrockBlock = {
            name: typeId,
            properties: {},
        };

        switch (typeId) {
            case "minecraft:bedrock":
                block.properties = {
                    infiniburn_bit: false,
                } satisfies Required<BedrockStates>;
                break;

            case "minecraft:cauldron":
                block.properties = {
                    cauldron_liquid: "water",
                    fill_level: 0,
                } satisfies Required<CauldronStates>;
                break;

            case "minecraft:chiseled_quartz_block":
                block.properties = {
                    pillar_axis: "y",
                } satisfies Required<ChiseledQuartzBlockStates>;
                break;

            case "minecraft:purpur_block":
                block.properties = {
                    pillar_axis: "y",
                } satisfies Required<PurpurBlockStates>;
                break;

            case "minecraft:quartz_block":
                block.properties = {
                    pillar_axis: "y",
                } satisfies Required<QuartzBlockStates>;
                break;

            case "minecraft:seagrass":
                block.properties = {
                    sea_grass_type: "default",
                } satisfies Required<SeagrassStates>;
                break;

            case "minecraft:smooth_quartz":
                block.properties = {
                    pillar_axis: "y",
                } satisfies Required<SmoothQuartzStates>;
                break;

            case "minecraft:soul_fire":
                block.properties = {
                    age: 0,
                } satisfies Required<SoulFireStates>;
                break;

            default:
                break;
        }

        this.assert(block);
        return block;
    }
    public assert(block: BedrockBlock): void {
        // Ignore unobtainable blocks
        if (unobtainableBlocks.has(block.name)) {
            return;
        }
        // Actually obtainable blocks
        const bedrockBlock = bedrockBlocks.data_items.find((item) => item.name === block.name);
        if (!bedrockBlock) {
            throw new Error(`Could not find bedrock block for ${block.name}`);
        }
        if (bedrockBlock.properties.length > 0) {
            const missingProperties = bedrockBlock.properties.filter((v) => !block.properties.hasOwnProperty(v.name));
            if (missingProperties.length > 0) {
                throw new Error(`Missing properties for '${block.name}': ${missingProperties.map((v) => v.name).join(", ")}`);
            }
        }
    }
}
