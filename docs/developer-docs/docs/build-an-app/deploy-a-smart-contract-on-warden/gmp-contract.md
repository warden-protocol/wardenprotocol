---
sidebar_position: 3
---

# Deploy cross chain application on Warden using GMP

## Overview

In this tutorial, you will learn how a smart contract deployed on the Warden chain can interact with a smart contract deployed on EVM chain. This demonstration relies on the GMP module powered by Axelar.

In this tutorial we will deploy a smart contract called `BurnableToken` on the EVM chain. This contract will be initated with a fix supply of tokens. Another `WASM` contract will be deployed on the Warden chain that will be used to interact with the `BurnableToken` contract. Upon executing the `WASM` contract, it will be able to burn the tokens from the `BurnableToken` contract.

## GMP

GMP, or General Message Passing, is a protocol designed to enable secure and efficient communication between different blockchain networks. It's a key technology in the realm of blockchain interoperability.

Key points about GMP:

1. **Cross-Chain Communication**: GMP allows smart contracts on one blockchain to send messages and data to smart contracts on another blockchain.

2. **Interoperability**: It enables different blockchain ecosystems to interact with each other, breaking down the silos between separate networks.

3. **Flexibility**: GMP can be used for various purposes, such as token transfers, data sharing, or triggering actions across chains.

4. **Security**: It includes mechanisms to ensure the authenticity and integrity of cross-chain messages.

5. **Scalability**: GMP is designed to handle a high volume of cross-chain transactions efficiently.

## Prerequisites

The tutorial assumes that you have basic understanding of `solidity` and `rust` and how to deploy smart contracts on EVM and Warden chains respectively.

## Deploy an EVM contract on Sepolia

### Prerequisites for EVM contract

1. Install `node.js` and `npm`
2. Install `truffle`  globally: `npm install -g truffle`
3. Make sure you have some sepolia ETH in your wallet (You can get this from a Sepolia faucet)
4. An Infura account for accessing the Sepolia network

### Step 1: Set up the project

1. Create a new directory and initialize a Truffle project:

   ```bash
   mkdir burnable-token
   cd burnable-token
   truffle init
   ```

2. Install necessary dependencies:

   ```bash
   npm init -y
   npm install @axelar-network/axelar-gmp-sdk-solidity 
   npm install @openzeppelin/contracts 
   npm install @truffle/hdwallet-provider 
   npm install dotenv
   ```

3. Create a `.env` file in the root directory to store your private key and Infura project ID:

   ```.env
   PRIVATE_KEY=your_private_key_here
   INFURA_PROJECT_ID=your_infura_project_id_here
   ```

### Step 2: Add the contract

1. Create a new file `contracts/BurnableToken.sol` and paste the provided contract code.

```solidity

    // SPDX-License-Identifier: MIT
    
    pragma solidity ^0.8.20;

    import "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
    import "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
    import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
    import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

    /**
    * @title BurnableToken
    * @dev An ERC20 token that can be burned via cross-chain messages using the Axelar network.
    */

    contract BurnableToken is AxelarExecutable, ERC20Burnable {
        // Event emitted when tokens are burned
        event TokensBurned(uint256 amount);

        /**
        * @dev Constructor that mints an initial supply of tokens to the contract itself.
        * @param gateway_ The address of the Axelar gateway contract.
        * @param initialSupply The initial supply of tokens to mint.
        */

        constructor(address gateway_, uint256 initialSupply) 
            AxelarExecutable(gateway_) 
            ERC20("AliTokens", "AM") 
        {
            // Mint the initial supply to the contract's address
            _mint(address(this), initialSupply);
        }

        /**
        * @dev Handles cross-chain messages received via Axelar.
        * @param sourceChain The name of the source chain.
        * @param sourceAddress The address of the source contract on the source chain.
        * @param payload The payload sent from the source chain, expected to be the amount to burn.
        */

        function _execute(
            string calldata sourceChain,
            string calldata sourceAddress,
            bytes calldata payload
        ) internal override {
            // Decode the payload to get the amount to burn
            uint256 amountToBurn = abi.decode(payload, (uint256));
            // Burn the specified amount of tokens
            burnTokens(amountToBurn);
        }

        /**
        * @dev Burns a specified amount of tokens from the contract's balance.
        * @param amount The amount of tokens to burn.
        */
        function burnTokens(uint256 amount) public {
            require(balanceOf(address(this)) >= amount, "Insufficient balance to burn");
            _burn(address(this), amount);
            emit TokensBurned(amount);
        }

        // Allows the contract to receive native currency (e.g., ETH)
        receive() external payable {}
    }
```

