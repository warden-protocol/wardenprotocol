---
sidebar_position: 5
---

# Extracting Data from CBOR Responses

Now let's create a contract that can extract specific data from CBOR-encoded responses. We'll focus on extracting the Bitcoin price from the CoinGecko API response.

## Step 1: Create a New Contract

Create a new file called `src/DataExtractionExample.sol`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "./interfaces/IAsync.sol";
import "./interfaces/Http.sol";

contract DataExtractionExample {
    uint64 public lastFutureId;
    bytes public responseBody;
    uint256 public statusCode;
    
    // Make a request to CoinGecko API
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
    
    // Callback function
    function cb() external {
        // This function is called automatically by the Warden node
    }
    
    // Get the raw bytes at a specific position in the response
    function getBytesAt(uint256 start, uint256 length) public view returns (bytes memory) {
        bytes memory result = new bytes(length);
        for (uint256 i = 0; i < length && i + start < responseBody.length; i++) {
            result[i] = responseBody[i + start];
        }
        return result;
    }
    
    // Dump the response bytes as hex for debugging
    function dumpResponseHex() public view returns (bytes memory) {
        return responseBody;
    }
    
    // Extract Bitcoin price using a simple approach
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

## Step 2: Deploy and Test

```bash
# Deploy the contract   
forge create --rpc-url http://localhost:8545 --private-key YOUR_PRIVATE_KEY src/DataExtractionExample.sol:DataExtractionExample --broadcast

# Make a request
cast send --rpc-url http://localhost:8545 --private-key YOUR_PRIVATE_KEY CONTRACT_ADDRESS "getBitcoinPrice()"

# Wait a few seconds, then process the response
cast send --rpc-url http://localhost:8545 --private-key YOUR_PRIVATE_KEY CONTRACT_ADDRESS "processResponse()"

# Get the raw response bytes
cast call --rpc-url http://localhost:8545 CONTRACT_ADDRESS "dumpResponseHex()(bytes)"
```

Expected output (will be a hex string):

```bash
0xa1...
```

```bash
# Try to extract the Bitcoin price
cast call --rpc-url http://localhost:8545 CONTRACT_ADDRESS "getBitcoinPriceSimple()(uint256)"
```

The output will be the Bitcoin price as an integer.
