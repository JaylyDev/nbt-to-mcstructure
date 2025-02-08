import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { VaultStates } from "@minecraft/vanilla-data";
export interface JavaVaultProperties {
    facing: "north" | "south" | "west" | "east";
    ominous: "true" | "false";
    vault_state: "inactive" | "active" | "unlocking" | "ejecting";
}
export type BedrockVaultProperties = Required<VaultStates>;
export class VaultTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaVaultProperties): BedrockBlock<BedrockVaultProperties> {
        const state: BedrockVaultProperties = {};
        // implement
        return { name: id, properties: state };
    }
}