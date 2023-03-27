# Fusion Chain

Repo: [https://gitlab.qredo.com/qrdochain/fusionchain](https://gitlab.qredo.com/qrdochain/fusionchain) (connect to VPN first)

The Qredo Fusion Chain is a blockchain built with the Cosmos SDK.

The Ethermint and CosmWasm libraries have been integrated in order to leverage execution of both Solidity-based and WASM-based smart contracts.

---

Setting up the node -  `cd application`

- Deploy the Blockchain node: `./init.sh`

---

Compiling the contracts - `cd contracts/<contract-name>`

- Compile the contract: `RUSTFLAGS='-C link-arg=-s' cargo wasm --no-default-features`
- Depending on the contract, you may need to add `+nightly` after `cargo`

---

Deploying the contracts - `cd contracts`

- Each of the contract deployment/interaction commands are listed below -
- Deploy Watchlist Contract: `node --experimental-specifier-resolution=node --loader ts-node/esm contract.ts deploy_watchlist /<full-path-to>/fusion/offchain/sk1.txt`
- Query Watchlist Contract: `node --experimental-specifier-resolution=node --loader ts-node/esm contracts.ts query_watchlist /<full-path-to>/fusion/offchain/sk1.txt <contract-address>`
- Deploy & Query ZK / Merkle Verifiers: TBD

---

Deploying a watcher - `cd offchain`

- Build watcher: `go build watcher.go`
- Launch watcher (using sk1.txt as its privkey): `./watcher /<full-path-to>/fusion/offchain/sk1.txt`

---

Ports

- Port 26657 is the Cosmos & Tendermint RPC port for interacting with CosmWasm contracts and Cosmos accounts
- Port 8545 is the Ethermint RPC port for interacting with Ethereum accounts and contracts
