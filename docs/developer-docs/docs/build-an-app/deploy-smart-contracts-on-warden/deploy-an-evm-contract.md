---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy an EVM contract

## Overview

The [`x/evm`](/learn/warden-protocol-modules/external-modules#xevm) Warden module allows executing **Ethereum Virtual Machine (EVM)** contracts charged by [Evmos](https://docs.evmos.org/protocol/modules/evm) and written in **Solidity**.

This guide explains how to create and deploy a simple "Counter" Solidity smart contract using Foundry's toolset on a Warden local chain or on [Chiado testnet](/operate-a-node/chiado-testnet/chiado-overview).

## Prerequisites

Before you start, complete the following prerequisites:

- Install `foundry` by running the following command:

  ```bash
  curl -L https://foundry.paradigm.xyz | bash \ 
  foundryup
  ```

## 1. Prepare the chain

### Option 1. Run a local chain

To deploy an EVM contract locally, you need to run a local chain and make sure it's configured properly, as shown in the following steps:

1. Run a local chain as explained here: [Run a local chain](/operate-a-node/run-a-local-chain). Note that you'll need to [install Go](https://golang.org/doc/install) 1.22.3 or later and [just](https://github.com/casey/just) 1.34.0 or later.

2. Check the list of available keys (local accounts) and note down your key name.

   ```bash
   wardend keys list
   ```

   :::tip
   If you used our `just` script to run the node with default settings, the local account name is `shulgin`.
   :::

3. Check the local account balance to make sure it has funds:
   
   <Tabs>
   <TabItem value="local-default" label="Local node: default settings">
   ```bash
   wardend query bank balances shulgin
   ```
   </TabItem>
   <TabItem value="local-custom" label="Local node: custom settings">
   ```bash
   wardend query bank balances my-key-name
   ```
   </TabItem>
   </Tabs>

4. The next steps require the private key associated with this account. To get it, run this:

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

5. You'll also need your chain ID. Run the following and note down the value from the `network` field:

   ```bash
   wardend status
   ```

   :::tip
   If you used our `just` script to run the node with default settings, the chain ID is `warden_1337-1`.
   :::

### Option 2. Connect to Chiado

To deploy an EVM contract on [Chiado testnet](/operate-a-node/chiado-testnet/chiado-overview), you need to install its binary and fund your key, as shown in the following steps:

1. If you haven't yet, [install Go](https://golang.org/doc/install) 1.22.3 or later and [just](https://github.com/casey/just) 1.34.0 or later.

2. Clone the repository with Warden source code. Then build the binary and initialize the chain home folder:
  
   ```bash
   git clone --depth 1 --branch v0.5.3 https://github.com/warden-protocol/wardenprotocol
   cd wardenprotocol
   just wardend build
   just wardend install
   wardend init my-chain-moniker
   ```

3. Create a new key:

   ```bash
   wardend keys add my-key-name
   ```

4. Write down the **mnemonic phrase** and the **address** of the new account. You'll need this information to interact with the chain and restore the account.

   :::warning
   The seed phrase is the only way to restore your keys. Losing it can result in the irrecoverable loss of WARD tokens.
   :::

   :::tip
   You can always check your public address by running this command:

   ```bash
   wardend keys show my-key-name --address
   ```
   :::

5. Fund your key using [Chiado faucet](https://faucet.chiado.wardenprotocol.org) and the public address obtained in the previous step.

6. Check your balance:
   
   ```bash
   wardend query bank balances my-key-name --node https://rpc.chiado.wardenprotocol.org:443
   ```

7. The next steps require the private key associated with this account. To get it, run this:

   ```bash
   wardend keys export my-key-name --unarmored-hex --unsafe
   ```

## 2. Create an EVM project

1. Create a new directory `/warden-smart-contract` for your project and navigate there:

    ```bash
    mkdir warden-smart-contract
    cd warden-smart-contract
    ```

2. Initialize a new Foundry project:

    ```bash
    forge init
    ```

## 3. Create a smart contract

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

## 4. Configure Truffle

1. In the `/warden-smart-contract` directory, find the `truffle-config.js` file and update it with this code:

   <Tabs>
   <TabItem value="local" label="Local node">
   ```javascript title="/warden-smart-contract/truffle-config.js"
   const HDWalletProvider = require("@truffle/hdwallet-provider");
   
   // Keep your private key confidential, DO NOT commit to version control!
   const PRIVATE_KEY = "your_private_key";
   
   // The standard localhost address and the node's RPC port
   const RPC_URL = "http://127.0.0.1:8545";
   
   module.exports = {
     networks: {
       warden: {
         provider: function() {
           return new HDWalletProvider(PRIVATE_KEY, RPC_URL);
         },
         network_id: 1337, // The first number from the chain ID
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
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```javascript title="/warden-smart-contract/truffle-config.js"
   const HDWalletProvider = require("@truffle/hdwallet-provider");
   
   // Keep your private key confidential, DO NOT commit to version control!
   const PRIVATE_KEY = "your_private_key";
   
   // Chiado's EVM endpoint
   const RPC_URL = "https://evm.chiado.wardenprotocol.org"; 
   
   module.exports = {
     networks: {
       warden: {
         provider: function() {
           return new HDWalletProvider(PRIVATE_KEY, RPC_URL);
         },
         network_id: 10010, // The first number from the chain ID
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
   </TabItem>
   </Tabs>

2. Adjust the code and make sure all values are correct:

   - `your_private_key`: Replace it with your actual private key from [Step 1](#1-prepare-the-chain).
   - `RPC_URL`: If you're running a local chain and deploying the contract on the same machine, use the standard localhost address. Otherwise, check the chain's host address by executing `wardend status` on the machine hosting the chain. For Chiado, specify its EVM endpoint: `https://evm.chiado.wardenprotocol.org`.
   - `network_id`: Specify the first number from the chain ID. For example, if your local chain ID is `warden_1337-1`, the network ID is `1337`. The correct value for Chiado is `10010`. Alternatively, you can just use `"*"` to match any chain ID.
   - If needed, adjust the gas limit and price – `gas` and `gasPrice`.

## 5. Create a migration script

In `/migrations`, create a new file `2_deploy_hello_warden.js` with the following contents:

```javascript title="/warden-smart-contract/migrations/2_deploy_hello_warden.js"
const HelloWarden = artifacts.require("HelloWarden");

module.exports = function(deployer) {
  deployer.deploy(HelloWarden);
};
```

## 6. Compile the contract

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

## 7. Deploy the contract

If you're deploying on a local chain, make sure it's running. You can start your chain by running `wardend start` in a separate terminal window.
   
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

## 8. Interact with the contract

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
