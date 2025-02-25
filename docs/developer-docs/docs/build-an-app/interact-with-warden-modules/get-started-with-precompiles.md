---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get started with precompiles

## Overview

You can interact with [Warden Protocol modules](/learn/warden-protocol-modules/introduction) in your EVM smart contract by calling [Warden precompiles](../precompiles/introduction).

This guide shows how to deploy a simple EVM contract calling the [`spaceById()` function](../precompiles/x-warden#query-a-space-by-id) of the [`x/warden` precompile](../precompiles/x-warden). After that, you'll be able to expand your contract code with other functions, which are documented in the subsections below.

To learn the basics of deploying contracts on Warden, refer to [Deploy an EVM contract](../deploy-smart-contracts-on-warden/deploy-an-evm-contract).

## Prerequisites

Before you start, complete the following prerequisites:

- [Install Foundry](https://book.getfoundry.sh/getting-started/installation) by running this command:

   ```bash
   curl -L https://foundry.paradigm.xyz | bash \ 
   foundryup
   ```

- Prepare the chain, setting up your private key. You can either run a local chain or join the Chiado testnet, as shown in [Deploy an EVM smart contract](../deploy-smart-contracts-on-warden/deploy-an-evm-contract#1-prepare-the-chain).

## 1. Create your project and contract

1. Initialize a new Foundry project and navigate to its directory:

   ```bash
   forge init warden-smart-contract --no-commit
   cd warden-smart-contract
   ```
   
   Alternatively, you can use an existing project—for example, the one you created when following the [Deploy an EVM contract](../deploy-smart-contracts-on-warden/deploy-an-evm-contract) guide.

2. In the `src` directory, create a new contract named `Warden.sol`.

   To call a precompile in your contract, do this::

   - Define an `interface` for interacting with a [Warden precompile](/category/precompiles).
   - Add a `contract` with functions calling the precompile.
   - In the `contract` section, you should also reference the precompile address.

   You can use the example contract below. It calls the [`spaceById()` function](../precompiles/x-warden#query-a-space-by-id) of [`x/warden`](../precompiles/x-warden) to return a Space and its creator by Space ID:

   ```solidity title="warden-smart-contract/src/Warden.sol"
   // SPDX-License-Identifier: UNLICENSED
   pragma solidity ^0.8.13;
   
   // An interface for interacting with the IWarden precompile
   interface IWarden {
   
       // A function for getting a Space by its ID
       function spaceById(uint64) external view returns (Space memory);
   
       // Data structure representing a Warden Space
       struct Space {
           uint64 id; // The Space ID
           address creator; // The Space creator address
           address[] owners;
           uint64 nonce;
           uint64 approveAdminTemplateId;
           uint64 rejectAdminTemplateId;
           uint64 approveSignTemplateId;
           uint64 rejectSignTemplateId;
       }
   }
   
   // A contract for interacting with the IWarden precompile
   contract querySpace {
   
       // The IWarden precompile address
       address constant WARDEN_ADDRESS = 0x0000000000000000000000000000000000000900;
       IWarden public warden;
   
       constructor() {
           warden = IWarden(WARDEN_ADDRESS);
       }
   
       // A function for getting a Space by Space ID
       function getSpace(uint64 id) external view returns (IWarden.Space memory) {
           return warden.spaceById(id);
       }
   
       // A function for getting the Space creator address by Space ID
       function getSpaceCreator(uint64 id) external view returns (address) {
           return warden.spaceById(id).creator;
       }
   }
   ```

## 2. Compile and deploy the contract

1. Set your private key and the RPC URL as environmental variables:

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
   forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY src/Warden.sol:querySpace
   ```

4. Set your contract address returned in `Deployed to` as an environment variable:

   ```
   export CONTRACT_ADDRESS=my-contract-address
   ```

5. Verify the deployment:
   
   ```bash
   cast code $CONTRACT_ADDRESS --rpc-url $RPC_URL
   ```

## 3. Interact with the contract

Now you can interact with the contract.

1. If you're using a local chain, make sure it's running and there is at least one Space:
   
   ```
   wardend query warden spaces
   ```

   If nothing is returned, [create a Space](/operate-a-node/run-a-local-chain#create-a-space). 

2. Get a Space by its ID—for example, `1`:
   
   ```
   cast call $CONTRACT_ADDRESS "getSpace(uint64)" 1 --rpc-url $RPC_URL
   ```

   The result will look like this:

   ```
   0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000006ea8ac1673402989e7b653ae4e83b54173719c3000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000006ea8ac1673402989e7b653ae4e83b54173719c30
   ```

3. Get the Space creator by Space ID—for example, `1`:
   
   ```
   cast call $CONTRACT_ADDRESS "getSpaceCreator(uint64)" 1 --rpc-url $RPC_URL
   ```

   The result will look like this:

   ```
   0x0000000000000000000000006ea8ac1673402989e7b653ae4e83b54173719c30
   ```

## Next steps

Now you can dive deeper and expand your contract with other functions from Warden precompiles:

- To find code samples for each function, see the following guides:

  - [Interact with `x/warden`](/category/interact-with-xwarden)
  - Interact with `x/oracle`: *Coming soon*—see the [`x/oracle` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/slinky/ISlinky.sol)
  - [Interact with `x/act`](/category/interact-with-xact)
  - [Interact with `x/async`](interact-with-x-async)

- For an overview of the available functions, refer to the [Precompiles](/category/precompiles) section.

- Learn how to build an Agent using `x/warden`, `x/oracle`, and `x/async`: [Build an onchain AI Agent](/build-an-agent/build-an-onchain-ai-agent/introduction).