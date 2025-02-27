---
sidebar_position: 2
---

# Manage Actions

## Overview

The [`IAct` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/act/IAct.sol) allows calling the [`x/act` module](/learn/warden-protocol-modules/x-act) from EVM smart contracts.

This article explains how to use `x/act` to manage [Actions](/learn/glossary#action). You'll learn how to call the corresponding functions of the precompile and interact with them after deploying your contract.

To understand how to set up and deploy your project, see [Get started with precompiles](../get-started-with-precompiles).

:::tip
For an overview of `x/act` functions, refer to [Precompiles: x/act](../../precompiles/x-act#actions)
:::

## Vote for an Action

To vote for an Action, use the following code in your contract. It calls the [`voteForAction()` function](../../precompiles/x-act#vote-for-an-action) of the precompile.

```solidity
enum VoteType { None, Approve, Reject }

contract WardenAction {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function voteForAction(
        uint64 actionId,
        VoteType voteType
    ) external returns (string memory) {
        return ACT.voteForAction(actionId, uint8(voteType));
    }
}
```

After deploying your contract, you can interact with it by calling the `voteForAction()` function:

```bash
# Vote to approve action #1
cast send --private-key $PRIVATE_KEY --rpc-url $RPC_URL "voteForAction(uint64,uint8)" 1 1

# Vote to reject action #1
cast send --private-key $PRIVATE_KEY --rpc-url $RPC_URL "voteForAction(uint64,uint8)" 1 2
```

## Revoke an Action

To revoke an Action, use the following code in your contract. It calls the [`revokeAction()` function](../../precompiles/x-act#revoke-an-action) of the precompile.

```solidity
contract WardenAction {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function revokeAction(
        uint64 actionId
    ) external returns (bool) {
        return ACT.revokeAction(actionId);
    }
}
```

After deploying your contract, you can interact with it by calling the `revokeAction()` function:

```bash
cast send --private-key $PRIVATE_KEY --rpc-url $RPC_URL "revokeAction(uint64)" 1
```

## Query Actions

To get a list of all Actions, use the following code in your contract. It calls the [`actions()` function](../../precompiles/x-act#query-actions) of the precompile.

```solidity
contract WardenAction {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function getAllActions(
        Types.PageRequest calldata pagination
    ) external view returns (IAct.ActionsResponse memory) {
        return ACT.actions(pagination);
    }
}
```

After deploying your contract, you can interact with it by calling the `getAllActions()` function:

```bash
# Get first 10 actions
cast call $CONTRACT_ADDRESS "getAllActions((bytes,uint64,uint64,bool,bool))" \
    "(0x,0,10,true,false)" --rpc-url $RPC_URL
```

## Query Actions by address

To get a list of Actions by participant address, use the following code in your contract. It calls the [`actionsByAddress()` function](../../precompiles/x-act#query-actions-by-address) of the precompile.

```solidity
contract WardenAction {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function getActionsByAddress(
        Types.PageRequest calldata pagination,
        address addr,
        ActionStatus status
    ) external view returns (IAct.ActionsByAddressResponse memory) {
        return ACT.actionsByAddress(pagination, addr, uint8(status));
    }
}
```

After deploying your contract, you can interact with it by calling the `getActionsByAddress()` function:

```bash
# Get first 10 pending actions for address
cast call $CONTRACT_ADDRESS \
    "getActionsByAddress((bytes,uint64,uint64,bool,bool),address,uint8)" \
    "(0x,0,10,true,false)" $ADDRESS 1 --rpc-url $RPC_URL
```

## Query an Action by ID

To get an Action by ID, use the following code in your contract. It calls the [`actionById()` function](../../precompiles/x-act#query-an-action-by-id) of the precompile.

```solidity
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

To get the status of an Action with a given ID, use the following code in your contract. It calls the [`checkAction()` function](../../precompiles/x-act#query-the-action-status-by-id) of the precompile.

```solidity
contract WardenAction {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function getActionStatusById(
        uint64 actionId
    ) external returns (string memory) {
        return ACT.checkAction(actionId);
    }
}
```

After deploying your contract, you can interact with it by calling the `getActionStatusById()` function:

```bash
cast call $CONTRACT_ADDRESS "getActionStatusById(uint64)" 1 --rpc-url $RPC_URL
```
