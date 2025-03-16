---
sidebar_position: 1
---

# Interaction with x/async using HTTP handler

## Introduction

Smart contracts are powerful tools for creating trustless, decentralized applications. However, they have traditionally been isolated from the outside world, unable to access external data without trusted oracles.

Warden changes this paradigm by providing a built-in mechanism for smart contracts to make offchain computations. In this particular section we will learn about `http` handler. In subsequent sections, we will learn about other handlers like `price_prediction` handler.

In this this tutorial will guide you through making **HTTP** requests from smart contracts using Warden's `async` precompile.

### What You'll Learn

- How to make HTTP requests from smart contracts
- How to process asynchronous responses
- How to extract data from CBOR-encoded responses

## Prerequisites

Before we begin, ensure you have:

1. A running Warden node (local)
2. Foundry installed for contract development and testing
3. Basic knowledge of Solidity and smart contract development

## Core Concepts

### The Async Precompile

In this example we will use a precompiled contract at address `0x0000000000000000000000000000000000000903` that enables asynchronous operations, including **HTTP** requests. This precompile allows smart contracts to:

1. Make requests to external APIs
2. Receive responses asynchronously
3. Process the data within the smart contract

## Setting Up Your Environment

### Initialize a New Foundry Project

```bash
# Create a new directory for your project
mkdir warden-http-examples
cd warden-http-examples

# Initialize a new Foundry project
forge init
```

### Create Interface Files

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

### Configure Foundry

Update your `foundry.toml` file to use the **Paris EVM** version, which is required for Warden:

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
evm_version = "paris"
```

Now you're ready to start creating smart contracts that make **HTTP** requests!
