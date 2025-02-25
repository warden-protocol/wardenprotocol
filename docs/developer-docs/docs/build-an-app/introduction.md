---
sidebar_position: 1
---

# Introduction

## Omnichain Applications

**Omnichain Applications** (**OApps**) are a powerful evolution of traditional smart contracts. They allow signing transactions at any chain, while traditional smart contract applications only target users of a single chain.

An example of an OApp is [SpaceWard](https://help.wardenprotocol.org)—our application functioning as the front-end interface for Warden.

## Omnichain Contracts

The main part of any Omnichain Application is an **Omnichain Contract**: a smart contract that allows signing transactions and messages at any destination chain. For this reason, OApp development starts with building a custom Omnichain Contract.

As shown below, the Warden Protocol integrates with two external modules allowing you to execute two types of smart contracts.

### EVM contracts

The [`x/evm` Warden module](/learn/warden-protocol-modules/external-modules#xevm) allows executing Ethereum Virtual Machine (EVM) contracts charged by [Evmos](https://docs.evmos.org/protocol/modules/evm). They're written in **Solidity**.

Existing Solidity contracts are easy to deploy on Warden, so you can seamlessly port applications from any EVM-compatible chain to Warden and reach new users. You can call [Warden precompiles](precompiles/introduction) to [interact with Warden modules](interact-with-warden-modules/introduction), accessing all core features of the Warden Protocol.

For advanced usage of EVM contracts with AI Agents, refer to [Build an onchain AI Agent](/build-an-agent/build-an-onchain-ai-agent/introduction).

### WASM contracts

The [`x/wasm` Warden module](/learn/warden-protocol-modules/external-modules#xwasm) allows executing WebAssembly smart contracts developed with [CosmWasm](https://cosmwasm.com) and **Rust**.

## Section overview

- [Examples of OApps](examples-of-oapps)  
Here you can find a full list of available OApps.

- [Deploy smart contracts on Warden](/category/deploy-smart-contracts-on-warden)  
Get started with OApps: deploy a basic [WASM](deploy-smart-contracts-on-warden/deploy-a-wasm-contract) or [EVM](deploy-smart-contracts-on-warden/deploy-an-evm-contract) smart contract on Warden.

- [Call Warden modules in a smart contract](interact-with-warden-modules/introduction)  
Call Warden modules in your contract to access Warden-specific features such as managing Spaces and Keychains, creating Rules, getting data from oracles, and so on.

- [Precompiles](precompiles/introduction)  
Warden precompiles allow you to call Warden modules in EVM contracts. Browse this section to discover full lists of methods available for each precompile.

- [Build with WardenJS](wardenjs)  
Here you'll find information about WardenJS—a tool used for building the frontend part of your application.

## Get started

You can get started with OApps by following this guide:

- [Deploy an EVM contract](deploy-smart-contracts-on-warden/deploy-an-evm-contract)