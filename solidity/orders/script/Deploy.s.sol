// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Create2 } from "../src/Create2.sol";
import { Script } from "forge-std/src/Script.sol";
import { Registry } from "../src/Registry.sol";
import { OrderFactory } from "../src/OrderFactory.sol";

contract Deploy is Script {
    Create2 internal create2;
    address internal broadcaster;
    address internal scheduler;
    address internal factoryOwner;
    address internal registryAddress;

    error InvalidScheduler();
    error InvalidFactory();
    error RegistryAddressMismatch();
    error FactoryAddressMismatch();

    constructor() {
        (broadcaster,) = deriveRememberKey({ mnemonic: vm.envString("MNEMONIC"), index: 0 });
        scheduler = vm.envAddress("SCHEDULER_ADDRESS");
        factoryOwner = vm.envAddress("FACTORY_OWNER_ADDRESS");
        registryAddress = vm.envOr("REGISTRY_ADDRESS", address(0));

        if (scheduler == address(0)) revert InvalidScheduler();
        if (factoryOwner == address(0)) revert InvalidFactory();
    }

    function run() external {
        vm.startBroadcast(broadcaster);

        create2 = new Create2();

        if (registryAddress == address(0)) {
            bytes32 registrySalt = bytes32(abi.encodePacked(broadcaster, hex"00", bytes11(uint88(1001))));

            bytes memory registryInitCode = type(Registry).creationCode;
            bytes32 registryInitCodeHash = keccak256(registryInitCode);

            address computedRegistryAddress = create2.computeAddress(registrySalt, registryInitCodeHash);

            address deployedRegistryAddress = create2.deploy(registrySalt, registryInitCode);

            if (computedRegistryAddress != deployedRegistryAddress) revert RegistryAddressMismatch();

            registryAddress = deployedRegistryAddress;
        }

        bytes32 factorySalt = bytes32(abi.encodePacked(broadcaster, hex"00", bytes11(uint88(1002))));

        bytes memory factoryInitCode =
            abi.encodePacked(type(OrderFactory).creationCode, abi.encode(registryAddress, scheduler, factoryOwner));
        bytes32 factoryInitCodeHash = keccak256(factoryInitCode);

        address computedFactoryAddress = create2.computeAddress(factorySalt, factoryInitCodeHash);

        address deployedFactoryAddress = create2.deploy(factorySalt, factoryInitCode);

        if (computedFactoryAddress != deployedFactoryAddress) revert FactoryAddressMismatch();

        vm.stopBroadcast();
    }
}
