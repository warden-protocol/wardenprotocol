{ lib
, buildGoApplication
, rev ? "dirty"
}:
let
  version = "v0.20.0-rc2";
  pname = "wardend";
  tags = [ "netgo" ];
  ldflags = lib.concatStringsSep "\n" ([
    "-X github.com/cosmos/cosmos-sdk/version.Name=ethermint"
    "-X github.com/cosmos/cosmos-sdk/version.AppName=${pname}"
    "-X github.com/cosmos/cosmos-sdk/version.Version=${version}"
    "-X github.com/cosmos/cosmos-sdk/version.BuildTags=${lib.concatStringsSep "," tags}"
    "-X github.com/cosmos/cosmos-sdk/version.Commit=${rev}"
  ]);
in
buildGoApplication rec {
  inherit pname version tags ldflags;
  src = lib.sourceByRegex ./. [
    "^(x|app|cmd|client|server|crypto|rpc|types|encoding|ethereum|indexer|testutil|version|go.mod|go.sum|gomod2nix.toml)($|/.*)"
    "^tests(/.*[.]go)?$"
  ];
  modules = ./gomod2nix.toml;
  doCheck = false;
  pwd = src; # needed to support replace
  subPackages = [ "cmd/wardend" ];
  CGO_ENABLED = "1";

  meta = with lib; {
    description = "Warden Protocol is a scalable and interoperable blockchain application engine, built on Proof-of-Stake with fast-finality using the Cosmos SDK which runs on top of Tendermint Core.";
    homepage = "https://github.com/warden-protocol/wardenprotocol";
    license = licenses.asl20;
    mainProgram = "wardend";
  };
}
