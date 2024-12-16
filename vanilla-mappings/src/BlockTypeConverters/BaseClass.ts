export abstract class BlockTypeConverterBase {
    public abstract convert(id: string, properties: object): Record<string, string | number | boolean>;
}
