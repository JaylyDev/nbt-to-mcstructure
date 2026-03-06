import { BedrockBlock, BlockTypeConverterBase } from "./BaseClass";
import { JigsawStates } from "@minecraft/vanilla-data";
export interface JavaJigsawProperties {
	orientation:
		| "down_east"
		| "down_north"
		| "down_south"
		| "down_west"
		| "up_east"
		| "up_north"
		| "up_south"
		| "up_west"
		| "west_up"
		| "east_up"
		| "north_up"
		| "south_up";
}
export type BedrockJigsawProperties = Required<JigsawStates>;
export class JigsawTypeConverter extends BlockTypeConverterBase {
	public convert(id: string, properties: JavaJigsawProperties): BedrockBlock<BedrockJigsawProperties> {
		const state: BedrockJigsawProperties = {
			facing_direction: 0,
			rotation: 0,
		};
		if (properties.orientation === "down_east") {
			state.facing_direction = 0;
			state.rotation = 1;
		} else if (properties.orientation === "down_north") {
			state.facing_direction = 0;
			state.rotation = 0;
		} else if (properties.orientation === "down_south") {
			state.facing_direction = 0;
			state.rotation = 2;
		} else if (properties.orientation === "down_west") {
			state.facing_direction = 0;
			state.rotation = 3;
		} else if (properties.orientation === "up_east") {
			state.facing_direction = 1;
			state.rotation = 1;
		} else if (properties.orientation === "up_north") {
			state.facing_direction = 1;
			state.rotation = 0;
		} else if (properties.orientation === "up_south") {
			state.facing_direction = 1;
			state.rotation = 2;
		} else if (properties.orientation === "up_west") {
			state.facing_direction = 1;
			state.rotation = 3;
		} else if (properties.orientation === "west_up") {
			state.facing_direction = 4;
			state.rotation = 0;
		} else if (properties.orientation === "east_up") {
			state.facing_direction = 5;
			state.rotation = 0;
		} else if (properties.orientation === "north_up") {
			state.facing_direction = 2;
			state.rotation = 0;
		} else if (properties.orientation === "south_up") {
			state.facing_direction = 3;
			state.rotation = 0;
		}

		return { name: id, properties: state };
	}
}
