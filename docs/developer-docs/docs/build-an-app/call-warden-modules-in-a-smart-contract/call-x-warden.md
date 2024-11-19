---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Call x/warden

## Overview

The [`x/warden`](/learn/warden-protocol-modules/x-warden) Warden module allows users to create and manage their Spaces and request Keychains to sign payloads.

This guide explains how to use the [`IWarden` precompile](../solidity-precompiles/iwarden) for calling the `x/warden` module in a Solidity smart contract. You'll create a contract allowing to query a [Space](/learn/glossary#space) by ID and get its creator address.

## 1. Prepare the chain and project

To prepare the chain and your EVM project, you can take initial steps from [Deploy an EVM contract](../deploy-smart-contracts-on-warden/deploy-an-evm-contract):

- [Connect to Chiado](../deploy-smart-contracts-on-warden/deploy-an-evm-contract#option-2-connect-to-chiado)
- [Create an EVM project](../deploy-smart-contracts-on-warden/deploy-an-evm-contract#2-create-an-evm-project)

Note that our guide uses [Foundry](https://book.getfoundry.sh)'s toolset to create an EVM project and interact with the contract. However, you can use other tools if you wish.

## 2. Create a smart contract

To interact with the [`IWarden` precompile](../solidity-precompiles/iwarden), your contract code should contain the following main components:

- The interface for interacting with the precompile: an `IWarden` function and the data structure
- A function for calling the `IWarden` function and returning the data
- The `IWarden` address, specified when calling it: `0x0000000000000000000000000000000000000900`

In this guide, we'll show how to create a smart contract using the [`spaceByID()`](../solidity-precompiles/iwarden#query-a-space-by-id) method from `IWarden` to query a [Space](/learn/glossary#space) by ID and fetch its creator address.

In your EVM project folder, create a new file `Space.sol` and paste the following code:

```sol title="/warden-smart-contract/src/Space.sol"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// An interface for interacting with the IWarden precompile
interface IWarden {

  // A function for fetching a Space by ID
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
  address constant PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000900;
  
  // A function for getting the Space creator address by Space ID
  function getSpaceOwner(uint64 id) public view returns (address) {

    // Call the spaceById() IWarden function to get the Space details
    IWarden.Space memory space = IWarden(PRECOMPILE_ADDRESS).spaceById(id);

    // Return the space creator address from the fetched data
    return space.creator;

  }
}
```

## 3. Compile and deploy the contract

Then compile and deploy your contract, as shown below:

1. Export your private key and the RPC URL:

   ```bash
   export PRIVATE_KEY=my-private-key
   export RPC_URL=https://evm.chiado.wardenprotocol.org
   ```

   :::warning
   In production, never store private keys directly in environment variables. Consider using encrypted keystores or secure key management solutions.
   :::

2. Compile and deploy your contract. If you're using Foundry, navigate to your project folder and run this command:

   ```bash
   forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY src/Space.sol:querySpace
   ```
3. Export your contract address returned in `Deployed to`:

   ```
   export CONTRACT_ADDRESS=my-contract-address
   ```

4. If needed, [verify the deployment](../deploy-smart-contracts-on-warden/deploy-an-evm-contract#5-verify-the-deployment).

## 4. Interact with the contract

Now you can call `getSpaceOwner()` function of your contract to get the Space creator address:

If you're using Foundry, run the command below. Specify the Space ID – for example, `1`:

```bash
cast call $CONTRACT_ADDRESS "getSpaceCreator(uint64)" 1 --rpc-url $RPC_URL
```

In the output, you'll see the Space creator address, similar to the following:

```
0x0000000000000000000000000c3ab26fcbcf3f9628a6c65b93d3b89c621586e1
```

## Next steps

You can expand your smart contract by calling more functions listed in the [`IWarden` precompile reference](../solidity-precompiles/iwarden).