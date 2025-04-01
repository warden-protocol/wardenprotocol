---
sidebar_position: 1
---

# Introduction

## The `x/async` module

Smart contracts are powerful tools for creating trustless, decentralized applications. However, they have traditionally been isolated from the outside world, unable to access external data without trusted oracles.

Warden Protocol changes this paradigm by providing a built-in mechanism for smart contracts to make **asynchronous offchain computations**:

- The [`x/async` Warden module](/learn/warden-protocol-modules/x-async) allows running offchain heavyweight computations asynchronously and storing the results onchain.
- The [`x/async` precompile](../precompiles/x-async) allows deploying EVM smart contracts that interact with the module.

This section will guide you through using `x/async` to execute different types of computations in your smart contract.

## Computation types

The `x/async` module implements such concepts as [Tasks](/learn/warden-protocol-modules/x-async#plugin) and [Plugins](/learn/warden-protocol-modules/x-async#plugin).

A **Task** is an offchain user-defined  unit of computation that is executed asynchronously. The result is stored onchain. A user can request a Task, specifying an input and a **Plugin**, which determines what kind of input to accept and how to interpret it. In other words, the type of the computation you're going to execute depends on the Plugin you reference in a Task.

Currently, we support two Plugins, which allow executing **price predictions** and **HTTP requests**. You can learn how to use these Plugins by following our tutorials:

- [Use the HTTP Plugin](use-the-http-plugin/introduction)
- [Use the price prediction Plugin](use-the-price-prediction-plugin/introduction)

## Get started

You can start with the HTTP Plugin: [Use the HTTP Plugin](use-the-http-plugin/introduction).

If needed, learn the basics before starting:

- [Deploy an EVM contract](../deploy-smart-contracts-on-warden/deploy-an-evm-contract)
- [Get started with precompiles](../interact-with-warden-modules/get-started-with-precompiles)
- [Interact with `x/async`](../interact-with-warden-modules/interact-with-x-async)
