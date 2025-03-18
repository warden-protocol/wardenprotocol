---
sidebar_position: 4
---

# Process the response

## Overview

The response from the **CoinGecko API** is encoded in **CBOR** format, which is why it appears as a strange string when we try to print it. Let's create a more advanced contract that can properly handle and extract data from **CBOR** responses.

## Step 1. Create a new contract

Create a new file called `src/CoinGeckoCheck.sol`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "./interfaces/IAsync.sol";
import "./interfaces/Http.sol";

contract CoinGeckoCheck {
    uint64 public lastFutureId;
    bytes public responseBody;
    uint256 public statusCode;
    
    // Make a simple HTTP GET request to CoinGecko
    function run() public returns (Http.Request memory request) {
        // Use the same URL that worked in hello.sol
        request.url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
        request.method = "GET";
        request.body = "";
        
        // Send the request using the async precompile
        lastFutureId = IASYNC_CONTRACT.addFuture("http", abi.encode(request), address(this));
    }
    
    // Check if the response is ready
    function isReady() public view returns (bool) {
        FutureByIdResponse memory future = IASYNC_CONTRACT.futureById(lastFutureId);
        return future.futureResponse.result.id != 0;
    }
    
    // Try to process the response without reverting
    function tryProcess() public returns (bool) {
        FutureByIdResponse memory future = IASYNC_CONTRACT.futureById(lastFutureId);
        if (future.futureResponse.result.id == 0) {
            return false; // Not ready yet
        }
        
        // Decode the response
        Http.Response memory response = abi.decode(future.futureResponse.result.output, (Http.Response));
        
        // Store the response data
        statusCode = response.status;
        responseBody = response.body;
        
        return true;
    }
    
    // Callback function that will be called by the precompile when the response is ready
    function cb() external {
        FutureByIdResponse memory future = IASYNC_CONTRACT.futureById(lastFutureId);
        if (future.futureResponse.result.id == 0) {
            revert("Not ready yet");
        }
        
        // Decode the response
        Http.Response memory response = abi.decode(future.futureResponse.result.output, (Http.Response));
        
        // Store the response data
        statusCode = response.status;
        responseBody = response.body;
    }
    
    // Get the response as a string (for easier reading)
    function getResponseAsString() public view returns (string memory) {
        return string(responseBody);
    }
}
```

This contract adds:

- An `isReady()` function to check if the response is ready
- A `tryProcess()` function that processes the response without reverting

## Step 2. Deploy and test

```bash
# Deploy the contract
forge create --rpc-url http://localhost:8545 --private-key YOUR_PRIVATE_KEY src/CoinGeckoCheck.sol:CoinGeckoCheck --broadcast

# Make a request
cast send --rpc-url http://localhost:8545 --private-key YOUR_PRIVATE_KEY CONTRACT_ADDRESS "run()"

# Wait a few seconds, then check if it's ready
cast call --rpc-url http://localhost:8545 CONTRACT_ADDRESS "isReady()(bool)"
```

Expected output:

```bash
true
```

```bash
# Process the response
cast send --rpc-url http://localhost:8545 --private-key YOUR_PRIVATE_KEY CONTRACT_ADDRESS "tryProcess()"

# Check the status code
cast call --rpc-url http://localhost:8545 CONTRACT_ADDRESS "statusCode()(uint256)"
```

Expected output:

```bash
200
```
