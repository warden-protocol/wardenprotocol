// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

struct ExecutionData {
    address caller;
    address to;
    uint256 chainId;
    bytes data;
    uint256 value;
}

interface IExecution {
    function canExecute() external view returns (bool);

    function execute(
        uint256 nonce,
        uint256 gas,
        uint256 gasPrice,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas) external returns (bool);

    function calledByScheduler() external returns (bool);

    function calledByAIService() external returns (bool);

    function setByAIService(bytes calldata data) external returns (bool);

    function isExecuted() external returns (bool);

    function executionData() external returns (ExecutionData calldata executionData);
}