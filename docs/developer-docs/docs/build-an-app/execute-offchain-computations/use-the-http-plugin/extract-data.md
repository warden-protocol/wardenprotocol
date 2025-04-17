---
sidebar_position: 4
---

# Extract data

## Overview

Warden encodes responses from HTTP requests in **CBOR** (Concise Binary Object Representation): a binary data format similar to JSON but more compact. You could see an example of such output in the previous guide, when [testing the CoinGecko API](implement-http-requests#31-call-the-coingecko-api).

This tutorial will guide you through extracting specific data from CBOR-encoded responses. You'll create a contract that can extract the Bitcoin price from the [CoinGecko API](https://docs.coingecko.com/reference/introduction) responses.

## 1. Create a contract

Create a new file `DataExtraction.sol`:

```solidity title="warden-http-examples/src/DataExtraction.sol"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "./interfaces/IAsync.sol";
import "./interfaces/Http.sol";

contract DataExtraction {
    uint64 public lastFutureId;
    bytes public responseBody;
    uint256 public statusCode;
    
    // Make a request to the CoinGecko API: fetch the current Bitcoin price
    function getBitcoinPrice() public returns (Http.Request memory request) {
        request.url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
        request.method = "GET";
        request.body = "";
        
        lastFutureId = IASYNC_CONTRACT.addFuture("http", abi.encode(request), address(this));
    }
    
    // Process the response
    function processResponse() public returns (bool) {
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
    
    // A callback function: the Warden node calls it automatically
    function cb() external {
    }
    
    // Get the raw bytes at a specific position in the response
    function getBytesAt(uint256 start, uint256 length) public view returns (bytes memory) {
        bytes memory result = new bytes(length);
        for (uint256 i = 0; i < length && i + start < responseBody.length; i++) {
            result[i] = responseBody[i + start];
        }
        return result;
    }
    
    // Dump the response bytes as a hex value for debugging
    function dumpResponseHex() public view returns (bytes memory) {
        return responseBody;
    }
    
    // Extract the Bitcoin price using a simple approach
    function getBitcoinPriceSimple() public view returns (uint256) {
        bytes memory data = responseBody;
        
        // Look for the pattern that indicates the price
        for (uint256 i = 0; i < data.length - 10; i++) {
            if (data[i] == 0xFB) {
                // Found the float64 marker, extract the next 8 bytes
                uint64 priceBits;
                for (uint256 j = 0; j < 8; j++) {
                    priceBits = (priceBits << 8) | uint8(data[i + 1 + j]);
                }
                
                // Convert to an integer (simplified, assumes price < 2^53)
                uint256 price = uint256(priceBits >> 12);
                return price;
            }
        }
        
        return 0;
    }
}
```

This contract adds:

- Functions to inspect the raw response bytes
- A simple function to extract the Bitcoin price from the CBOR data

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

3. Get the raw response bytes by calling `dumpResponseHex()`:
   
   ```bash
   cast call $CONTRACT_ADDRESS "dumpResponseHex()(bytes)" --rpc-url $RPC_URL
   ```

   In the output, you'll see a HEX string:

   ```bash
   0xa1...
   ```

4. Extract the Bitcoin price by calling `getBitcoinPriceSimple()(uint256) `:

   ```bash
   cast call $CONTRACT_ADDRESS "getBitcoinPriceSimple()(uint256)" --rpc-url $RPC_URL
   ```

   In the output, you'll see the Bitcoin price represented as an integer.

## Next steps

Now you can implement a more advanced example: [Fetch multiple prices](fetch-multiple-prices).
