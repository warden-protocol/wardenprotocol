# Fusion Chain

The Fusion Chain is a blockchain built with the Cosmos SDK to provide various execution layers within the Qredo network.

CosmWasm and Ethermint have both been integrated in order to leverage execution of WASM and Solidity-based smart contracts.

---

Setting up the node -  `cd application`

- Deploy the Blockchain node: `./init.sh`

---

Compiling the contracts - `cd contracts/<contract-name>` 

- Compile the contract: `RUSTFLAGS='-C link-arg=-s' cargo wasm --no-default-features`
- Depending on the contract, you may need to add `+nightly` after `cargo`

---

Deploying & querying the contracts - `cd contracts`

- Install node packages: `npm i` (you will need Node.js & npm installed)
- Deploy Watchlist Contract: `node --loader ts-node/esm contracts.ts deploy_watchlist /<full-path-to>/fusionchain/offchain/shulgin_sk.txt veryStrongPassword`
- Query Watchlist Contract: `node --loader ts-node/esm contracts.ts query_watchlist /<full-path-to>/fusionchain/offchain/shulgin_sk.txt veryStrongPassword <watchlist-contract-address>`
- Deploy Proxy Contract: `node --loader ts-node/esm contracts.ts deploy_proxy /<full-path-to>/fusionchain/offchain/shulgin_sk.txt veryStrongPassword <watchlist-contract-address>`
- Query Proxy Contract: `node --loader ts-node/esm contracts.ts query_proxy /<full-path-to>/fusionchain/offchain/shulgin_sk.txt veryStrongPassword <proxy-contract-address>`
- Deploy & Query ZK Verifier Contract: TBD

---

Deploying a watcher - `cd offchain`

- Build watcher: `go build watcher.go`
- Launch watcher (using sk1.txt as its privkey): `./watcher /<full-path-to>/fusionchain/offchain/sk1.txt /<full-path-to>/fusionchain/contracts`

---

Ports

- Port 26657 is the Cosmos & Tendermint RPC port for interacting with CosmWasm contracts and Cosmos accounts
- Port 8545 is the Ethermint RPC port for interacting with Ethereum accounts and contracts

---

Scaffolder - `cd application`

- `go run ./cmd/scaffolder query [module name] [query name]`, eg. `go run ./cmd/scaffolder query identity Wallets`, or
- `go run ./cmd/scaffolder msg [module name] [msg name]`, eg. `go run ./cmd/scaffolder msg identity AddWorkspaceOwner`
- edit `.proto`s to add fields you want
- run `make proto-all`

---

Mock Keyring - `cd application`

- `go run ./mokr`
- This will fulfil any pending key requests

---

Full list of CLI commands:

- https://www.notion.so/qredo/Fusion-Functional-Requirements-0f822bdc7d6a4aba81f6161935408b35?pvs=4#f1d09276cf55411385c2856a07d4f142
- This does not include default Cosmos SDK commands
