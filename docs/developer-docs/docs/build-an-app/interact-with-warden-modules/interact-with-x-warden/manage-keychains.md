---
sidebar_position: 3
---

# Manage Keychains

## Overview

The [`IWarden` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/warden/IWarden.sol) allows calling the [`x/warden` module](/learn/warden-protocol-modules/x-warden) from EVM smart contracts.

This article explains how to use `x/warden` to manage [Keychains](/learn/glossary#keychain). You'll learn how to call the corresponding functions of the precompile and interact with them after deploying your contract.

To understand how to set up and deploy your project, see [Get started with precompiles](../get-started-with-precompiles).

:::tip
- For an overview of `x/warden` functions, refer to [Precompiles: x/warden](../../precompiles/x-warden#keychains).
- The precompile address is `0x0000000000000000000000000000000000000900`.
:::

## Create a new Keychain

To create a new Keychain, use the following code in your contract. It calls the [`newKeychain()` function](../../precompiles/x-warden#create-a-new-keychain) of the precompile.

```solidity
function newKeychain(
    string calldata name,
    KeychainFees calldata keychainFees,
    string calldata description,
    string calldata url,
    string calldata keybaseId
) external returns (uint64 id);

contract WardenKeychain {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    function createKeychain(
        string calldata name,
        Types.Coin[] calldata keyReqFees,
        Types.Coin[] calldata sigReqFees,
        string calldata description,
        string calldata url,
        string calldata keybaseId
    ) external returns (uint64) {
        IWarden.KeychainFees memory fees = IWarden.KeychainFees({
            keyReq: keyReqFees,
            sigReq: sigReqFees
        });

        return WARDEN.newKeychain(name, fees, description, url, keybaseId);
    }
}
```

After deploying your contract, you can interact with it by calling the `createKeychain()` function:

```bash
cast send $CONTRACT_ADDRESS "createKeychain(string,string,string,string)" "My Keychain" "Keychain Description" "https://example.com" "keybase-id-123" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Update a Keychain

To update a Keychain, use the following code in your contract. It calls the [`updateKeychain()` function](../../precompiles/x-warden#update-a-keychain) of the precompile.

```solidity
function updateKeychain(
    uint64 keychainId,
    string calldata name,
    KeychainFees calldata keychainFees,
    string calldata description,
    string calldata url,
    string calldata keybaseId
) external returns (bool success);

contract WardenKeychain {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

      function updateKeychain(
        uint64 keychainId,
        string calldata name,
        Types.Coin[] calldata keyReqFees,
        Types.Coin[] calldata sigReqFees,
        string calldata description,
        string calldata url,
        string calldata keybaseId
    ) external returns (bool) {
        IWarden.KeychainFees memory fees = IWarden.KeychainFees({
            keyReq: keyReqFees,
            sigReq: sigReqFees
        });

        return WARDEN.updateKeychain(keychainId, name, fees, description, url, keybaseId);
    }
}
```

After deploying your contract, you can interact with it by calling the `updateKeychain()` function:

```bash
cast send $CONTRACT_ADDRESS "updateKeychain(uint64,string,string,string,string,(string,uint256)[],(string,uint256)[])" 1 "Updated Keychain" "Updated Description" "https://updated.com" "new-keybase-id" "(\"award\",100000000000000000)" "(\"award\",50000000000000000)" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Add a Keychain admin

To add an admin to a Keychain, use the following code in your contract. It calls the [`addKeychainAdmin()` function](../../precompiles/x-warden#add-a-keychain-admin) of the precompile.

```solidity
function addKeychainAdmin(uint64 keychainId, address newAdmin) external returns (bool success);

contract WardenKeychain {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    function addAdmin(uint64 keychainId, address newAdmin) external returns (bool) {
        return WARDEN.addKeychainAdmin(keychainId, newAdmin);
    }
}
```

After deploying your contract, you can interact with it by calling the `addAdmin()` function:

```bash
cast send $CONTRACT_ADDRESS "addAdmin(uint64,address)" 1 0xYourAdminAddress --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Remove a Keychain admin

To remove an admin from a Keychain, use the following code in your contract. It calls the [`removeKeychainAdmin()` function](../../precompiles/x-warden#remove-a-keychain-admin) of the precompile.

```solidity
function removeKeychainAdmin(uint64 keychainId, address admin) external returns (bool success);

contract WardenKeychain {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    function removeAdmin(uint64 keychainId, address admin) external returns (bool) {
        return WARDEN.removeKeychainAdmin(keychainId, admin);
    }
}
```

After deploying your contract, you can interact with it by calling the `removeAdmin()` function:

```bash
cast send $CONTRACT_ADDRESS "removeAdmin(uint64,address)" 1 0xAdminToRemove --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Add a Keychain Writer

To add a Writer to a Keychain, use the following code in your contract. It calls the [`addKeychainWriter()`  function](../../precompiles/x-warden#add-a-keychain-writer) of the precompile.

```solidity
function addKeychainWriter(uint64 keychainId, address newWriter) external returns (bool success);

contract WardenKeychain {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

 function addWriter(uint64 keychainId, address newWriter) external returns (bool) {
        return WARDEN.addKeychainWriter(keychainId, newWriter);
    }
}
```

After deploying your contract, you can interact with it by calling the `addWriter()` function:

```bash
cast send $CONTRACT_ADDRESS "addWriter(uint64,address)" 1 0xYourWriterAddress --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Query Keychains

To get a list of all Keychains, use the following code in your contract. It calls the [`keychains()`  function](../../precompiles/x-warden#query-keychains) of the precompile.

```solidity
function keychains(TypesPageRequest calldata pageRequest) 
    external view returns (Keychain[] memory keychains, TypesPageResponse memory pageResponse);

contract WardenKeychain {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    function getKeychains(uint64 limit) external view returns (
        IWarden.Keychain[] memory keychains,
        IWarden.TypesPageResponse memory pageResponse
    ) {
        IWarden.TypesPageRequest memory pageRequest = IWarden.TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });

        return WARDEN.keychains(pageRequest);
    }
}
```

After deploying your contract, you can interact with it by calling the `getKeychains()` function:

```bash
cast call $CONTRACT_ADDRESS "getKeychains()" --rpc-url $RPC_URL
```

## Query a Keychain by ID

To get a Keychain by ID, use the following code in your contract. It calls the [`keychainById()` function](../../precompiles/x-warden#query-a-keychain-by-id) of the precompile.

```solidity
function keychainById(uint64 id) external view returns (Keychain memory keychain);

contract WardenKeychain {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    function getKeychainById(uint64 keychainId) external view returns (IWarden.Keychain memory) {
        return WARDEN.keychainById(keychainId);
    }
}
```

After deploying your contract, you can interact with it by calling the `getKeychainById()` function:

```bash
cast call $CONTRACT_ADDRESS "getKeychainById(uint64)" 1 --rpc-url $RPC_URL
```
