---
sidebar_position: 7
---

# Fetch multiple prices

## Overview

Follow this tutorial to implement a more advanced example of handling HTTP requests with `x/async`.

You'll create a contract that fetches prices of **multiple cryptocurrencies** from the [CoinGecko API](https://docs.coingecko.com/reference/introduction) and extracts price values from the JSON response using the JSON precompile.

## 1. Create a contract

Create a new file `MultiCoinPrices.sol`:

```solidity title="warden-http-examples/src/MultiCoinPrices.sol"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "./interfaces/IAsync.sol";
import "./interfaces/Http.sol";
import "./interfaces/IJson.sol";

contract MultiCoinPrices {
    uint64 public lastTaskId;

    int256 public bitcoinPrice;
    int256 public tetherPrice;
    int256 public uniswapPrice;

    bytes public responseBody;

    // Fetch different prices from the CoinGecko API: 
    function run() public returns (Http.Request memory request) {
        request.url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether,uniswap&vs_currencies=usd";
        request.method = "GET";
        request.body = "";

        lastTaskId = IASYNC_CONTRACT.addTask("http", abi.encode(request), address(this));

        bitcoinPrice = 0;
        tetherPrice = 0;
        uniswapPrice = 0;
    }

    // A callback function: the Warden node calls it automatically
    function cb() external {
        TaskByIdResponse memory task = IASYNC_CONTRACT.taskById(lastTaskId);
        if (task.taskResponse.result.id == 0) {
            revert("Not ready yet");
        }

        Http.Response memory response = abi.decode(task.taskResponse.result.output, (Http.Response));

        require(response.status == 200, "HTTP request failed");

        responseBody = response.body;

        // Extract prices using the JSON precompile
        IJson.ReadKeyValue[] memory keyValuePairs = new IJson.ReadKeyValue[](3);
        keyValuePairs[0] = IJson.ReadKeyValue("bitcoin.usd", "float", 2);
        keyValuePairs[1] = IJson.ReadKeyValue("tether.usd", "float", 2);
        keyValuePairs[2] = IJson.ReadKeyValue("uniswap.usd", "float", 2);
        
        bytes[] memory readResult = IJSON_CONTRACT.read(responseBody, keyValuePairs);

        bitcoinPrice = abi.decode(readResult[0], (int256));
        tetherPrice = abi.decode(readResult[1], (int256));
        uniswapPrice = abi.decode(readResult[2], (int256));
    }
}
```

## 2. Deploy

1. Deploy the contract:

   ```bash
   forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY \
     src/MultiCoinPrices.sol:MultiCoinPrices --broadcast
   ```

2. Note down the value returned as `Deployed to` and set it as an environment variable:

   ```bash
   export CONTRACT_ADDRESS=my-contract-address
   ```

## 3. Make an HTTP request

1. Make an HTTP request by calling the `run()` function:

   ```bash
   cast send $CONTRACT_ADDRESS "run()" \
     --private-key $PRIVATE_KEY \
     --rpc-url $RPC_URL
   ```
  
2. Wait a few seconds, then use the `cb()` function to process the result:

   ```bash
   cast send $CONTRACT_ADDRESS "cb()" \
     --private-key $PRIVATE_KEY \
     --rpc-url $RPC_URL
   ```

3. Check the prices:

   ```bash
   cast call $CONTRACT_ADDRESS "bitcoinPrice()(int256)" --rpc-url $RPC_URL
   cast call $CONTRACT_ADDRESS "tetherPrice()(int256)" --rpc-url $RPC_URL
   cast call $CONTRACT_ADDRESS "uniswapPrice()(int256)" --rpc-url $RPC_URL
   ```

   In the output, you'll see the price of each cryptocurrency displayed with 2 decimal places of precision.

## Next steps

Learn how to use other Plugins:

- [Use the price prediction Plugin](../use-the-price-prediction-plugin/introduction)
