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

- Run a local chain and get your private key, as shown in [Deploy an EVM smart contract](../../deploy-smart-contracts-on-warden/deploy-an-evm-contract#1-prepare-the-chain). Make sure the chain is running.

## Step 1. Create a Foundry project

Create a new directory and initialize a new Foundry project:

```bash
mkdir warden-priceprediction
cd warden-priceprediction
forge init
```

## Step 2. Create interface files

Create interfaces for interacting with the [`x/async` precompile](../../precompiles/x-async):

1. Create an `src/interfaces` directory:

   ```bash
   mkdir -p src/interfaces
   ```

2. In the new directory, create a file `sIAsync.sol`:

```solidity title="warden-pricepredictions/src/interfaces/IAsync.sol"
// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.18;

import "../common/Types.sol";

/// @dev The IAsync contract's address.
address constant IASYNC_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000903;

/// @dev The IAsync contract's instance.
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
    /// @dev Defines a method to add a future.
    /// @param handler The unique name of the handler
    /// @param input The handler's input
    /// @param callback The address of callback contract
    /// @return futureId The id of the future
    function addFuture(
        string calldata handler,
        bytes calldata input,
        address callback
    ) external returns (uint64 futureId);

    /// @dev Defines a method to query future by id.
    /// @param futureId The future id
    /// @return response The future reponse
    function futureById(
        uint64 futureId
    ) external view returns (FutureByIdResponse memory response);

    /// @dev Defines a method to query futures.
    /// @param pagination The pagination details
    /// @param creator Optional creator address filter
    /// @return response The paged futures
    function futures(
        Types.PageRequest calldata pagination,
        address creator
    ) external view returns (FuturesResponse memory response);

    /// @dev Defines a method to query pending futures.
    /// @param pagination The pagination details
    /// @return response The paged futures
    function pendingFutures(
        Types.PageRequest calldata pagination
    ) external view returns (PendingFuturesResponse memory response);

    /// @dev CreateFuture defines an Event emitted when a future is created.
    /// @param creator The address of the creator
    /// @param futureId The future Id
    /// @param handler The name of the handler
    /// @param callbackAddress The address of callback contract
    event CreateFuture(
        uint64 indexed futureId,
        address indexed creator,
        string handler,
        address callbackAddress
    );
}
```

## Step 3. Create types files

Create types for the interface file.

```solidity title="warden-pricepredictions/src/interfaces/IAsync.sol
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

/// @dev Dec represents a fixed point decimal value. The value is stored as an integer, and the
/// precision is stored as a uint8. The value is multiplied by 10^precision to get the actual value.
    struct Dec {
        uint256 value;
        uint8 precision;
    }

/// @dev Coin is a struct that represents a token with a denomination and an amount.
    struct Coin {
        string denom;
        uint256 amount;
    }

/// @dev DecCoin is a struct that represents a token with a denomination, an amount and a precision.
    struct DecCoin {
        string denom;
        uint256 amount;
        uint8 precision;
    }

/// @dev PageResponse is a struct that represents a page response.
    struct PageResponse {
        bytes nextKey;
        uint64 total;
    }

/// @dev PageRequest is a struct that represents a page request.
    struct PageRequest {
        bytes key;
        uint64 offset;
        uint64 limit;
        bool countTotal;
        bool reverse;
    }

/// @dev Height is a monotonically increasing data type
/// that can be compared against another Height for the purposes of updating and
/// freezing clients
///
/// Normally the RevisionHeight is incremented at each height while keeping
/// RevisionNumber the same. However some consensus algorithms may choose to
/// reset the height in certain conditions e.g. hard forks, state-machine
/// breaking changes In these cases, the RevisionNumber is incremented so that
/// height continues to be monotonically increasing even as the RevisionHeight
/// gets reset
    struct Height {
        // the revision that the client is currently on
        uint64 revisionNumber;
        // the height within the given revision
        uint64 revisionHeight;
    }
}
```

## Step 4. Configure Foundry

Update your `foundry.toml` file to use the Paris EVM version, which is required for Warden:

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
evm_version = "paris"
```

## Step 5. Set environment variables

Set your private key and the RPC URL as environmental variables:

```bash
export PRIVATE_KEY=your-private-key
export RPC_URL=http://localhost:8545
```

Now you're ready to start creating smart contracts that make HTTP requests!

## Next steps

Implement and test Price Prediction Handler: [Price Prediction Handler](implement-price-requests).
