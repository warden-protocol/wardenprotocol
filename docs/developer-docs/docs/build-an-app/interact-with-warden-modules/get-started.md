---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get started

## Overview

You can interact with [Warden Protocol modules](/category/warden-protocol-modules) in your EVM smart contract by calling [Warden precompiles](/category/precompiles).

This guide shows how to deploy a simple EVM contract calling the [`spaceById()`](../precompiles/x-warden#query-a-space-by-id) function of the [`x/warden`](/category/interact-with-xwarden) module. After that, you'll be able to expand you contract code with other functions, which are documented in the subsections below.

## Prerequisites

Before you start, complete the following prerequisites:

- [Install Foundry](https://book.getfoundry.sh/getting-started/installation) by running this command:

   ```bash
   curl -L https://foundry.paradigm.xyz | bash \ 
   foundryup
   ```

- [Prepare the chain](../deploy-smart-contracts-on-warden/deploy-an-evm-contract#1-prepare-the-chain), setting up your private key.

## 1. Create your project and contract

1. Initialize a new Foundry project and navigate to its directory by running the commands below. Alternatively, you can use an existing project.
     
   ```bash
   forge init warden-smart-contract --no-commit
   cd warden-smart-contract
   ```
2. In the `/src` directory, create a new contract named `Warden.sol`.

3. Finally, prepare the contract code:

   - Define an interface for interacting with a [Warden precompile](/category/precompiles).
   - Reference the precompile address.
   - Add functions for interacting with the contract.

   You can use the example contract below. It calls the [`spaceById()`](../precompiles/x-warden#query-a-space-by-id) function of the [`x/warden`](/category/interact-with-xwarden) module to return a Space and its creator by Space ID:

   ```solidity title="/warden-smart-contract/src/Warden.sol"
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
   forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY src/Warden.sol:querySpace
   ```

4. Export your contract address returned in `Deployed to`:

   ```
   export CONTRACT_ADDRESS=my-contract-address
   ```

5. Verify the deployment:
   
   ```bash
   cast code $CONTRACT_ADDRESS --rpc-url $RPC_URL
   ```

## 3. Interact with the contract

Now you can interact with the contract:

1. If you're using a local chain, make sure it's running and there is at least one Space:
   
   ```
   wardend query warden spaces
   ```

   If nothing is returned, [create a Space](/operate-a-node/run-a-local-chain#create-a-space). 

2. Get a Space by its ID – for example, `1`:
   
   ```
   cast call $CONTRACT_ADDRESS "getSpace(uint64)" 1 --rpc-url $RPC_URL
   ```

   The result will look like this:

   ```
   0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000006ea8ac1673402989e7b653ae4e83b54173719c3000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000006ea8ac1673402989e7b653ae4e83b54173719c30
   ```

3. Get the Space creator by Space ID – for example, `1`:
   
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
  - [Interact with x/warden](/category/interact-with-xwarden)
  - *Other modules: coming soon*
- For an overview of the available functions, refer to the [Precompiles](/category/precompiles) section.