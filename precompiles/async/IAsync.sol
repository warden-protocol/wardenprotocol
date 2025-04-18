// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.25;

import "../common/Types.sol";

/// @dev The IAsync contract's address.
address constant IASYNC_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000903;

/// @dev The IAsync contract's instance.
IAsync constant IASYNC_CONTRACT = IAsync(IASYNC_PRECOMPILE_ADDRESS);

struct PluginFee {
    Types.Coin[] fee;
}

struct DeductedFee {
    Types.Coin[] pluginCreatorReward;
    Types.Coin[] executorReward;
}

struct Plugin {
    string id;
    address creator;
    string description;
    PluginFee fee;
}

struct PluginsResponse {
    Types.PageResponse pagination;
    Plugin[] plugins;
}

struct Task {
    uint64 id;
    address creator;
    string plugin;
    bytes input;
    DeductedFee fee;
}

enum TaskVoteType {
    Unspecified,
    Verified,
    Rejected
}

struct TaskVote {
    uint64 taskId;
    bytes Voter;
    TaskVoteType vote;
}

struct TaskResult { 
    uint64 id;
    bytes output;
    bytes submitter;
}

struct TaskResponse {
    Task task;
    TaskVote[] votes;
    TaskResult result;
}

struct PendingTasksResponse {
    Types.PageResponse pagination;
    Task[] tasks;
}

struct TasksResponse {
    Types.PageResponse pagination;
    TaskResponse[] tasks;
}

struct TaskByIdResponse {
    TaskResponse taskResponse;
}

/**
 * @author Warden Team
 * @title x/async Interface
 * @dev The interface through which users and solidity contracts will interact with x/async.
 * @custom:address 0x0000000000000000000000000000000000000903
 */
interface IAsync {
    /// @dev Defines a method to add a task.
    /// @param plugin The unique name of the plugin
    /// @param input The plugin's input
    /// @param callbackParams The params for callback. Zero address interpretes as no-callback
    /// @return taskId The id of the task
    function addTask(
        string calldata plugin,
        bytes calldata input,
        Types.Coin[] calldata maxFee,
        Types.CallbackParams calldata callbackParams
    ) external returns (uint64 taskId);

    /// @dev Defines a method to query task by id.
    /// @param taskId The task id
    /// @return response The task reponse
    function taskById(
        uint64 taskId
    ) external view returns (TaskByIdResponse memory response);

    /// @dev Defines a method to query tasks.
    /// @param pagination The pagination details
    /// @param creator Optional creator address filter
    /// @return response The paged tasks
    function tasks(
        Types.PageRequest calldata pagination,
        address creator
    ) external view returns (TasksResponse memory response);

    /// @dev Defines a method to query pending tasks.
    /// @param pagination The pagination details
    /// @return response The paged tasks
    function pendingTasks(
        Types.PageRequest calldata pagination
    ) external view returns (PendingTasksResponse memory response);

    /// @dev Defines a method to query available plugins.
    /// @param pagination The pagination details
    /// @return response The paged plugins
    function plugins(
        Types.PageRequest calldata pagination
    ) external view returns (PluginsResponse memory response);

    /// @dev CreateTask defines an Event emitted when a task is created.
    /// @param creator The address of the creator
    /// @param taskId The task Id
    /// @param plugin The name of the plugin
    /// @param callbackId The id of callback
    event CreateTask(
        uint64 indexed taskId,
        address indexed creator,
        string plugin,
        uint64 callbackId
    );
}
