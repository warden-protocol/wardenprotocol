---
sidebar_position: 2
---

# Manage Actions

## Overview

The [`IAct` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/warden/IAct.sol) allows calling the [`x/act`](/learn/warden-protocol-modules/x-act) module from EVM smart contracts.

This article explains how to use `x/act` to manage [Actions](/learn/glossary#action). You'll learn how to call the corresponding functions of the precompile and interact with them after deploying your contract.

To understand how to set up and deploy your project, see [Get started](../get-started.md).

:::tip
For an overview of `x/act` functions, refer to [Precompiles: x/act](../../precompiles/x-act#actions)
:::

## Vote for an Action

To vote for an Action, use the following code in your contract. It calls the [`voteForAction()`](../../precompiles/x-act#vote-for-an-action) function of the precompile.

```solidity
function voteForAction(
    uint64 actionId,
    VoteType voteType
) external returns (XXX);

contract WardenAction {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function voteForAction(
        uint64 actionId,
        VoteType voteType
    ) external returns (XXX) {
        return XXX;
    }
}
```

After deploying your contract, you can interact with it by calling the `voteForAction()` function:

```bash
cast send --private-key $PRIVATE_KEY --rpc-url $RPC_URL "voteForAction(XXX)" XXX
```

## Revoke an Action

To revoke an Action, use the following code in your contract. It calls the [`revokeAction()`](../../precompiles/x-act#revoke-an-action) function of the precompile.

```solidity
function revokeAction(uint64 actionId) external returns (bool);

contract WardenAction {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);
    XXX
}

contract WardenAction {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function revokeAction(
        uint64 actionId
    ) external returns (XXX) {
        return XXX;
    }
}
```

After deploying your contract, you can interact with it by calling the `revokeAction()` function:

```bash
cast send --private-key $PRIVATE_KEY --rpc-url $RPC_URL "revokeAction(uint64)" 1
```

## Query Actions

To get a list of all Actions, use the following code in your contract. It calls the [`actions()`](../../precompiles/x-act#query-actions) function of the precompile.

```solidity
function actions(XXX) external view returns (XXX);

contract WardenAction {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function revokeAction(
        XXX
    ) external returns (XXX) {
        return XXX;
    }
}
```

After deploying your contract, you can interact with it by calling the `getAllActions()` function:

```bash
cast call $CONTRACT_ADDRESS "getAllActions(XXX)" XXX --rpc-url $RPC_URL
```

## Query Actions by address

To get a list of Actions by participant address, use the following code in your contract. It calls the [`actionsByAddress()`](../../precompiles/x-act#query-actions-by-address) function of the precompile.

```solidity
function actionsByAddress(XXX) external view returns (ActionsByAddressResponse memory response);

contract WardenAction {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function getActionsByAddress(
        XXX
    ) external returns (XXX) {
        return XXX;
    }
}
```

After deploying your contract, you can interact with it by calling the `getActionsByAddress()` function:

```bash
cast call $CONTRACT_ADDRESS "getActionsByAddress(XXX)" XXX
```

## Query an Action by ID

To get an Action by ID, use the following code in your contract. It calls the [`actionById()`](../../precompiles/x-act#query-an-action-by-id) function of the precompile.

```solidity
function actionById(uint64 actionId) 
    external view returns(ActionByIdResponse memory response);     

contract WardenAction {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function getActionById(uint64 actionId) external view returns (
        IAct.ActionByIdResponse memory
    ) {
        return ACT.actionById(actionId);
    }
}
```

After deploying your contract, you can interact with it by calling the `getActionById()` function:

```bash
cast call $CONTRACT_ADDRESS "getActionById(uint64)" 1 --rpc-url $RPC_URL
```

## Query the Action status by ID

To get the status of an Action with a given ID, use the following code in your contract. It calls the [`checkAction()`](../../precompiles/x-act#query-the-action-status-by-id) function of the precompile.

```solidity
function checkAction(uint64 actionId) 
    external view returns(XXX);     

contract WardenAction {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function getActionStatusById(
        XXX
    ) external returns (XXX) {
        return XXX;
    }
}
```

After deploying your contract, you can interact with it by calling the `getActionStatusById()` function:

```bash
cast call $CONTRACT_ADDRESS "getActionStatusById(uint64)" 1 --rpc-url $RPC_URL
```
