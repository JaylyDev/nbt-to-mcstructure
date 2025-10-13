{
  description = "Converts Java .nbt files to Bedrock .mcstructure files";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};

      pythonOverlay = pkgs.callPackage ./nix/python-packages.nix {};
      customPython = pkgs.python3.override {
        packageOverrides = pythonOverlay;
      };
      installPackages = builtins.attrNames (pythonOverlay {} {});
      pythonEnv = customPython.withPackages (
        ps:
          map (name: ps.${name}) installPackages
      );
      pname = "nbt-to-mcstructure";
      version = "0.6.3";
    in {
      packages.default = customPython.pkgs.buildPythonApplication {
        inherit pname version;
        src = ./.;
        format = "other";

        propagatedBuildInputs = [pythonEnv];
        nativeBuiltInputs = [pkgs.makeWrapper];

        installPhase = ''
          mkdir -p $out/bin
          mkdir -p $out/${customPython.pkgs.python.sitePackages}
          cp -r $src/* $out/${customPython.pkgs.python.sitePackages}/

          makeWrapper ${pythonEnv}/bin/python3 $out/bin/${pname} \
            --add-flags "$out/${customPython.pkgs.python.sitePackages}/cli/__main__.py"
        '';
      };
      devShells.default = pkgs.mkShell {
        packages = [
          pythonEnv
        ];
      };
    });
}
