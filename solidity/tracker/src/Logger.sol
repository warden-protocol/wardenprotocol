// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Types } from "./types/Types.sol";

error BadNetwork();

event NewTx(address indexed account, bytes32 indexed txHash, Types.TransactionType indexed transactionType);

contract Logger {
    mapping(
        string network => mapping(address account => mapping(bytes32 txHash => Types.TransactionType transactionType))
    ) public interactions;

    mapping(
        string network
            => mapping(address account => mapping(Types.TransactionType transactionType => uint64 interactionCount))
    ) public interactionsCounters;

    function addInteraction(bytes32 txHash, string calldata network, Types.TransactionType transactionType) public {
        if (bytes(network).length == 0) {
            revert BadNetwork();
        }

        // Increment the interaction count for the network and account
        if (interactionsCounters[network][msg.sender][transactionType] == 0) {
            interactionsCounters[network][msg.sender][transactionType] = 1;
        } else {
            interactionsCounters[network][msg.sender][transactionType]++;
        }

        interactions[network][msg.sender][txHash] = transactionType;

        emit NewTx(msg.sender, txHash, transactionType);
    }
}
