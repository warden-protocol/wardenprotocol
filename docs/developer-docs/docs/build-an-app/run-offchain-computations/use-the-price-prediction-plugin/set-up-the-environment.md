---
sidebar_position: 2
---

# Set up the environment

## Prerequisites

Before you start, complete the following prerequisites:

- [Install Foundry](https://book.getfoundry.sh/getting-started/installation) by running this command:

   ```bash
   curl -L https://foundry.paradigm.xyz | bash \ 
   foundryup
   ```

- [Set up a Warden account](../../set-up-a-warden-account) on a local chain. Note down your **private key**.

- Make sure the chain is running. You can start it by running `wardend start` in a separate terminal window.

## 1. Create a Foundry project

Create a new directory and initialize a new Foundry project:

```bash
mkdir warden-priceprediction
cd warden-priceprediction
forge init
```

## 2. Create an interface

Create an interface for interacting with the [`x/async` precompile](../../precompiles/x-async):

1. Create an `src/interfaces` directory:

   ```bash
   mkdir -p src/interfaces
   ```

2. In the new directory, create an `IAsync.sol` file:

   ```solidity title="warden-pricepredictions/src/interfaces/IAsync.sol"
   // SPDX-License-Identifier: LGPL-3.0-only
   pragma solidity >=0.8.18;
   
   import "../common/Types.sol";
   
   address constant IASYNC_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000903;   
   IAsync constant IASYNC_CONTRACT = IAsync(IASYNC_PRECOMPILE_ADDRESS);
   
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
   
   struct PendingTasksResponse {
       Types.PageResponse pagination;
       Task[] tasks;
   }
   
   struct TasksResponse {
       Types.PageResponse pagination;
       TaskResponse[] tasks;
   }
   
   struct TaskByIdResponse {
       TaskResponse taskResponse;
   }
   
   interface IAsync {
       function addTask(
           string calldata plugin,
           bytes calldata input,
           address callback
       ) external returns (uint64 taskId);
   
       function taskById(
           uint64 taskId
       ) external view returns (TaskByIdResponse memory response);
   
       function tasks(
           Types.PageRequest calldata pagination,
           address creator
       ) external view returns (TasksResponse memory response);
   
       function pendingTasks(
           Types.PageRequest calldata pagination
       ) external view returns (PendingTasksResponse memory response);
   
       event CreateTask(
           uint64 indexed taskId,
           address indexed creator,
           string plugin,
           address callbackAddress
       );
   }
   ```

## 3. Create types

Create a library `Types.sol`, which is referenced in the [interface file](#2-create-an-interface):

1. First, create an `src/common` directory:

   ```bash
   mkdir -p src/common
   ```

2. In the new directory, create a `Types.sol` file:

   ```solidity title="warden-pricepredictions/src/interfaces/Types.sol"
   // SPDX-License-Identifier: LGPL-3.0-only
   pragma solidity >=0.8.18;
   
   library Types {
       struct AnyType {
       string typeUrl;
       bytes value;
       }
   
       struct Timestamp {
           uint64 secs;
           uint64 nanos;
       }
   
       struct Dec {
           uint256 value;
           uint8 precision;
       }
   
       struct Coin {
           string denom;
           uint256 amount;
       }
   
       struct DecCoin {
           string denom;
           uint256 amount;
           uint8 precision;
       }
   
       struct PageResponse {
           bytes nextKey;
           uint64 total;
       }
   
       struct PageRequest {
           bytes key;
           uint64 offset;
           uint64 limit;
           bool countTotal;
           bool reverse;
       }
   
       struct Height {
           // the revision that the client is currently on
           uint64 revisionNumber;
           // the height within the given revision
           uint64 revisionHeight;
       }
   }
   ```

## 4. Configure Foundry

Update your `foundry.toml` file to use the Paris EVM version, which is required for Warden:

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
evm_version = "paris"
```

## 5. Set environment variables

Set your private key and the RPC URL as environmental variables:

```bash
export PRIVATE_KEY=your-private-key
export RPC_URL=http://localhost:8545
```

Now you're ready to start creating smart contracts that utilize price predictions!

## Next steps

To implement price predictions, follow this guide: [Implement price predictions](implement-price-prediction-requests).
