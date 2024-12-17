/**
 * Java to Bedrock block id mapping
 */
export const blockIdsMap = new Map<string, string>()
    .set("minecraft:cave_air", "minecraft:air")
    .set("minecraft:void_air", "minecraft:air")
    .set("minecraft:bricks", "minecraft:brick_block")
    .set("minecraft:note_block", "minecraft:noteblock")
    .set("minecraft:creeper_wall_head", "minecraft:creeper_head")
    .set("minecraft:dragon_wall_head", "minecraft:dragon_head")
    .set("minecraft:piglin_wall_head", "minecraft:piglin_head")
    .set("minecraft:piston_head", "minecraft:piston_arm_collision")
    .set("minecraft:player_wall_head", "minecraft:player_head")
    .set("minecraft:zombie_wall_head", "minecraft:zombie_head");
