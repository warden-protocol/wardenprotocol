{ sources ? import ./sources.nix, system ? builtins.currentSystem, ... }:

import sources.nixpkgs {
  overlays = [
    (_: pkgs: {
      go = pkgs.go_1_18;
      go-ethereum = pkgs.callPackage ./go-ethereum.nix {
        inherit (pkgs.darwin) libobjc;
        inherit (pkgs.darwin.apple_sdk.frameworks) IOKit;
        buildGoModule = pkgs.buildGo118Module;
      };
    }) # update to a version that supports eip-1559
    # https://github.com/NixOS/nixpkgs/pull/179622
    (import ./go_1_18_overlay.nix)
    (final: prev:
      (import "${sources.gomod2nix}/overlay.nix")
        (final // {
          inherit (final.darwin.apple_sdk_11_0) callPackage;
        })
        prev)
    (pkgs: _:
      import ./scripts.nix {
        inherit pkgs;
        config = {
          ethermint-config = ../scripts/ethermint-devnet.yaml;
          geth-genesis = ../scripts/geth-genesis.json;
          dotenv = builtins.path { name = "dotenv"; path = ../scripts/.env; };
        };
      })
    (_: pkgs: { test-env = pkgs.callPackage ./testenv.nix { }; })
    (_: pkgs: {
      cosmovisor = pkgs.buildGo118Module rec {
        name = "cosmovisor";
        src = sources.cosmos-sdk + "/cosmovisor";
        subPackages = [ "./cmd/cosmovisor" ];
        vendorSha256 = "sha256-OAXWrwpartjgSP7oeNvDJ7cTR9lyYVNhEM8HUnv3acE=";
        doCheck = false;
      };
    })
  ];
  config = { };
  inherit system;
}
