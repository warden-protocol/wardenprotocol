﻿---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy an EVM contract

## Overview

The [`x/evm`](/learn/warden-protocol-modules/external-modules#xevm) Warden module allows executing Ethereum Virtual Machine (EVM) contracts charged by [Evmos](https://docs.evmos.org/protocol/modules/evm). They are written in **Solidity**.

This guide explains how to create and deploy a simple "Hello World" Solidity smart contract on the Warden chain. Since it's intended for testing purposes, you'll be running a local chain.

## Prerequisites

Before you start, complete the following prerequisites:

- Install Node.js and npm by running the following command:

  ```bash
  brew install node
  ```

- Install Truffle globally:

  ```bash
  npm install -g truffle
  ```

- Install HDWalletProvider:

  ```bash
  npm install @truffle/hdwallet-provider
  ```
- [Run a local chain](/operate-a-node/run-a-local-chain) and make sure you have `wardend` correctly installed. Get the information required for the next steps:

  - Check the list of available keys (local accounts) and note down your key name.

     ```bash
     wardend keys list
     ```

     :::tip
     If you used our `just` script to run the node with default settings, the local account name is `shulgin`.
     :::

   - Execute a command for getting the private key associated with this key name. You'll need it in [Step 3](#3-configure-truffle).

     <Tabs>
     <TabItem value="default" label="Default node settings">
     ```bash
     wardend keys export shulgin --unarmored-hex --unsafe
     ```
     </TabItem>
     <TabItem value="custom" label="Custom node settings">
     ```bash
     wardend keys export my-key-name --unarmored-hex --unsafe
     ```
     </TabItem>
     </Tabs>

  - You'll also need your chain ID. Run the following and note down the value from the `network` field:

     ```
     wardend status
     ```

     :::tip
     If you used our `just` script to run the node with default settings, the chain ID is `warden_1337-1`.
     :::

## 1. Create an EVM project

1. Create a new directory `/warden-smart-contract` for your project and navigate there:

    ```bash
    mkdir warden-smart-contract
    cd warden-smart-contract
    ```

2. Initialize a new Truffle project:

    ```bash
    truffle init
    ```

## 2. Create a smart contract

In the `/contracts` directory, create a new file `HelloWarden.sol` with the following contents:

```solidity title="/warden-smart-contract/contracts/HelloWarden.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HelloWarden {
    string public message;

    constructor() {
        message = "Hello, Warden!";
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
```

## 3. Configure Truffle

In the `/warden-smart-contract` directory, find the `truffle-config.js` file and update it with the code below.

Make adjustments in the code using your chain settings from [Prerequisites](#prerequisites):

1. Replace `your_private_key` with your actual private key.
2. In `network_id`, specify the first number from your chain ID. For example, if your chain ID is `warden_1337-1` or `chain_123-1`, specify `1337` or `123` respectively. Alternatively, you can just use `"*"` to match any chain ID.
3. If needed, adjust the gas limit and price – `gas` and `gasPrice`.

```javascript title="/warden-smart-contract/truffle-config.js"
const HDWalletProvider = require("@truffle/hdwallet-provider");

// Your private key (keep this secret and never commit it to version control!)
const PRIVATE_KEY = "your_private_key";

module.exports = {
  networks: {
    warden: {
      provider: function() {
        return new HDWalletProvider(PRIVATE_KEY, "http://localhost:8545");
      },
      network_id: 1337, // The first number from your chain ID
      host: "127.0.0.1",
      port: 8545,
      gas: 5500000,
      gasPrice: 20000000000 // award
    },
  },
  compilers: {
    solc: {
    version: "0.8.20",
    }
  }
};
   ```

:::note
The `host` and `port` values are the standard localhost address and the RPC port of the node. `HDWalletProvider` uses the same URL to connect to the node. If you're running your node on the same machine where you're deploying the contract, you don't need to change these settings. Otherwise, run `wardend status` to check the host address and adjust the configuration accordingly. 
:::

## 4. Create a migration script

In `/migrations`, create a new file `2_deploy_hello_warden.js` with the following contents:

```javascript title="/warden-smart-contract/migrations/2_deploy_hello_warden.js"
const HelloWarden = artifacts.require("HelloWarden");

module.exports = function(deployer) {
deployer.deploy(HelloWarden);
};
```

## 5. Compile the contract

To compile your contract, run this command:

```bash
truffle compile
```

You'll see an output similar to the following:

```bash
Compiling your contracts...
===========================
> Compiling ./contracts/HelloWarden.sol
> Artifacts written to /build/contracts
> Compiled successfully using:
   - solc: 0.8.20+commit.c7dfd78e.Emscripten.clang
```

## 6. Deploy the contract

To deploy the contract, run this:

```bash
truffle migrate --network warden
```

You should see the following output, confirming the successful deployment.

```bash
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'warden'
> Network id:      1337
> Block gas limit: 4294967295 (0xffffffff)


2_deploy_hello_warden.js
========================

   Deploying 'HelloWarden'
   -----------------------
   > transaction hash:    0x14ed62fcb105a3b5d315738767f288101f4db2d13ee4924a217090080abe0fef
   > Blocks: 0            Seconds: 0
   > contract address:    0x2AAbb1a9b8EdE05f183FfD90A324ce02A349F6e5
   > block number:        2993
   > block timestamp:     1725617534
   > account:             0x6Ea8aC1673402989e7B653aE4e83b54173719C30
   > balance:             9999999.83499999999011708
   > gas used:            2750000 (0x29f630)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.055 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:               0.055 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.055 ETH
```

:::note
Due to Evmos default settings, this log displays prices in ETH and gwei. However, the contract itself uses Warden's currency – WARD, denominated in award.
:::

## 7. Interact with the contract

1. To interact with your contract, open the Truffle console:
   
   ```bash
   truffle console --network warden
   ```
   
2. Retrieve the deployed instance of the contract:
   
   ```javascript
   let instance = await HelloWarden.deployed();
   ```

3. Retrieve the stored message by calling the `getMessage()` function in your contract:
   
   ```javascript
   let message = await instance.getMessage();
   ```

4. Print the message:

   ```javascript
   console.log(message);
   ```

   The console log should print `Hello, Warden!`

5. Update the message in the contract with `setMessage()`:
   
   ```javascript
   await instance.setMessage("Hello, EVM on Warden!");
   ```

6. Call `getMessage()` again to retrieve the updated message:
   
   ```javascript
   message = await instance.getMessage();
   ```

7. Print the updated message:
   
   ```javascript
   console.log(message);
   ```
   The console log should print `Hello, EVM on Warden!`

8. To exit the console, run this:

   ```
   .exit
   ```

   If you encounter any issues, please reach out to us in [Discord](https://discord.com/invite/warden) or [Twitter](https://twitter.com/wardenprotocol).

   Happy coding! 🚀
