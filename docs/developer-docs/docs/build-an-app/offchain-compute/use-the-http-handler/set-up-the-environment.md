---
sidebar_position: 2
---

#  Set up the environment

## Prerequisites

Before we begin, ensure you have:

1. A running Warden node (local)
2. Foundry installed for contract development and testing
3. Basic knowledge of Solidity and smart contract development

## Step 1. Initialize a new Foundry project

```bash
# Create a new directory for your project
mkdir warden-http-examples
cd warden-http-examples

# Initialize a new Foundry project
forge init
```

## Step 2. Create interface files

We need to create interfaces for interacting with the `x/async` precompile. Create these two files:

```bash
mkdir -p src/interfaces
```

First, create `src/interfaces/IAsync.sol`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

struct FutureResponse {
    uint64 id;
    bytes output;
    string error;
}

struct FutureResult {
    FutureResponse result;
}

struct FutureByIdResponse {
    FutureResult futureResponse;
}

interface IAsync {
    function addFuture(string calldata handler, bytes calldata input, address callback) external returns (uint64);
    function futureById(uint64 id) external view returns (FutureByIdResponse memory);
}

IAsync constant IASYNC_CONTRACT = IAsync(0x0000000000000000000000000000000000000903);
```

Next, create `src/interfaces/Http.sol`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

struct Request {
    string url;
    string method;
    string body;
    string[] headers;
}

struct Response {
    uint256 status;
    bytes body;
    string[] headers;
}
```

## Step 3. Configure Foundry

Update your `foundry.toml` file to use the **Paris EVM** version, which is required for Warden:

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
evm_version = "paris"
```

## Step 4. Set environment variables

Set the following environment variables:

```
export PRIVATE_KEY=your-private-key
export RPC_URL=http://localhost:8545
```

Now you're ready to start creating smart contracts that make **HTTP** requests!
