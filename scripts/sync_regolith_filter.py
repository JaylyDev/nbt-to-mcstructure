"""Copy the CLI source and data files into the Regolith filter folder.
Data files land in the filter root; config.json is not copied."""
import glob
import os
import shutil

ROOT = os.path.join(os.path.dirname(__file__), "..")
SRC_DIR = os.path.join(ROOT, "cli")
FILTER_DIR = os.path.join(ROOT, "nbt-to-mcstructure")

for path in glob.glob(os.path.join(SRC_DIR, "data", "*.json")) + glob.glob(os.path.join(SRC_DIR, "*.py")):
    shutil.copy2(path, FILTER_DIR)
    print(f"Copied {os.path.basename(path)}")
