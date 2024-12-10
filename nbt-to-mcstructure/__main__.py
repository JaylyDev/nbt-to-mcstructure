from rich.progress import Progress, TextColumn, BarColumn, DownloadColumn, TransferSpeedColumn, TimeRemainingColumn
import pathlib
import gzip
import pynbt
from time import time
from java_structures import javaToBedrock
from os import listdir, makedirs, remove
from os.path import isfile, join, isdir
import threading
from better_json_tools import load_jsonc

structurePath = 'BP/structures'  # Path of structures
settings_path = './data/nbt-to-mcstructure/settings.json'

# Load settings file
settings = load_jsonc(settings_path).data

def get_custom_mapping(structure_id):
    for entry in settings.get("block_mapping", []):
        if entry["structure_id"] == structure_id:
            return entry["mapping"]
    return {}

def get_structure_id(file_path: str) -> str:
    return pathlib.Path(file_path).stem

def convert(file):
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
    custom_mapping = get_custom_mapping(structure_id)

    mcstructure, size = javaToBedrock(nbt, structure_id, custom_mapping)
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
    makedirs(structurePath, exist_ok=True)
    nbtFiles = get_nbtFiles(structurePath)
    if len(nbtFiles) == 0:
        print(f"There are 0 .nbt files in '{structurePath}' folder.")
    else:
        for file in nbtFiles:
            convert(file=file)

        # Delete .nbt files after processing
        for file in nbtFiles:
            try:
                remove(file)
            except Exception as e:
                print(f"Error deleting file {file}: {e}")

main()