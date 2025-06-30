// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "precompile-json/IJson.sol" as json;
import "precompile-async/IAsync.sol" as async;
import "precompile-sched/ISched.sol" as sched;
import "precompile-callbacks/ICallback.sol" as callback;
import "precompile-common/Types.sol" as types;
import "http/Http.sol" as http;

contract HttpExample is callback.ICallback {
    uint64 public lastTaskId;

    int256 public bitcoinPrice;
    int256 public tetherPrice;
    int256 public uniswapPrice;

    bytes public responseBody;

    // Receive function to accept award transfers
    receive() external payable {
        // Contract can now receive award
        // You can add custom logic here if needed
    }

    function run() public returns (http.Http.Request memory request) {
        request.url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether,uniswap&vs_currencies=usd";
        request.method = "GET";
        request.body = "";

        types.Types.Coin[] memory maxFees = new types.Types.Coin[](1);
        maxFees[0] = types.Types.Coin("award", 1);

        uint64 maxGas = 1000000000;
        sched.CallbackParams memory callbackData = sched.CallbackParams(address(this), maxGas);

        lastTaskId = async.IASYNC_CONTRACT.addTask("http", abi.encode(request), maxFees, callbackData);

        bitcoinPrice = 0;
        tetherPrice = 0;
        uniswapPrice = 0;
    }

    function cb(uint64 id, bytes calldata output) external override returns (bytes memory) {
        async.TaskByIdResponse memory future = async.IASYNC_CONTRACT.taskById(lastTaskId);
        if (future.taskResponse.result.id == 0) {
            revert("Not ready yet");
        }

        http.Http.Response memory response = abi.decode(future.taskResponse.result.output, (http.Http.Response));

        require(response.status == 200, "HTTP request failed");

        responseBody = response.body;

        // Json structure : {"bitcoin":{"usd":value},"tether":{"usd":value},"uniswap":{"usd":value}}

        json.ReadKeyValue[] memory keyValuePairs = new json.ReadKeyValue[](3);
        keyValuePairs[0] = json.ReadKeyValue("bitcoin.usd", "float", 2);
        keyValuePairs[1] = json.ReadKeyValue("tether.usd", "float", 2);
        keyValuePairs[2] = json.ReadKeyValue("uniswap.usd", "float", 2);
        
        bytes[] memory readResult = json.IJSON_CONTRACT.read(responseBody, keyValuePairs);

        int256 bitcoin = abi.decode(readResult[0], (int256));
        int256 tether = abi.decode(readResult[1], (int256));
        int256 uniswap = abi.decode(readResult[2], (int256));

        bitcoinPrice = bitcoin;
        tetherPrice = tether;
        uniswapPrice = uniswap;
    }



}