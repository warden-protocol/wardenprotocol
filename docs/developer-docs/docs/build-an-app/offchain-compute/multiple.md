---
sidebar_position: 6
---

# Handling Multiple Requests

Let's create a contract that tests multiple APIs to see which ones work.

## Step 1: Create a New Contract

Create a new file called src/MultiApiTest.sol:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "./interfaces/IAsync.sol";
import "./interfaces/Http.sol";

contract MultiApiTest {
    uint64 public lastFutureId;
    bytes public responseBody;
    uint256 public statusCode;
    string public currentApi;
    
    // Try CoinGecko API (known to work)
    function tryCoinGecko() public returns (Http.Request memory request) {
        currentApi = "CoinGecko";
        request.url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
        request.method = "GET";
        request.body = "";
        
        lastFutureId = IASYNC_CONTRACT.addFuture("http", abi.encode(request), address(this));
    }
    
    // Try GitHub API
    function tryGitHub() public returns (Http.Request memory request) {
        currentApi = "GitHub";
        request.url = "https://api.github.com/users/ethereum";
        request.method = "GET";
        request.body = "";
        
        lastFutureId = IASYNC_CONTRACT.addFuture("http", abi.encode(request), address(this));
    }
    
    // Try JSONPlaceholder API
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
    
    // Callback function that will be called by the precompile when the response is ready
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
    
    // Get the response as a string (for easier reading)
    function getResponseAsString() public view returns (string memory) {
        return string(responseBody);
    }
}
```

## Step 2: Deploy and Test

```bash
# Deploy the contract
forge create --rpc-url http://localhost:8545 --private-key YOUR_PRIVATE_KEY src/MultiApiTest.sol:MultiApiTest --broadcast

# Test CoinGecko API
cast send --rpc-url http://localhost:8545 --private-key YOUR_PRIVATE_KEY CONTRACT_ADDRESS "tryCoinGecko()"
# Wait a few seconds
cast send --rpc-url http://localhost:8545 --private-key YOUR_PRIVATE_KEY CONTRACT_ADDRESS "tryProcess()"
cast call --rpc-url http://localhost:8545 CONTRACT_ADDRESS "statusCode()(uint256)"
```

Expected output:

```bash
200
```

```bash
# Test GitHub API
cast send --rpc-url http://localhost:8545 --private-key YOUR_PRIVATE_KEY CONTRACT_ADDRESS "tryGitHub()"
# Wait a few seconds
cast send --rpc-url http://localhost:8545 --private-key YOUR_PRIVATE_KEY CONTRACT_ADDRESS "tryProcess()"
cast call --rpc-url http://localhost:8545 CONTRACT_ADDRESS "statusCode()(uint256)"
```

Expected output:

```bash
200
```

```bash
# Test JSONPlaceholder API
cast send --rpc-url http://localhost:8545 --private-key YOUR_PRIVATE_KEY CONTRACT_ADDRESS "tryJSONPlaceholder()"
```

This might fail with:

```bash
Error: server returned a null response when a non-null response was expected
```
