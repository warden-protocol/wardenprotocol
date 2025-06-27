// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "precompile-json/IJson.sol" as json;
import "precompile-async/IAsync.sol" as async;
import "precompile-sched/ISched.sol" as sched;
import "precompile-callbacks/ICallback.sol" as callback;
import "precompile-common/Types.sol" as types;
import "pricepred/PricePredictor.sol" as pricepred;

contract PricePredExample is callback.ICallback {
    bytes public responseBody;
    uint64 public lastTaskId;

    pricepred.PricePredictor.OutputData public responseRaw;

    uint256 public predictedPrice;
    uint256 public predictedMetric0;
    uint256 public predictedMetric7;

    function run() public returns (pricepred.PricePredictor.InputData memory request) {
        request.date = 1749254400;

        string[] memory tokens = new string[](1);
        tokens[0] = "bitcoin";
        request.tokens = tokens;

        uint256[] memory metrics = new uint256[](2);
        metrics[0] = 0;
        metrics[1] = 7;
        request.metrics = metrics;

        uint64[2] memory falsePositiveRate;
        falsePositiveRate[0] = 1;
        falsePositiveRate[1] = 100;
        request.falsePositiveRate = falsePositiveRate;

        types.Types.Coin[] memory maxFees = new types.Types.Coin[](1);
        maxFees[0] = types.Types.Coin("award", 1);

        uint64 maxGas = 1000000;
        sched.CallbackParams memory callbackData = sched.CallbackParams(address(this), maxGas);

        lastTaskId = async.IASYNC_CONTRACT.addTask(
            "pricepred", abi.encode(request), maxFees, callbackData);
    }

    function cb(uint64 id, bytes calldata output) external override returns (bytes memory) {
        if(id != lastTaskId) {
            revert("Invalid task ID");
        }

        async.TaskByIdResponse memory task = async.IASYNC_CONTRACT.taskById(lastTaskId);
        if (task.taskResponse.result.id == 0) {
            revert("Not ready yet");
        }

        responseBody = task.taskResponse.result.output;
        responseRaw = abi.decode(responseBody, (pricepred.PricePredictor.OutputData));
        
        predictedPrice = responseRaw.predictions[0];
        predictedMetric0 = responseRaw.metrics[0][0];
        predictedMetric7 = responseRaw.metrics[0][1];

        return responseBody;
    }

    function getRaw() public view returns (pricepred.PricePredictor.OutputData memory) {
        return responseRaw;
    }
}