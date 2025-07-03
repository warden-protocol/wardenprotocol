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
        emit NewTx(address(this), txHash, transactionType);

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

    function test_InteractionCount() public {
        bytes32 txHash1 = keccak256(abi.encodePacked("testHash1"));
        bytes32 txHash2 = keccak256(abi.encodePacked("testHash2"));
        string memory network = "testNetwork";
        Types.TransactionType transactionType = Types.TransactionType.Swap;

        logger.addInteraction(txHash1, network, transactionType);
        logger.addInteraction(txHash2, network, transactionType);

        uint64 count = logger.interactionsCounters(address(this), transactionType);
        assertEq(count, 2);
    }

    function test_InteractionCountWithDifferentTypes() public {
        bytes32 txHash1 = keccak256(abi.encodePacked("testHash1"));
        bytes32 txHash2 = keccak256(abi.encodePacked("testHash2"));
        string memory network = "testNetwork";
        Types.TransactionType transactionType1 = Types.TransactionType.Swap;
        Types.TransactionType transactionType2 = Types.TransactionType.Transfer;

        logger.addInteraction(txHash1, network, transactionType1);
        logger.addInteraction(txHash2, network, transactionType2);

        uint64 countSwap = logger.interactionsCounters(address(this), transactionType1);
        uint64 countTransfer = logger.interactionsCounters(address(this), transactionType2);

        assertEq(countSwap, 1);
        assertEq(countTransfer, 1);
    }

    function test_InteractionCountWithNoInteractions() public view {
        Types.TransactionType transactionType = Types.TransactionType.Other;

        uint64 count = logger.interactionsCounters(address(this), transactionType);
        assertEq(count, 0);
    }
}
