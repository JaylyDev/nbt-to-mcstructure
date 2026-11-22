import shutil
from pathlib import Path

import pytest


@pytest.fixture
def cli_dir(request: pytest.FixtureRequest, tmp_path: Path) -> Path:
    """Temp copy of the test file's folder (minus Python files), used as the CLI working directory.
    Copying keeps the CLI from deleting or overwriting the committed assets."""
    shutil.copytree(request.path.parent, tmp_path, ignore=shutil.ignore_patterns("*.py", "__pycache__"), dirs_exist_ok=True)
    return tmp_path
