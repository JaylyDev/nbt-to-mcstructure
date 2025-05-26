<p align="center">
  <a href="./README.md">English</a> |
  <a href="./README_zh.md">简体中文</a>
</p>

# nbt-to-mcstructure

将 Java 版本的 `.nbt` 文件转换为基岩版的 `.mcstructure` 文件

![演示视频](./assets/demo_video.gif)

## 介绍

这个程序是 [Structure Editor](https://mcbe-essentials.github.io/structure-editor/) 的一个移植版本，原版由 [MCBE Essentials](https://mcbe-essentials.github.io/) 使用 Python 3 编写。

选择使用 Python 编写这个程序的原因是：

- JavaScript 在引擎中对 `Buffer` 和数组的分配大小有限制，而 Python 没有这种限制。
- 在他们的 [Structure Editor](https://mcbe-essentials.github.io/structure-editor/) 中生成的结构模板无法在 Minecraft 中使用，因为 Minecraft 要求 `"block_indices"` 字段的数组必须具有相同的大小。

## 使用方法

1. 安装所需的依赖项：
   ```
   pip install -r requirements.txt
   ```
2. 切换到`cli`文件夹
3. 将你的 Java 版本的 `.nbt` 文件放入 `structures` 文件夹中。

4. 运行 `__main__.py`，程序会将 `structures` 文件夹中的所有 Java 结构文件转换为基岩结构格式，并在 `structures` 文件夹中生成转换后的文件。

## 更新内容

- 优化了转换速度，对方块实体转换过程添加了进度条
- 更新了适配版本：1.21.70
- 修复了熔炉、高炉、烟熏炉的转换
- 修复了生物头颅的转换，并添加了头颅朝向
- 修复了杜鹃花从花盆命名问题
- 修复了活版门或门的方向错误问题
- 添加了旗帜的转换和旗帜图案的转换
- 修复了刷怪笼转换报错的问题。但还剩一些小bug：同时转换多个刷怪笼会导致刷怪笼内怪物种类可能不正确

## 未来更新

- 展示框的转换
- 刷怪笼的完全转换
- 其他实体方块的转换

## 再生层过滤器

这个转换器也可以作为 [Regolith](https://github.com/Bedrock-OSS/regolith) 的一个过滤器使用。
该过滤器允许你直接将 `.nbt` 结构文件放入 `packs/BP/structures` 文件夹中，它们将被编译为 `.mcstructure` 格式。

### 工作原理

过滤器：

- 将 `.nbt` 结构文件转换为 `.mcstructure` 格式。
- 删除编译版本中的原始 `.nbt` 文件，以保持项目整洁。

### 启用过滤器

将以下内容添加到你的 Regolith 过滤器定义中以启用过滤器：

```jsonc
"nbt-to-mcstructure": {"url": "github.com/JaylyDev/nbt-to-mcstructure", "version": "HEAD"}
```

### 配置

安装完成后，过滤器会在 `data/nbt-to-mcstructure/` 文件夹中生成一个 `settings.json` 文件。你可以通过这个文件自定义方块映射，既可以使用原版覆盖，也可以定义自定义命名空间。

#### 示例 `settings.json`

```jsonc
{
  "block_mapping": [
    {
      "structure_id": "在此处添加你的结构文件 ID", // 匹配你的文件名（不包括文件后缀）。
      "mapping": {
        "minecraft:dirt": "namespace:custom_dirt",
        "minecraft:stone": "namespace:custom_stone",
      },
    },
    {
      "structure_id": "在此处添加另一个结构文件 ID",
      "mapping": {
        "minecraft:diamond_block": "namespace:custom_diamond_block",
        "minecraft:iron_ore": "namespace:custom_iron_ore",
      },
    },
  ],
}
```

### 使用通配符

方块映射支持通配符，以简化配置。例如，无需为每个结构单独指定映射：

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

你可以使用通配符来减少冗余：

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

这种方法可以节省空间，并简化涉及多个类似结构（如树木、房屋或城堡）的大型项目的配置。

## 贡献

我们欢迎贡献，以保持这个转换器的更新和高效。如有疑问或想合作，请联系：

- **JaylyDev**：关于核心程序的问题。
- **ThijsHankelMC**：关于 Regolith 过滤器的问题。
- **rukiroki**: 修复了bug，适配了新版本。

Discord 用户名：

- **jaylymc**
- **thijsmc**
