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

- [Set up a Warden account](../../set-up-a-warden-account) on a local chain and note down your **private key**. Make sure you've cloned the `main` branch.

- Make sure the chain is running. You can start it by running `wardend start` in a separate terminal window.

## 1. Enable Venice AI

To use Venice AI in your smart contract, take these steps:

1. Obtain a Venice AI API key. Just reach out to the Warden team on [Discord](https://discord.gg/wardenprotocol) to request an API key for accessing Venice AI services.

2. Configure the `app.toml` file, which is located in the node home directory: `$HOME/.warden/config/app.toml`. Add the following configuration under the `[venice]` section, replacing `my-api-key` with you API key:

   ```toml
   [venice]
   enabled = true
   api_key = "my-api-key"
   ```

3. Restart the chain for the changes to take effect:

   ```bash
   wardend start
   ```

## 2. Create a Foundry project

Create a new directory and initialize a new Foundry project:

```bash
mkdir warden-venice-example
cd warden-venice-example
forge init
```

## 3. Create interfaces

Create an interfaces for interacting with the [`x/async` precompile](../../precompiles/x-async):

1. Create an `src/interfaces` directory:

   ```bash
   mkdir -p src/interfaces
   ```

2. In the new directory, create an `IAsync.sol` file:

   ```solidity title="warden-venice-example/src/interfaces/IAsync.sol"
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.19;
   
   library Types {
       struct Coin {
           string denom;
           uint256 amount;
       }
   }
   
   struct CallbackParams {
       address addressValue;
       uint64 gasLimit;
   }
   
   /**
    * @title IAsync
    * @dev Interface for Warden Protocol's async precompile
    * Located at address 0x0000000000000000000000000000000000000903
    */
   
   interface IAsync {
       /**
        * @dev Add a new async task
        * @param plugin The plugin name (e.g., "venice")
        * @param input The input data for the plugin
        * @param maxFee Maximum fee to pay for the task
        * @param callbackParams Callback parameters for task completion
        * @return taskId The ID of the created task
        */
   
       function addTask(
           string calldata plugin,
           bytes calldata input,
           Types.Coin[] calldata maxFee,
           CallbackParams calldata callbackParams
       ) external returns (uint64 taskId);
   }
   ```

   :::tip
   To learn more about the interface for interacting with `x/async`, see [Interact with `x/async`](../../interact-with-warden-modules/interact-with-x-async).
   :::

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

Set your [private key](../../set-up-a-warden-account#get-the-private-key) and the RPC URL as environmental variables:

```bash
export PRIVATE_KEY=your-private-key
export RPC_URL=http://localhost:8545
```

Now you're ready to start creating smart contracts that make requests to Venice AI.

## Next steps

To implement Venice AI inference requests, follow this guide: [Implement inference requests](implement-venice-ai).
