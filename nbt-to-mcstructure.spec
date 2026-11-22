# -*- mode: python ; coding: utf-8 -*-
import os
import shutil

a = Analysis(
    ['cli/__main__.py'],
    pathex=[],
    binaries=[],
    datas=[('./cli/data', 'data'), ('./cli/config.json', '.')],
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='nbt-to-mcstructure',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=False,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=['assets/icon.ico'],
    contents_directory='resources',
)
coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=False,
    upx_exclude=[],
    name='',
)

# The structures folder ships next to the exe, where users drop their .nbt files
shutil.copytree(
    os.path.join(SPECPATH, 'structures'),
    os.path.join(DISTPATH, 'structures'),
    dirs_exist_ok=True
)
