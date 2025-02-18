---
sidebar_position: 1
---

# Manage Rules

## Overview

The [`IAct` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/warden/IAct.sol) allows calling the [`x/act` module](/learn/warden-protocol-modules/x-act) from EVM smart contracts.

This article explains how to use `x/act` to manage [Rules](/learn/glossary#approval-rule). You'll learn how to call the corresponding functions of the precompile and interact with them after deploying your contract.

To understand how to set up and deploy your project, see [Get started with precompiles](../get-started-with-precompiles).

:::tip
For an overview of `x/act` functions, refer to [Precompiles: x/warden](../../precompiles/x-act#rules)
:::

## Create a new Rule

To create a new Rule, use the following code in your contract. It calls the [`newTemplate()` function](../../precompiles/x-act#create-a-new-rule) of the precompile.

```solidity
contract WardenRule {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function createRule(
        string calldata name,
        string calldata definition
    ) external returns (uint64) {
        return ACT.newTemplate(name, definition);
    }
}
```

After deploying your contract, you can interact with it by calling the `createRule()` function:

```bash
cast send $CONTRACT_ADDRESS "createRule(string,string)" \
    "MyRule" "quorum(2, [\"0x123...\", \"0x456...\"])" \
    --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Update a Rule

To update a Rule, use the following code in your contract. It calls the [`updateTemplate()` function](../../precompiles/x-act#update-a-rule) of the precompile.

```solidity
contract WardenRule {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function updateRule(
        uint64 templateId,
        string calldata name,
        string calldata definition
    ) external returns (bool) {
        return ACT.updateTemplate(templateId, name, definition);
    }
}
```

After deploying your contract, you can interact with it by calling the `updateRule()` function:

```bash
cast send $CONTRACT_ADDRESS "updateRule(uint64,string,string)" \
    1 "UpdatedRule" "quorum(3, [\"0x123...\", \"0x456...\", \"0x789...\"])" \
    --private-key $PRIVATE_KEY --rpc-url $RPC_URL
```

## Query Rules

To get a list of all Rules, use the following code in your contract. It calls the [`templates()` function](../../precompiles/x-act#query-rules) of the precompile.

```solidity
contract WardenRule {
    IAct constant ACT = IAct(0x0000000000000000000000000000000000000901);

    function getAllRules(
        Types.PageRequest calldata pagination,
        address creator
    ) external view returns (IAct.TemplatesResponse memory) {
        return ACT.templates(pagination, creator);
    }
}
```

After deploying your contract, you can interact with it by calling the `getAllRules()` function:

```bash
# Get first 10 rules for a creator
cast call $CONTRACT_ADDRESS "getAllRules((bytes,uint64,uint64,bool,bool),address)" \
    "(0x,0,10,true,false)" $CREATOR_ADDRESS --rpc-url $RPC_URL
```

## Query a Rule by ID

To get a Rule by ID, use the following code in your contract. It calls the [`templateById()` function](../../precompiles/x-act#query-a-rule-by-id) of the precompile.

```solidity
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
