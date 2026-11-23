#!/usr/bin/env bash

# This script keeps the python dependencies `nix/python-packages.nix` up to date

nix run github:nix-community/pip2nix -- generate -r nbt-to-mcstructure/requirements.txt

mv ./python-packages.nix ./nix/

