---
sidebar_position: 3
---

# Implement Venice AI

## Overview

`VenicePlugin.sol` is a smart contract that serves as an interface to Warden Protocol's Venice AI plugin, allowing users to submit AI queries (prompts) asynchronously with customizable parameters like model, temperature, and token limits.
The contract handles the entire AI request lifecycle - from creating tasks and storing them with unique IDs, to receiving AI responses via a callback function and providing getter methods to retrieve completed responses.

## 1. Create the contract

Create a new file called `VenicePlugin.sol`

```solidity title="warden-venice-example/src/VenicePlugin.sol"

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IAsync.sol";

/**
 * @title VenicePlugin
 * @dev Smart contract that interacts with Warden Protocol's Venice AI plugin
 * This contract allows users to make AI requests and receive responses asynchronously
 */

contract VenicePlugin {
    address constant ASYNC_PRECOMPILE = 0x0000000000000000000000000000000000000903;
    
    // Interface to the async precompile
    IAsync private async;

    // Struct to hold Venice request parameters
    struct VeniceRequest {
        string model;
        uint256 temperature; // Stored as integer (multiply by 1000 for decimal precision)
        uint256 topP;        // Stored as integer (multiply by 1000 for decimal precision)
        uint256 maxTokens;   // Max completion tokens
        string message;
    }

    // Storage for multiple questions and responses
    mapping(uint64 => address) public taskToUser;
    mapping(uint64 => string) public taskToPrompt;
    mapping(uint64 => string) public taskToResponse;
    mapping(uint64 => bool) public taskCompleted;
    
    uint64 public latestTaskId;

    // Events
    event VeniceRequestCreated(address indexed user, uint64 indexed taskId, string prompt);
    event VeniceResponseReceived(uint64 indexed taskId, string response);

    constructor() {
        async = IAsync(ASYNC_PRECOMPILE);
    }

    /**
     * @dev Ask Venice AI a question with default parameters
     * @param prompt The question to ask Venice
     * @return taskId The ID of the created async task
     */
    
    function askVenice(string memory prompt) external returns (uint64 taskId) {
        VeniceRequest memory request = VeniceRequest({
            model: "default",
            temperature: 0,      // 0.0
            topP: 900,          // 0.9
            maxTokens: 1000,    // Max completion tokens (required!)
            message: prompt
        });
        
        return _createVeniceTask(request, prompt);
    }

    /**
     * @dev Ask Venice AI a question with custom parameters
     * @param prompt The question to ask Venice
     * @param model The AI model to use
     * @param temperature Temperature parameter (multiply by 1000, e.g., 500 = 0.5)
     * @param topP Top-p parameter (multiply by 1000, e.g., 900 = 0.9)
     * @param maxTokens Maximum completion tokens
     * @return taskId The ID of the created async task
     */

    function askVeniceWithParams(
        string memory prompt,
        string memory model,
        uint256 temperature,
        uint256 topP,
        uint256 maxTokens
    ) external returns (uint64 taskId) {
        VeniceRequest memory request = VeniceRequest({
            model: model,
            temperature: temperature,
            topP: topP,
            maxTokens: maxTokens,
            message: prompt
        });
        
        return _createVeniceTask(request, prompt);
    }

    /**
     * @dev Internal function to create a Venice task
     * @param request The Venice request parameters
     * @param prompt The original prompt for tracking
     * @return taskId The ID of the created async task
     */

    function _createVeniceTask(VeniceRequest memory request, string memory prompt) internal returns (uint64 taskId) {
        // Create JSON for Venice plugin with proper format
        string memory json = _createVeniceJSON(request);
        bytes memory input = bytes(json);

        // Create fee array with uward tokens (required for Venice)
        Types.Coin[] memory maxFee = new Types.Coin[](1);
        maxFee[0] = Types.Coin({
            denom: "uward",
            amount: 100000000  // 100 million uward
        });

        // Create callback parameters
        CallbackParams memory callbackParams = CallbackParams({
            addressValue: address(this),
            gasLimit: 200000
        });

        // Create async task with callback to this contract
        taskId = async.addTask("venice", input, maxFee, callbackParams);

        // Track the request
        taskToUser[taskId] = msg.sender;
        taskToPrompt[taskId] = prompt;
        taskCompleted[taskId] = false;
        latestTaskId = taskId;

        emit VeniceRequestCreated(msg.sender, taskId, prompt);
    }

    /**
     * @dev Callback function called by the async precompile when task is completed
     * @param id The task ID
     * @param output The task output data
     */

    function cb(uint64 id, bytes calldata output) external {
        require(msg.sender == ASYNC_PRECOMPILE, "Only precompile");
        
        // Decode the response
        string memory response = string(output);
        
        // Store the response
        taskToResponse[id] = response;
        taskCompleted[id] = true;

        emit VeniceResponseReceived(id, response);
    }

    /**
     * @dev Get the response for a completed task
     * @param taskId The task ID
     * @return response The AI response
     */

    function getTaskResponse(uint64 taskId) external view returns (string memory response) {
        require(taskCompleted[taskId], "Task not completed yet");
        return taskToResponse[taskId];
    }

    /**
     * @dev Get the latest response (for convenience)
     * @return response The latest AI response
     */

    function getLatestResponse() external view returns (string memory response) {
        require(taskCompleted[latestTaskId], "Latest task not completed yet");
        return taskToResponse[latestTaskId];
    }

    /**
     * @dev Check if a task is completed
     * @param taskId The task ID
     * @return completed True if the task is completed
     */

    function isTaskCompleted(uint64 taskId) external view returns (bool completed) {
        return taskCompleted[taskId];
    }

    /**
     * @dev Get the user who created a task
     * @param taskId The task ID
     * @return user The user address
     */

    function getTaskUser(uint64 taskId) external view returns (address user) {
        return taskToUser[taskId];
    }

    /**
     * @dev Get the original prompt for a task
     * @param taskId The task ID
     * @return prompt The original prompt
     */

    function getTaskPrompt(uint64 taskId) external view returns (string memory prompt) {
        return taskToPrompt[taskId];
    }

    /**
     * @dev Get the async precompile address
     * @return precompileAddress The address of the async precompile
     */

    function getAsyncPrecompileAddress() external pure returns (address precompileAddress) {
        return ASYNC_PRECOMPILE;
    }

    /**
     * @dev Create JSON string for Venice plugin with proper format
     * @param request The Venice request parameters
     * @return json The JSON string
     */

    function _createVeniceJSON(VeniceRequest memory request) internal pure returns (string memory json) {
        // Convert temperature and topP back to decimal representation
        string memory tempStr = _uint256ToDecimalString(request.temperature, 3);
        string memory topPStr = _uint256ToDecimalString(request.topP, 3);
        string memory maxTokensStr = _uint256ToString(request.maxTokens);
        
        // Construct JSON with max_completion_tokens (required!)
        json = string(abi.encodePacked(
            '{"model":"', request.model, '",',
            '"temperature":', tempStr, ',',
            '"top_p":', topPStr, ',',
            '"max_completion_tokens":', maxTokensStr, ',',
            '"message":"', request.message, '"}'
        ));
    }

    /**
     * @dev Convert uint256 to decimal string representation
     * @param value The value to convert
     * @param decimals The number of decimal places
     * @return str The decimal string
     */

    function _uint256ToDecimalString(uint256 value, uint256 decimals) internal pure returns (string memory str) {
        if (value == 0) {
            return "0.0";
        }
        
        uint256 divisor = 10 ** decimals;
        uint256 wholePart = value / divisor;
        uint256 fractionalPart = value % divisor;
        
        // Convert whole part to string
        string memory wholeStr = _uint256ToString(wholePart);
        
        // Convert fractional part to string with leading zeros
        string memory fractionalStr = _uint256ToString(fractionalPart);
        
        // Pad fractional part with leading zeros if necessary
        while (bytes(fractionalStr).length < decimals) {
            fractionalStr = string(abi.encodePacked("0", fractionalStr));
        }
        
        return string(abi.encodePacked(wholeStr, ".", fractionalStr));
    }

    /**
     * @dev Convert uint256 to string
     * @param value The value to convert
     * @return str The string representation
     */

    function _uint256ToString(uint256 value) internal pure returns (string memory str) {
        if (value == 0) {
            return "0";
        }
        
        uint256 temp = value;
        uint256 digits;
        
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        
        bytes memory buffer = new bytes(digits);
        
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        
        return string(buffer);
    }
}
```

## 2. Deploy

1.Deploy VenicePlugin contract:

```bash
forge create src/VenicePlugin.sol:VenicePlugin \
--rpc-url $RPC_URL \
--private-key $PRIVATE_KEY \
--broadcast
```

2.Note down the value returned as `Deployed to` and set it as an environment variable:

```bash
export CONTRACT_ADDRESS = <my-contract-address>
```

## Next steps

In the next part of the tutorial you will learn how to interact with your `venice ai` contract. Follow the next guide: [Interact with Venice AI](interact-with-venice).
