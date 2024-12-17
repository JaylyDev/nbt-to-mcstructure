import { bedrockBlocks } from "../Data/MinecraftBlocks";
import { blockIdsMap } from "../Mappings/blocks";

export abstract class BlockTypeConverterBase {
    public abstract convert(id: string, properties: object): Record<string, string | number | boolean>;
}

export class EmptyBlockTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: object): {} {
        const typeId = blockIdsMap.get(id) ?? id;
        const bedrockBlock = bedrockBlocks.data_items.find((item) => item.name === typeId);
        if (!bedrockBlock) throw new Error(`Could not find bedrock block for ${typeId}`);
        if (bedrockBlock.properties.length > 0) throw new Error(`Expected Block '${typeId}' has properties, but they are not converted`);
        return {};
    }
}
