// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/src/Script.sol";
import "forge-std/src/console.sol";
import { StaticAggregationHookFactory } from "@hyperlane-xyz/contracts/hooks/aggregation/StaticAggregationHookFactory.sol";
import { TypeCasts } from "@hyperlane-xyz/contracts/libs/TypeCasts.sol";
import { ERC5164Ism } from "@hyperlane-xyz/contracts/isms/hook/ERC5164Ism.sol";
import { MessageExecutor } from "../src/MessageExecutor.sol";

contract SendMessageScript is Script {
    using TypeCasts for address;

    function run() external {
        // Start broadcasting to the network
        vm.startBroadcast();

        MessageExecutor messageExecutor = new MessageExecutor();
        ERC5164Ism ism = new ERC5164Ism(address(messageExecutor));
        messageExecutor.initialize(address(ism));
        

        console.log("Deployed messageExecutor:");
        console.logAddress(address(messageExecutor));
        console.log("Deployed ERC5164Ism:");
        console.logAddress(address(ism));

        vm.stopBroadcast();
    }
}