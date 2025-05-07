// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Test } from "forge-std/src/Test.sol";
import { Create2 } from "../src/lib/Create2.sol";
import { Registry } from "../src/Registry.sol";
import { OrderFactory } from "../src/factories/OrderFactory.sol";

contract Create2Test is Test {
    Create2 internal create2;

    function setUp() public {
        create2 = new Create2();
    }

    function testDeterministicDeploy() public {
        vm.deal(address(0x1), 100 ether);

        vm.startPrank(address(0x1));
        bytes32 salt = "12345";
        bytes32 wrongSalt = "123456";
        bytes memory creationCode = abi.encodePacked(type(Registry).creationCode);

        address computedAddress = create2.computeAddress(salt, keccak256(creationCode));
        address wrongComputedAddress = create2.computeAddress(wrongSalt, keccak256(creationCode));
        address deployedAddress = create2.deploy(salt, creationCode);
        vm.stopPrank();

        assertEq(computedAddress, deployedAddress);
        assertNotEq(wrongComputedAddress, deployedAddress);
    }

    function testDeterministicDeployWithConstructorArgs() public {
        vm.deal(address(0x1), 100 ether);

        vm.startPrank(address(0x1));
        bytes32 salt = "12345";
        bytes memory creationCode = abi.encodePacked(
            type(OrderFactory).creationCode,
            abi.encode(address(0x2), address(0x3), address(0x4), address(0x6), address(0x7))
        );
        bytes memory wrongCreationCode = abi.encodePacked(
            type(OrderFactory).creationCode,
            abi.encode(address(0x5), address(0x3), address(0x4), address(0x6), address(0x7))
        );

        address computedAddress = create2.computeAddress(salt, keccak256(creationCode));
        address wrongComputedAddress = create2.computeAddress(salt, keccak256(wrongCreationCode));
        address deployedAddress = create2.deploy(salt, creationCode);
        vm.stopPrank();

        assertEq(computedAddress, deployedAddress);
        assertNotEq(wrongComputedAddress, deployedAddress);
    }
}
