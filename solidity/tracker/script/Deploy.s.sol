// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Create2 } from "../src/lib/Create2.sol";
import { Script } from "forge-std/src/Script.sol";
import { Logger } from "../src/Logger.sol";

contract Deploy is Script {
    address internal broadcaster;
    address internal create2Address;
    address internal loggerAddress;

    error InvalidScheduler();
    error InvalidFactory();
    error AddressMismatch(string name);

    constructor() {
        (broadcaster,) = deriveRememberKey({ mnemonic: vm.envString("MNEMONIC"), index: 0 });
        create2Address = vm.envOr("CREATE2_ADDRESS", address(0));
        loggerAddress = vm.envOr("LOGGER_ADDRESS", address(0));
    }

    function run() external {
        vm.startBroadcast(broadcaster);

        bytes11 registrySaltValue = bytes11(vm.envOr("LOGGER_SALT", bytes11(uint88(1001))));

        if (loggerAddress == address(0)) {
            bytes32 loggerSalt = bytes32(abi.encodePacked(broadcaster, hex"00", registrySaltValue));
            bytes memory loggerInitCode = type(Logger).creationCode;

            loggerAddress = deployWithCreate2(loggerSalt, loggerInitCode, "Logger");
        }

        vm.stopBroadcast();

        string memory chainId = vm.envString("CHAIN_ID");
        string memory output = "output";
        string memory loggerK = "logger";
        string memory out = vm.serializeString(output, loggerK, vm.toString(loggerAddress));
        string memory path = string.concat("./broadcast/Deploy.s.sol/", chainId, "/latest.json");
        vm.writeJson(out, path);
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
