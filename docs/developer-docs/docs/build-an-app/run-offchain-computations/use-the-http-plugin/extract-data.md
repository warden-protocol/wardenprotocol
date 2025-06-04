---
sidebar_position: 4
---

# Extract data

## Overview

Warden returns responses from HTTP requests as JSON data. To extract specific values from these responses, you can use the [`read()` function](../../precompiles/json#get-multiple-values) of the [JSON precompile](../../precompiles/json).

This tutorial will guide you through extracting the Bitcoin price from the [CoinGecko API](https://docs.coingecko.com/reference/introduction) responses.

## 1. Create a contract

Create a new file `DataExtraction.sol`:

```solidity title="warden-http-examples/src/DataExtraction.sol"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "./interfaces/IAsync.sol";
import "./interfaces/Http.sol";
import "./interfaces/IJson.sol";

contract DataExtraction {
    uint64 public lastTaskId;
    bytes public responseBody;
    uint256 public statusCode;
    int256 public bitcoinPrice;
    
    // Make a request to the CoinGecko API: fetch the current Bitcoin price
    function getBitcoinPrice() public returns (Http.Request memory request) {
        request.url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
        request.method = "GET";
        request.body = "";
        
        lastTaskId = IASYNC_CONTRACT.addTask("http", abi.encode(request), address(this));
    }
    
    // Process the response
    function processResponse() public returns (bool) {
        TaskByIdResponse memory task = IASYNC_CONTRACT.taskById(lastTaskId);
        if (task.taskResponse.result.id == 0) {
            return false; // Not ready yet
        }
        
        // Decode the response
        Http.Response memory response = abi.decode(task.taskResponse.result.output, (Http.Response));
        
        // Store the response data
        statusCode = response.status;
        responseBody = response.body;
        
        return true;
    }
    
    // A callback function: the Warden node calls it automatically
    function cb() external {
        TaskByIdResponse memory task = IASYNC_CONTRACT.taskById(lastTaskId);
        if (task.taskResponse.result.id == 0) {
            revert("Not ready yet");
        }
        
        // Decode the response
        Http.Response memory response = abi.decode(task.taskResponse.result.output, (Http.Response));
        
        // Store the response data
        statusCode = response.status;
        responseBody = response.body;
        
        // Extract the Bitcoin price using the JSON precompile
        IJson.ReadKeyValue[] memory keyValuePairs = new IJson.ReadKeyValue[](1);
        keyValuePairs[0] = IJson.ReadKeyValue("bitcoin.usd", "float", 2);
        
        bytes[] memory readResult = IJSON_CONTRACT.read(responseBody, keyValuePairs);
        bitcoinPrice = abi.decode(readResult[0], (int256));
    }
    
    // Get the raw response bytes for debugging
    function dumpResponse() public view returns (bytes memory) {
        return responseBody;
    }
    
    // Get the response as a string for easier reading
    function getResponseAsString() public view returns (string memory) {
        return string(responseBody);
    }
}
```

This contract adds:

- Functions to inspect the raw response bytes
- A function to extract the Bitcoin price from the JSON data using the JSON precompile

## 2. Deploy

1. Deploy the contract:

   ```bash
   forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY \
     src/DataExtraction.sol:DataExtraction --broadcast
   ```

2. Note down the value returned as `Deployed to` and set it as an environment variable:

   ```bash
   export CONTRACT_ADDRESS=my-contract-address
   ```

## 3. Make an HTTP request

1. Make an HTTP request by calling the `getBitcoinPrice()` function:

   ```bash
   cast send $CONTRACT_ADDRESS "getBitcoinPrice()" \
     --private-key $PRIVATE_KEY \
     --rpc-url $RPC_URL
   ```

2. Wait a few seconds, then use the `processResponse()` function to process the result:

   ```bash
   cast send $CONTRACT_ADDRESS "processResponse()" \
     --private-key $PRIVATE_KEY \
     --rpc-url $RPC_URL
   ```

3. Get the raw response by calling `dumpResponse()`:

   ```bash
   cast call $CONTRACT_ADDRESS "dumpResponse()(bytes)" --rpc-url $RPC_URL
   ```

   In the output, you'll see the JSON response:

   ```bash
   {"bitcoin":{"usd":50000.0}}
   ```

4. Extract the Bitcoin price by calling `bitcoinPrice()`:

   ```bash
   cast call $CONTRACT_ADDRESS "bitcoinPrice()(int256)" --rpc-url $RPC_URL
   ```

   In the output, you'll see the Bitcoin price represented as an integer with 2 decimal places.

## Next steps

Now you can implement a more advanced example: [Fetch multiple prices](fetch-multiple-prices).
