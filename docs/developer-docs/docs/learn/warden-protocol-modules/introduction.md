---
sidebar_position: 1
---

# Introduction

## Warden Protocol modules

**Warden Protocol modules** are [Cosmos SDK](https://docs.cosmos.network/) modules containing most of the Warden Protocol's logic. Users can interact with them by sending transactions or querying [nodes](/learn/glossary#warden-protocol-node).

Articles in this section describe the following modules:

- [`x/warden`](x-warden): It allows users to create and manage their [Spaces](/learn/glossary#space) and request [Keychains](/learn/glossary#keychain) to sign payloads.
- [`x/act`](x-act): It executes arbitrary messages ([Actions](/learn/glossary#action)) under certain conditions ([Rules](/learn/glossary#approval-rule)).
- [`x/async`](x-async): It executes off-chain computations ([Futures](/learn/glossary#future)) asynchronously and stores the results on-chain. 
- [External modules](external-modules): `x/gmp`, `x/wasm`, etc.

## Usage

Our modules allow [Omnichain Application](/learn/glossary#omnichain-application) builders to deploy EVM and WASM smart contracts and use Warden features in these contracts:

| Module                                 | Features                                | How to use  |
| ---------------------------------------| --------------------------------------- | ----------- |
| [`x/evm`](external-modules#xevm)       | Deploy and execute EVM smart contracts  | [Deploy an EVM contract](/build-an-app/deploy-smart-contracts-on-warden/deploy-an-evm-contract) |
| [`x/wasm` ](external-modules#xwasm)    | Deploy and execute WASM smart contracts | [Deploy a WASM contract](/build-an-app/deploy-smart-contracts-on-warden/deploy-a-wasm-contract) |
| [`x/warden`](x-warden)                 | Manage Spaces, Keychains, and keys      | [Get started](/build-an-app/interact-with-warden-modules/get-started), [Interact with `x/warden`](/category/interact-with-xwarden) |
| [`x/act`](x-act)                       | Execute Actions according to Rules      | [Get started](/build-an-app/interact-with-warden-modules/get-started), [Precompiles: `x/act`](/build-an-app/precompiles/x-act) |
| [`x/async`](x-async)                   | Create and query Futures                | [Get started](/build-an-app/interact-with-warden-modules/get-started), [Interact with `x/async`](/build-an-app/interact-with-warden-modules/interact-with-x-async) |
| [`x/gmp`](external-modules#xgmp)       | Send and receive cross-chain messages   | [Deploy a cross-chain app](/build-an-app/deploy-smart-contracts-on-warden/deploy-a-cross-chain-app) |
| [`x/oracle`](external-modules#xoracle) | Fetch prices from an oracle service     | Coming soon |
