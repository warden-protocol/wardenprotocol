---
sidebar_position: 1.5
---

# What's new?

:::important
Chiado is our new and improved testnet. Please make sure to transition all your testing and development processes here.
:::

## Key features

Chiado represents a crucial milestone in our journey towards mainnet launch. Here are the key features of the update:

### Consensus AI readiness

By laying the groundwork for AI integration at the consensus level, Chiado makes it possible for [AIBI](/learn/aibi)’s AI-based inferences and decisions to be directly incorporated into the blockchain's execution layer.

### Dual VM architecture

Chiado now supports EVM Solidity contracts alongside CosmWasm. This dual VM architecture makes it easier to integrate AI inferences with smart contracts, and users can now connect directly with EVM wallets. Learn how to deploy a Solidity contract: [Deploy an EVM contract](/build-an-app/deploy-smart-contracts-on-warden/deploy-an-evm-contract).

### Price feed oracles
Chiado introduces consensus-validated price feed [oracles](/learn/oracle-services) to Warden, ensuring reliable data essential to a vast range of DeFi applications.

### Mainnet readiness
Chiado is prepared for real-world asset integration. As we transition to mainnet, developers will have a smooth experience bringing their projects from test environments into live deployments.

## Key changes

When migrating ot Chiado, please keep in mind the following key changes:

### A new signature scheme
To be EVM-compatible, keys on Chiado are generated with the `ethermint.crypto.v1.ethsecp256k1` module, while Buenavista uses `cosmos.crypto.secp256k1`. As a result, the existing private keys now produce new public addresses.

No action from Buenavista users is required: your funds were automatically transferred to new addresses. To get your address by key name, use the following [node command](/operate-a-node/node-commands):

```bash
wardend keys show my-key-name --address
```

### New denomination
On Chiado, we've changed the denomination from `uward` to `award`.