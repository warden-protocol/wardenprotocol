{ pkgs
, config
, ethermint ? (import ../. { inherit pkgs; })
}: rec {
  start-ethermint = pkgs.writeShellScriptBin "start-ethermint" ''
    # rely on environment to provide ethermintd
    export PATH=${pkgs.test-env}/bin:$PATH
    ${../scripts/start-ethermint.sh} ${config.ethermint-config} ${config.dotenv} $@
  '';
  start-geth = pkgs.writeShellScriptBin "start-geth" ''
    export PATH=${pkgs.test-env}/bin:${pkgs.go-ethereum}/bin:$PATH
    source ${config.dotenv}
    ${../scripts/start-geth.sh} ${config.geth-genesis} $@
  '';
  start-scripts = pkgs.symlinkJoin {
    name = "start-scripts";
    paths = [ start-ethermint start-geth ];
  };
}
