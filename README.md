# Fusion Chain

Repo: [https://gitlab.qredo.com/qrdochain/fusionchain](https://gitlab.qredo.com/qrdochain/fusionchain) (connect to VPN first)

The Qredo Fusion Chain is a blockchain built with the Cosmos SDK.

The Ethermint and CosmWasm libraries have been integrated in order to leverage execution of both Solidity-based and WASM-based smart contracts.

---

Setting up the node -  `cd application`

- Deploy the Blockchain node: `./init.sh`

---

Testing/compiling the verifier contract - `cd contracts/verifier`

- Test the contract: `cargo test -- --show-output`
- Compile the contract: `RUSTFLAGS='-C link-arg=-s' cargo wasm`

---

Deploying the contract - `cd contracts`

- Run the deployment script: `node --experimental-specifier-resolution=node --loader ts-node/esm deployWasmContract.ts`