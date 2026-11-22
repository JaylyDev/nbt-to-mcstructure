import subprocess
import sys
from pathlib import Path

from pynbt import NBTFile, TAG_Compound

ROOT = Path(__file__).parents[2]
# Fields that depend on where and when the sample was saved in a world, or on Bedrock-only settings
WORLD_SPECIFIC_KEYS = {"x", "y", "z", "LastExecution", "TickDelay"}


def read_command_block(path: Path) -> tuple[TAG_Compound, TAG_Compound]:
    """Read the palette entry and block entity of the only block in a .mcstructure.
    @param path The .mcstructure file
    @returns The palette entry and the block entity data"""
    with open(path, "rb") as io:
        palette = NBTFile(io, little_endian=True)["structure"]["palette"]["default"]
    return palette["block_palette"][0], palette["block_position_data"]["0"]["block_entity_data"]


def test_repeating_command_block(cli_dir: Path):
    subprocess.run([sys.executable, ROOT / "cli" / "__main__.py"], cwd=cli_dir, check=True)

    block, block_entity = read_command_block(cli_dir / "structures" / "repeating_cmd_blocks.mcstructure")
    expected_block, expected_block_entity = read_command_block(cli_dir / "expected" / "repeating_cmd_blocks.mcstructure")

    assert block["name"].value == expected_block["name"].value
    assert block["states"]["conditional_bit"].value == expected_block["states"]["conditional_bit"].value
    assert block_entity.keys() == expected_block_entity.keys()
    for key in block_entity.keys() - WORLD_SPECIFIC_KEYS:
        assert block_entity[key].value == expected_block_entity[key].value, key
