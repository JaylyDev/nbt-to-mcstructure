from rich.progress import Progress, TextColumn, BarColumn, DownloadColumn, TransferSpeedColumn, TimeRemainingColumn
import pathlib
import gzip
import pynbt
from time import time
from java_structures import javaToBedrock
from os import listdir, makedirs, remove
from os.path import isfile, join, isdir
import threading
import json
import re

structurePath = 'structures'  # Path of structures
settings_path = './settings.json'

def get_block_mapping(structure_id: str, settings: dict):
    for entry in settings.get("block_mapping", []):
        pattern = entry["structure_id"]
        if "*" in pattern:
            regex = re.compile("^" + re.escape(pattern).replace("\\*", ".*") + "$")
            if regex.match(structure_id):
                return entry["mapping"]
        elif pattern == structure_id:
            return entry["mapping"]
    return {}

def get_structure_id(file_path: str) -> str:
    return pathlib.Path(file_path).stem

def convert(file: str, settings: dict):
    mcstructureFile = file.replace(pathlib.Path(file).suffix, '') + '.mcstructure'
    structure_id = get_structure_id(file)
    print(f"Converting '{file}' to '{mcstructureFile}' with structure ID '{structure_id}'")

    print("Reading " + file)
    io = gzip.open(file, mode="rb+")

    print("Parsing " + file)
    startTime = time()
    nbt = pynbt.NBTFile(io)
    print(f"Loaded {file} in {round((time() - startTime) * 1000, 2)} ms")

    # Get custom mapping
    block_mapping = get_block_mapping(structure_id, settings)

    mcstructure, size = javaToBedrock(nbt, structure_id, block_mapping)
    startTime = time()

    with open(mcstructureFile, 'wb') as io:
        columns = (
            TextColumn("[progress.description]{task.description}"),
            BarColumn(),
            DownloadColumn(),
            TransferSpeedColumn(),
            TextColumn("eta"),
            TimeRemainingColumn(),
        )
        with Progress(*columns, refresh_per_second=30) as progress:
            task = progress.add_task("[cyan]Writing mcstructure...", total=size)
            global completed
            global timer
            completed = 0

            def write(data: bytes):
                global completed
                io.write(data)
                completed += len(data)

            def renderWriteProgress():
                global timer
                progress.update(task, completed=completed)
                timer = threading.Timer(1 / 30, renderWriteProgress)
                timer.start()

            renderWriteProgress()
            mcstructure.save(write, True)

            # stop progress as mcstructure file has been saved
            timer.cancel()
            progress.update(task, completed=completed, total=completed)
            progress.stop()

            print(f"Wrote {mcstructureFile} in {round((time() - startTime) * 1000, 2)} ms\n")

def get_nbtFiles(dirpath: str) -> list[str]:
    files = []
    for f in listdir(dirpath):
        path = join(dirpath, f)
        if isfile(path) and f.endswith(".nbt"):
            files.append(path)
        elif isdir(path):
            for file in get_nbtFiles(path):
                files.append(file)
    return files

## -----------
## MAIN
## -----------
def main():
    # Load settings file
    if isfile(settings_path):
        f = open(settings_path, "r")
        json_file = f.read()
        settings = json.loads(json_file)
    else:
        settings = {}
    
    # Convert structures
    makedirs(structurePath, exist_ok=True)
    nbtFiles = get_nbtFiles(structurePath)
    if len(nbtFiles) == 0:
        print(f"There are 0 .nbt files in '{structurePath}' folder.")
    else:
        for file in nbtFiles:
            convert(file, settings)

        # Delete .nbt files after processing
        for file in nbtFiles:
            try:
                remove(file)
            except Exception as e:
                print(f"Error deleting file {file}: {e}")

main()