---
sidebar_position: 3
---

# HTTP Request Example

Let's create a simple contract that makes an **HTTP** request to the CoinGecko API to fetch the current **Bitcoin** price.

## Step 1: Create the Contract

Create a new file called `src/MinimalHttpExample.sol`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "./interfaces/IAsync.sol";
import "./interfaces/Http.sol";

contract MinimalHttpExample {
    uint64 public lastFutureId;
    bytes public responseBody;
    uint256 public statusCode;
    
    // Make a request to CoinGecko API
    function getBitcoinPrice() public returns (Http.Request memory request) {
        // Create a simple request to get Bitcoin price
        request.url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
        request.method = "GET";
        request.body = "";
        
        // Send the request using the async precompile
        lastFutureId = IASYNC_CONTRACT.addFuture("http", abi.encode(request), address(this));
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

## Step 2: Compile the Contract

```bash
forge build
```

## Step 3: Deploy the Contract

```bash
forge create --rpc-url http://localhost:8545 --private-key YOUR_PRIVATE_KEY src/MinimalHttpExample.sol:MinimalHttpExample --broadcast
```

Replace `YOUR_PRIVATE_KEY` with your actual private key. Note the contract address from the output.

## Step 4: Make a HTTP Request

```bash
cast send --rpc-url http://localhost:8545 --private-key YOUR_PRIVATE_KEY CONTRACT_ADDRESS "getBitcoinPrice()"
```

Replace `CONTRACT_ADDRESS` with your deployed contract address.

## Step 5: Wait for the Response

The Warden node will process your request asynchronously. Wait a few seconds for the response to be ready.

## Step 6: Check the Response

```bash
# Check the status code
cast call --rpc-url http://localhost:8545 CONTRACT_ADDRESS "statusCode()(uint256)"
```

Expected output:

```bash
200
```

```bash
# Get the response as a string
cast call --rpc-url http://localhost:8545 CONTRACT_ADDRESS "getResponseAsString()(string)"
```

Expected output (will be CBOR-encoded):

```bash
"�gbitcoin�cusd�@��P\0\0\0\0"
```

Congratulations! You've successfully made your first HTTP request from a smart contract.
