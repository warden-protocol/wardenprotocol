---
sidebar_position: 1
---

# Manage Rules

## Overview

The [`IAct` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/warden/IAct.sol) allows calling the [`x/act`](/learn/warden-protocol-modules/x-act) module from EVM smart contracts.

This article explains how to use `x/act` to manage [Rules](/learn/glossary#rule). You'll learn how to call the corresponding functions of the precompile and interact with them after deploying your contract.

To understand how to set up and deploy your project, see [Get started](../get-started.md).

:::tip
For an overview of `x/act` functions, refer to [Precompiles: x/warden](../../precompiles/x-act#rules)
:::

## Create a new Rule

To create a new Rule, use the following code in your contract. It calls the [`newTemplate()`](../../precompiles/x-warden#create-a-new-rule) function of the precompile.

```solidity
function newTemplate(
    string calldata name,
    string calldata definition
) external returns (uint64);

contract WardenSpace {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function createRule(
        string calldata name,
        string calldata definition
    ) external returns (XXX) {
        return XXX;
    }
}
```

After deploying your contract, you can interact with it by calling the `createRule()` function:

```bash
cast send $CONTRACT_ADDRESS "createRule(XXX)" XXX --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Update a Rule

To update a Rule, use the following code in your contract. It calls the [`updateTemplate()`](../../precompiles/x-warden#update-a-rule) function of the precompile.

```solidity
function updateTemplate(
    uint64 templateId,
    string calldata name,
    string calldata definition
) external returns (bool);

contract WardenRule {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function updateRule(
        string calldata name,
        string calldata definition
    ) external returns (XXX) {
        return XXX;
    }
}
```

After deploying your contract, you can interact with it by calling the `updateRule()` function:

```bash
cast send send --private-key $PRIVATE_KEY --rpc-url $RPC_URL "updateRule(XXX)" XXX
```

## Query Rules

To get a list of all Rules, use the following code in your contract. It calls the [`templates()`](../../precompiles/x-warden#query-rules) function of the precompile.

```solidity
function templates(XXX) external view returns (XXX);

contract WardenRule {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function getAllRules(
        XXX
    ) external returns (XXX) {
        return XXX;
    }
}
```

After deploying your contract, you can interact with it by calling the `getAllRules()` function:

```bash
cast call $CONTRACT_ADDRESS "getAllRules(XXX)" XXX --rpc-url $RPC_URL
```

## Query a Rule by ID

To get a Rule by ID, use the following code in your contract. It calls the [`templateById()`](../../precompiles/x-warden#query-a-rule-by-id) function of the precompile.

```solidity
function templateById(uint64 templateId) 
    external view returns(TemplateByIdResponse memory response);     

contract WardenRule {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function getRuleById(uint64 templateId) external view returns (
        IAct.TemplateByIdResponse memory
    ) {
        return ACT.templateById(templateId);
    }
}
```

After deploying your contract, you can interact with it by calling the `getRuleById()` function:

```bash
cast call $CONTRACT_ADDRESS "getRuleById(uint64)" 1 --rpc-url $RPC_URL
```
