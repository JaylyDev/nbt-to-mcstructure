import { bedrockBlocks } from "../Data/MinecraftBlocks";

export abstract class BlockTypeConverterBase {
    public abstract convert(id: string, properties: object): Record<string, string | number | boolean>;
}

export class EmptyBlockTypeConverter extends BlockTypeConverterBase {
    public convert(id: string, properties: object): {} {
        const bedrockBlock = bedrockBlocks.data_items.find((item) => item.name === id);
        if (!bedrockBlock) throw new Error(`Could not find bedrock block for ${id}`);
        if (bedrockBlock.properties.length > 0) throw new Error(`Expected Block '${id}' has properties, but they are not converted`);
        return {};
    }
}