**Key Points of the contract:**

- The above contract acts as both an ERC20 token and a cross-chain executable contract.
- It can receive burn instructions from other chains via Axelar's network.
- The initial token supply is minted to the contract itself, not to any external address.
- Burning can only be done from the contract's balance, not from user balances.

### Step 3: Configure Truffle

1. Update `truffle-config.js` to include the Sepolia network:

```javascript
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`),
      network_id: 11155111,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  compilers: {
    solc: {
      version: "0.8.20",
    }
  },
};
```

### Step 4: Create a migration script

1. Create a new file `migrations/2_deploy_contracts.js`:

```javascript
const BurnableToken = artifacts.require("BurnableToken");

module.exports = async function (deployer, network, accounts) {
  
  const AXELAR_GATEWAY_ADDRESS = "0xe432150cce91c13a887f7D836923d5597adD8E31";

  // Define the initial supply (e.g., 100 tokens with 18 decimals)
  const initialSupply = web3.utils.toWei("100000000", "ether"); // Mints 100M tokens

  // Deploy the BurnableToken contract with the required constructor parameters
  await deployer.deploy(
    BurnableToken,
    AXELAR_GATEWAY_ADDRESS,
    initialSupply
  );
};
```

The script will deploy the contract and mint the initial supply to the contract's address.

:::Tip
You will find AXELAR_GATEWAY_ADDRESS for Ethereum Sepolia or other chains [here](https://docs.axelar.dev/resources/contract-addresses/testnet/#evm-contract-addresses)
:::

### Step 5: Compile the contract

Run the following command to compile your contract:

```bash
truffle compile
```

### Step 6: Deploy the contract

1. Make sure you have enough Sepolia ETH in your wallet for deployment.

2. Run the migration to deploy the contract:

   ```bash
   truffle migrate --network sepolia
   ```

You will see an output similar to the following:

```bash
Starting migrations...
======================
> Network name:    'sepolia'
> Network id:      11155111
> Block gas limit: 30000000 (0x1c9c380)


2_deploy_contracts.js
=====================

   Deploying 'BurnableToken'
   -------------------------
   > transaction hash:    0x969021618f339d2e5231920652699b13071adb44fcce27cf7d46dca9e2dcba61
   > Blocks: 0            Seconds: 4
   > contract address:    0x5388dE880a16Ba9602746F3799E850E78148cd57
   > block number:        6688280
   > block timestamp:     1726294248
   > account:             0xc00d0c1255883B9c0D8D3a17927F5b8a06802937
   > balance:             0.371481630374370861
   > gas used:            950251 (0xe7feb)
   > gas price:           3.567435322 gwei
   > value sent:          0 ETH
   > total cost:          0.003389958982165822 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 6688281)
   > confirmation number: 2 (block: 6688282)
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.003389958982165822 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.003389958982165822 ETH
```

3. Note down the contract address from the deployment output.

### Step 7: Verify the deployment

You can verify the deployment by checking the tx hash in Etherscan.

For example, the contract - `0x5388dE880a16Ba9602746F3799E850E78148cd57` deployed on Sepolia can be verfied on [EtherScan](https://sepolia.etherscan.io/token/0x5388de880a16ba9602746f3799e850e78148cd57?a=0x5388dE880a16Ba9602746F3799E850E78148cd57)

Congratulations! You've successfully deployed your `BurnableToken` contract to the Sepolia testnet.

Remember to keep your private keys and sensitive information secure, and never share your `.env` file.
