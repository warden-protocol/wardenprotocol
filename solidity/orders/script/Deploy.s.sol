// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Script } from "forge-std/src/Script.sol";
import { Registry } from "../src/Registry.sol";
import { OrderFactory } from "../src/OrderFactory.sol";
import { Create2 } from "@openzeppelin/contracts/utils/Create2.sol";

contract Deploy is Script {
    address internal broadcaster;
    address internal scheduler;
    address internal factoryOwner;
    address internal registryAddress;

    bytes32 internal registrySalt;
    bytes32 internal orderFactorySalt;

    error InvalidScheduler();
    error InvalidFactory();

    constructor() {
        (broadcaster,) = deriveRememberKey({ mnemonic: vm.envString("MNEMONIC"), index: 0 });
        scheduler = vm.envAddress("SCHEDULER_ADDRESS");
        factoryOwner = vm.envAddress("FACTORY_OWNER_ADDRESS");
        registryAddress = vm.envOr("REGISTRY_ADDRESS", address(0));

        if (scheduler == address(0)) revert InvalidScheduler();
        if (factoryOwner == address(0)) revert InvalidFactory();

        registrySalt = keccak256(abi.encodePacked(vm.envOr("REGISTRY_SALT", string("DEFAULT_REGISTRY_SALT"))));
        orderFactorySalt = keccak256(abi.encodePacked(vm.envOr("FACTORY_SALT", string("DEFAULT_FACTORY_SALT"))));
    }

    function run() external {
        vm.startBroadcast(broadcaster);

        if (registryAddress == address(0)) {
            bytes memory registryBytecode = type(Registry).creationCode;
            address deployedRegistry = Create2.deploy(0, registrySalt, registryBytecode);
            registryAddress = deployedRegistry;
        }

        bytes memory orderFactoryBytecode =
            abi.encodePacked(type(OrderFactory).creationCode, abi.encode(registryAddress, scheduler, factoryOwner));
        Create2.deploy(0, orderFactorySalt, orderFactoryBytecode);

        vm.stopBroadcast();
    }
}
