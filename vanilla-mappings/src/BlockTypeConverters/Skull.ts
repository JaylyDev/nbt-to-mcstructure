import { BlockTypeConverterBase } from "./BaseClass";
import { SkeletonSkullStates } from "@minecraft/vanilla-data";

export interface JavaSkullProperties {}

export type BedrockSkullProperties = Required<SkeletonSkullStates>;

export class SkullTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: JavaSkullProperties): BedrockSkullProperties {
        const states: BedrockSkullProperties = {
            facing_direction: 1,
        };

        return states;
    }
}
