---
sidebar_position: 3
---

# Implement price prediction requests

## Overview

This tutorial explains how to implement a **price prediction request** for **Bitcoin**. You'll also learn how to request **metrics** providing metadata about predictions and their accuracy.

:::tip
You can expand the example code from this tutorial to implement multiple price predictions for different cryptocurrencies.
:::

## 1. Create a contract

Create a new file called `PricePrediction.sol`:

```solidity title="warden-pricepredictions/src/PricePrediction.sol"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "./interfaces/IAsync.sol";

enum PricePredictMetric {
    Count,
    Mape,
    Rmse,
    R2,
    MaxError,
    Dae,
    Mae,
    Confidence,
    Pct1,
    Pct5,
    Pct10,
    Pct15,
    Pct20,
    Pct25,
    Pct50,
    P0,
    P5,
    P10,
    P15,
    P20,
    P25,
    P50,
    P75,
    P95,
    P100
}

struct PricePredictInput {
    uint256 date;
    string[] tokens;
    PricePredictMetric[] metrics;
    uint64[2] falsePositiveRate;
}

struct SolverReceipt {
    bytes bloomFilter;
    uint256 countItems;
}

struct PricePredictOutput {
    uint256[] predictions;
    SolverReceipt solverReceipt;
    uint256[][] metrics;
}

contract PricePredExample {
    // The ID of the last Task created by run()
    uint64 public lastTaskId;

    // Prices returned for the last Task
    uint256 public bitcoinPrice;
    uint256 public bitcoinMetricCount;
    uint256 public bitcoinMetricConfidence;

    function run() external {
        string[] memory tokens = new string[](1);
        tokens[0] = "bitcoin";

        PricePredictMetric[] memory metrics = new PricePredictMetric[](2);
        metrics[0] = PricePredictMetric.Count;
        metrics[1] = PricePredictMetric.Confidence;

        uint64[2] memory falsePositiveRate = [uint64(1), uint64(100)];

        PricePredictInput memory input = PricePredictInput(
            block.timestamp + 24 hours,
            tokens,
            metrics,
            falsePositiveRate);
        
        lastTaskId = IASYNC_CONTRACT.addTask("pricepred", abi.encode(input), address(0));

        // Reset predictions while the Task is running
        bitcoinPrice = 0;
        bitcoinMetricCount = 0;
        bitcoinMetricConfidence = 0;
    }

    function cb() external {
        TaskByIdResponse memory task = IASYNC_CONTRACT.taskById(lastTaskId);
        if (task.taskResponse.result.id == 0) revert("Not ready yet"); 
        PricePredictOutput memory pricePredictOutput = abi.decode(task.taskResponse.result.output, (PricePredictOutput));
        bitcoinPrice = pricePredictOutput.predictions[0];
        bitcoinMetricCount = pricePredictOutput.metrics[0][0];
        bitcoinMetricConfidence = pricePredictOutput.metrics[0][1];
    }
    
    // A helper function to check if the price prediction is ready
    function isTaskReady() external view returns (bool) {
        TaskByIdResponse memory task = IASYNC_CONTRACT.taskById(lastTaskId);
        return task.taskResponse.result.id != 0;
    }
}
```

## 2. Deploy

1. Deploy the contract:
   
   ```bash
   forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY src/PricePrediction.sol:PricePredExample --broadcast
   ```

2. Note down the value returned as `Deployed to` and set it as an environment variable:
   
   ```bash
   export CONTRACT_ADDRESS=my-contract-address
   ```

## 3. Request a price prediction

1. Request a price prediction by calling the `run()` function:
   
   ```bash
   cast send $CONTRACT_ADDR "run()" --rpc-url $RPC_URL  --private-key $PRIVATE_KEY
   ```
  
2. Wait for a few minutes and use the `cb()` function to process the result:
   
   ```bash
   cast send $CONTRACT_ADDR "cb()" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
   ```
   
   If you call `cb()` too early, you may encounter an error indicating the price prediction isn't ready:
   
   ```bash
   Error: server returned an error response: error code 3: execution reverted: Not ready yet, data: "0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000d4e6f742072656164792079657400000000000000000000000000000000000000"
   ```

3. To request the Bitcoin price, call `bitcoinPrice()`:
   
   ```bash
   cast call $PRICE_PRED "bitcoinPrice()" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
   ```
   
   You'll see an output similar to the following:
   
   ```bash
   0x00000000000000000000000000000000000000000000002c64ddb6835ca60000
   ```
   
4. If needed, convert the fetched price to decimal:
   
   ```bash
   cast --to-dec 0x00000000000000000000000000000000000000000000002c64ddb6835ca60000
   ```

   You'll receive an output similar to this:

   ```bash
   818924905292177473536
   ```

5. After requesting a Bitcoin price prediction, you can call other functions of the contract to request metrics:

   - `bitcoinMetricCount()`
   - `bitcoinMetricConfidence()`

## 4. Implement more requests

You can extend the price prediction for other currencies:

1. In the `run()` function of the example contract, add the desired currency names to the `tokens` array. Update the reset section.

2. At the beginning of the contract, declare corresponding state variables.

3. In the `cb`() function (the callback handler), add lines to extract each new token's predicted price and metrics from the response.

## Next steps

You can use price predictions for creating automated Orders. For example, you can create a smart contract that executes a token swap on Uniswap once the predicted price meets a given condition.

Learn more: [Implement automated Orders with price prediction](/build-an-agent/build-an-onchain-ai-agent/implement-orders-with-price-prediction).
