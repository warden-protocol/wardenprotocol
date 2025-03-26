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

The `x/async` module implements such concepts as [Futures](/learn/warden-protocol-modules/x-async#future) and [handlers](/learn/warden-protocol-modules/x-async#handler).

A **Future** is an offchain user-defined computational task that is executed asynchronously. The result is stored onchain. A user can request a Future, specifying an input and a **handler**, which determines how to interpret the input. In other words, the type of the computation you're going to execute depends on the handler you pass.

Currently, we support two handlers, which allow executing **price predictions** and **HTTP requests**. You can learn how to use these handlers by following our tutorials:

- [Use the HTTP handler](use-the-http-handler/introduction)
- [Use the price prediction handler](use-the-price-prediction-handler/introduction)

## Get started

You can start with the HTTP handler: [Use the HTTP handler](use-the-http-handler/introduction).

If needed, learn the basics before starting:

- [Deploy an EVM contract](../deploy-smart-contracts-on-warden/deploy-an-evm-contract)
- [Get started with precompiles](../interact-with-warden-modules/get-started-with-precompiles)
- [Interact with `x/async`](../interact-with-warden-modules/interact-with-x-async)
