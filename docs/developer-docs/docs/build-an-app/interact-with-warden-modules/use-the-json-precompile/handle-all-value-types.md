---
sidebar_position: 1
---

# Handle all value types

## Overview

The [`IJson` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/json/IJson.sol) allows manipulating JSON data from EVM smart contracts.

This article covers methods that allow handling all value types. You'll learn how to call these methods and interact with them after deploying your contract.

To understand how to set up and deploy your project, see [Get started with precompiles](../get-started-with-precompiles).

:::tip
- For an overview of `JSON` functions, refer to [Precompiles: JSON](../../precompiles/json#all-value-types).
- The precompile address is `0x0000000000000000000000000000000000000904`.
:::

## Create a new root object

To create an empty root JSON object, use the following code in your contract. It calls the [`newJson()` function](../../precompiles/json#create-a-new-root-object) of the precompile.

```solidity
XXX
```

After deploying your contract, you can interact with it by calling the `XXX()` function.

```bash
XXX
```

## Get a value

To get a value by key, use the following code in your contract. It calls the [`get()` function](../../precompiles/json#get-a-value) of the precompile.

```solidity
XXX
```

After deploying your contract, you can interact with it by calling the `XXX()` function.

```bash
XXX
```

## Remove a pair

To remove a key-value pair from the root object, use the following code in your contract. It calls the [`remove()` function](../../precompiles/json#remove-a-pair) of the precompile.

```solidity
XXX
```

After deploying your contract, you can interact with it by calling the `XXX()` function.

```bash
XXX
```

## Get multiple values

To get multiple values by their keys, use the following code in your contract. It calls the [`read()` function](../../precompiles/json#get-multiple-values) of the precompile.

```solidity
XXX
```

After deploying your contract, you can interact with it by calling the `XXX()` function.

```bash
XXX
```

## Set multiple pairs

To set multiple key-value pairs, use the following code in your contract. It calls the [`write()` function](../../precompiles/json#set-multiple-pairs) of the precompile.

```solidity
XXX
```

After deploying your contract, you can interact with it by calling the `XXX()` function.

```bash
XXX
```
