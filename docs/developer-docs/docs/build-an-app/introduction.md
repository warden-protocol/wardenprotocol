---
sidebar_position: 1
---

# Introduction

## Intelligent Applications

**Intelligent Applications** are smart contracts integrating AI or any offchain logic. Unlike traditional contracts bound by static logic, Intelligent Apps unlock more dynamic user experiences: they're able to reason, adapt, and interact across onchain and offchain environments.

With Warden, you can build crypto super apps, smart [AI Agents](/build-an-agent/introduction), and intelligent custody solutions. For example, see [SpaceWard](https://help.wardenprotocol.org) and the [Warden App](/learn/glossary#warden-app).

## Smart contracts

The main part of any Intelligent Application is a smart contract that allows signing transactions and messages at any destination chain. For this reason, Intelligent App development starts with building a custom smart contract. In contracts, you can interact with our [modules](/learn/warden-protocol-modules/introduction) and [AVR Plugins](/learn/warden-protocol-modules/x-async#avr-plugin) to access all Warden's core features from any chain.

As shown below, Warden Protocol supports two smart contract platforms, allowing you to execute two types of smart contracts.

### EVM contracts

The [`x/evm` Warden module](/learn/warden-protocol-modules/external-modules#xevm) allows executing Ethereum Virtual Machine (EVM) contracts charged by [Cosmos EVM](https://evm.cosmos.network) (former Evmos). They're written in **Solidity**.

Existing Solidity contracts are easy to deploy on Warden, so you can seamlessly port applications from any EVM-compatible chain to Warden and reach new users. You can call [Warden precompiles](precompiles/introduction) to [interact with Warden modules](interact-with-warden-modules/introduction), accessing all core features of Warden Protocol.

For advanced usage of EVM contracts with AI Agents, refer to [Build an onchain AI Agent](/build-an-agent/build-an-onchain-ai-agent/introduction).


### WASM contracts

The [`x/wasm` Warden module](/learn/warden-protocol-modules/external-modules#xwasm) allows executing WebAssembly smart contracts developed with [CosmWasm](https://cosmwasm.com) and **Rust**.

## Section overview

- [Examples of Intelligent Apps](examples-of-intelligent-apps)  
Here you can find a full list of available Intelligent Applications.

- [Set up a Warden account](set-up-a-warden-account)  
Before building an application, you should set up a Warden account (key) on a local chain or a testnet, as shown in this guide. Here you can also find useful node commands for managing keys.

- [Deploy smart contracts on Warden](/category/deploy-smart-contracts-on-warden)  
Get started with Intelligent Apps: deploy a basic [WASM](deploy-smart-contracts-on-warden/deploy-a-wasm-contract) or [EVM](deploy-smart-contracts-on-warden/deploy-an-evm-contract) smart contract on Warden.

- [Call Warden modules in a smart contract](interact-with-warden-modules/introduction)  
Call Warden modules in your contract to access Warden-specific features such as managing Spaces and Keychains, creating Rules, getting data from oracles, and so on.

- [Precompiles](precompiles/introduction)  
Warden precompiles allow you to call Warden modules in EVM contracts. Browse this section to discover full lists of methods available for each precompile.

- [Build with WardenJS](wardenjs)  
Here you'll find information about WardenJS—a tool used for building the frontend part of your application.

## Get started

You can get started with Intelligent Applications by following these steps:

1. [Set up a Warden account](set-up-a-warden-account) on a local chain or on a testnet.
2. [Deploy an EVM contract](deploy-smart-contracts-on-warden/deploy-an-evm-contract) or [a WASM contract](deploy-smart-contracts-on-warden/deploy-a-wasm-contract).
