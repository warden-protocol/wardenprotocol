// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

interface IExecution {
    function canExecute() external view returns (bool);

    function execute(
        uint256 nonce,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas,
        uint256 chainId,
        uint256 value) external returns (bool);

    function calledByScheduler() external view returns (bool);

    function calledByAIService() external view returns (bool);

    function setByAIService(bytes calldata data) external returns (bool);
}