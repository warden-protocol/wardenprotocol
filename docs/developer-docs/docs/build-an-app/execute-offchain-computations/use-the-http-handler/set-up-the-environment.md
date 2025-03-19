---
sidebar_position: 2
---

#  Set up the environment

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
mkdir warden-http-examples
cd warden-http-examples
forge init
```

## Step 2. Create interface files

Create interfaces for interacting with the [`x/async` precompile](../../precompiles/x-async):

1. Create an `scr/interfaces` directory:
   
   ```bash
   mkdir -p src/interfaces
   ```

2. In the new directory, create a file `sIAsync.sol`:

   ```solidity title="warden-http-examples/src/interfaces/IAsync.sol"
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

   :::tip
   To learn more about the interface for interacting with `x/async`, see [Interact with `x/async`](../../interact-with-warden-modules/interact-with-x-async).
   :::
   
3. Next, create a second interface, `Http.sol`:
   
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

## Step 3. Configure Foundry

Update your `foundry.toml` file to use the Paris EVM version, which is required for Warden:

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
evm_version = "paris"
```

## Step 4. Set environment variables

Set your private key and the RPC URL as environmental variables:

```
export PRIVATE_KEY=your-private-key
export RPC_URL=http://localhost:8545
```

Now you're ready to start creating smart contracts that make HTTP requests!

## Next steps

Implement and test simple HTTP requests to different APIs: [Implement HTTP requests](implement-http-requests). 
