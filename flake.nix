{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  inputs.flake-parts.url = "github:hercules-ci/flake-parts";

  outputs = inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [ "aarch64-darwin" "aarch64-linux" "x86_64-darwin" "x86_64-linux" ];

      perSystem = { config, pkgs, ... }: {
        devShells.default = pkgs.mkShell {
          nativeBuildInputs = [
            pkgs.sbt
            pkgs.yarn
          ];
        };
      };
    };
}
