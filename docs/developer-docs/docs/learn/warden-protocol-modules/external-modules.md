﻿---
sidebar_position: 5
---

# External modules

## Overview

In this section, you'll find descriptions of external [Cosmos SDK](https://docs.cosmos.network) modules used by Warden Protocol. For more details, follow the provided links to external documentation.

## x/evm

The `x/evm` module is a Cosmos SDK module by **Evmos** that allows for the deployment of smart contracts, interaction with the Ethereum Virtual Machine (EVM), and the use of EVM tooling.

To start using `x/evm`, follow this guide:

- [Deploy an EVM contract](/build-an-app/deploy-smart-contracts-on-warden/deploy-an-evm-contract)

Learn more:

- [`x/evm` in Evmos documentation](https://docs.evmos.org/protocol/modules/evm)
- [`x/evm` on GitHub](https://github.com/evmos/ethermint/tree/v0.22.0/x/evm)

## x/wasm

The `x/wasm` module is a Cosmos SDK module that processes certain messages and uses them to upload, instantiate, and execute smart contracts. It's an integral part of **CosmWasm**—a smart contract platform that can be integrated into any blockchain built on top of the Cosmos SDK.

To start using `x/wasm`, follow this guide:

- [Deploy a WASM contract](/build-an-app/deploy-smart-contracts-on-warden/deploy-a-wasm-contract)

Learn more:

- [CosmWasm Contract Semantics](https://docs.cosmwasm.com/docs/smart-contracts/contract-semantics)
- [`x/wasm` on GitHub](https://github.com/CosmWasm/wasmd/blob/main/x/wasm)

## x/gmp

The `x/gmp` module is a Cosmos SDK module that enables **Axelar GMP** (General Message Passing): sending and receiving messages on EVM and Cosmos chains.

GMP allows smart contracts on one chain to send messages and data to smart contracts on another chain. This technology can be used for various purposes: token transfers, data sharing, or triggering actions across chains.

To start using `x/gmp`, follow this guide:

- [Deploy a cross-chain app](/build-an-app/deploy-smart-contracts-on-warden/deploy-a-cross-chain-app)

Learn more:

- [Cosmos GMP documentation](https://docs.axelar.dev/dev/cosmos-gmp)
- [Axelar GMP SDK on GitHub](https://github.com/axelarnetwork/axelar-gmp-sdk-solidity)
- [Warden docs: Bridging](/learn/bridging)

## x/oracle

The `x/oracle` module is a Cosmos SDK module by **Skip Protocol** that enables storing prices onchain in **Skip:Connect** (an oracle service).

To use `x/oracle`, call the [`x/oracle` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/slinky/ISlinky.sol) in your contract. To get started and find a usage example, see these guides:

- [Get started with precompiles](/build-an-app/interact-with-warden-modules/get-started-with-precompiles)
- [Implement automated Orders](/build-an-agent/build-an-onchain-ai-agent/implement-automated-orders/introduction)

Learn more:

- [Connect documentation](https://docs.skip.build/connect/introduction)
- [`x/oracle` on GitHub](https://github.com/skip-mev/slinky/tree/main/x/oracle)
- [Warden docs: Oracle services](/learn/oracle-services)
