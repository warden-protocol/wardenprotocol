// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { Types } from "./types/Types.sol";

error BadNetwork();

event NewTx(address indexed account, Types.TransactionType indexed transactionType);

contract Logger is ReentrancyGuard {
    mapping(
        string network => mapping(address account => mapping(bytes32 txHash => Types.TransactionType transactionType))
    ) public interactions;

    function addInteraction(
        bytes32 txHash,
        string calldata network,
        Types.TransactionType transactionType
    )
        public
        nonReentrant
    {
        if (bytes(network).length == 0) {
            revert BadNetwork();
        }

        interactions[network][msg.sender][txHash] = transactionType;

        emit NewTx(msg.sender, transactionType);
    }

    function getInteraction(
        string calldata network,
        address account,
        bytes32 txHash
    )
        public
        view
        returns (Types.TransactionType)
    {
        return interactions[network][account][txHash];
    }
}
