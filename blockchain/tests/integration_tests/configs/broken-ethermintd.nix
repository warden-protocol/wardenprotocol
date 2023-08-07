{ pkgs ? import ../../../nix { } }:
let ethermintd = (pkgs.callPackage ../../../. { });
in
ethermintd.overrideAttrs (oldAttrs: {
  patches = oldAttrs.patches or [ ] ++ [
    ./broken-ethermintd.patch
  ];
})
