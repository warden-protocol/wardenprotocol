---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Keychains

## Overview

In this section you will learn how to query and manage `keychains.` If you would like to get an overview of all functions available for IWarden precompile, you can refer to this.

By the end of this tutorial, you will be able to:

- Query Keychains
- Query Keychain by ID
- Create a new Keychain
- Update a Keychain
- Add Keychain admin
- Remove Keychain admin
- Add a Keychain writer

## Prerequisites

To understand how to setup your project, please refer to the [Prequisites](../call-x-warden.md) section.

*Note: For sake of simplicity, we will only add snippets of code related to the `keychain` function of IWarden precompile. If you would like to refer to the entire smart contract, you can check it here.*

### Query Keychains

```solidity
function getKeychains() public view returns (Keychain[] memory keychains, Types.PageResponse memory pageResponse) {
        Types.PageRequest memory pageRequest = Types.PageRequest({
            key: new bytes(0),
            offset: 0,
            limit: 10,
            countTotal: true,
            reverse: false
        });

        return IWarden(WARDEN_ADDRESS).keychains(pageRequest);
    }
```

### Query Keychains by ID

```solidity
function getKeychainById(uint64 id) public view returns (Keychain memory keychain) {
    return IWarden(WARDEN_ADDRESS).keychainById(id);
}
```

### Create a new Keychain

```solidity
function createKeychain(
    string memory name,
    string memory description,
    string memory url,
    string memory keybaseId
) public returns (uint64) {
    // Set up keychain fees
    Types.Coin[] memory keyReqFees = new Types.Coin[](1);
    keyReqFees[0] = Types.Coin({
        denom: "award",
        amount: 100000000000000000 // 0.1 WARD
    });

    Types.Coin[] memory sigReqFees = new Types.Coin[](1);
    sigReqFees[0] = Types.Coin({
        denom: "award",
        amount: 50000000000000000 // 0.05 WARD
    });

    KeychainFees memory fees = KeychainFees({
        keyReq: keyReqFees,
        sigReq: sigReqFees
    });

    return IWarden(WARDEN_ADDRESS).newKeychain(
        name,
        fees,
        description,
        url,
        keybaseId
    );
}
```

### Update a Keychain

```solidity
function updateKeychain(
    uint64 keychainId,
    string memory name,
    string memory description,
    string memory url,
    string memory keybaseId,
    Types.Coin[] memory keyReqFees,
    Types.Coin[] memory sigReqFees
) public returns (bool) {
    KeychainFees memory fees = KeychainFees({
        keyReq: keyReqFees,
        sigReq: sigReqFees
    });

    return IWarden(WARDEN_ADDRESS).updateKeychain(
        keychainId,
        name,
        fees, 
        description,
        url,
        keybaseId
    );
}
```

### Add Keychain admin

```solidity
function addKeychainAdmin(uint64 keychainId, address newAdmin) public returns (bool) {
    return IWarden(WARDEN_ADDRESS).addKeychainAdmin(keychainId, newAdmin);
}
```

### Remove Keychain admin

```solidity
function removeKeychainAdmin(uint64 keychainId, address admin) public returns (bool) {
    return IWarden(WARDEN_ADDRESS).removeKeychainAdmin(keychainId, admin);
}
```

### Add a Keychain writer

```solidity
function addKeychainWriter(uint64 keychainId, address newWriter) public returns (bool) {
    return IWarden(WARDEN_ADDRESS).addKeychainWriter(keychainId, newWriter);
}
```

## Deploy the contract

To understand how to deploy your project, please refer to the [Prequisites](../call-x-warden.md) section.

## Interacting with Keychains

Now that the contract is deployed, we’ll proceed to interact with the IWarden functions one by one to demonstrate their usage. This step focuses on creating and querying Keychain.

### Query all Keychains

```bash
cast call $CONTRACT_ADDRESS "getKeychains()" --rpc-url $RPC_URL
```

### Query all Keychains by ID

```bash
cast call $CONTRACT_ADDRESS "getKeychainById(uint64)" 1 --rpc-url $RPC_URL
```

### Create new Keychain

```bash
cast send $CONTRACT_ADDRESS "createKeychain(string,string,string,string)" "My Keychain" "Keychain Description" "https://example.com" "keybase-id-123" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

### Update Keychain

```bash
cast send $CONTRACT_ADDRESS "updateKeychain(uint64,string,string,string,string,(string,uint256)[],(string,uint256)[])" 1 "Updated Keychain" "Updated Description" "https://updated.com" "new-keybase-id" "(\"award\",100000000000000000)" "(\"award\",50000000000000000)" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

### Add a Keychain admin

cast send $CONTRACT_ADDRESS "addKeychainAdmin(uint64,address)" 1 0xYourAdminAddress --rpc-url $RPC_URL --private-key $PRIVATE_KEY

### Remove a Keychain admin

```bash
cast send $CONTRACT_ADDRESS "removeKeychainAdmin(uint64,address)" 1 0xAdminToRemove --rpc-url $RPC_URL --private-key $PRIVATE_KEY

### Add Keychain writer

```bash
cast send $CONTRACT_ADDRESS "addKeychainWriter(uint64,address)" \
    1 0xYourWriterAddress \
    --rpc-url $RPC_URL \
    --private-key $PRIVATE_KEY
```
