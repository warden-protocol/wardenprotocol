---
sidebar_position: 2
---

# Build an EVM contract

## Overview

This guide explains how to create and deploy a simple **Hello World** Solidity smart contract on the Warden chain. Since it's intended for testing purposes, you'll be running a local chain.

## Prerequisites

Before you start, complete the following prerequisites:

- Install Node.js and npm by running the following commands:

    ```bash
    brew install node
    ```

    This will install both Node.js and npm.

- Next, you need to install Truffle globally:

    ```bash
    npm install -g truffle
    ```

- [Run a local chain](../test/run-a-local-chain) and make sure you have `wardend` correctly installed. You can stop the chain for now if you wish.

    The next steps require your local account name, or key name, which is referenced as `my-key-name` in the provided command-line examples. You can check the list of available keys by executing this command (while the node is running):

    ```bash
    wardend keys list
    ```

    :::tip
    In development genesis files, you'll typically find an account named shulgin that is preconfigured and ready for use.
    :::

## 1. Create a new EVM project

1. Create a new directory for your project:

    ```bash
    mkdir warden-smart-contract && cd warden-smart-contract
    ```

2. Initialize a new Truffle project

    ```bash
    truffle init
    ```

## 2. Create a new smart contract

1. Create a new file `contracts/HelloWarden.sol`:

    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

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

## 3. Configure Truffle for Warden

1. Install HDWalletProvider:

    ```bash
    npm install @truffle/hdwallet-provider
    ```

2. Update truffle-config.js:

    ```javascript
    const HDWalletProvider = require('@truffle/hdwallet-provider');

    // Your private key (keep this secret and never commit it to version control!)
    const PRIVATE_KEY = 'your_private_key_here';

    module.exports = {
    networks: {
        warden: {
        provider: function() {
            return new HDWalletProvider(PRIVATE_KEY, "http://localhost:8545");
        },
        network_id: 1337, // Match any network id
        host: "127.0.0.1",
        port: 8545,
        gas: 5500000,
        gasPrice: 20000000000,  // 20 gwei
        },
    },
    compilers: {
        solc: {
        version: "0.8.0",
        }
    }
    };
    ```

Replace `your_private_key_here` with your actual private key.

:::tip
To get your warden private key, you can use the command `wardend keys export my-key-name --unarmored-hex --unsafe` from the command line.
:::

## 4. Create a migration script

1. Create a new file `migrations/2_deploy_hello_warden.js`:

    ```javascript
    const HelloWarden = artifacts.require("HelloWarden");

    module.exports = function(deployer) {
    deployer.deploy(HelloWarden);
    };
    ```

## 5. Compile the contract

Run:

```bash
truffle compile
```

You will see an output similar to the following:

```bash
Compiling your contracts...
===========================
> Compiling ./contracts/HelloWarden.sol
> Artifacts written to /build/contracts
> Compiled successfully using:
   - solc: 0.8.0+commit.c7dfd78e.Emscripten.clang
```

## 6. Deploy the contract

Run:

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

## 7. Interact with the smart contract

1. Open the Truffle console:

```bash
truffle console --network warden
```

2. In the console, interact with your contract:

```javascript
let instance = await HelloWarden.deployed()
let message = await instance.getMessage()
console.log(message) // Should print "Hello, Warden!"
await instance.setMessage("Hello, EVM on Warden!")
message = await instance.getMessage()
console.log(message) // Should print "Hello, EVM on Warden!"
```

If you encounter any issues, please reach out to us via [Discord](https://discord.com/invite/warden) or [Twitter](https://twitter.com/wardenprotocol).

Happy Coding! 🚀
