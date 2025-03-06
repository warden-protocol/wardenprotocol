---
sidebar_position: 5
---

# Interact with x/async

## Overview

The [`IAsync` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/async/IAsync.sol) allows calling the [`x/async` module](/learn/warden-protocol-modules/x-async) from EVM smart contracts.

This article explains how to use `x/async` to manage [Futures](/learn/glossary#future). You'll learn how to call the corresponding functions of the precompile and interact with them after deploying your contract. You can also use the [example contract](#example-contract), which implements a complete interface for interacting with the module. 

:::tip
- For an overview of `x/async` functions, refer to [Precompiles: x/async](../precompiles/x-async).
- The precompile address is `0x0000000000000000000000000000000000000903`.
:::

## Manage Futures

### Create a new Future

To create a Future, use the following code in your contract. It calls the [`addFuture()` function](../precompiles/x-async#create-a-new-future) of the precompile.

```solidity
function addFuture(string calldata handler, bytes calldata input, address callback) external returns (uint64 futureId);

contract AsyncExample {
    IAsync constant ASYNC = IAsync(0x0000000000000000000000000000000000000903);
    
    function createFuture(string calldata handler, bytes calldata input, address callback) external returns (uint64) {
        return ASYNC.addFuture(handler, input, callback);
    }
}   
```

After deploying your contract, you can interact with it by calling the `createFuture()` function:

```bash
cast send $CONTRACT_ADDRESS "createFuture(string,bytes)" "myHandler" "0x1234" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

### Query Futures

To get a list of all Futures in all states (including pending ones), use the following code in your contract. It calls the [`futures()` function](../precompiles/x-async#query-futures) of the precompile.

```solidity
function futures(TypesPageRequest calldata pagination, address creator) external view returns (FuturesResponse memory response);

contract AsyncExample {
    IAsync constant ASYNC = IAsync(0x0000000000000000000000000000000000000903);
    
    function queryFutures(uint64 limit, address creator) external view returns (FuturesResponse memory) {
        TypesPageRequest memory pagination = TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });
        
        return ASYNC.futures(pagination, creator);
    }
}
```

After deploying your contract, you can interact with it by calling the `queryFutures()` function:

```bash
cast call $CONTRACT_ADDRESS "queryFutures(uint64,address)" 10 $CREATOR_ADDRESS --rpc-url $RPC_URL
```

### Query pending Futures

To get a list of all pending Futures, use the following code in your contract. It calls the [`pendingFutures()` function](../precompiles/x-async#query-pending-futures) of the precompile.

```solidity
function pendingFutures(TypesPageRequest calldata pagination) external view returns (PendingFuturesResponse memory response);

contract AsyncExample {
    IAsync constant ASYNC = IAsync(0x0000000000000000000000000000000000000903);
    
    function queryPendingFutures(uint64 limit) external view returns (PendingFuturesResponse memory) {
        TypesPageRequest memory pagination = TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });
        
        return ASYNC.pendingFutures(pagination);
    }
}
```

After deploying your contract, you can interact with it by calling the `queryPendingFutures()` function:

```bash
cast call $CONTRACT_ADDRESS "queryPendingFutures(uint64)" 10 --rpc-url $RPC_URL
```

### Query a Future by ID

To query a Future by ID, use the following code in your contract. It calls the [`futureById()` function](../precompiles/x-async#query-a-future-by-id) of the precompile.

```solidity
function futureById(uint64 futureId) external view returns (FutureByIdResponse memory response);

contract AsyncExample {
    IAsync constant ASYNC = IAsync(0x0000000000000000000000000000000000000903);
    
    function queryFutureById(uint64 futureId) external view returns (FutureByIdResponse memory) {
        return ASYNC.futureById(futureId);
    }
}
```

After deploying your contract, you can interact with it by calling the `queryFutureById()` function:

```bash
cast call $CONTRACT_ADDRESS "queryFutureById(uint64)" 1 --rpc-url $RPC_URL
```

## Example contract

Here is an example contract that implements a complete interface for interacting with the module  and calls all the available `x/async` functions . You can use this code as a starting point for your own implementations or extend it with additional functionality.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IAsync {
    struct TypesPageRequest {
        bytes key;
        uint64 offset;
        uint64 limit;
        bool countTotal;
        bool reverse;
    }
    
    struct TypesPageResponse {
        bytes nextKey;
        uint64 total;
    }
    
    struct Future {
        uint64 id;
        address creator;
        string handler;
        bytes input;
    }

    enum FutureVoteType {
        Unspecified,
        Verified,
        Rejected
    }

    struct FutureVote {
        uint64 futureId;
        bytes Voter;
        FutureVoteType vote;
    }
        

    struct FutureResult { 
        uint64 id;
        bytes output;
        bytes submitter;
    }

    struct FutureResponse {
        Future future;
        FutureVote[] votes;
        FutureResult result;
    }
    
    struct FuturesResponse {
        TypesPageResponse pagination;
        FutureResponse[] futures;
    }
    
    struct FutureByIdResponse {
        FutureResponse futureResponse;
    }
    
    struct PendingFuturesResponse {
        TypesPageResponse pagination;
        Future[] futures;
    }
    
    function addFuture(string calldata handler, bytes calldata input, address callback) external returns (uint64 futureId);
    function futures(TypesPageRequest calldata pagination, address creator) external view returns (FuturesResponse memory response);
    function pendingFutures(TypesPageRequest calldata pagination) external view returns (PendingFuturesResponse memory response);
    function futureById(uint64 futureId) external view returns (FutureByIdResponse memory response);
    
    event CreateFuture(uint64 indexed futureId, address indexed creator, string handler, address callbackAddress);
}

contract AsyncExample {
    IAsync constant ASYNC = IAsync(0x0000000000000000000000000000000000000903);
    
    // Create a new Future
    function createFuture(string calldata handler, bytes calldata input, address callback) external returns (uint64) {
        return ASYNC.addFuture(handler, input, callback);
    }
    
    // Query all Futures
    function queryFutures(uint64 limit, address creator) external view returns (IAsync.FuturesResponse memory) {
        IAsync.TypesPageRequest memory pagination = IAsync.TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });        
        return ASYNC.futures(pagination, creator);
    }

    
    // Query pending Futures
    function queryPendingFutures(uint64 limit) external view returns (IAsync.PendingFuturesResponse memory) {
        IAsync.TypesPageRequest memory pagination = IAsync.TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });
    }
    
    // Query a Future by ID
    function queryFutureById(uint64 futureId) external view returns (IAsync.FutureByIdResponse memory) {
        return ASYNC.futureById(futureId);
    }
}
```
