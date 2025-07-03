// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Types } from "./types/Types.sol";

error BadNetwork();
error BadTransactionType();
error DuplicatedTransaction();

event NewTx(address indexed account, bytes32 indexed txHash, Types.TransactionType indexed transactionType);

contract Logger {
    mapping(
        string network => mapping(address account => mapping(bytes32 txHash => Types.TransactionType transactionType))
    ) public interactions;

    mapping(address account => mapping(Types.TransactionType transactionType => uint256 interactionCount)) public
        interactionsCounters;

    function addInteraction(bytes32 txHash, string calldata network, Types.TransactionType transactionType) public {
        if (bytes(network).length == 0) {
            revert BadNetwork();
        }

        if (transactionType == Types.TransactionType.Undefined) {
            revert BadTransactionType();
        }

        if (interactions[network][msg.sender][txHash] != Types.TransactionType.Undefined) {
            revert DuplicatedTransaction();
        }

        uint256 currentCount = interactionsCounters[msg.sender][transactionType];
        interactionsCounters[msg.sender][transactionType] = currentCount + 1;
        interactions[network][msg.sender][txHash] = transactionType;

        emit NewTx(msg.sender, txHash, transactionType);
    }
}
