---
sidebar_position: 5
---

# Manage signature requests

## Overview

The [`IWarden` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/warden/IWarden.sol) allows calling the [`x/warden` module](/learn/warden-protocol-modules/x-warden) from EVM smart contracts.

This article explains how to use `x/warden` to manage [signature requests](/learn/glossary#signature-request). You'll learn how to call the corresponding functions of the precompile and interact with them after deploying your contract.

To understand how to set up and deploy your project, see [Get started](../get-started-with-precompiles).

:::tip
- For an overview of `x/warden` functions, refer to [Precompiles: x/warden](../../precompiles/x-warden#signature-requests).
- The precompile address is `0x0000000000000000000000000000000000000900`.
:::

## Create a new signature request

To create a new signature request, use the following code in your contract. It calls the [`newSignRequest()` function](../../precompiles/x-warden#create-a-new-signature-request) of the precompile.

```solidity
function newSignRequest(
    uint64 keyId,
    bytes calldata input,
    bytes[] calldata analyzers,
    bytes calldata encryptionKey,
    Types.Coin[] calldata maxKeychainFees,
    uint64 nonce,
    uint64 actionTimeoutHeight,
    string calldata expectedApproveExpression,
    string calldata expectedRejectExpression,
    uint8 broadcastType
) external returns (bool success);

contract WardenSignatureRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

      function createSignRequest(
        uint64 keyId,
        bytes calldata input,
        bytes[] calldata analyzers,
        bytes calldata encryptionKey,
        Types.Coin[] calldata maxKeychainFees,
        uint64 nonce,
        uint64 actionTimeoutHeight,
        string calldata expectedApproveExpression,
        string calldata expectedRejectExpression,
        uint8 broadcastType
    ) external returns (bool) {
        return WARDEN.newSignRequest(
            keyId,
            input,
            analyzers,
            encryptionKey,
            maxKeychainFees,
            nonce,
            actionTimeoutHeight,
            expectedApproveExpression,
            expectedRejectExpression,
            broadcastType
        );
    }
}
```

After deploying your contract, you can interact with it by calling the `createSignRequest()` function:

```bash
cast send $CONTRACT_ADDRESS "createSignRequest(uint64,bytes,bytes[],bytes,(string,uint256)[],uint64 uint64,string,string,uint8)" 1 0x123... [] 0x456... "(\"award\",100000000000000000)" 1 1000 "approve_expression" "reject_expression" 0 --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Fulfill a signature request

To fulfill a signature request, use the following code in your contract. It calls the [`fulfilSignRequest()` function](../../precompiles/x-warden#fulfill-a-signature-request) of the precompile.

```solidity
function fulfilSignRequest(uint64 requestId, bytes calldata signedData) external returns (bool success);

contract WardenSignatureRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

       function fulfillSignRequest(uint64 requestId, bytes calldata signedData) external returns (bool) {
        return WARDEN.fulfilSignRequest(requestId, signedData);
    }
}
```

After deploying your contract, you can interact with it by calling the `fulfillSignRequest()` function:

```bash
cast send $CONTRACT_ADDRESS "fulfillSignRequest(uint64,bytes)" 1 0x789... --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Reject a signature request

To reject a signature request, use the following code in your contract. It calls the [`rejectSignRequest()` function](../../precompiles/x-warden#reject-a-signature-request) of the precompile.

```
function rejectSignatureRequest(uint64 requestId, string calldata rejectReason) external returns (bool success);

contract WardenKeyRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

     function rejectSignatureRequest(uint64 requestId, string calldata rejectReason) external returns (bool) {
        return WARDEN.rejectSignatureRequest(requestId, rejectReason);
    }
}
```

After deploying your contract, you can interact with it by calling the `rejectSignatureRequest()` function:

```bash
cast send $CONTRACT_ADDRESS "rejectSignatureRequest(uint64,string)" 1 "Invalid key format" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Query signature requests

To get a list of all signature requests, use the following code in your contract. It calls the [`signRequests()` function](../../precompiles/x-warden#query-signature-requests) of the precompile.

```solidity
function signRequests(
    TypesPageRequest calldata pageRequest,
    uint64 keychainId,
    uint8 status,
    uint8 broadcastType
) external view returns (SignRequest[] memory signRequests, TypesPageResponse memory pageResponse);

contract WardenSignatureRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    function getSignRequests(
        uint64 limit,
        uint64 keychainId,
        uint8 status,
        uint8 broadcastType
    ) external view returns (
        IWarden.SignRequest[] memory requests,
        IWarden.TypesPageResponse memory pageResponse
    ) {
        IWarden.TypesPageRequest memory pageRequest = IWarden.TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });

        return WARDEN.signRequests(pageRequest, keychainId, status, broadcastType);
    }
}
```

After deploying your contract, you can interact with it by calling the `getSignRequests()` function:

```bash
cast call $CONTRACT_ADDRESS "getSignRequests(uint64,uint64,uint8,uint8)" 10 1 1 0 --rpc-url $RPC_URL
```

## Query a signature request by ID

To get a signature request by ID, use the following code in your contract. It calls the [`signRequestById()` function](../../precompiles/x-warden#query-a-signature-request-by-id) of the precompile.

```solidity
function signRequestById(uint64 id) external view returns (SignRequest memory signRequest);

contract WardenSignatureRequests {
    IWarden constant WARDEN = IWarden(0x0000000000000000000000000000000000000900);

    function getSignRequestById(uint64 requestId) external view returns (IWarden.SignRequest memory) {
        return WARDEN.signRequestById(requestId);
    }
}
```

After deploying your contract, you can interact with it by calling the `getSignRequestById()` function:

```bash
cast call $CONTRACT_ADDRESS "getSignRequestById(uint64)" 1 --rpc-url $RPC_URL
```
