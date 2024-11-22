// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Script } from "forge-std/src/Script.sol";
import { Registry } from "../src/Registry.sol";
import { OrderFactory } from "../src/OrderFactory.sol";

contract Deploy is Script {
    address internal broadcaster;
    address internal scheduler;
    address internal factoryOwner;
    address internal registryAddress;

    constructor() {
        (broadcaster,) = deriveRememberKey({ mnemonic: vm.envString("MNEMONIC"), index: 0 });
        scheduler = vm.envAddress("SCHEDULER_ADDRESS");
        factoryOwner = vm.envAddress("FACTORY_OWNER_ADDRESS");
        registryAddress = vm.envOr("REGISTRY_ADDRESS", address(0));
        require(scheduler != address(0), "Invalid scheduler address");  
        require(factoryOwner != address(0), "Invalid factory owner address");  
    }

    function run() external {
        vm.startBroadcast(broadcaster);

        Registry registry;
        if (registryAddress == address(0)) {
            registry = new Registry();
        } else {
            registry = Registry(registryAddress);
        }
        new OrderFactory(address(registry), scheduler, factoryOwner);

        vm.stopBroadcast();
    }
}
