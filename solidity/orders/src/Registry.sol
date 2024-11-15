// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { IExecution } from "./IExecution.sol";

error InvalidExecutionAddress();
error UnathorizedToAddTx();
error TxAlreadyAdded();
error InvalidHash();
error NotExecuted();

event Registered(address indexed creator, address indexed execution);

event NewTx(address indexed execution, bytes32 indexed txHash);

contract Registry {
    mapping(address executionAddress => address orderCreator) public executions;
    mapping(bytes32 txHash => bytes tx) public transactions;

    function register(address execution) public {
        if (execution == address(0)) {
            revert InvalidExecutionAddress();
        }
        executions[execution] = msg.sender;
        emit Registered(msg.sender, execution);
    }

    function addTransaction(bytes32 txHash) public {
        if (executions[msg.sender] == address(0)) {
            revert UnathorizedToAddTx();
        }

        if (txHash == bytes32(0)) {
            revert InvalidHash();
        }

        if (transactions[txHash].length != 0) {
            revert TxAlreadyAdded();
        }

        IExecution execution = IExecution(msg.sender);

        if (!execution.isExecuted()) {
            revert NotExecuted();
        }

        transactions[txHash] = execution.getTx();

        emit NewTx(msg.sender, txHash);
    }
}
