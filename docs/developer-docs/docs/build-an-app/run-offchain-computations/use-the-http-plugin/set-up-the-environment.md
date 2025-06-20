---
sidebar_position: 2
---

#  Set up the environment

## Prerequisites

Before you start, complete the following prerequisites:

- [Install Foundry](https://book.getfoundry.sh/getting-started/installation) by running this command:

   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```

- [Set up a Warden account](../../set-up-a-warden-account) on a local chain. Note down your **private key**.

- Make sure the chain is running. You can start it by running `wardend start` in a separate terminal window.

## 1. Create a Foundry project

Create a new directory and initialize a new Foundry project:

```bash
mkdir warden-http-examples
cd warden-http-examples
forge init
```

## 2. Create interfaces

Create interfaces for interacting with the [`x/async` precompile](../../precompiles/x-async) and JSON precompile:

1. Create an `src/interfaces` directory:

   ```bash
   mkdir -p src/interfaces
   ```

2. In the new directory, create an `IAsync.sol` file:

   ```solidity title="warden-http-examples/src/interfaces/IAsync.sol"
   // SPDX-License-Identifier: UNLICENSED
   pragma solidity ^0.8.25;

   address constant IASYNC_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000903;   
   IAsync constant IASYNC_CONTRACT = IAsync(IASYNC_PRECOMPILE_ADDRESS);
   
   struct TaskResponse {
       uint64 id;
       bytes output;
       string error;
   }
   
   struct TaskResult {
       TaskResponse result;
   }
   
   struct TaskByIdResponse {
       TaskResult taskResponse;
   }
   
   interface IAsync {
       function addTask(string calldata plugin, bytes calldata input, address callback) external returns (uint64);
       function taskById(uint64 id) external view returns (TaskByIdResponse memory);
   }
   ```

   :::tip
   To learn more about the interface for interacting with `x/async`, see [Interact with `x/async`](../../interact-with-warden-modules/interact-with-x-async).
   :::
   
3. Create an `IJson.sol` file:

   ```solidity title="warden-http-examples/src/interfaces/IJson.sol"
   // SPDX-License-Identifier: UNLICENSED
   pragma solidity ^0.8.25;

   address constant IJSON_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000904;
   IJson constant IJSON_CONTRACT = IJson(IJSON_PRECOMPILE_ADDRESS);

   struct ReadKeyValue {
       string path;
       string type;
       uint8 decimals;
   }

   interface IJson {
       function read(bytes calldata json, ReadKeyValue[] calldata keyValuePairs) external view returns (bytes[] memory);
   }
   ```

4. Create an `Http.sol` file:

   ```solidity title="warden-http-examples/src/interfaces/Http.sol"
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

## 3. Configure Foundry

Update your `foundry.toml` file to use the Paris EVM version, which is required for Warden:

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
evm_version = "paris"
```

## 4. Set environment variables

Set your [private key](../../set-up-a-warden-account#get-the-private-key) and the RPC URL as environmental variables:

```bash
export PRIVATE_KEY=your-private-key
export RPC_URL=http://localhost:8545
```

Now you're ready to start creating smart contracts that make HTTP requests!

## Next steps

To implement simple HTTP requests to different APIs, follow this guide: [Implement HTTP requests](implement-http-requests). 
