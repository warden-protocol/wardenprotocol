---
sidebar_position: 5
---

# Interact with x/async

## Overview

The [`IAsync` precompile](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/precompiles/async/IAsync.sol) allows calling the [`x/async` module](/learn/warden-protocol-modules/x-async) from EVM smart contracts.

This article explains how to use `x/async` to manage [Tasks](/learn/warden-protocol-modules/x-async#task). You'll learn how to call the corresponding functions of the precompile and interact with them after deploying your contract. You can also use the [example contract](#example-contract), which implements a complete interface for interacting with the module. 

:::tip
- For an overview of `x/async` functions, refer to [Precompiles: x/async](../precompiles/x-async).
- The precompile address is `0x0000000000000000000000000000000000000903`.
:::

## Manage Tasks

### Create a new Task

To create a Task, use the following code in your contract. It calls the [`addTask()` function](../precompiles/x-async#create-a-new-task) of the precompile.

```solidity
function addTask(string calldata plugin, bytes calldata input, address callback) external returns (uint64 taskId);

contract AsyncExample {
    IAsync constant ASYNC = IAsync(0x0000000000000000000000000000000000000903);
    
    function createTask(string calldata plugin, bytes calldata input, address callback) external returns (uint64) {
        return ASYNC.addTask(plugin, input, callback);
    }
}   
```

After deploying your contract, you can interact with it by calling the `createTask()` function:

```bash
cast send $CONTRACT_ADDRESS "createTask(string,bytes,address)" \
  "my-plugin" "0x1234" "address" \
  --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

:::tip
- You need to specify an AVR Plugin (`plugin`). The following Plugins are currently available: `pricepred`, `http`. To learn more, see [`x/async`: AVR Plugins](/learn/warden-protocol-modules/x-async#avr-plugins). 
- The `callback` parameter is optional. The callback contract must have a `cb()` function, allowing it to be invoked once the Task is ready.
:::

### Query Tasks

To get a list of all Tasks in all states (including pending ones), use the following code in your contract. It calls the [`tasks()` function](../precompiles/x-async#query-tasks) of the precompile.

```solidity
function tasks(TypesPageRequest calldata pagination, address creator) external view returns (TasksResponse memory response);

contract AsyncExample {
    IAsync constant ASYNC = IAsync(0x0000000000000000000000000000000000000903);
    
    function queryTasks(uint64 limit, address creator) external view returns (IAsync.TasksResponse memory) {
        IAsync.TypesPageRequest memory pagination = TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });
        
        return ASYNC.tasks(pagination, creator);
    }
}
```

After deploying your contract, you can interact with it by calling the `queryTasks()` function:

```bash
cast call $CONTRACT_ADDRESS "queryTasks(uint64,address)" 10 \
  $CREATOR_ADDRESS --rpc-url $RPC_URL
```

### Query pending Tasks

To get a list of all pending Tasks, use the following code in your contract. It calls the [`pendingTasks()` function](../precompiles/x-async#query-pending-tasks) of the precompile.

```solidity
function pendingTasks(TypesPageRequest calldata pagination) external view returns (PendingTasksResponse memory response);

contract AsyncExample {
    IAsync constant ASYNC = IAsync(0x0000000000000000000000000000000000000903);
    
    function queryPendingTasks(uint64 limit) external view returns (IAsync.PendingTasksResponse memory) {
        IAsync.TypesPageRequest memory pagination = TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });

        return ASYNC.pendingTasks(pagination);
    }
}
```

After deploying your contract, you can interact with it by calling the `queryPendingTasks()` function:

```bash
cast call $CONTRACT_ADDRESS "queryPendingTasks(uint64)" 10 --rpc-url $RPC_URL
```

### Query a Task by ID

To query a Task by ID, use the following code in your contract. It calls the [`taskById()` function](../precompiles/x-async#query-a-task-by-id) of the precompile.

```solidity
function taskById(uint64 taskId) external view returns (TaskByIdResponse memory response);

