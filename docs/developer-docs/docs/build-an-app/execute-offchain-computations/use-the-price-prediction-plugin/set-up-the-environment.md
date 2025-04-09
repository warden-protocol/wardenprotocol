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

2. In the new directory, create a file `IAsync.sol`:

   ```solidity title="warden-pricepredictions/src/interfaces/IAsync.sol"
   // SPDX-License-Identifier: LGPL-3.0-only
   pragma solidity >=0.8.18;
   
   import "../common/Types.sol";
   
   address constant IASYNC_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000903;   
   IAsync constant IASYNC_CONTRACT = IAsync(IASYNC_PRECOMPILE_ADDRESS);
   
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
   
   struct PendingFuturesResponse {
       Types.PageResponse pagination;
       Future[] futures;
   }
   
   struct FuturesResponse {
       Types.PageResponse pagination;
       FutureResponse[] futures;
   }
   
   struct FutureByIdResponse {
       FutureResponse futureResponse;
   }
   
   interface IAsync {
       function addFuture(
           string calldata handler,
           bytes calldata input,
           address callback
       ) external returns (uint64 futureId);
   
       function futureById(
           uint64 futureId
       ) external view returns (FutureByIdResponse memory response);
   
       function futures(
           Types.PageRequest calldata pagination,
           address creator
       ) external view returns (FuturesResponse memory response);
   
       function pendingFutures(
           Types.PageRequest calldata pagination
       ) external view returns (PendingFuturesResponse memory response);
   
       event CreateFuture(
           uint64 indexed futureId,
           address indexed creator,
           string handler,
           address callbackAddress
       );
   }
   ```

## 3. Create types

Create a library `Types.sol`, which is referenced in the [interface file](#2-create-an-interface):

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

To implement price predictions, follow this guide: [Implement price predictions](implement-price-requests).
