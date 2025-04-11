---
sidebar_position: 3
---

# Implement HTTP requests

## Overview

This tutorial explains how implement simple **HTTP requests** to **multiple APIs**:

- [The CoinGecko API](https://docs.coingecko.com/reference/introduction)
- [The GitHub API](https://docs.github.com/en/rest?apiVersion=2022-11-28)
- [The JSONPlaceholder API](https://jsonplaceholder.typicode.com)

## 1. Create a contract

Create a new file called `MultiApiTest.sol`:

```solidity title="warden-http-examples/src/MultiApiTest.sol"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "./interfaces/IAsync.sol";
import "./interfaces/Http.sol";

contract MultiApiTest {
    uint64 public lastFutureId;
    bytes public responseBody;
    uint256 public statusCode;
    string public currentApi;
    
    // Try the CoinGecko API: fetch the current Bitcoin price
    function tryCoinGecko() public returns (Http.Request memory request) {
        currentApi = "CoinGecko";
        request.url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
        request.method = "GET";
        request.body = "";
        
        lastFutureId = IASYNC_CONTRACT.addFuture("http", abi.encode(request), address(this));
    }
    
    // Try the GitHub API
    function tryGitHub() public returns (Http.Request memory request) {
        currentApi = "GitHub";
        request.url = "https://api.github.com/users/ethereum";
        request.method = "GET";
        request.body = "";
        
        lastFutureId = IASYNC_CONTRACT.addFuture("http", abi.encode(request), address(this));
    }
    
    // Try the JSONPlaceholder API
    function tryJSONPlaceholder() public returns (Http.Request memory request) {
        currentApi = "JSONPlaceholder";
        request.url = "https://jsonplaceholder.typicode.com/posts/1";
        request.method = "GET";
        request.body = "";
        
        lastFutureId = IASYNC_CONTRACT.addFuture("http", abi.encode(request), address(this));
    }
    
    // Try OpenWeatherMap API
    function tryOpenWeather() public returns (Http.Request memory request) {
        currentApi = "OpenWeather";
        request.url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=b6907d289e10d714a6e88b30761fae22";
        request.method = "GET";
        request.body = "";
        
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
    
    // A callback function: the precompile will call it when the response is ready
    function cb() external {
        FutureByIdResponse memory future = IASYNC_CONTRACT.futureById(lastFutureId);
        if (future.futureResponse.result.id == 0) {
            return; // Not ready yet
        }
        
        // Decode the response
        Http.Response memory response = abi.decode(future.futureResponse.result.output, (Http.Response));
        
        // Store the response data
        statusCode = response.status;
        responseBody = response.body;
    }
    
    // Get the response as a string for easier reading
    function getResponseAsString() public view returns (string memory) {
        return string(responseBody);
    }
}
```

## 2. Deploy 

1. Deploy the contract:
   
   ```bash
   forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY \
     src/MultiApiTest.sol:MultiApiTest --broadcast
   ```

2. Note down the value returned as `Deployed to` and set it as an environment variable:

   ```
   export CONTRACT_ADDRESS=my-contract-address
   ```

## 3. Make HTTP requests

### 3.1. Call the CoinGecko API

Test HTTP requests to the [CoinGecko API](https://docs.coingecko.com/reference/introduction):

1. Call the `tryCoinGecko()` function. It'll fetch the current Bitcoin price.

   ```bash
   cast send $CONTRACT_ADDRESS "tryCoinGecko()" \
     --private-key $PRIVATE_KEY \
     --rpc-url $RPC_URL
   ```

2. Wait a few seconds. Now you can check whether the response is ready by calling `isReady()` (this step is optional):

   ```bash
   cast call $CONTRACT_ADDRESS "isReady()(bool)" --rpc-url $RPC_URL
   ```
   
   The expected output is the following:
   
   ```bash
   true
   ```
   
3. Call `tryProcess()`. This function will process the response without reverting in case it's not ready yet.
   
   ```bash
   cast send $CONTRACT_ADDRESS "tryProcess()" \
     --private-key $PRIVATE_KEY \
     --rpc-url $RPC_URL
   ```

4. Finally, get the status code by calling `statusCode()`:
   
   ```bash
   cast call $CONTRACT_ADDRESS "statusCode()(uint256)" --rpc-url $RPC_URL
   ```

   The expected output is the following:

   ```bash
   200
   ```

5. You can also try to get the response as a string:

   ```bash
   cast call $CONTRACT_ADDRESS "getResponseAsString()(string)" --rpc-url $RPC_URL
   ```

   This will print a CBOR-encoded output:
   
   ```bash
   "�gbitcoin�cusd�@��P\0\0\0\0"
   ```

### 3.2. Call the GitHub API   

Test requests to the [GitHub API](https://docs.github.com/en/rest?apiVersion=2022-11-28) in a similar way:

```bash
cast send $CONTRACT_ADDRESS "tryGitHub()" \
  --private-key $PRIVATE_KEY \
  --rpc-url $RPC_URL
```
```bash
cast send $CONTRACT_ADDRESS "tryProcess()"
  --private-key $PRIVATE_KEY \
  --rpc-url $RPC_URL
```
```bash
cast call $CONTRACT_ADDRESS "statusCode()(uint256)" --rpc-url $RPC_URL
```

The expected output is the following:

```bash
200
   ```

### 3.3. Call the JSONPlaceholder API

Test requests to the [JSONPlaceholder API](https://jsonplaceholder.typicode.com):

```bash
cast send $CONTRACT_ADDRESS "tryJSONPlaceholder()" \
--private-key $PRIVATE_KEY \
--rpc-url $RPC_URL
```
```bash
cast send $CONTRACT_ADDRESS "tryProcess()"
--private-key $PRIVATE_KEY \
--rpc-url $RPC_URL
```
```bash
cast call $CONTRACT_ADDRESS "statusCode()(uint256)" --rpc-url $RPC_URL
```

This might fail with the following error:

```bash
Error: server returned a null response when a non-null response was expected
```

:::tip
If you're experiencing troubles querying a particular API with `x/async`, please contact us in [Discord](https://discord.com/invite/wardenprotocol).
:::

## Next steps

When you made a request to the CoinGecko API, you received a CBOR-encoded output. To learn how to extract data from such responses, follow the next guide: [Extract data](extract-data).


