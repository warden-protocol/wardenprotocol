// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Types } from "./types/Types.sol";

error BadNetwork();

event NewTx(address indexed account, Types.TransactionType indexed transactionType);

contract Logger {
    mapping(
        string network => mapping(address account => mapping(bytes32 txHash => Types.TransactionType transactionType))
    ) public interactions;

    function addInteraction(bytes32 txHash, string calldata network, Types.TransactionType transactionType) public {
        if (bytes(network).length == 0) {
            revert BadNetwork();
        }

        interactions[network][msg.sender][txHash] = transactionType;

        emit NewTx(msg.sender, transactionType);
    }
}
