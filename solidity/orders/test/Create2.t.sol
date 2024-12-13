// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Test } from "forge-std/src/Test.sol";
import { Registry } from "../src/Registry.sol";
import { Create2 } from "../src/Create2.sol";

contract Create2Test is Test {
    Create2 internal create2;
    Registry internal registry;

    function setUp() public {
        create2 = new Create2();
        registry = new Registry();
    }

    function testDeterministicDeploy() public {
        vm.deal(address(0x1), 100 ether);

        vm.startPrank(address(0x1));
        bytes32 salt = "12345";
        bytes memory creationCode = abi.encodePacked(type(Registry).creationCode);

        address computedAddress = create2.computeAddress(salt, keccak256(creationCode));
        address deployedAddress = create2.deploy(salt, creationCode);
        vm.stopPrank();

        assertEq(computedAddress, deployedAddress);
    }
}
