from rich.progress import Progress, TextColumn, BarColumn, DownloadColumn, TransferSpeedColumn, TextColumn, TimeRemainingColumn
import pathlib
import gzip
import pynbt
from time import time
from java_structures import javaToBedrock
from os import listdir, makedirs, mkdir
from os.path import isfile, join, isdir
import threading

structurePath = 'structures' ## path of structures
  
def convert(file):
  mcstructureFile = file.replace(pathlib.Path(file).suffix, '') + '.mcstructure'
  print(f"Converting '{file}' to '{mcstructureFile}'")

  print("Reading " + file)
  io = gzip.open(file, mode="rb+")
  
  print("Parsing " + file)
  startTime = time()
  nbt = pynbt.NBTFile(io)
  print(f"Loaded {file} in {round((time() - startTime) * 1000, 2)} ms")
  
  mcstructure, size = javaToBedrock(nbt)
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

      def write (data: bytes):
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

def get_nbtFiles (dirpath: str) -> list[str]:
  files = []
  for f in listdir(dirpath):
    path = join(dirpath, f)
    if isfile(path) and f.endswith(".nbt"):
      files.append(path)
    elif isdir(path):
      for file in get_nbtFiles(path):
        files.append(file)
  return files

if __name__ == "__main__":  # pragma: no coverage
  makedirs(structurePath, exist_ok=True)
  nbtFiles = get_nbtFiles(structurePath)

  if len(nbtFiles) == 0:
    print(f"There are 0 .nbt files in '{structurePath}' folder.")
  else:
    for file in nbtFiles:
      convert(file=file)