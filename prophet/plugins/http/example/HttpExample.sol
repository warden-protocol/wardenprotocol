// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "precompile-json/IJson.sol" as json;
import "precompile-async/IAsync.sol" as async;
import "precompile-common/Types.sol" as types;
import "http/Http.sol" as http;

contract HttpExample {
    uint64 public lastFutureId;

    int256 public bitcoinPrice;
    int256 public tetherPrice;
    int256 public uniswapPrice;

    bytes public responseBody;

    function run() public returns (http.Http.Request memory request) {
        request.url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether,uniswap&vs_currencies=usd";
        request.method = "GET";
        request.body = "";

        lastFutureId = async.IASYNC_CONTRACT.addTask("http", abi.encode(request), address(this));

        bitcoinPrice = 0;
        tetherPrice = 0;
        uniswapPrice = 0;
    }

    function cb() external {
        async.TaskByIdResponse memory future = async.IASYNC_CONTRACT.taskById(lastFutureId);
        if (future.taskResponse.result.id == 0) {
            revert("Not ready yet");
        }

        http.Http.Response memory response = abi.decode(future.taskResponse.result.output, (http.Http.Response));

        require(response.status == 200, "HTTP request failed");

        responseBody = response.body;

        json.ReadKeyValue[] memory keyValuePairs = new json.ReadKeyValue[](3);
        keyValuePairs[0] = json.ReadKeyValue("bitcoin.usd", "float", 2);
        keyValuePairs[1] = json.ReadKeyValue("tether.usd", "float", 2);
        keyValuePairs[2] = json.ReadKeyValue("uniswap.usd", "float", 2);
        
        bytes[] memory readResult = json.IJSON_CONTRACT.read(responseBody, keyValuePairs);

        int256 bitcoin = abi.decode(readResult[0], (int256));
        int256 tether = abi.decode(readResult[1], (int256));
        int256 uniswap = abi.decode(readResult[2], (int256));

        // // CBOR map structure: {"bitcoin":{"usd":value},"tether":{"usd":value},"uniswap":{"usd":value}}

        bitcoinPrice = bitcoin;
        tetherPrice = tether;
        uniswapPrice = uniswap;
    }
}