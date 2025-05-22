---
sidebar_position: 3
---

# x/async

## Overview

The `IAsync.sol` precompile enables EVM smart contracts to interact with the [`x/async` module](/learn/warden-protocol-modules/x-async).

In this article, you'll find a full list of available methods, allowing you to query and manage the following components:

- [Tasks](/learn/warden-protocol-modules/x-async#task)

To learn how to use this precompile, refer to [Interact with `x/async`](../interact-with-warden-modules/interact-with-x-async).

:::note Code
You can find the `x/async` precomile code on GitHub: [`IAsync.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/async/IAsync.sol)
:::

## Precompile address

To reference the `IAsync` precompile in your code, use the following precompile address:

```
0x0000000000000000000000000000000000000903
```

## Tasks

### Create a new Task

- **Method**: `addTask()`
- **Description**: Creates a Task. Emits the [`CreateTask` event](#createtask).
- **Code**:
  ```
  function addTask(
      string calldata plugin,
      bytes calldata input,
      address callback
  ) external returns (uint64 taskId);
  ```
- **Parameters**:
  ```sol
  @param plugin The unique name of the plugin
  @param input The plugin's input
  @param callback The address of callback contract
  ```
  :::note Notes
  - The following Plugin types are currently available: `pricepred`, `http`. To learn more, see [`x/async`: AVR Plugins](/learn/warden-protocol-modules/x-async#avr-plugins). 
  - The `callback` parameter is optional. The callback contract must have a `cb()` function, allowing it to be invoked once the Task is ready.
  :::
- **Output**:  
  ```sol
  @return taskId The id of the task
  ```
- **Usage example**: [Create a new Task](../interact-with-warden-modules/interact-with-x-async#create-a-new-task)

### Query Tasks

- **Method**: `tasks()`
- **Description**: Returns a list of all Tasks in all states (including pending ones). See the [`TasksResponse` struct](#taskresponse).
- **Code**:
  ```
  function tasks(
      Types.PageRequest calldata pagination,
      address creator
  ) external view returns (TasksResponse memory response);
  ```
- **Parameters**:
  ```sol
  @param pagination The pagination details
  @param creator Optional creator address filter
  ```
- **Output**:  
  ```sol
  @return response The paged tasks
  ```
- **Usage example**: [Query Tasks](../interact-with-warden-modules/interact-with-x-async#query-tasks)

### Query pending Tasks

- **Method**: `pendingTasks()`
- **Description**: Returns a list of all pending Tasks. See the [`PendingTasksResponse` struct](#pendingtasksresponse).
- **Code**:
  ```
  function pendingTasks(
      Types.PageRequest calldata pagination
  ) external view returns (PendingTasksResponse memory response);
  ```
- **Parameters**:
  ```sol
  @param pagination The pagination details  
  ```
- **Output**:  
  ```sol
  @return response The paged tasks
  ```
- **Usage example**: [Query pending Tasks](../interact-with-warden-modules/interact-with-x-async#query-pending-tasks)

### Query a Task by ID

- **Method**: `taskById()`
- **Description**: Returns a Task by ID (pending Tasks included). See the [`TaskByIdResponse` struct](#taskbyidresponse).
- **Code**:
  ```
  function taskById(
      uint64 taskId
  ) external view returns (TaskByIdResponse memory response);
  ```
- **Parameters**:
  ```sol
  @param taskId The task id   
  ```
- **Output**:  
  ```sol
  @return response The task response
  ```
- **Usage example**: [Query a Task by ID](../interact-with-warden-modules/interact-with-x-async#query-a-task-by-id)

## Plugins

### Query Plugins

- **Method**: `plugins()`
- **Description**: Returns a list of all available Plugins. See the [`PluginsResponse` struct](#pluginsresponse).
- **Code**:
  ```
  function plugins(
      Types.PageRequest calldata pagination
  ) external view returns (PluginsResponse memory response);
  ```
- **Parameters**:
  ```sol
  @dev Defines a method to query available plugins.
  @param pagination The pagination details
  ```
- **Output**:  
  ```sol
  @return response The paged plugins
  ```
- **Usage example**: [Query Plugins](../interact-with-warden-modules/interact-with-x-async#query-plugins)

## Structs

### `Task`

- **Description**: A struct representing a Task.
- **Code**:
  ```
  struct Task {
      uint64 id;
      address creator;
      string plugin;
      bytes input;
  }
  ```

### `TaskVote`

- **Description**: A struct representing a vote on the results of a Task. Includes the [`TaskVoteType` enum](#taskvotetype).
- **Code**:
  ```
  struct TaskVote {
      uint64 taskId;
      bytes Voter;
      TaskVoteType vote;
  }
  ```

### `TaskResult`

- **Description**: A struct representing the result of a Task.
- **Code**:
  ```
  struct TaskResult {
      uint64 id;
      bytes output;
      bytes submitter;
  }
  ```

### `TaskResponse`

- **Description**: A struct representing a Task and its data. Includes the [`Task`](#task), [`TaskVote`](#taskvote), and [`TaskResult`](#taskresult) structs.
- **Code**:
  ```
  struct TaskResponse {
      Task task;
      TaskVote[] votes;
      TaskResult result;
  }
  ```

### `TasksResponse`

- **Description**: A response returned when you [query Tasks](#query-tasks). Includes the [`TaskResponse` struct](#taskresponse).
- **Code**:
  ```
  struct TasksResponse {
      Types.PageResponse pagination;
      TaskResponse[] tasks;
  }
  ```

### `PendingTasksResponse`

- **Description**: A response returned when you [query pending Task](#query-pending-tasks). Includes the [`Task` struct](#task).
- **Code**:
  ```
  struct PendingTasksResponse {
      Types.PageResponse pagination;
      Task[] tasks;
  }
  ```

### `TaskByIdResponse`

- **Description**: A response returned when you [query a Task by ID](#query-a-task-by-id). Includes the [`TaskResponse` struct](#taskresponse).
- **Code**:
  ```
  struct TaskByIdResponse {
      TaskResponse taskResponse;
  }
  ```
### `Plugin`

- **Description**: A struct representing a Plugin.
- **Code**:
  ```
  struct Plugin {
    string id;
    address creator;
    string description;
  }
  ```

### `PluginsResponse`

- **Description**: A response returned when you [query Plugins](#query-plugins). Includes the [`Plugin` struct](#plugin).
- **Code**:
  ```
  struct PluginsResponse {
    Types.PageResponse pagination;
    Plugin[] plugins;
  }
  ```

## Enums

### `TaskVoteType`

- **Description**: The Task vote type.
- **Code**:
  ```
  enum TaskVoteType {
     Unspecified,
     Verified,
     Rejected
  }
  ```

## Events

### `CreateTask`

- **Description**: An event emitted when [a Task is created](#create-a-new-task).
- **Code**:  
  ```sol
  event CreateTask(
      uint64 indexed taskId,
      address indexed creator,
      string plugin,
      address callbackAddress
  );
  ```
- **Parameters**:
  ```
  @param creator The address of the creator
  @param taskId The task Id
  @param plugin The name of the plugin
  @param callbackAddress The address of callback contract
  ```
