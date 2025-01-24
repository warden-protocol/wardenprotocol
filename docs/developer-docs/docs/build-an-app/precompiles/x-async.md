﻿---
sidebar_position: 3
---

# x/async

## Overview

The [`IAsync` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/async/IAsync.sol) allows calling the [`x/async`](/learn/warden-protocol-modules/x-async) module from EVM smart contracts.

In this article, you'll find a full list of available methods and events. You can use them for querying and managing the following components:

- [Futures](/learn/glossary#future)

To learn how to use this precompile, refer to [Interact with `x/async`](../interact-with-warden-modules/interact-with-x-async).

## Precompile address

To reference the `IAsync` precompile in your code, use the following precompile address:

```
0x0000000000000000000000000000000000000903
```

## Futures

### Create a new Future

- **Method**: `addFuture()`
- **Description**: Creates a Future. Emits the [`CreateFuture`](#createfuture) event.
- **Parameters** :
  ```sol
  @param handler The unique name of the handler
  @param input The handler's input  
  ```
- **Output**:  
  ```sol
  @return futureId The id of the future
  ```
- **Usage example**: [Create a new Future](../interact-with-warden-modules/interact-with-x-async#create-a-new-future)

### Query Futures

- **Method**: `futures()`
- **Description**: Returns a list of all Futures in all states (including pending ones). See the [`FuturesResponse`](#futureresponse) struct.
- **Parameters** :
  ```sol
  @param pagination The pagination details
  @param creator Optional creator address filter
  @return response The paged futures
  ```
- **Output**:  
  ```sol
  @return response The paged futures
  ```
- **Usage example**: [Query Futures](../interact-with-warden-modules/interact-with-x-async#query-futures)

### Query pending Futures

- **Method**: `pendingFutures()`
- **Description**: Returns a list of all pending Futures. See the [`PendingFuturesResponse`](#pendingfuturesresponse ) struct.
- **Parameters** :
  ```sol
  @param pagination The pagination details  
  ```
- **Output**:  
  ```sol
  @return response The paged futures
  ```
- **Usage example**: [Query pending Futures](../interact-with-warden-modules/interact-with-x-async#query-pending-futures)

### Query a Future by ID

- **Method**: `futureById()`
- **Description**: Returns a Future by ID (pending Futures included). See the [`FutureByIdResponse`](#futurebyidresponse) struct.
- **Parameters** :
  ```sol
  @param futureId The future id   
  ```
- **Output**:  
  ```sol
  @return response The future response
  ```
- **Usage example**: [Query a Future by ID](../interact-with-warden-modules/interact-with-x-async#query-a-future-by-id)

## Structs

### `Future`

- **Description**: A struct representing a Future.

```
uint64 id;
address creator;
string handler;
bytes input;
```

### `FutureVote`

- **Description**: A struct representing a vote on the results of a Future. Includes the [`FutureVoteType`](#futurevotetype) enum.

```
uint64 futureId;
bytes Voter;
FutureVoteType vote;
```

### `FutureResult`

- **Description**: A struct representing the result of a Future.

```
uint64 id;
bytes output;
bytes submitter;
```

### `FutureResponse`

- **Description**: A struct representing a Future and its data. Includes the [`Future`](#future), [`FutureVote`](#futurevote), and [`FutureResult`](#futureresult) structs.

```
Future future;
FutureVote[] votes;
FutureResult result;
```

### `FuturesResponse`

- **Description**: A response returned when you [query Futures](#query-futures). Includes the [`FutureResponse`](#futureresponse) struct.

```
Types.PageResponse pagination;
FutureResponse[] futures;
```

### `PendingFuturesResponse`

- **Description**: A response returned when you [query pending Futures](#query-pending-futures). Includes the [`Future`](#future) struct.

```
Types.PageResponse pagination;
Future[] futures;
```

### `FutureByIdResponse`

- **Description**: A response returned when you [query a Future by ID](#query-a-future-by-id). Includes the [`FutureResponse`](#futureresponse) struct.

```
FutureResponse futureResponse;
```

## Enums

### `FutureVoteType`

- **Description**: The Future vote type.

```
Unspecified,
Verified,
Rejected
```

## Events

### `CreateFuture`

- **Description**: An event emitted when [a Future is created](#create-a-new-future).
- **Parameters**:  
  ```sol
  @param creator The address of the creator
  @param futureId The future Id
  @param handler The name of the handler
  ```
