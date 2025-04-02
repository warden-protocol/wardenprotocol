---
sidebar_position: 3
---

# Implement Price Prediction requests

## Overview

The **Price Prediction Smart Contract** enables decentralized price forecasts for cryptocurrencies using Warden's `x/async` module. Key features:

- Prediction Types: Bitcoin, Ethereum, Uniswap
- Metrics: Confidence scores, prediction counts

## Step 1. Create a contract

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
    // ID of the last future created by run().
    uint64 public lastFutureId;

    // Prices of the last future received.
    uint256 public bitcoinPrice;
    uint256 public bitcoinMetricCount;
    uint256 public bitcoinMetricConfidence;

    uint256 public tetherPrice;
    uint256 public tetherMetricCount;
    uint256 public tetherMetricConfidence;

    uint256 public uniswapPrice;
    uint256 public uniswapMetricCount;
    uint256 public uniswapMetricConfidence;

    function run() external {
        string[] memory tokens = new string[](3);
        tokens[0] = "bitcoin";
        tokens[1] = "ethereum";
        tokens[2] = "uniswap";

        PricePredictMetric[] memory metrics = new PricePredictMetric[](2);
        metrics[0] = PricePredictMetric.Count;
        metrics[1] = PricePredictMetric.Confidence;

        uint64[2] memory falsePositiveRate = [uint64(1), uint64(100)];

        PricePredictInput memory input = PricePredictInput(
            block.timestamp + 24 hours,
            tokens,
            metrics,
            falsePositiveRate);
        
        lastFutureId = IASYNC_CONTRACT.addFuture("pricepred", abi.encode(input), address(0));

        // reset predictions while the future is running
        bitcoinPrice = 0;
        tetherPrice = 0;
        uniswapPrice = 0;
        bitcoinMetricCount = 0;
        bitcoinMetricConfidence = 0;
        tetherMetricCount = 0;
        tetherMetricConfidence = 0;
        uniswapMetricCount = 0;
        uniswapMetricConfidence = 0;
    }

    function cb() external {
        FutureByIdResponse memory future = IASYNC_CONTRACT.futureById(lastFutureId);
        if (future.futureResponse.result.id == 0) revert("Not ready yet"); 
        PricePredictOutput memory pricePredictOutput = abi.decode(future.futureResponse.result.output, (PricePredictOutput));
        bitcoinPrice = pricePredictOutput.predictions[0];
        bitcoinMetricCount = pricePredictOutput.metrics[0][0];
        bitcoinMetricConfidence = pricePredictOutput.metrics[0][1];

        tetherPrice = pricePredictOutput.predictions[1];
        tetherMetricCount = pricePredictOutput.metrics[1][0];
        tetherMetricConfidence = pricePredictOutput.metrics[1][1];
        
        uniswapPrice = pricePredictOutput.predictions[2];
        uniswapMetricCount = pricePredictOutput.metrics[2][0];
        uniswapMetricConfidence = pricePredictOutput.metrics[2][1];
    }
    
    // Helper function to check if the future is ready
    function isFutureReady() external view returns (bool) {
        FutureByIdResponse memory future = IASYNC_CONTRACT.futureById(lastFutureId);
        return future.futureResponse.result.id != 0;
    }
}
```

## Step 2. Deploy and test

### 2.1. Deploy

1.Deploy the contract:

```bash
forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY src/PricePrediction.sol:PricePredExample --broadcast
```

2.Note down the value returned as `Deployed to` and set it as an environment variable:

```bash
export CONTRACT_ADDRESS=my-contract-address
```

### 2.2. Create Price Prediction

1.Request Prediction:

```bash
cast send $CONTRACT_ADDR "run()" --rpc-url $RPC_URL  --private-key $PRIVATE_KEY
```

2.Process Result:

```bash
cast send $CONTRACT_ADDR "cb()" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

You might see an error indicating the future is not ready.

```bash
Error: server returned an error response: error code 3: execution reverted: Not ready yet, data: "0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000d4e6f742072656164792079657400000000000000000000000000000000000000"
```

:::tip
After creating the future, wait for couple of minutes for `future` to be ready.
:::

After a few minutes, you will see the tx executed successfully.

3.Request Price of Bitcoin:

```bash
cast call $PRICE_PRED "bitcoinPrice()" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

You will see an output similar to:

```bash
0x00000000000000000000000000000000000000000000002c64ddb6835ca60000
```

:::tip
You can covert the value to decimal using `cast --to-dec`.

```bash
cast --to-dec 0x00000000000000000000000000000000000000000000002c64ddb6835ca60000
818924905292177473536
```

:::

## Next steps

You can similarly request price prediction for other cryptocurrencies.

If you encounter any issues, please reach out to us in Discord or Twitter.

Happy coding! 🚀
