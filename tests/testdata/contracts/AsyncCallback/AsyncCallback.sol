// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "precompiles/async/IAsync.sol";
import "precompiles/common/Types.sol";

contract AsyncCallback {
    uint64 public lastTaskId;
    uint64 public lastCbId;

    bool public got1 = false;
    bytes public output;

    bool public got2 = false;
    bytes public output2;

    function work(string calldata msg, uint64 callbackGasLimit) public {
        Types.Coin[] memory maxFee;
        lastTaskId =
            IASYNC_CONTRACT.addTask("echo", bytes(msg), maxFee, CallbackParams(address(this), callbackGasLimit));

        TaskByIdResponse memory taskResponse = IASYNC_CONTRACT.taskById(lastTaskId);
        lastCbId = taskResponse.taskResponse.task.callbackId;
    }

    function cb(uint64, bytes calldata _output) external returns (bytes memory) {
        if (got1 && got2) {
            revert("already got the two callbacks");
        }

        if (got1 && !got2) {
            got2 = true;
            output2 = _output;
            return bytes("");
        }

        emit storedNumber(42);
        got1 = true;
        output = _output;

        Types.Coin[] memory maxFee;
        lastTaskId =
            IASYNC_CONTRACT.addTask("echo", bytes("hello again"), maxFee, CallbackParams(address(this), 100000000));

        return bytes("");
    }

    event storedNumber(uint256 indexed coolNumber);
}
