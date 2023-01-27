# Fusion Chain

Repo: [https://gitlab.qredo.com/qrdochain/fusionchain](https://gitlab.qredo.com/qrdochain/fusionchain) (connect to VPN first)

The Qredo Fusion Chain is a blockchain built with the Cosmos SDK.

The Ethermint and CosmWasm libraries have been integrated in order to leverage execution of both Solidity-based and WASM-based smart contracts.

---

Setting up the node -  `cd application`

- Deploy the Blockchain node: `./init.sh`

---

Compiling the contracts - `cd contracts/miden-verifier` or `cd contracts/merkle-verifier`

- Compile the contract: `RUSTFLAGS='-C link-arg=-s' cargo wasm --no-default-features`

---

Deploying the contracts - `cd contracts`

- Each of the contract deployment/interaction scripts are listed below -
- Miden verifier: `node --experimental-specifier-resolution=node --loader ts-node/esm deployMidenVerifier.ts`
- Merkle verifier: `node --experimental-specifier-resolution=node --loader ts-node/esm deployMerkleVerifier.ts`

---

Ports

- Port 26657 is the Cosmos & Tendermint RPC port for interacting with CosmWasm and Cosmos accounts
- Port 8545 is the Ethermint RPC port for interacting with Ethereum accounts and contracts
