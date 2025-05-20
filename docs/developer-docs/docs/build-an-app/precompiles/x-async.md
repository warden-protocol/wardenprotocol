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

- **Method**: `addFuture()`
- **Description**: Creates a Task. Emits the [`CreateFuture` event](#createfuture).
- **Code**:
  ```
  function addFuture(
      string calldata handler,
      bytes calldata input,
      address callback
  ) external returns (uint64 futureId);
  ```
- **Parameters**:
  ```sol
  @param handler The unique name of the plugin
  @param input The plugin's input
  @param callback The address of callback contract
  ```
  :::note Notes
  - The following Plugins are currently available: `pricepred`, `http`. To learn more, see [`x/async`: AVR Plugins](/learn/warden-protocol-modules/x-async#avr-plugins). 
  - The `callback` parameter is optional. The callback contract must have a `cb()` function, allowing it to be invoked once the Task is ready.
  :::
- **Output**:  
  ```sol
  @return futureId The id of the task
  ```
- **Usage example**: [Create a new Task](../interact-with-warden-modules/interact-with-x-async#create-a-new-task)

### Query Tasks

- **Method**: `futures()`
- **Description**: Returns a list of all Tasks in all states (including pending ones). See the [`FuturesResponse` struct](#futureresponse).
- **Code**:
  ```
  function futures(
      Types.PageRequest calldata pagination,
      address creator
  ) external view returns (FuturesResponse memory response);
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

- **Method**: `pendingFutures()`
- **Description**: Returns a list of all pending Tasks. See the [`PendingFuturesResponse` struct](#pendingfuturesresponse).
- **Code**:
  ```
  function pendingFutures(
      Types.PageRequest calldata pagination
  ) external view returns (PendingFuturesResponse memory response);
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

- **Method**: `futureById()`
- **Description**: Returns a Task by ID (pending Tasks included). See the [`FutureByIdResponse` struct](#futurebyidresponse).
- **Code**:
  ```
  function futureById(
      uint64 taskId
  ) external view returns (FutureByIdResponse memory response);
  ```
- **Parameters**:
  ```sol
  @param futureId The task id   
  ```
- **Output**:  
  ```sol
  @return response The task response
  ```
- **Usage example**: [Query a Task by ID](../interact-with-warden-modules/interact-with-x-async#query-a-task-by-id)

## Structs

### `Future`

- **Description**: A struct representing a Task.
- **Code**:
  ```
  struct Task {
      uint64 id;
      address creator;
      string handler;
      bytes input;
  }
  ```

### `FutureVote`

- **Description**: A struct representing a vote on the results of a Task. Includes the [`FutureVoteType` enum](#futurevotetype).
- **Code**:
  ```
  struct FutureVote {
      uint64 taskId;
      bytes Voter;
      FutureVoteType vote;
  }
  ```

### `FutureResult`

- **Description**: A struct representing the result of a Task.
- **Code**:
  ```
  struct FutureResult {
      uint64 id;
      bytes output;
      bytes submitter;
  }
  ```

### `FutureResponse`

- **Description**: A struct representing a Task and its data. Includes the [`Future`](#future), [`FutureVote`](#futurevote), and [`FutureResult`](#futureresult) structs.
- **Code**:
  ```
  struct FutureResponse {
      Future future;
      FutureVote[] votes;
      FutureResult result;
  }
  ```

### `FuturesResponse`

- **Description**: A response returned when you [query Task](#query-tasks). Includes the [`FutureResponse` struct](#futureresponse).
- **Code**:
  ```
  struct FuturesResponse {
      Types.PageResponse pagination;
      FutureResponse[] futures;
  }
  ```

### `PendingFuturesResponse`

- **Description**: A response returned when you [query pending Task](#query-pending-tasks). Includes the [`Future` struct](#future).
- **Code**:
  ```
  struct PendingFuturesResponse {
      Types.PageResponse pagination;
      Future[] futures;
  }
  ```

### `FutureByIdResponse`

- **Description**: A response returned when you [query a Task by ID](#query-a-task-by-id). Includes the [`FutureResponse` struct](#futureresponse).
- **Code**:
  ```
  struct FutureByIdResponse {
      FutureResponse futureResponse;
  }
  ```

## Enums

### `FutureVoteType`

- **Description**: The Task vote type.
- **Code**:
  ```
  enum FutureVoteType {
     Unspecified,
     Verified,
     Rejected
  }
  ```

## Events

### `CreateFuture`

- **Description**: An event emitted when [a Task is created](#create-a-new-task).
- **Code**:  
  ```sol
  event CreateFuture(
      uint64 indexed futureId,
      address indexed creator,
      string handler,
      address callbackAddress
  );
  ```
- **Parameters**:
  ```
  @param creator The address of the creator
  @param futureId The task Id
  @param handler The name of the plugin
  @param callbackAddress The address of callback contract
  ```
