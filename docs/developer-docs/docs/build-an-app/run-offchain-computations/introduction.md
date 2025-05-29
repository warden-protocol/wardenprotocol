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

## AVR Plugins

The `x/async` module implements such concepts as [Tasks](/learn/warden-protocol-modules/x-async#task) and [AVR Plugins](/learn/warden-protocol-modules/x-async#avr-plugin):

- A **Task** is an offchain user-defined unit of computation that is executed asynchronously. The result is stored onchain. A user can request a Task, specifying an input and an AVR Plugin.
- An **AVR Plugin**, or **Asynchronous Verifiable Resource**, determines what format of input to accept and how to handle it.

In other words, the type of the computation you're going to execute depends on the AVR Plugin type you reference in a Task.

You can learn how to use the available Plugins by following our tutorials:

- [Use the HTTP Plugin](use-the-http-plugin/introduction)
- [Use the price prediction Plugin](use-the-price-prediction-plugin/introduction)

## The request-callback pattern

Requests to `x/async` follow a request-callback pattern:

1. A smart contract makes a request and receives the pending Task ID.
2. The Warden node processes the request offchain.
3. When the response is ready, the contract's callback function is called.
4. The contract processes the response data.

## Get started

You can start with the HTTP Plugin: [Use the HTTP Plugin](use-the-http-plugin/introduction).

If needed, learn the basics before starting:

- [Deploy an EVM contract](../deploy-smart-contracts-on-warden/deploy-an-evm-contract)
- [Get started with precompiles](../interact-with-warden-modules/get-started-with-precompiles)
- [Interact with `x/async`](../interact-with-warden-modules/interact-with-x-async)
