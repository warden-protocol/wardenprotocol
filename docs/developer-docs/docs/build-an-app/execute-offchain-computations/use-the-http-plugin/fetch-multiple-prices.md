---
sidebar_position: 7
---

# Fetch multiple prices

## Overview

Follow this tutorial to implement a more advanced example of handling HTTP requests with `x/async`.

You'll create a contract that fetches prices of **multiple cryptocurrencies** from the [CoinGecko API](https://docs.coingecko.com/reference/introduction) and extracts price values from the **CBOR-encoded** response.

## Step 1. Create a contract

Create a new file `MultiCoinPrices.sol`:

```solidity title="warden-http-examples/src/MultiCoinPrices.sol"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "./interfaces/IAsync.sol";
import "./interfaces/Http.sol";

contract MultiCoinPrices {
    uint64 public lastFutureId;

    uint256 public bitcoinPrice;
    uint256 public tetherPrice;
    uint256 public uniswapPrice;

    bytes public responseBody;

    // Fetch different prices from the CoinGecko API: 
    function run() public returns (Http.Request memory request) {
        request.url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether,uniswap&vs_currencies=usd";
        request.method = "GET";
        request.body = "";

        lastFutureId = IASYNC_CONTRACT.addFuture("http", abi.encode(request), address(this));

        bitcoinPrice = 0;
        tetherPrice = 0;
        uniswapPrice = 0;
    }

    // A callback function: the Warden node calls it automatically
    function cb() external {
        FutureByIdResponse memory future = IASYNC_CONTRACT.futureById(lastFutureId);
        if (future.futureResponse.result.id == 0) {
            revert("Not ready yet");
        }

        Http.Response memory response = abi.decode(future.futureResponse.result.output, (Http.Response));

        require(response.status == 200, "HTTP request failed");

        responseBody = response.body;

        // The CBOR map structure: {"bitcoin":{"usd":value},"tether":{"usd":value},"uniswap":{"usd":value}}

        // Skip the initial byte (map marker) and get to the first key
        uint256 offset = 1;

        offset = parseCoinPrice(response.body, offset, "bitcoin");
        offset = parseCoinPrice(response.body, offset, "tether");
        parseCoinPrice(response.body, offset, "uniswap");
    }

    // A helper function for parsing a coin price from CBOR data
    function parseCoinPrice(bytes memory data, uint256 startOffset, string memory coinName) private returns (uint256) {
        // Skip the coin name string: we don't need to validate it as we're following a known structure
        uint256 offset = skipCborString(data, startOffset);

        // Skip the map marker for the inner map
        offset += 1;

        // Skip the "usd" string
        offset = skipCborString(data, offset);

        // Read the price value, which is encoded as a float in CBOR
        if (data[offset] == 0xfb) {
            // A double precision float marker
            offset += 1; // Skip the marker

            // Extract the 8 bytes of the float
            uint64 bits;
            for (uint256 i = 0; i < 8; i++) {
                bits = (bits << 8) | uint64(uint8(data[offset + i]));
            }

            // Convert to a fixed point representation (multiply by 1e6 to preserve decimals)
            uint256 price = uint256(convertFloatBitsToUint(bits));

            // Store the price in an appropriate variable
            if (keccak256(bytes(coinName)) == keccak256(bytes("bitcoin"))) {
                bitcoinPrice = price;
            } else if (keccak256(bytes(coinName)) == keccak256(bytes("tether"))) {
                tetherPrice = price;
            } else if (keccak256(bytes(coinName)) == keccak256(bytes("uniswap"))) {
                uniswapPrice = price;
            }

            return offset + 8; // Return the new offset after the float
        }

        return offset; // Fallback if not a float
    }

    // A helper function for skipping the CBOR string and returning the new offset
    function skipCborString(bytes memory data, uint256 offset) private pure returns (uint256) {
        uint8 initialByte = uint8(data[offset]);
        uint8 majorType = initialByte >> 5;
        uint8 additionalInfo = initialByte & 0x1f;

        require(majorType == 3, "Expected string type"); // The string major type is 3

        offset += 1; // Skip the initial byte

        uint256 stringLength;
        if (additionalInfo < 24) {
            stringLength = additionalInfo;
        } else if (additionalInfo == 24) {
            // 1-byte length
            stringLength = uint8(data[offset]);
            offset += 1;
        } else if (additionalInfo == 25) {
            // 2-byte length
            stringLength = uint16(uint8(data[offset])) << 8 | uint16(uint8(data[offset + 1]));
            offset += 2;
        }

        return offset + stringLength; // Skip the string content
    }

    // Convert IEEE 754 double precision float bits to uint
    // This is a simplified conversion that works for our specific use case
    function convertFloatBitsToUint(uint64 bits) private pure returns (uint256) {
        // Extract components of the IEEE 754 double
        uint64 sign = bits >> 63;
        uint64 exponent = (bits >> 52) & 0x7FF;
        uint64 mantissa = bits & 0xFFFFFFFFFFFFF;

        // Handle special cases
        if (exponent == 0) {
            return 0; // Zero or subnormal
        }

        // For normal numbers
        uint256 value = (1 << 52) | mantissa; // Add implicit leading 1
        // Adjust by exponent (bias is 1023)
        int256 adjustedExp = int256(uint256(exponent)) - 1023;

        // Scale to a fixed point with 6 decimal places (multiply by 1e6)
        uint256 scaledValue;

        if (adjustedExp > 0) {
            scaledValue = value << uint256(adjustedExp);
        } else if (adjustedExp < 0) {
            scaledValue = value >> uint256(-adjustedExp);
        } else {
            scaledValue = value;
        }

        // Apply scaling factor to get 6 decimal places
        scaledValue = scaledValue * 1000000 / (1 << 52);

        // Apply sign
        if (sign == 1) {
            return 0; // We don't expect negative prices
        }

        return scaledValue;
    }
}
```

## Step 2. Deploy and test

1. Deploy the contract:
   
   ```bash
   forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY \
     src/MultiCoinPrices.sol:MultiCoinPrices --broadcast
   ```

2. Note down the value returned as `Deployed to` and set it as an environment variable:

   ```
   export CONTRACT_ADDRESS=my-contract-address
   ```
   
3. Make an HTTP request by calling the `run()` function:

   ```
   cast send $CONTRACT_ADDRESS "run()" \
     --private-key $PRIVATE_KEY \
     --rpc-url $RPC_URL
   ```
   
4. Wait a few seconds, then use the `cb()` function to process the result:
   
   ```
   cast send $CONTRACT_ADDRESS "cb()" \
     --private-key $PRIVATE_KEY \
     --rpc-url $RPC_URL
   ```

4. Check the prices:
   
   ```
   cast call $CONTRACT_ADDRESS "bitcoinPrice()(uint256)" --rpc-url $RPC_URL
   cast call $CONTRACT_ADDRESS "tetherPrice()(uint256)" --rpc-url $RPC_URL
   cast call $CONTRACT_ADDRESS "uniswapPrice()(uint256)" --rpc-url $RPC_URL
   ```

   In the output, you'll see the price of each cryptocurrency displayed with 6 decimal places of precision.
   
## Next steps

Learn how to use other Plugins:

- [Use the price prediction Plugin](../use-the-price-prediction-plugin/introduction)
