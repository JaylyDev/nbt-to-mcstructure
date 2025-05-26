<p align="center">
  <a href="./README.md">English</a> |
  <a href="./README_zh.md">简体中文</a>
</p>

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
2. Navigate to the `cli` folder.
3. To convert `.nbt` files to `.mcstructure`, put your Java nbt files in the `structures` folder.

4. Run `__main__.py`, the program converts all java structures in the `structures` folder to the bedrock structure format, and they should be generated in `structures` folder.

## Update Notes

- Optimized the conversion speed and added a progress bar to the block entity conversion process.
- Updated compatibility version: 1.21.70
- Fixed the conversion of furnaces, blast furnaces, and smokers
- Fixed the conversion of player heads and added head orientation
- Fixed the azalea flowerpot naming issue
- Fixed the direction error of trapdoors or doors
- Added conversion of banners and banner patterns
- Fixed the error when converting spawners. However, there are still some minor bugs: converting multiple spawners at the same time may result in incorrect mob types within the spawners.

## Future Updates

- Conversion of display frames
- Complete conversion of spawners
- Conversion of other entity blocks

## Regolith Filter

This converter is available as a [Regolith](https://github.com/Bedrock-OSS/regolith) filter as well.
The filter allows you to place your `.nbt` structure files straight into the `packs/BP/structures` folder which will be compiled into the `.mcstructure` format.

### How It Works

The filter:

- Converts `.nbt` structure files into `.mcstructure` format.
- Removes the original `.nbt` files in the compiled version to keep your project clean.

### Enabling the Filter

Add the following to your Regolith filter definitions to enable the filter:

```jsonc
"nbt-to-mcstructure": {"url": "github.com/JaylyDev/nbt-to-mcstructure", "version": "HEAD"}
```

### Configuration

Once installed, the filter generates a `settings.json` file located in `data/nbt-to-mcstructure/`. This file allows you to customize block mapping, either by using vanilla overwrites or defining a custom namespace.

#### Example `settings.json`

```jsonc
{
  "block_mapping": [
    {
      "structure_id": "add_your_structure_id_here", // Matches your file name (excluding the file suffix).
      "mapping": {
        "minecraft:dirt": "namespace:custom_dirt",
        "minecraft:stone": "namespace:custom_stone",
      },
    },
    {
      "structure_id": "add_another_structure_id_here",
      "mapping": {
        "minecraft:diamond_block": "namespace:custom_diamond_block",
        "minecraft:iron_ore": "namespace:custom_iron_ore",
      },
    },
  ],
}
```

### Using Wildcards

Block mapping supports wildcards to simplify configurations. For example, instead of specifying mappings for each structure individually:

```jsonc
{
  "block_mapping": [
    {
      "structure_id": "oak_extra_small_1",
      "mapping": { "minecraft:oak_log": "namespace:custom_oak_log" },
    },
    {
      "structure_id": "oak_extra_small_2",
      "mapping": { "minecraft:oak_log": "namespace:custom_oak_log" },
    },
    {
      "structure_id": "oak_extra_small_3",
      "mapping": { "minecraft:oak_log": "namespace:custom_oak_log" },
    },
    {
      "structure_id": "oak_extra_small_4",
      "mapping": { "minecraft:oak_log": "namespace:custom_oak_log" },
    },
    {
      "structure_id": "oak_extra_small_5",
      "mapping": { "minecraft:oak_log": "namespace:custom_oak_log" },
    },
  ],
}
```

You can use a wildcard to reduce redundancy:

```jsonc
{
  "block_mapping": [
    {
      "structure_id": "oak_extra_small_*",
      "mapping": {
        "minecraft:oak_log": "namespace:custom_oak_log",
      },
    },
  ],
}
```

This approach saves space and simplifies configurations for large projects involving multiple similar structures, such as trees, houses, or castles.

## Contributing

We welcome contributions to keep this converter up-to-date and efficient. For inquiries or to collaborate:

- **JaylyDev**: Contact regarding the core program.
- **ThijsHankelMC**: Contact regarding the Regolith Filter.
- **rukiroki**: For bug fixes and version compatibility.

Discord IDs:

- **jaylymc**
- **thijsmc**
