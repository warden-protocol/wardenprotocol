// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { IExecution } from "./IExecution.sol";

error InvalidExecutionAddress();
error UnauthorizedToAddTx();
error TxAlreadyAdded();
error InvalidHash();
error NotExecuted();
error Executed();
error ExecutionAlreadyRegistered();

event Registered(address indexed creator, address indexed execution);

event NewTx(address indexed execution, bytes32 indexed txHash);

contract Registry is ReentrancyGuard {
    mapping(address executionAddress => address orderCreator) public executions;
    mapping(bytes32 txHash => bytes tx) public transactions;

    function register(address execution) public {
        if (execution == address(0)) {
            revert InvalidExecutionAddress();
        }

        if (executions[execution] != address(0)) {
            revert ExecutionAlreadyRegistered();
        }

        try IExecution(execution).isExecuted() returns (bool executed) {
            if (executed) {
                revert Executed();
            }
        } catch {
            revert InvalidExecutionAddress();
        }

        executions[execution] = msg.sender;
        emit Registered(msg.sender, execution);
    }

    function addTransaction(bytes32 txHash) public nonReentrant {
        if (executions[msg.sender] == address(0)) {
            revert UnauthorizedToAddTx();
        }

        if (txHash == bytes32(0)) {
            revert InvalidHash();
        }

        if (transactions[txHash].length != 0) {
            revert TxAlreadyAdded();
        }

        IExecution execution = IExecution(msg.sender);

        try execution.isExecuted() returns (bool executed) {
            if (!executed) {
                revert NotExecuted();
            }
        } catch {
            revert InvalidExecutionAddress();
        }

        transactions[txHash] = execution.getTx();

        emit NewTx(msg.sender, txHash);
    }
}
