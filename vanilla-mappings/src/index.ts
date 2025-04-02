import * as fs from "fs";
import * as path from "path";
import { ButtonTypeConverter } from "./BlockTypeConverters/Button";
import { BlockTypeConverterBase, EmptyBlockTypeConverter } from "./BlockTypeConverters/BaseClass";
import { DoorTypeConverter } from "./BlockTypeConverters/Door";
import { FenceGateTypeConverter } from "./BlockTypeConverters/FenceGate";
import { CeilingHangingSignTypeConverter, StandingSignTypeConverter, WallHangingSignTypeConverter, WallSignTypeConverter } from "./BlockTypeConverters/Signs";
import { RedstoneWireTypeConverter } from "./BlockTypeConverters/RedstoneWire";
import { javaBlocks, bedrockBlocks, scriptDir } from "./Data/MinecraftBlocks";
import { JavaBlock, BlockType, MojangBlocks } from "./Data/Schema";
import { FlowerPotTypeConverter } from "./BlockTypeConverters/FlowerPot";
import { SkullTypeConverter, WallSkullTypeConverter } from "./BlockTypeConverters/Skull";
import { LeavesTypeConverter } from "./BlockTypeConverters/Leaves";
import { RotatedPillarTypeConverter } from "./BlockTypeConverters/RotatedPillar";
import { WeightedPressurePlateTypeConverter, PressurePlateTypeConverter } from "./BlockTypeConverters/PressurePlate";
import { BedTypeConverter } from "./BlockTypeConverters/Bed";
import { WallTypeConverter } from "./BlockTypeConverters/Wall";
import { BambooSaplingTypeConverter, SaplingTypeConverter } from "./BlockTypeConverters/Sapling";
import { CoralWallFanTypeConverter } from "./BlockTypeConverters/CoralWallFan";
import { DaylightDetectorTypeConverter } from "./BlockTypeConverters/DaylightDetector";
import { KelpTypeConverter } from "./BlockTypeConverters/Kelp";
import { CauldronTypeConverter } from "./BlockTypeConverters/Cauldron";
import { JackOLanternTypeConverter, PumpkinTypeConverter } from "./BlockTypeConverters/Pumpkin";
import { TorchTypeConverter } from "./BlockTypeConverters/Torch";
import { TwistingVinesTypeConverter } from "./BlockTypeConverters/TwistingVines";
import { WeepingVinesTypeConverter } from "./BlockTypeConverters/WeepingVines";
import { SlabTypeConverter } from "./BlockTypeConverters/Slab";
import { StairsTypeConverter } from "./BlockTypeConverters/Stairs";
import { TrapdoorTypeConverter } from "./BlockTypeConverters/Trapdoor";
import { RailTypeConverter } from "./BlockTypeConverters/Rails";
import { AmethystClusterTypeConverter } from "./BlockTypeConverters/AmethystCluster";
import { AnvilTypeConverter } from "./BlockTypeConverters/Anvil";
import { PistonTypeConverter } from "./BlockTypeConverters/Pistons";
import { BaseCoralFanTypeConverter } from "./BlockTypeConverters/BaseCoralFan";
import { AttachedStemTypeConverter } from "./BlockTypeConverters/AttachedStem";
import { BambooStalkTypeConverter } from "./BlockTypeConverters/Bamboo";
import { BannerTypeConverter } from "./BlockTypeConverters/Banner";
import { BarrelTypeConverter } from "./BlockTypeConverters/Barrel";
import { BeehiveTypeConverter } from "./BlockTypeConverters/Beehive";
import { BeetrootTypeConverter } from "./BlockTypeConverters/Beetroot";
import { BellTypeConverter } from "./BlockTypeConverters/Bell";
import { BigDripleafTypeConverter } from "./BlockTypeConverters/BigDripleaf";
import { BigDripleafStemTypeConverter } from "./BlockTypeConverters/BigDripleafStem";
import { BlastFurnaceTypeConverter } from "./BlockTypeConverters/BlastFurnace";
import { BrewingStandTypeConverter } from "./BlockTypeConverters/BrewingStand";
import { BrushableTypeConverter } from "./BlockTypeConverters/Brushable";
import { BubbleColumnTypeConverter } from "./BlockTypeConverters/BubbleColumn";
import { CactusTypeConverter } from "./BlockTypeConverters/Cactus";
import { CakeTypeConverter } from "./BlockTypeConverters/Cake";
import { CalibratedSculkSensorTypeConverter } from "./BlockTypeConverters/CalibratedSculkSensor";
import { CampfireTypeConverter } from "./BlockTypeConverters/Campfire";
import { CandleTypeConverter } from "./BlockTypeConverters/Candle";
import { CandleCakeTypeConverter } from "./BlockTypeConverters/CandleCake";
import { CarrotTypeConverter } from "./BlockTypeConverters/Carrot";
import { CaveVinesTypeConverter } from "./BlockTypeConverters/CaveVines";
import { CaveVinesPlantTypeConverter } from "./BlockTypeConverters/CaveVinesPlant";
import { ChainTypeConverter } from "./BlockTypeConverters/Chain";
import { ChestTypeConverter } from "./BlockTypeConverters/Chest";
import { ChiseledBookShelfTypeConverter } from "./BlockTypeConverters/ChiseledBookShelf";
import { ChorusFlowerTypeConverter } from "./BlockTypeConverters/ChorusFlower";
import { CocoaTypeConverter } from "./BlockTypeConverters/Cocoa";
import { CommandTypeConverter } from "./BlockTypeConverters/Command";
import { ComparatorTypeConverter } from "./BlockTypeConverters/Comparator";
import { ComposterTypeConverter } from "./BlockTypeConverters/Composter";
import { CopperBulbBlockTypeConverter } from "./BlockTypeConverters/CopperBulbBlock";
import { CoralFanTypeConverter } from "./BlockTypeConverters/CoralFan";
import { CrafterTypeConverter } from "./BlockTypeConverters/Crafter";
import { CreakingHeartTypeConverter } from "./BlockTypeConverters/CreakingHeart";
import { CropTypeConverter } from "./BlockTypeConverters/Crop";
import { DecoratedPotTypeConverter } from "./BlockTypeConverters/DecoratedPot";
import { DispenserTypeConverter } from "./BlockTypeConverters/Dispenser";
import { DoublePlantTypeConverter } from "./BlockTypeConverters/DoublePlant";
import { DropperTypeConverter } from "./BlockTypeConverters/Dropper";
import { EnderChestTypeConverter } from "./BlockTypeConverters/EnderChest";
import { EndPortalFrameTypeConverter } from "./BlockTypeConverters/EndPortalFrame";
import { EndRodTypeConverter } from "./BlockTypeConverters/EndRod";
import { FarmTypeConverter } from "./BlockTypeConverters/Farm";
import { FireTypeConverter } from "./BlockTypeConverters/Fire";
import { FrostedIceTypeConverter } from "./BlockTypeConverters/FrostedIce";
import { FurnaceTypeConverter } from "./BlockTypeConverters/Furnace";
import { GlazedTerracottaTypeConverter } from "./BlockTypeConverters/GlazedTerracotta";
import { GlowLichenTypeConverter } from "./BlockTypeConverters/GlowLichen";
import { GrindstoneTypeConverter } from "./BlockTypeConverters/Grindstone";
import { HangingMossTypeConverter } from "./BlockTypeConverters/HangingMoss";
import { HayTypeConverter } from "./BlockTypeConverters/Hay";
import { HopperTypeConverter } from "./BlockTypeConverters/Hopper";
import { HugeMushroomTypeConverter } from "./BlockTypeConverters/HugeMushroom";
import { InfestedRotatedPillarTypeConverter } from "./BlockTypeConverters/InfestedRotatedPillar";
import { JigsawTypeConverter } from "./BlockTypeConverters/Jigsaw";
import { LadderTypeConverter } from "./BlockTypeConverters/Ladder";
import { LanternTypeConverter } from "./BlockTypeConverters/Lantern";
import { LecternTypeConverter } from "./BlockTypeConverters/Lectern";
import { LeverTypeConverter } from "./BlockTypeConverters/Lever";
import { LightTypeConverter } from "./BlockTypeConverters/Light";
import { LightningRodTypeConverter } from "./BlockTypeConverters/LightningRod";
import { LiquidTypeConverter } from "./BlockTypeConverters/Liquid";
import { LoomTypeConverter } from "./BlockTypeConverters/Loom";
import { MangroveLeavesTypeConverter } from "./BlockTypeConverters/MangroveLeaves";
import { MangrovePropaguleTypeConverter } from "./BlockTypeConverters/MangrovePropagule";
import { MossyCarpetTypeConverter } from "./BlockTypeConverters/MossyCarpet";
import { MultifaceTypeConverter } from "./BlockTypeConverters/Multiface";
import { NetherPortalTypeConverter } from "./BlockTypeConverters/NetherPortal";
import { NetherWartTypeConverter } from "./BlockTypeConverters/NetherWart";
import { ObserverTypeConverter } from "./BlockTypeConverters/Observer";
import { ParticleLeavesTypeConverter } from "./BlockTypeConverters/ParticleLeaves";
import { PinkPetalsTypeConverter } from "./BlockTypeConverters/PinkPetals";
import { PitcherCropTypeConverter } from "./BlockTypeConverters/PitcherCrop";
import { PointedDripstoneTypeConverter } from "./BlockTypeConverters/PointedDripstone";
import { PotatoTypeConverter } from "./BlockTypeConverters/Potato";
import { RedstoneTorchTypeConverter } from "./BlockTypeConverters/RedstoneTorch";
import { RepeaterTypeConverter } from "./BlockTypeConverters/Repeater";
import { RespawnAnchorTypeConverter } from "./BlockTypeConverters/RespawnAnchor";
import { ScaffoldingTypeConverter } from "./BlockTypeConverters/Scaffolding";
import { SculkCatalystTypeConverter } from "./BlockTypeConverters/SculkCatalyst";
import { SculkSensorTypeConverter } from "./BlockTypeConverters/SculkSensor";
import { SculkShriekerTypeConverter } from "./BlockTypeConverters/SculkShrieker";
import { SculkVeinTypeConverter } from "./BlockTypeConverters/SculkVein";
import { SeaPickleTypeConverter } from "./BlockTypeConverters/SeaPickle";
import { SmallDripleafTypeConverter } from "./BlockTypeConverters/SmallDripleaf";
import { SmokerTypeConverter } from "./BlockTypeConverters/Smoker";
import { SnifferEggTypeConverter } from "./BlockTypeConverters/SnifferEgg";
import { StemTypeConverter } from "./BlockTypeConverters/Stem";
import { StonecutterTypeConverter } from "./BlockTypeConverters/Stonecutter";
import { StructureTypeConverter } from "./BlockTypeConverters/Structure";
import { SugarCaneTypeConverter } from "./BlockTypeConverters/SugarCane";
import { SweetBerryBushTypeConverter } from "./BlockTypeConverters/SweetBerryBush";
import { TallFlowerTypeConverter } from "./BlockTypeConverters/TallFlower";
import { TallSeagrassTypeConverter } from "./BlockTypeConverters/TallSeagrass";
import { TntTypeConverter } from "./BlockTypeConverters/Tnt";
import { TorchflowerCropTypeConverter } from "./BlockTypeConverters/TorchflowerCrop";
import { TrappedChestTypeConverter } from "./BlockTypeConverters/TrappedChest";
import { TrialSpawnerTypeConverter } from "./BlockTypeConverters/TrialSpawner";
import { TripwireTypeConverter } from "./BlockTypeConverters/Tripwire";
import { TripWireHookTypeConverter } from "./BlockTypeConverters/TripWireHook";
import { TurtleEggTypeConverter } from "./BlockTypeConverters/TurtleEgg";
import { VaultTypeConverter } from "./BlockTypeConverters/Vault";
import { VineTypeConverter } from "./BlockTypeConverters/Vine";
import { WallBannerTypeConverter } from "./BlockTypeConverters/WallBanner";
import { WeatheringCopperBulbTypeConverter } from "./BlockTypeConverters/WeatheringCopperBulb";
import { WeatheringCopperDoorTypeConverter } from "./BlockTypeConverters/WeatheringCopperDoor";
import { WeatheringCopperStairTypeConverter } from "./BlockTypeConverters/WeatheringCopperStair";
import { WeatheringCopperTrapDoorTypeConverter } from "./BlockTypeConverters/WeatheringCopperTrapDoor";
import { WitherSkullTypeConverter } from "./BlockTypeConverters/WitherSkull";

