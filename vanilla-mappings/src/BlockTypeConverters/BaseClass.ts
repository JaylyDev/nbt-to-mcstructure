export abstract class BlockTypeConverterBase {
    public abstract convert(id: string, properties: Record<string, string>): Record<string, string | number | boolean>;
}
