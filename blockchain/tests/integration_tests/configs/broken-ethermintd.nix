{ pkgs ? import ../../../nix { } }:
let fusiond = (pkgs.callPackage ../../../. { });
in
fusiond.overrideAttrs (oldAttrs: {
  patches = oldAttrs.patches or [ ] ++ [
    ./broken-fusiond.patch
  ];
})
