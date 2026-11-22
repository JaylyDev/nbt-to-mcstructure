"""Fetch the newest blocksJ2B.json from PrismarineJS/minecraft-data.
Writes cli/data/blocksJ2B.json and its version to versions.json."""
import json
import os
import re
import urllib.request

API_URL = (
    "https://api.github.com/repos/PrismarineJS/minecraft-data/"
    "contents/data/bedrock"
)
FILE_NAME = "blocksJ2B.json"
DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "cli", "data")
OUT_PATH = os.path.join(DATA_DIR, FILE_NAME)
VERSIONS_PATH = os.path.join(DATA_DIR, "versions.json")
SEMVER = re.compile(r"^(\d+)\.(\d+)\.(\d+)$")


def get_json(url):
    with urllib.request.urlopen(url) as response:
        return json.load(response)


versions = []
for entry in get_json(API_URL):
    match = SEMVER.match(entry["name"])
    if entry["type"] == "dir" and match:
        versions.append((tuple(map(int, match.groups())), entry["name"]))
versions.sort(reverse=True)

for _, version in versions:
    files = get_json(f"{API_URL}/{version}")
    download_url = next(
        (f["download_url"] for f in files if f["name"] == FILE_NAME), None
    )
    if download_url:
        blocks = get_json(download_url)
        with open(OUT_PATH, "w", encoding="utf-8") as f:
            json.dump(blocks, f, indent=2)

        versions = {}
        if os.path.exists(VERSIONS_PATH):
            with open(VERSIONS_PATH, encoding="utf-8") as f:
                versions = json.load(f)
        versions["blocksJ2B"] = version
        with open(VERSIONS_PATH, "w", encoding="utf-8") as f:
            json.dump(versions, f, indent=2)

        print(f"Wrote {FILE_NAME} from {version} to {OUT_PATH}")
        break
else:
    raise SystemExit(f"No {FILE_NAME} found in any version folder")
