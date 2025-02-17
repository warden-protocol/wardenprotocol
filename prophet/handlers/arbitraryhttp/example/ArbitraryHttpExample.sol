// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "../../../../precompiles/async/IAsync.sol";
import "../ArbitraryHttp.sol";

contract ArbitraryHttpExample {
    // ID of the last future created by run()
    uint64 public lastFutureId;

    // Prices from the last API call
    uint256 public bitcoinPrice;
    uint256 public tetherPrice;
    uint256 public uniswapPrice;

    function run() public returns (ArbitraryHttp.Request memory request) {
        // Create the HTTP request
        request.url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether,uniswap&vs_currencies=usd";
        request.method = "GET";

        lastFutureId = IASYNC_CONTRACT.addFuture("arbitraryhttp", abi.encode(request));

        // Reset prices while the future is running
        bitcoinPrice = 0;
        tetherPrice = 0;
        uniswapPrice = 0;
    }

    function cb() external {
        FutureByIdResponse memory future = IASYNC_CONTRACT.futureById(lastFutureId);
        if (future.futureResponse.result.id == 0) revert("Not ready yet");

        ArbitraryHttp.Response memory response =
            abi.decode(future.futureResponse.result.output, (ArbitraryHttp.Response));

        // Verify successful response
        require(response.status == 200, "HTTP request failed");

        // Parse the CBOR-encoded JSON response
        // Expected format: {"bitcoin":{"usd":50000},"tether":{"usd":1},"uniswap":{"usd":5}}
        (bitcoinPrice, tetherPrice, uniswapPrice) = abi.decode(response.body, (uint256, uint256, uint256));
    }
}
