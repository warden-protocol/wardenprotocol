---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get started

## Overview

This guide explains how to prepare an EVM smart contract for interacting with [Warden Protocol modules](/category/warden-protocol-modules). In your contract, you're going to use functions from [Warden precompiles](/category/precompiles).

## Prerequisites

Before you start, complete the following prerequisites:

1. [Install Foundry](https://book.getfoundry.sh/getting-started/installation) by running this command:

   ```bash
   curl -L https://foundry.paradigm.xyz | bash \ 
   foundryup
   ```

2. [Prepare the chain](../deploy-smart-contracts-on-warden/deploy-an-evm-contract#1-prepare-the-chain), setting up your private key.

## 1. Create a project and contract

1. Initialize a new Foundry project and navigate to its directory:
     
   ```bash
   forge init warden-smart-contract --no-commit
   cd warden-smart-contract
   ```

2. In the `/src` directory, create a new contract named `Warden.sol`.

3. Finally, prepare the contract code. Note that to call a precompile, you should reference its address in your code. See the sections below for code samples and lists of available functions.

   |  Functions                                    | Code samples                                              | Precompile address                           |
   | --------------------------------------------- | --------------------------------------------------------- |--------------------------------------------- |
   | [x/warden functions](../precompiles/x-warden) | [Interact with x/warden](/category/interact-with-xwarden) | `0x0000000000000000000000000000000000000900` |
   | [x/act functions](../precompiles/x-act)       | [Interact with x/act](/category/interact-with-xact)       | `0x0000000000000000000000000000000000000901` |
   

## 2. Compile and deploy the contract

1. Export your private key and the RPC URL as environmental variables:

   <Tabs>
   <TabItem value="local" label="Local node">
   ```bash
   export PRIVATE_KEY=my-private-key
   export RPC_URL=http://127.0.0.1:8545 
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   export PRIVATE_KEY=my-private-key
   export RPC_URL=https://evm.chiado.wardenprotocol.org
   ```
   </TabItem>
   </Tabs>

   :::warning
   In production, never store private keys directly in environment variables. Consider using encrypted keystores or secure key management solutions like `.env`.
   :::

2. Compile your contract using Foundry:

   ```bash
   forge build
   ```

3. Deploy the contract:

   ```bash
   forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY src/Warden.sol:WardenContract
   ```

4. Export your contract address returned in `Deployed to`:

   ```
   export CONTRACT_ADDRESS=my-contract-address
   ```

5. Verify the deployment:
   
   ```bash
   cast code $CONTRACT_ADDRESS --rpc-url $RPC_URL
   ```

## Next steps

- To dive deeper and find code samples for each function from Warden precompiles, see the following guides:
  - [Interact with x/warden](/category/interact-with-xwarden)
  - [Interact with x/act](/category/interact-with-xact)
- For an overview of the functions, refer to the [Precompiles](/category/precompiles) section.