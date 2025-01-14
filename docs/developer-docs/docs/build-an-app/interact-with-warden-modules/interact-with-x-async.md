---
sidebar_position: 5
---

# Interact with x/async

## Overview

The [`IAsync` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/async/IAsync.sol) allows calling the [`x/async`](/learn/warden-protocol-modules/x-async) module from EVM smart contracts.

This article explains how to use `x/async` to manage [Futures](/learn/glossary#future). You'll learn how to call the corresponding functions of the precompile and interact with them after deploying your contract.

To understand how to set up and deploy your project, see [Get started](get-started.md).

:::tip
- For an overview of `x/warden` functions, refer to [Precompiles: x/warden](../precompiles/x-async).
- The precompile address is `0x0000000000000000000000000000000000000903`.
:::

## Manage Futures

### Create a new Future

To create a Future, use the following code in your contract. It calls the [`addFuture()`](../precompiles/x-async#create-a-new-future) function of the precompile.

```solidity
XXX
```

After deploying your contract, you can interact with it by calling the `XXX()` function:

```bash
XXX
```

### Query Futures

To get a list of all Futures in all states (including pending ones), use the following code in your contract. It calls the [`futures()`](../precompiles/x-async#query-futures) function of the precompile.

```solidity
XXX
```

After deploying your contract, you can interact with it by calling the `XXX()` function:

```bash
XXX
```

### Query pending Futures

To get a list of all pending Futures, use the following code in your contract. It calls the [`pendingFutures()`](../precompiles/x-async#query-pending-futures) function of the precompile.

```solidity
XXX
```

After deploying your contract, you can interact with it by calling the `XXX()` function:

```bash
XXX
```

### Query a Future by ID

To query a Future by ID, use the following code in your contract. It calls the [`futureById()`](../precompiles/x-async#query-a-future-by-id) function of the precompile.

```solidity
XXX
```

After deploying your contract, you can interact with it by calling the `XXX()` function:

```bash
XXX
```
