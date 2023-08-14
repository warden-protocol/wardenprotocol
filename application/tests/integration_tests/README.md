# RPC Integration tests

The RPC integration test suite uses nix for reproducible and configurable
builds allowing to run integration tests using python web3 library against
different Ethermint and [Geth](https://github.com/ethereum/go-ethereum) clients with multiple configurations.

## Installation

Nix Multi-user installation:

```
sh <(curl -L https://nixos.org/nix/install) --daemon
```

Make sure the following line has been added to your shell profile (e.g. ~/.profile):

```
source ~/.nix-profile/etc/profile.d/nix.sh
```

Then re-login shell, the nix installation is completed.

For linux:

```
sh <(curl -L https://nixos.org/nix/install) --no-daemon
```

## Run Local

First time run (can take a while):

```
make run-integration-tests
```

Once you've run them once and, you can run:

```
nix-shell tests/integration_tests/shell.nix
cd tests/integration_tests
pytest -s -vv
```

If you're changing anything on the ethermint rpc, rerun the first command.

## Caching

You can enable Binary Cache to speed up the tests:

```
nix-env -iA cachix -f https://cachix.org/api/v1/install
cachix use ethermint
```
