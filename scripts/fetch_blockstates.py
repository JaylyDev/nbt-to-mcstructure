"""Fetch Bedrock block properties from Mojang's bedrock-samples.
Writes cli/data/blockstates.json and its version to versions.json."""
import json
import os
import urllib.request

BASE_URL = (
    "https://raw.githubusercontent.com/Mojang/bedrock-samples/preview/"
)
DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "cli", "data")
OUT_PATH = os.path.join(DATA_DIR, "blockstates.json")
VERSIONS_PATH = os.path.join(DATA_DIR, "versions.json")


def get_json(url):
    with urllib.request.urlopen(url) as response:
        return json.load(response)


data = get_json(BASE_URL + "metadata/vanilladata_modules/mojang-blocks.json")
version = get_json(BASE_URL + "version.json")["latest"]["version"]

blockstates = {
    prop["name"]: {
        "values": [entry["value"] for entry in prop["values"]],
        "type": prop["type"],
    }
    for prop in data["block_properties"]
}

with open(OUT_PATH, "w", encoding="utf-8") as f:
    json.dump(blockstates, f, indent=2)

versions = {}
if os.path.exists(VERSIONS_PATH):
    with open(VERSIONS_PATH, encoding="utf-8") as f:
        versions = json.load(f)
versions["blockstates"] = version
with open(VERSIONS_PATH, "w", encoding="utf-8") as f:
    json.dump(versions, f, indent=2)

print(f"Wrote {len(blockstates)} block properties ({version}) to {OUT_PATH}")
