# nbt-to-mcstructure
 Converts Java .nbt files to Bedrock .mcstructure files

![demo_video](./assets/demo_video.gif)

## Introduction

This program is a port of [Structure Editor](https://mcbe-essentials.github.io/structure-editor/) originally made by [MCBE Essentials](https://mcbe-essentials.github.io/) in Python 3.

The reason this program is built in Python is because:
- JavaScript has a limit on the size of what `Buffer` and array can allocate in the engine unlike Python.
- Structure templates generated in their [structure editor](https://mcbe-essentials.github.io/structure-editor/) does not work in Minecraft, because Minecraft requires the `"block_indices"` field's arrays need to both be the same size.

## Usage

1. Install required dependencies via:
    ```
    pip install -r requirements.txt
    ```

2. To convert `.nbt` files to `.mcstructure`, put your Java nbt files in the `structures` folder.

3. Run `__main__.py`, the program converts all java structures in the `structures` folder to the bedrock structure format, and they should be generated in `structures` folder.

⚠️**Make sure your computer has enough memory and spaces on disk to convert large NBT files!**
