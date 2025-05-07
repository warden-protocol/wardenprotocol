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
    PendingTasksResponse
} from "precompile-async/IAsync.sol";
import { Types } from "precompile-async/IAsync.sol";

contract MockAsyncPrecompile is IAsync {
    uint64 public tasksCount = 0;
    mapping(uint64 id => TaskByIdResponse output) public _tasks;
    mapping(address orderAddress => address orderCreator) public orders;

    function addTask(
        string calldata plugin,
        bytes calldata input,
        address
    ) external returns (uint64 taskId)
    {
        taskId = uint64(++tasksCount);
        Task memory task = Task({
            id: taskId,
            // solhint-disable-next-line
            creator: tx.origin,
            plugin: plugin,
            input: input
        });

        TaskVote[] memory emptyVotes = new TaskVote[](0);
        bytes memory emptySubmitter;
        TaskResult memory taskResult = TaskResult({
            id: taskId,
            output: input,
            submitter: emptySubmitter
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
}
