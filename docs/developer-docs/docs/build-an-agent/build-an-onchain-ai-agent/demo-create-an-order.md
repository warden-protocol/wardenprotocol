---
sidebar_position: 1.5
---

# Demo: Create an Order

## Overview

This article will guide you through creating an [automated Order with price prediction](implement-automated-orders-with-price-prediction/introduction).

You'll prepare an input for your Order and run a script that will deploy an instance of the [`AdvancedOrder` contract](implement-automated-orders-with-price-prediction/implement-orders). This contract will compare oracle and predicted prices and automatically perform a swap on Uniswap once the oracle price is less than the predicted price.

## Prerequisites

Before you start, meet the following prerequisites:

- [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable).
- [Install Node.js](https://nodejs.org/en/download).

You should also create and fund a Warden key using [SpaceWard on devnet](https://spaceward.devnet.wardenprotocol.org). Take these steps:

1. In your Web3 wallet, export your **private key**, you'll need it for signing transactions.
2. [Connect your wallet](https://help.wardenprotocol.org/spaceward/connect-your-wallet) to SpaceWard.
3. [Get some test WARD](https://help.wardenprotocol.org/spaceward/get-test-ward).
4. [Create a Warden key](https://help.wardenprotocol.org/spaceward/manage-keys#request-a-key) and note down the numerical **key ID** displayed in SpaceWard.
5. [Fund your Warden key](https://help.wardenprotocol.org/spaceward/manage-assets#receive-assets) with Sepolia ETH and note down the **Sepolia address** associated with your key.

## 1. Install dependencies

1. Clone the `wardenprotocol` repository:
  
  ```
  git clone https://github.com/warden-protocol/wardenprotocol
  ```

2. Then navigate to the `orders` directory and install dependencies:
  
  ```
  cd wardenprotocol/solidity/orders
  yarn install
  ```

## 2. Prepare transaction data

Now you need to generate the transaction data that you'll pass with the Order in the next step. You can use the [ethers.js library](https://docs.ethers.org/v5/), as shown below, or any other tool.

1. Navigate out of the `wardenrotocol` repository and create a new directory for your JavaScript project:

```
mkdir uniswap-example
cd uniswap-example
```

2. Initialize a JavaScript project and install [ethers.js](https://docs.ethers.org/v5/):

```
npm init -y
npm install ethers
```

3. Create a JavaScript file (for example, `swap.js`) and add code for generating transaction data.

   You can use the example below. In the `recipient` const, specify your Sepolia address from [Prerequisites](#prerequisites).


   ```js title="uniswap-example/swap.js"
   const { ethers } = require("ethers");

   // A function for generating Uniswap V2 swap data
   function generateUniswapSwapData() {
       const contractInterface = ["function swapExactETHForTokens(uint256 amountOutMin, address[] path, address to, uint256 deadline)"];
       const iface = new ethers.Interface(contractInterface);
      
       // Parameters
       const amountOutMin = 1;  // The minimum amount of tokens to receive
       const path = [
           '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',  // WETH
           '0xE5a71132Ae99691ef35F68459aDde842118A86a5'   // TEST token
       ];
       const recipient = "my-sepolia-address";  // Replace with your Sepolia address
       const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
       
       const data = iface.encodeFunctionData("swapExactETHForTokens", [
           amountOutMin,
           path,
           recipient,
           deadline
       ]);
       
       console.log("Transaction Data:", data);
       
       // Decode the data to verify it (optional)
       const decoded = iface.decodeFunctionData("swapExactETHForTokens", data);
       console.log("\nDecoded Data:");
       console.log("Amount Out Min:", decoded.amountOutMin.toString());
       console.log("Path:", decoded.path);
       console.log("To:", decoded.to);
       console.log("Deadline:", new Date(Number(decoded.deadline) * 1000).toISOString());
   }
   
   generateUniswapSwapData();

   ```

   This example generates data for calling the [swapExactETHForTokens() method](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02#swapexactethfortokens) of the [Uniswap V2Router02](https://github.com/Uniswap/v2-periphery/blob/master/contracts/UniswapV2Router02.sol) contract. Uniswap will exchange [WETH9](https://sepolia.etherscan.io/address/0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14) for the [ERC-20 TEST](https://sepolia.etherscan.io/address/0xE5a71132Ae99691ef35F68459aDde842118A86a5) token.

4. Run your code:

```
node swap.js
```

5. The output should look like the following. You'll use it in the next step.

```
0x7ff36ab50000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000008000000000000000000000000025150e3970317489a29e0413c7603d8257d9ce9b0000000000000000000000000000000000000000000000000000000067bca6bb0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000fff9976782d46cc05630d1f6ebab18b2324d6b14000000000000000000000000e5a71132ae99691ef35f68459adde842118a86a5
```

## 3. Edit the Order script

Configure the Order parameters in the [`createAdvancedOrder.sh` script](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/createAdvancedOrder.sh), which is located in the `solidity` directory:

- Check and adjust these variables: `tx_fields`, `key_id`, `salt`, `factory_address`.
- Add a `private_key` variable and a `"$private_key"` parameter.
- In most cases, you can leave other variables untouched.

For a detailed breakdown of all variables, see the following sections.

### Required adjustments

For running the script, make the following adjustments:

1. In `tx_fields`, check fields for the swap transaction:

   - The amount to swap. You can keep the default value.
   - The ID of the chain where the swap is going to be performed. In our example, it's Sepolia: `11155111`.
   - The address of the contract to call. In our example, it's [Uniswap V2Router02 on Sepolia](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/v2-deployments): `0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3`.
   - The transaction data. Paste the data you generated in the previous step.

2. In `key_id`, paste the numerical ID of your  Warden key from [Prerequisites](#prerequisites).

3. In `salt`, add a unique 32-byte string, which should look like this:

   ```
   0x57c8a4f3e1d2b0a17c63f4d8e2c1b5f091f67b4a3d1e2f08c5a7b3d9c1e0f4b8
   ```

   This salt will be used to calculate the address of the Order contract and must be unique for each new Order. You can randomly generate a new string or edit the default value.

4. In `factory_address`, paste the up-to-date [`orderFactory` address]( https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/broadcast/Deploy.s.sol/12345/latest.json).

5. Add a variable `private_key` and paste your private key from [Prerequisites](#prerequisites).

6. Add `"$private_key"` as the last argument in the `just` command section of the script.

### Optional adjustments

After making the required adjustments, you can leave the rest of values untouched or modify them if needed:

- `price_condition`: The condition for executing the Order based on the comparison of the current (oracle) price and the predicted price.
  - `0` - Execute if the oracle price is `<=` than the predicted price.
  - `1` - Execute if the oracle price is `<` than the predicted price.
  - `2` - Execute if the oracle price is `>=` than the predicted price.
  - `3` - Execute if the oracle price is `>` than the predicted price.
- `confidence_limit` - The minimum prediction confidence required for executing the Order. It's a percentage, divided by `10^16`.
- `oracle_price_pair` - The oracle price pair.
- `predict_price_pair` - The predicted price pair. It's different from the oracle pair, but both pairs are going to be normalized against a common scale.
- `space_nonce` - The nonce of the [Space](/learn/glossary#space) that is expected at the moment when the Order is being executed. If you've never updated the [Rules](/learn/glossary#approval-rule) of your Space, you can use the default value: `0`.
- `action_timeout_height` - The block after which the [Action](/learn/glossary#action) will be cancelled if it's not signed with the [Keychain](/learn/glossary#keychain).
- `expected_approve_expression`, `expected_reject_expression` - The expected approve and reject expressions in your Space, provided in HEX format. If you've never updated the Rules of your Space, just keep the default values.

### Example

This is an example of how your script should look like:

```bash title="wardenprotocol/solidity/AdvancedOrder.sol"
#!/bin/bash

# Local variables for Order creation
price_condition="1"
confidence_limit="100000000000000"
oracle_price_pair='\("ETH","USD"\)'
predict_price_pair='\("ethereum","bitcoin"\)'
tx_fields="\(100000000000000,11155111,0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3,my-transaction-data)"
key_id="my-key-id"
space_nonce="0"
action_timeout_height="1000000000"
expected_approve_expression="0x616e7928312c2077617264656e2e73706163652e6f776e65727329"
expected_reject_expression="0x616e7928312c2077617264656e2e73706163652e6f776e65727329"
salt="my-salt"
factory_address="factory-address"
rpc_url="https://evm.devnet.wardenprotocol.org"
chain_id="12345"
private_key="my-private-key"

# Execute the Just command for creating an advanced Order
just create-advanced-order \
    "$price_condition" \
    "$confidence_limit" \
    "$oracle_price_pair" \
    "$predict_price_pair" \
    "$tx_fields" \
    "$key_id" \
    "$space_nonce" \
    "$action_timeout_height" \
    "$expected_approve_expression" \
    "$expected_reject_expression" \
    "$salt" \
    "$factory_address" \
    "$rpc_url" \
    "$chain_id" \
    "$private_key"
```

## 4. Run the script

Finally, navigate to the `solidity` directory and run the script:

```
cd wardenprotocol/solidity
./createAdvancedOrder.sh
```

If there are no errors, you'll see a log with the information about deployment. In the very end of the log, you'll find a success message with the transaction hash:

```
Script ran successfully.

SKIPPING ON CHAIN SIMULATION.

##### 12345
✅  [Success]Hash: 0x484a45742bf18c77b0c8b38c6bc73c7e9d18ccb2e4cb5d4e29b70a17c54df172
Block: 527735
Paid: 0.000000000028419088 ETH (3552386 gas * 0.000000008 gwei)

✅ Sequence #1 on 12345 | Total Paid: 0.000000000028419088 ETH (3552386 gas * avg 0.000000008 gwei)
```

## 5. Verify the deployment

1. You can find your **Order address** in the end of the log, above the success message. Note it down.

   ```
   AdvancedOrder: [0x56842Ff89D6736C56e75b340B8bc7CF3C290B65B])
       │   └─ ← [Return] AdvancedOrder: [0x56842Ff89D6736C56e75b340B8bc7CF3C290B65B]
       ├─ [0] VM::stopBroadcast()
       │   └─ ← [Return]
       └─ ← [Return]
   
   Script ran successfully.
   ```

2. Check whether the Order can be executed. Use the following command, specifying your Order address:
   
   ```
   cast call my-order-address "canExecute()" --rpc-url https://evm.devnet.wardenprotocol.org
   ```

   If everything is correct and there is a prediction meeting the confidence limit, you'll receive an output meaning that your Order can be executed:

   ```
   0x0000000000000000000000000000000000000000000000000000000000000001
   ```

   If the prediction isn't available yet, you'll receive an output meaning that your Order can't be executed:

   ```
   0x0000000000000000000000000000000000000000000000000000000000000000
   ```

3. Check whether the Order is executed. In the command below, specify your Order address:
   
   ```
   cast call my-order-address "isExecuted()" --rpc-url https://evm.devnet.wardenprotocol.org
   ```

   Most likely, the Order isn't executed yet, and you'll see the following output:

   ```
   0x0000000000000000000000000000000000000000000000000000000000000000
   ```
