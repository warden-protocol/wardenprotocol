---
sidebar_position: 1
---

# Introduction

## Warden Protocol modules

**Warden Protocol modules** are [Cosmos SDK](https://docs.cosmos.network/) modules containing most of Warden Protocol's logic.

Users can interact with modules by sending transactions or querying [nodes](/learn/glossary#node). We also provide [precompiles](/build-an-app/interact-with-warden-modules/introduction) that allow calling certain modules in EVM smart contracts.

Articles in this section describe the following modules:

- [`x/warden`](x-warden): It allows users to create and manage their [Spaces](/learn/glossary#space) and request [Keychains](/learn/glossary#keychain) to sign payloads.
- [`x/act`](x-act): It executes arbitrary messages ([Actions](/learn/glossary#action)) under certain conditions ([Rules](/learn/glossary#approval-rule)).
- [`x/async`](x-async): It executes offchain computations ([Tasks](/learn/glossary#task)) asynchronously and stores the results onchain. 
- [External modules](external-modules): `x/gmp`, `x/wasm`, etc.

## Usage

Our modules allow [Omnichain Application](/learn/glossary#omnichain-application) builders to deploy EVM and WASM smart contracts and use Warden features in these contracts:

| Module                                 | Features                                | How to use  |
| ---------------------------------------| --------------------------------------- | ----------- |
| [`x/evm`](external-modules#xevm)       | Deploy and execute EVM smart contracts  | [Deploy an EVM contract](/build-an-app/deploy-smart-contracts-on-warden/deploy-an-evm-contract) |
| [`x/wasm` ](external-modules#xwasm)    | Deploy and execute WASM smart contracts | [Deploy a WASM contract](/build-an-app/deploy-smart-contracts-on-warden/deploy-a-wasm-contract) |
| [`x/warden`](x-warden)                 | Manage Spaces, Keychains, and keys      | [Interact with `x/warden`](/category/interact-with-xwarden), [Implement automated Orders](/build-an-agent/build-an-onchain-ai-agent/implement-automated-orders/introduction) |
| [`x/act`](x-act)                       | Execute Actions according to Rules      | [Interact with `x/act`](/category/interact-with-xact) |
| [`x/async`](x-async)                   | Create and query Tasks                  | [Interact with `x/async`](/build-an-app/interact-with-warden-modules/interact-with-x-async), [Execute offchain computations with `x/async`](/build-an-app/execute-offchain-computations/introduction), [Implement automated Orders with price prediction](/build-an-agent/build-an-onchain-ai-agent/implement-automated-orders-with-price-prediction/introduction) |
| [`x/gmp`](external-modules#xgmp)       | Send and receive cross-chain messages   | [Deploy a cross-chain app](/build-an-app/deploy-smart-contracts-on-warden/deploy-a-cross-chain-app) |
| [`x/oracle`](external-modules#xoracle) | Fetch prices from an oracle service     | Use the [`x/oracle` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/slinky/ISlinky.sol), [Implement automated Orders](/build-an-agent/build-an-onchain-ai-agent/implement-automated-orders/introduction) |