function getJavaBlockTypes(javaBlocks: Record<string, JavaBlock>): Record<string, BlockType> {
    const blockTypes: Record<string, BlockType> = {};

    for (const blockId in javaBlocks) {
        const block: JavaBlock = javaBlocks[blockId];

        if (block.definition.type in blockTypes === false && block.properties) {
            blockTypes[block.definition.type] = {
                properties: block.properties,
            };
        }
    }

    return blockTypes;
}

function getJavaBlockProperties(javaBlocks: Record<string, JavaBlock>): Record<string, string[]> {
    const blockProperties: Record<string, string[]> = {};
    for (const blockId in javaBlocks) {
        const block: JavaBlock = javaBlocks[blockId];

        if (block.properties) {
            for (const property in block.properties) {
                if (blockProperties[property] === undefined) {
                    blockProperties[property] = [];
                }
                for (const value of block.properties[property]) {
                    if (blockProperties[property].includes(value) === false) {
                        blockProperties[property].push(value);
                    }
                }
            }
        }
    }
    return blockProperties;
}

function createBlocksJ2B(
    javaBlocks: Record<string, JavaBlock>,
    bedrockBlocks: MojangBlocks,
    blockTypeConverters: Map<string, BlockTypeConverterBase>
): Record<string, string> {
    const blocksJ2B: Record<string, string> = {};
    for (const blockId in javaBlocks) {
        const block: JavaBlock = javaBlocks[blockId];
        const { definition, states } = block;
        const blockTypeConverter = blockTypeConverters.get(definition.type);

        if (!blockTypeConverter) {
            console.error(`[BlockJ2B] No block type converter found for block type '${definition.type}'`);
            continue;
        }

        for (const state of states) {
            if (state.properties) {
                const bedrockBlock = blockTypeConverter.convert(blockId, state.properties);

                if (!bedrockBlocks.data_items.find((item) => item.name === bedrockBlock.name)) {
                    console.error(`[BlockJ2B] No bedrock block found for block id '${blockId}' (${definition.type}, ${blockTypeConverter.constructor.name})`);
                    continue;
                }

                // Required format: minecraft:block[key=value,key=value]
                const javaStateString = Object.entries(state.properties)
                    .map(([key, value]) => `${key}=${value}`)
                    .join(",");
                const bedrockStateString = Object.entries(bedrockBlock.properties)
                    .map(([key, value]) => `${key}=${value}`)
                    .join(",");
                blocksJ2B[blockId + "[" + javaStateString + "]"] = bedrockBlock.name + "[" + bedrockStateString + "]";
            } else {
                const bedrockBlock = blockTypeConverter.convert(blockId, {});
                const bedrockStateString = Object.entries(bedrockBlock.properties)
                    .map(([key, value]) => `${key}=${value}`)
                    .join(",");
                blocksJ2B[blockId + "[]"] = bedrockBlock.name + "[" + bedrockStateString + "]";
            }
        }
    }
    return blocksJ2B;
}

