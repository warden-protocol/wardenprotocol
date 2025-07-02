// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Test } from "forge-std/src/Test.sol";
import { Logger, BadNetwork, NewTx } from "../src/Logger.sol";
import { Types } from "../src/types/Types.sol";

contract LoggerTest is Test {
    Logger private logger;

    function setUp() public {
        logger = new Logger();
    }

    function test_AddInteraction() public {
        bytes32 txHash = keccak256(abi.encodePacked("testHash"));
        string memory network = "testNetwork";
        Types.TransactionType transactionType = Types.TransactionType.Transfer;

        logger.addInteraction(txHash, network, transactionType);

        Types.TransactionType transactionTypeOutput = logger.interactions(network, address(this), txHash);
        assertEq(uint256(transactionTypeOutput), uint256(transactionType));
    }

    function test_AddInteractionRevertsWithEmptyNetwork() public {
        bytes32 txHash = keccak256(abi.encodePacked("testHash"));
        string memory network = "";
        Types.TransactionType transactionType = Types.TransactionType.Transfer;

        vm.expectRevert(BadNetwork.selector);
        logger.addInteraction(txHash, network, transactionType);
    }

    function test_AddInteractionEmitsEvent() public {
        bytes32 txHash = keccak256(abi.encodePacked("testHash"));
        string memory network = "testNetwork";
        Types.TransactionType transactionType = Types.TransactionType.Transfer;

        vm.expectEmit(true, true, false, false);
        emit NewTx(address(this), transactionType);

        logger.addInteraction(txHash, network, transactionType);
    }

    function test_GetInteraction() public {
        bytes32 txHash = keccak256(abi.encodePacked("testHash"));
        string memory network = "testNetwork";
        Types.TransactionType transactionType = Types.TransactionType.Other;
        logger.addInteraction(txHash, network, transactionType);

        // Retrieve interaction
        Types.TransactionType retrievedTransactionType = logger.interactions(network, address(this), txHash);

        // Assert that the retrieved interaction matches the added interaction
        assertEq(uint256(retrievedTransactionType), uint256(transactionType));
    }
}
