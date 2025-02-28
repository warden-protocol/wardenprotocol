---
sidebar_position: 1.5
---

# What's new?

:::important
Chiado is our new and improved testnet. Please make sure to transition all your testing and development processes here.
:::

## Key features

Chiado represents a crucial milestone in our journey towards mainnet launch. Here are the key features of the update:

### The `x/async` module

The [`x/async` Warden module](/learn/warden-protocol-modules/x-async) runs offchain heavyweight computations asynchronously and stores the results onchain. It allows developers to build any logic combining offchain computation with onchain verification and enables smart contracts to leverage AI model outputs directly on the blockchain.

The module supports two types of computations: AI-driven price predictions and HTTP requests to external services, such as blockchain APIs.

### Dual VM architecture

Chiado now supports EVM Solidity contracts alongside CosmWasm. This dual VM architecture makes it easier to integrate AI inferences with smart contracts, and users can connect directly to EVM apps.

Learn how to deploy a Solidity contract: [Deploy an EVM contract](/build-an-app/deploy-smart-contracts-on-warden/deploy-an-evm-contract).

### Price feed oracles
Chiado introduces consensus-validated price feed [oracles](/learn/oracle-services) to Warden, ensuring reliable data essential to a vast range of DeFi applications.

### Mainnet readiness
Chiado is prepared for real-world asset integration. As we transition to mainnet, developers will have a smooth experience bringing their projects from test environments into live deployments.

## Key changes

When migrating ot Chiado, please keep in mind the following key changes:

### New denomination

On Chiado, we've changed the denomination from `uward` to `award`.

### A new signature scheme

To be EVM-compatible, keys on Chiado are generated with the `ethermint.crypto.v1.ethsecp256k1` module, while Buenavista uses `cosmos.crypto.secp256k1`.

### New public addresses

As a result of switching to a new signature scheme, the existing private keys now produce new public addresses.

To continue using your private key created on Buenavista, take these steps:

1. Restore the key using the [node command](/operate-a-node/node-commands) below. Replace `my-key-name` with a key name of your choice.
   
   ```bash
   wardend keys add my-key-name --recover
   ```
   
   You'll be prompted to enter your mnemonic seed phrase.
   
2. Get your new address by key name:
   
   ```bash
   wardend keys show my-key-name --address
   ```
   
Your funds will be automatically transferred to the new address.
   
### EVM wallets support

We encourage users and application builders to store and delegate their test WARD with EVM wallets.