function assertBlockTypeConverters(converters: Map<string, BlockTypeConverterBase>, javaBlocks: Record<string, JavaBlock>) {
    const blockTypes = getJavaBlockTypes(javaBlocks);
    for (const blockType in blockTypes) {
        if (!converters.has(blockType)) {
            console.warn(`[Registry] Block type converter '${blockType}' is not registered in BlockTypeConverters map`);
        }
    }
}

function main() {
    // Load data files
    const blockTypeConverters = new Map<string, BlockTypeConverterBase>()
        .set("minecraft:button", new ButtonTypeConverter())
        .set("minecraft:door", new DoorTypeConverter())
        .set("minecraft:fence_gate", new FenceGateTypeConverter())

        .set("minecraft:standing_sign", new StandingSignTypeConverter())
        .set("minecraft:wall_sign", new WallSignTypeConverter())
        .set("minecraft:wall_hanging_sign", new WallHangingSignTypeConverter())
        .set("minecraft:ceiling_hanging_sign", new CeilingHangingSignTypeConverter())

        .set("minecraft:redstone_wire", new RedstoneWireTypeConverter())

        .set("minecraft:flower_pot", new FlowerPotTypeConverter())

        .set("minecraft:skull", new SkullTypeConverter())
        .set("minecraft:player_head", new SkullTypeConverter())
        .set("minecraft:wall_skull", new WallSkullTypeConverter())
        .set("minecraft:piglinwallskull", new WallSkullTypeConverter())
        .set("minecraft:player_wall_head", new WallSkullTypeConverter())
        .set("minecraft:wither_wall_skull", new WallSkullTypeConverter())

        .set("minecraft:leaves", new LeavesTypeConverter())

        .set("minecraft:rotated_pillar", new RotatedPillarTypeConverter())

        .set("minecraft:weighted_pressure_plate", new WeightedPressurePlateTypeConverter())
        .set("minecraft:pressure_plate", new PressurePlateTypeConverter())
        .set("minecraft:bed", new BedTypeConverter())

        .set("minecraft:wall", new WallTypeConverter())
        .set("minecraft:coral_wall_fan", new CoralWallFanTypeConverter())
        .set("minecraft:base_coral_wall_fan", new CoralWallFanTypeConverter())

        .set("minecraft:daylight_detector", new DaylightDetectorTypeConverter())

        .set("minecraft:sapling", new SaplingTypeConverter())
        .set("minecraft:bamboo_sapling", new BambooSaplingTypeConverter())

        .set("minecraft:cauldron", new CauldronTypeConverter())
        .set("minecraft:lava_cauldron", new CauldronTypeConverter())
        .set("minecraft:layered_cauldron", new CauldronTypeConverter())

        .set("minecraft:pumpkin", new PumpkinTypeConverter())
        .set("minecraft:jack_o_lantern", new JackOLanternTypeConverter())

        .set("minecraft:torch", new TorchTypeConverter())
        .set("minecraft:wall_torch", new TorchTypeConverter())
        .set("minecraft:redstone_wall_torch", new TorchTypeConverter())

        .set("minecraft:kelp", new KelpTypeConverter())
        .set("minecraft:kelp_plant", new KelpTypeConverter())

        .set("minecraft:twisting_vines", new TwistingVinesTypeConverter())
        .set("minecraft:twisting_vines_plant", new TwistingVinesTypeConverter())
        .set("minecraft:weeping_vines", new WeepingVinesTypeConverter())
        .set("minecraft:weeping_vines_plant", new WeepingVinesTypeConverter())

        .set("minecraft:slab", new SlabTypeConverter())
        .set("minecraft:weathering_copper_slab", new SlabTypeConverter())

        .set("minecraft:stair", new StairsTypeConverter())
        .set("minecraft:trapdoor", new TrapdoorTypeConverter())

        .set("minecraft:rail", new RailTypeConverter())
        .set("minecraft:detector_rail", new RailTypeConverter())
        .set("minecraft:powered_rail", new RailTypeConverter())

        .set("minecraft:amethyst_cluster", new AmethystClusterTypeConverter())

        .set("minecraft:anvil", new AnvilTypeConverter())

        .set("minecraft:moving_piston", new EmptyBlockTypeConverter())
        .set("minecraft:piston_base", new PistonTypeConverter())
        .set("minecraft:piston_head", new PistonTypeConverter())

        .set("minecraft:base_coral_fan", new BaseCoralFanTypeConverter())

        .set("minecraft:attached_stem", new AttachedStemTypeConverter())

        .set("minecraft:bamboo_stalk", new BambooStalkTypeConverter())
        .set("minecraft:barrel", new BarrelTypeConverter())
        .set("minecraft:beehive", new BeehiveTypeConverter())
        .set("minecraft:beetroot", new BeetrootTypeConverter())
        .set("minecraft:bell", new BellTypeConverter())
        .set("minecraft:big_dripleaf", new BigDripleafTypeConverter())
        .set("minecraft:big_dripleaf_stem", new BigDripleafStemTypeConverter())
        .set("minecraft:banner", new BannerTypeConverter())
        .set("minecraft:candle", new CandleTypeConverter())
        .set("minecraft:candle_cake", new CandleCakeTypeConverter())
        .set("minecraft:glazed_terracotta", new GlazedTerracottaTypeConverter())
        .set("minecraft:wall_banner", new WallBannerTypeConverter())
        .set("minecraft:blast_furnace", new BlastFurnaceTypeConverter())
        .set("minecraft:coral_fan", new CoralFanTypeConverter())
        .set("minecraft:brewing_stand", new BrewingStandTypeConverter())
        .set("minecraft:huge_mushroom", new HugeMushroomTypeConverter())
        .set("minecraft:bubble_column", new BubbleColumnTypeConverter())
        .set("minecraft:cactus", new CactusTypeConverter())
        .set("minecraft:cake", new CakeTypeConverter())
        .set("minecraft:calibrated_sculk_sensor", new CalibratedSculkSensorTypeConverter())
        .set("minecraft:campfire", new CampfireTypeConverter())
        .set("minecraft:carrot", new CarrotTypeConverter())
        .set("minecraft:cave_vines", new CaveVinesTypeConverter())
        .set("minecraft:cave_vines_plant", new CaveVinesPlantTypeConverter())
        .set("minecraft:chain", new ChainTypeConverter())
        .set("minecraft:command", new CommandTypeConverter())
        .set("minecraft:particle_leaves", new ParticleLeavesTypeConverter())
        .set("minecraft:chest", new ChestTypeConverter())
        .set("minecraft:chiseled_book_shelf", new ChiseledBookShelfTypeConverter())
        .set("minecraft:chorus_flower", new ChorusFlowerTypeConverter())
        .set("minecraft:cocoa", new CocoaTypeConverter())
        .set("minecraft:comparator", new ComparatorTypeConverter())
        .set("minecraft:composter", new ComposterTypeConverter())
        .set("minecraft:weathering_copper_bulb", new WeatheringCopperBulbTypeConverter())
        .set("minecraft:weathering_copper_door", new WeatheringCopperDoorTypeConverter())
        .set("minecraft:weathering_copper_trap_door", new WeatheringCopperTrapDoorTypeConverter())
        .set("minecraft:crafter", new CrafterTypeConverter())
        .set("minecraft:creaking_heart", new CreakingHeartTypeConverter())
        .set("minecraft:weathering_copper_stair", new WeatheringCopperStairTypeConverter())
        .set("minecraft:decorated_pot", new DecoratedPotTypeConverter())
        .set("minecraft:dispenser", new DispenserTypeConverter())
        .set("minecraft:dropper", new DropperTypeConverter())
        .set("minecraft:end_portal_frame", new EndPortalFrameTypeConverter())
        .set("minecraft:end_rod", new EndRodTypeConverter())
        .set("minecraft:ender_chest", new EnderChestTypeConverter())
        .set("minecraft:farm", new FarmTypeConverter())
        .set("minecraft:fire", new FireTypeConverter())
        .set("minecraft:frosted_ice", new FrostedIceTypeConverter())
        .set("minecraft:furnace", new FurnaceTypeConverter())
        .set("minecraft:glow_lichen", new GlowLichenTypeConverter())
        .set("minecraft:grindstone", new GrindstoneTypeConverter())
        .set("minecraft:hay", new HayTypeConverter())
        .set("minecraft:hopper", new HopperTypeConverter())
        .set("minecraft:infested_rotated_pillar", new InfestedRotatedPillarTypeConverter())
        .set("minecraft:jigsaw", new JigsawTypeConverter())
        .set("minecraft:ladder", new LadderTypeConverter())
        .set("minecraft:lantern", new LanternTypeConverter())
        .set("minecraft:double_plant", new DoublePlantTypeConverter())
        .set("minecraft:liquid", new LiquidTypeConverter())
        .set("minecraft:lectern", new LecternTypeConverter())
        .set("minecraft:lever", new LeverTypeConverter())
        .set("minecraft:light", new LightTypeConverter())
        .set("minecraft:lightning_rod", new LightningRodTypeConverter())
        .set("minecraft:tall_flower", new TallFlowerTypeConverter())
        .set("minecraft:loom", new LoomTypeConverter())
        .set("minecraft:mangrove_leaves", new MangroveLeavesTypeConverter())
        .set("minecraft:mangrove_propagule", new MangrovePropaguleTypeConverter())
        .set("minecraft:stem", new StemTypeConverter())
        .set("minecraft:nether_portal", new NetherPortalTypeConverter())
        .set("minecraft:nether_wart", new NetherWartTypeConverter())
        .set("minecraft:observer", new ObserverTypeConverter())
        .set("minecraft:hanging_moss", new HangingMossTypeConverter())
        .set("minecraft:mossy_carpet", new MossyCarpetTypeConverter())
        .set("minecraft:pink_petals", new PinkPetalsTypeConverter())
        .set("minecraft:pitcher_crop", new PitcherCropTypeConverter())
        .set("minecraft:pointed_dripstone", new PointedDripstoneTypeConverter())
        .set("minecraft:potato", new PotatoTypeConverter())
        .set("minecraft:redstone_torch", new RedstoneTorchTypeConverter())
        .set("minecraft:repeater", new RepeaterTypeConverter())
        .set("minecraft:multiface", new MultifaceTypeConverter())
        .set("minecraft:respawn_anchor", new RespawnAnchorTypeConverter())
        .set("minecraft:scaffolding", new ScaffoldingTypeConverter())
        .set("minecraft:sculk_catalyst", new SculkCatalystTypeConverter())
        .set("minecraft:sculk_sensor", new SculkSensorTypeConverter())
        .set("minecraft:sculk_shrieker", new SculkShriekerTypeConverter())
        .set("minecraft:sculk_vein", new SculkVeinTypeConverter())
        .set("minecraft:sea_pickle", new SeaPickleTypeConverter())
        .set("minecraft:small_dripleaf", new SmallDripleafTypeConverter())
        .set("minecraft:smoker", new SmokerTypeConverter())
        .set("minecraft:sniffer_egg", new SnifferEggTypeConverter())
        .set("minecraft:stonecutter", new StonecutterTypeConverter())
        .set("minecraft:structure", new StructureTypeConverter())
        .set("minecraft:sugar_cane", new SugarCaneTypeConverter())
        .set("minecraft:brushable", new BrushableTypeConverter())
        .set("minecraft:sweet_berry_bush", new SweetBerryBushTypeConverter())
        .set("minecraft:tall_seagrass", new TallSeagrassTypeConverter())
        .set("minecraft:tnt", new TntTypeConverter())
        .set("minecraft:torchflower_crop", new TorchflowerCropTypeConverter())
        .set("minecraft:trapped_chest", new TrappedChestTypeConverter())
        .set("minecraft:trial_spawner", new TrialSpawnerTypeConverter())
        .set("minecraft:tripwire", new TripwireTypeConverter())
        .set("minecraft:trip_wire_hook", new TripWireHookTypeConverter())
        .set("minecraft:turtle_egg", new TurtleEggTypeConverter())
        .set("minecraft:vault", new VaultTypeConverter())
        .set("minecraft:vine", new VineTypeConverter())
        .set("minecraft:copper_bulb_block", new CopperBulbBlockTypeConverter())
        .set("minecraft:crop", new CropTypeConverter())
        .set("minecraft:wither_skull", new WitherSkullTypeConverter())

        // Following bedrock blocks has zero block properties, skipping.
        .set("minecraft:fence", new EmptyBlockTypeConverter())
        .set("minecraft:block", new EmptyBlockTypeConverter())
        .set("minecraft:air", new EmptyBlockTypeConverter())
        .set("minecraft:flower", new EmptyBlockTypeConverter())
        .set("minecraft:amethyst", new EmptyBlockTypeConverter())
        .set("minecraft:azalea", new EmptyBlockTypeConverter())
        .set("minecraft:barrier", new EmptyBlockTypeConverter())
        .set("minecraft:beacon", new EmptyBlockTypeConverter())
        .set("minecraft:wool_carpet", new EmptyBlockTypeConverter())
        .set("minecraft:concrete_powder", new EmptyBlockTypeConverter())
        .set("minecraft:shulker_box", new EmptyBlockTypeConverter())
        .set("minecraft:stained_glass", new EmptyBlockTypeConverter())
        .set("minecraft:stained_glass_pane", new EmptyBlockTypeConverter())
        .set("minecraft:half_transparent", new EmptyBlockTypeConverter())
        .set("minecraft:coral_plant", new EmptyBlockTypeConverter())
        .set("minecraft:coral", new EmptyBlockTypeConverter())
        .set("minecraft:mushroom", new EmptyBlockTypeConverter())
        .set("minecraft:budding_amethyst", new EmptyBlockTypeConverter())
        .set("minecraft:cartography_table", new EmptyBlockTypeConverter())
        .set("minecraft:weathering_copper_full", new EmptyBlockTypeConverter())
        .set("minecraft:chorus_plant", new EmptyBlockTypeConverter())
        .set("minecraft:eyeblossom", new EmptyBlockTypeConverter())
        .set("minecraft:drop_experience", new EmptyBlockTypeConverter())
        .set("minecraft:conduit", new EmptyBlockTypeConverter())
        .set("minecraft:web", new EmptyBlockTypeConverter())
        .set("minecraft:weathering_copper_grate", new EmptyBlockTypeConverter())
        .set("minecraft:crafting_table", new EmptyBlockTypeConverter())
        .set("minecraft:fungus", new EmptyBlockTypeConverter())
        .set("minecraft:nylium", new EmptyBlockTypeConverter())
        .set("minecraft:roots", new EmptyBlockTypeConverter())
        .set("minecraft:crying_obsidian", new EmptyBlockTypeConverter())
        .set("minecraft:base_coral_plant", new EmptyBlockTypeConverter())
        .set("minecraft:dead_bush", new EmptyBlockTypeConverter())
        .set("minecraft:dirt_path", new EmptyBlockTypeConverter())
        .set("minecraft:redstone_ore", new EmptyBlockTypeConverter())
        .set("minecraft:dragon_egg", new EmptyBlockTypeConverter())
        .set("minecraft:enchantment_table", new EmptyBlockTypeConverter())
        .set("minecraft:end_gateway", new EmptyBlockTypeConverter())
        .set("minecraft:end_portal", new EmptyBlockTypeConverter())
        .set("minecraft:tall_grass", new EmptyBlockTypeConverter())
        .set("minecraft:fletching_table", new EmptyBlockTypeConverter())
        .set("minecraft:frogspawn", new EmptyBlockTypeConverter())
        .set("minecraft:transparent", new EmptyBlockTypeConverter())
        .set("minecraft:grass", new EmptyBlockTypeConverter())
        .set("minecraft:colored_falling", new EmptyBlockTypeConverter())
        .set("minecraft:hanging_roots", new EmptyBlockTypeConverter())
        .set("minecraft:heavy_core", new EmptyBlockTypeConverter())
        .set("minecraft:honey", new EmptyBlockTypeConverter())
        .set("minecraft:ice", new EmptyBlockTypeConverter())
        .set("minecraft:infested", new EmptyBlockTypeConverter())
        .set("minecraft:jukebox", new EmptyBlockTypeConverter())
        .set("minecraft:mangrove_roots", new EmptyBlockTypeConverter())
        .set("minecraft:waterlily", new EmptyBlockTypeConverter())
        .set("minecraft:magma", new EmptyBlockTypeConverter())
        .set("minecraft:bonemealable_feature_placer", new EmptyBlockTypeConverter())
        .set("minecraft:carpet", new EmptyBlockTypeConverter())
        .set("minecraft:mud", new EmptyBlockTypeConverter())
        .set("minecraft:mycelium", new EmptyBlockTypeConverter())
        .set("minecraft:nether_sprouts", new EmptyBlockTypeConverter())
        .set("minecraft:netherrack", new EmptyBlockTypeConverter())
        .set("minecraft:powder_snow", new EmptyBlockTypeConverter())
        .set("minecraft:powered", new EmptyBlockTypeConverter())
        .set("minecraft:redstone_lamp", new EmptyBlockTypeConverter())
        .set("minecraft:rooted_dirt", new EmptyBlockTypeConverter())
        .set("minecraft:sculk", new EmptyBlockTypeConverter())
        .set("minecraft:seagrass", new EmptyBlockTypeConverter())
        .set("minecraft:slime", new EmptyBlockTypeConverter())
        .set("minecraft:smithing_table", new EmptyBlockTypeConverter())
        .set("minecraft:snow_layer", new EmptyBlockTypeConverter())
        .set("minecraft:soul_fire", new EmptyBlockTypeConverter())
        .set("minecraft:soul_sand", new EmptyBlockTypeConverter())
        .set("minecraft:spawner", new EmptyBlockTypeConverter())
        .set("minecraft:sponge", new EmptyBlockTypeConverter())
        .set("minecraft:spore_blossom", new EmptyBlockTypeConverter())
        .set("minecraft:structure_void", new EmptyBlockTypeConverter())
        .set("minecraft:target", new EmptyBlockTypeConverter())
        .set("minecraft:tinted_glass", new EmptyBlockTypeConverter())
        .set("minecraft:waterlogged_transparent", new EmptyBlockTypeConverter())
        .set("minecraft:wet_sponge", new EmptyBlockTypeConverter())
        .set("minecraft:wither_rose", new EmptyBlockTypeConverter())
        .set("minecraft:note", new EmptyBlockTypeConverter())
        .set("minecraft:iron_bars", new EmptyBlockTypeConverter())
        .set("minecraft:snowy_dirt", new EmptyBlockTypeConverter());

    // Assert
    assertBlockTypeConverters(blockTypeConverters, javaBlocks);

    // Convert
    const blocksJ2B: Record<string, string> = createBlocksJ2B(javaBlocks, bedrockBlocks, blockTypeConverters);
    fs.writeFileSync(path.join(scriptDir, "../cli/data/blocksJ2B.json"), JSON.stringify(blocksJ2B, null, 2));
    fs.writeFileSync(path.join(scriptDir, "../nbt-to-mcstructure/blocksJ2B.json"), JSON.stringify(blocksJ2B, null, 2));
}

main();
