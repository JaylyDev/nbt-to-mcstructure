import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { TrialSpawnerStates } from "@minecraft/vanilla-data";
export interface JavaTrialSpawnerProperties {
    ominous: "true" | "false";
    trial_spawner_state: "inactive" | "waiting_for_players" | "active" | "waiting_for_reward_ejection" | "ejecting_reward" | "cooldown";
}
export type BedrockTrialSpawnerProperties = Required<TrialSpawnerStates>;
export class TrialSpawnerTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaTrialSpawnerProperties): BedrockBlock<BedrockTrialSpawnerProperties> {
        const state: BedrockTrialSpawnerProperties = {};
        // implement
        return { name: id, properties: state };
    }
}