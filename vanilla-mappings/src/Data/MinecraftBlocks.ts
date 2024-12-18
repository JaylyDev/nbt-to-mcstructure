import path from "path";
import fs from "fs";
import { JavaBlock, MojangBlocks } from "./Schema";

export const scriptDir: string = path.join(__dirname, "../..");
export const javaBlocks: Record<string, JavaBlock> = JSON.parse(fs.readFileSync(path.join(scriptDir, "data/java-blocks.json"), "utf-8"));
export const bedrockBlocks: MojangBlocks = JSON.parse(fs.readFileSync(path.join(scriptDir, "data/bedrock-blocks.json"), "utf-8"));
