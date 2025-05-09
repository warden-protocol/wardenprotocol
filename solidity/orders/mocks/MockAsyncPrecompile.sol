// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import {
    Task,
    TaskByIdResponse,
    TaskResponse,
    TasksResponse,
    TaskResult,
    TaskVote,
    IAsync,
    PendingTasksResponse,
    PluginsResponse
} from "precompile-async/IAsync.sol";
import { DeductedFee, PluginsResponse, Types } from "precompile-async/IAsync.sol";
import { CallbackParams } from "precompile-sched/ISched.sol";

contract MockAsyncPrecompile is IAsync {
    uint64 public tasksCount = 0;
    mapping(uint64 id => TaskByIdResponse output) public _tasks;
    mapping(address orderAddress => address orderCreator) public orders;

    function addTask(
        string calldata plugin,
        bytes calldata input,
        Types.Coin[] calldata,
        CallbackParams calldata
    ) external returns (uint64 taskId)
    {
        taskId = uint64(++tasksCount);
        bytes memory solver = "";
        DeductedFee memory fee;
        Task memory task = Task({
            id: taskId,
            // solhint-disable-next-line
            creator: tx.origin,
            plugin: plugin,
            fee: fee,
            input: input,
            callbackId: 0,
            solver: solver
        });

        TaskVote[] memory emptyVotes = new TaskVote[](0);
        TaskResult memory taskResult = TaskResult({
            id: taskId,
            output: input
        });
        TaskResponse memory taskResponse = TaskResponse({
            task: task,
            votes: emptyVotes,
            result: taskResult
        });
        _tasks[taskId] = TaskByIdResponse({
            taskResponse: taskResponse
        });
    }

    function taskById(
        uint64 taskId
    ) external view returns (TaskByIdResponse memory response) {
        response = _tasks[taskId];
    }

    function tasks(
        Types.PageRequest calldata,
        address
    ) external pure returns (TasksResponse memory) {
        // solhint-disable-next-line
        revert("Unimplemented");
    }

    function pendingTasks(
        Types.PageRequest calldata
    ) external pure returns (PendingTasksResponse memory) {
        // solhint-disable-next-line
        revert("Unimplemented");
    }

    function plugins(
        Types.PageRequest calldata pagination
    ) external view returns (PluginsResponse memory response) {
        // solhint-disable-next-line
        revert("Unimplemented");
    }
}
