import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).parents[2]


def test_vanilla_structures(cli_dir: Path):
    with zipfile.ZipFile(cli_dir / "vanilla_structures.zip") as archive:
        archive.extractall(cli_dir / "structures")
    nbt_files = list((cli_dir / "structures").rglob("*.nbt"))

    subprocess.run([sys.executable, ROOT / "cli" / "__main__.py"], cwd=cli_dir, check=True)

    for nbt_file in nbt_files:
        assert nbt_file.with_suffix(".mcstructure").is_file()
