// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Test } from "forge-std/src/Test.sol";
import { Pack } from "../src/lib/Pack.sol";
import { Instruction, Call } from "../src/types/IExecutionV1.sol";

contract PackTest is Test {
    function test_SingleCallInstructionPackSimpleTransfer() public pure {
        // arrange
        address testAddress = 0x9694DCC03b9BF9006F45d0E149050C13D05A90cf;
        Call[] memory calls = new Call[](1);
        calls[0] = Call(testAddress, hex"", 1);
        Instruction memory instruction = Instruction(calls, 11_155_111);

        uint256 expectedPackedLength = 164;
        bytes memory expectedPacked =
        // solhint-disable-next-line max-line-length
        hex"e9ae5c530000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000349694dcc03b9bf9006f45d0e149050c13d05a90cf0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000";

        // act
        bytes memory packed = Pack.packInstructions(instruction);

        // assert
        assertEq(packed, expectedPacked, "Packed call data should match expected packed data");
        assertEq(packed.length, expectedPackedLength, "Packed call data should be 164 bytes");
    }

    function test_SingleCallInstructionPackErc20Transfer() public pure {
        // arrange
        address testAddress = 0x9694DCC03b9BF9006F45d0E149050C13D05A90cf;
        Call[] memory calls = new Call[](1);
        calls[0] = Call(
            testAddress,
            // solhint-disable-next-line max-line-length
            hex"a9059cbb00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a7640000",
            1000
        );
        Instruction memory instruction = Instruction(calls, 11_155_111);

        uint256 expectedPackedLength = 228;

        bytes memory expectedPacked =
        // solhint-disable-next-line max-line-length
        hex"e9ae5c530000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000789694dcc03b9bf9006f45d0e149050c13d05a90cf00000000000000000000000000000000000000000000000000000000000003e8a9059cbb00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000";

        // act
        bytes memory packed = Pack.packInstructions(instruction);

        // assert
        assertEq(packed, expectedPacked, "Packed call data should match expected packed data");
        assertEq(packed.length, expectedPackedLength, "Packed call data should be 228 bytes");
    }
}
