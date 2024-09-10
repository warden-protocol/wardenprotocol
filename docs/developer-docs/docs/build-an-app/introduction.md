---
sidebar_position: 1
---

# Introduction

## Omnichain Applications

**Omnichain Applications** (**OApps**) are a powerful evolution of traditional smart contracts. They allow signing transactions at any chain, while traditional smart contract applications only target users of a single chain.

An example of an OApp is [SpaceWard](https://help.wardenprotocol.org) – our application functioning as the front-end interface for Warden.

## Omnichain Contracts

The main part of any Omnichain Application is an **Omnichain Contract**: a smart contract that allows signing transactions and messages at any destination chain. For this reason, OApp development starts with building a custom Omnichain Contract.

As shown below, the Warden Protocol integrates with two external modules allowing you to execute two types of smart contracts.

### EVM contracts

The [`x/evm`](/learn/warden-protocol-modules/external-modules#xevm) Warden module allows executing Ethereum Virtual Machine (EVM) contracts charged by [Evmos](https://docs.evmos.org/protocol/modules/evm). They are written in **Solidity**.

Existing Solidity contracts are easy to deploy on Warden, so you can seamlessly port applications from any EVM-compatible chain to Warden and reach new users.

### CosmWasm contracts

The [`x/wasm`](/learn/warden-protocol-modules/external-modules#xwasm) Warden module allows executing WebAssembly smart contracts developed with [CosmWasm](https://cosmwasm.com) and **Rust**.

## Section overview

- [Build a custom smart contract](/category/build-a-custom-smart-contract)  
Get started with OApps: build a basic smart CosmWasm or EVM smart contract.

- [Build with WardenJS](build-with-wardenjs)  
Here you'll find information on WardenJS – a tool used for building the frontend part of your application. Stay tuned in for more frontend guides.

- [Useful links](useful-links)  
To learn more about building smart contracts, check our list of developer resources.

- [Examples of OApps](examples-of-oapps)  
Here you can find a full list of available OApps.