contract AsyncExample {
    IAsync constant ASYNC = IAsync(0x0000000000000000000000000000000000000903);
    
    function queryTaskById(uint64 taskId) external view returns (IAsync.TaskByIdResponse memory) {
        return ASYNC.taskById(taskId);
    }
}
```

After deploying your contract, you can interact with it by calling the `queryTaskById()` function:

```bash
cast call $CONTRACT_ADDRESS "queryTaskById(uint64)" 1 --rpc-url $RPC_URL
```

### Query Plugins

To get a list of all available Plugins, use the following code in your contract. It calls the [`plugins()` function](../precompiles/x-async#query-plugins) of the precompile.

```solidity
function plugins(TypesPageRequest calldata pagination) external view returns (PluginsResponse memory response);

contract AsyncExample {
    IAsync constant ASYNC = IAsync(0x0000000000000000000000000000000000000903);
    
    function queryPlugins(uint64 limit) external view returns (IAsync.PluginsResponse memory) {
        IAsync.TypesPageRequest memory pagination = IAsync.TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });
        
        return ASYNC.plugins(pagination);
    }
}
```

After deploying your contract, you can interact with it by calling the `queryPlugins()` function:

```bash
cast call $CONTRACT_ADDRESS "queryPlugins(uint64)" 10 --rpc-url $RPC_URL
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
    
    struct Task {
        uint64 id;
        address creator;
        string plugin;
        bytes input;
    }

    enum TaskVoteType {
        Unspecified,
        Verified,
        Rejected
    }

    struct TaskVote {
        uint64 taskId;
        bytes Voter;
        TaskVoteType vote;
    }
        
    struct TaskResult { 
        uint64 id;
        bytes output;
        bytes submitter;
    }

    struct TaskResponse {
        Task task;
        TaskVote[] votes;
        TaskResult result;
    }
    
    struct TasksResponse {
        TypesPageResponse pagination;
        TaskResponse[] tasks;
    }
    
    struct TaskByIdResponse {
        TaskResponse taskResponse;
    }
    
    struct PendingTasksResponse {
        TypesPageResponse pagination;
        Task[] tasks;
    }
    
    struct Plugin {
        string id;
        address creator;
        string description;
    }

    struct PluginsResponse {
        TypesPageResponse pagination;
        Plugin[] plugins;
    }
    
    function addTask(string calldata plugin, bytes calldata input, address callback) external returns (uint64 taskId);
    function tasks(TypesPageRequest calldata pagination, address creator) external view returns (TasksResponse memory response);
    function pendingTasks(TypesPageRequest calldata pagination) external view returns (PendingTasksResponse memory response);
    function taskById(uint64 taskId) external view returns (TaskByIdResponse memory response);
    function plugins(TypesPageRequest calldata pagination) external view returns (PluginsResponse memory response);
    
    event CreateTask(uint64 indexed taskId, address indexed creator, string plugin, address callbackAddress);
}

contract AsyncExample {
    IAsync constant ASYNC = IAsync(0x0000000000000000000000000000000000000903);
    
    // Create a new Task
    function createTask(string calldata plugin, bytes calldata input, address callback) external returns (uint64) {
        return ASYNC.addTask(plugin, input, callback);
    }
    
    // Query all Tasks
    function queryTasks(uint64 limit, address creator) external view returns (IAsync.TasksResponse memory) {
        IAsync.TypesPageRequest memory pagination = IAsync.TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });     

        return ASYNC.tasks(pagination, creator);
    }

    // Query pending Tasks
    function queryPendingTasks(uint64 limit) external view returns (IAsync.PendingTasksResponse memory) {
        IAsync.TypesPageRequest memory pagination = IAsync.TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });

        return ASYNC.pendingTasks(pagination);
    }
    
    // Query a Task by ID
    function queryTaskById(uint64 taskId) external view returns (IAsync.TaskByIdResponse memory) {
        return ASYNC.taskById(taskId);
    }

    // Query all Plugins
    function queryPlugins(uint64 limit) external view returns (IAsync.PluginsResponse memory) {
        IAsync.TypesPageRequest memory pagination = IAsync.TypesPageRequest({
            key: new bytes(0),
            offset: 0,
            limit: limit,
            countTotal: true,
            reverse: false
        });
        
        return ASYNC.plugins(pagination);
    }
}
```
## Next steps

Now you can learn how to use different AVR Plugins: [Run offchain computations with x/async AVR Plugins](../run-offchain-computations/introduction).

After you feel confident with `x/async` and other precompiles, you can [build an AI Agent](/build-an-agent/introduction).
