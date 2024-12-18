// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Create2 } from "../src/Create2.sol";
import { Script } from "forge-std/src/Script.sol";
import { Registry } from "../src/Registry.sol";
import { OrderFactory } from "../src/OrderFactory.sol";

contract Deploy is Script {
    address internal broadcaster;
    address internal scheduler;
    address internal factoryOwner;
    address internal create2Address;
    address internal registryAddress;

    error InvalidScheduler();
    error InvalidFactory();
    error AddressMismatch(string name);

    constructor() {
        (broadcaster,) = deriveRememberKey({ mnemonic: vm.envString("MNEMONIC"), index: 0 });
        scheduler = vm.envAddress("SCHEDULER_ADDRESS");
        factoryOwner = vm.envAddress("FACTORY_OWNER_ADDRESS");
        create2Address = vm.envOr("CREATE2_ADDRESS", address(0));
        registryAddress = vm.envOr("REGISTRY_ADDRESS", address(0));

        if (scheduler == address(0)) revert InvalidScheduler();
        if (factoryOwner == address(0)) revert InvalidFactory();
    }

    function run() external {
        vm.startBroadcast(broadcaster);

        bytes11 registrySaltValue = bytes11(vm.envOr("REGISTRY_SALT", bytes11(uint88(1001))));
        bytes11 factorySaltValue = bytes11(vm.envOr("FACTORY_SALT", bytes11(uint88(1002))));

        if (registryAddress == address(0)) {
            bytes32 registrySalt = bytes32(abi.encodePacked(broadcaster, hex"00", registrySaltValue));
            bytes memory registryInitCode = type(Registry).creationCode;

            registryAddress = deployWithCreate2(registrySalt, registryInitCode, "Registry");
        }

        bytes32 factorySalt = bytes32(abi.encodePacked(broadcaster, hex"00", factorySaltValue));
        bytes memory factoryInitCode =
            abi.encodePacked(type(OrderFactory).creationCode, abi.encode(registryAddress, scheduler, factoryOwner));

        address factoryAddress = deployWithCreate2(factorySalt, factoryInitCode, "OrderFactory");

        vm.stopBroadcast();

        string memory output = "output";
        string memory registryK = "registry";
        string memory factoryK = "orderFactory";
        vm.serializeString(output, registryK, vm.toString(registryAddress));
        string memory o2 = vm.serializeString(output, factoryK, vm.toString(factoryAddress));
        string memory chainId =vm.envString('CHAIN_ID');
        string memory path = string.concat('./broadcast/Deploy.s.sol/', chainId, '/latest.json');
        vm.writeJson(o2, path);
    }

    function deployWithCreate2(bytes32 salt, bytes memory initCode, string memory name) internal returns (address) {
        Create2 create2;
        if (create2Address == address(0)) {
            create2 = new Create2();
            create2Address = address(create2);
        } else {
            create2 = Create2(create2Address);
        }

        bytes32 initCodeHash = keccak256(initCode);

        address computedAddress = create2.computeAddress(salt, initCodeHash);
        address deployedAddress = create2.deploy(salt, initCode);

        if (computedAddress != deployedAddress) revert AddressMismatch(name);

        return deployedAddress;
    }
}
