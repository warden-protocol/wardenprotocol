// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25 <0.9.0;

import { Instruction } from "../types/IExecutionV1.sol";

library Pack {
    // Define mode and execution type constants
    bytes1 public constant CALLTYPE_SINGLE = 0x00; // 1 byte
    bytes1 public constant CALLTYPE_BATCH = 0x01; // 1 byte
    bytes1 public constant EXECTYPE_DEFAULT = 0x00; // 1 byte
    bytes1 public constant EXECTYPE_TRY = 0x01; // 1 byte
    bytes1 public constant EXECTYPE_DELEGATE = 0xFF; // 1 byte
    bytes4 public constant MODE_DEFAULT = 0x00000000; // 4 bytes
    bytes4 public constant UNUSED = 0x00000000; // 4 bytes
    bytes22 public constant MODE_PAYLOAD = 0x00000000000000000000000000000000000000000000; // 22 bytes

    bytes32 public constant EXECUTE_SINGLE =
        bytes32(abi.encodePacked(CALLTYPE_SINGLE, EXECTYPE_DEFAULT, MODE_DEFAULT, UNUSED, MODE_PAYLOAD));

    bytes32 public constant EXECUTE_BATCH =
        bytes32(abi.encodePacked(CALLTYPE_BATCH, EXECTYPE_DEFAULT, MODE_DEFAULT, UNUSED, MODE_PAYLOAD));

    function packInstructions(Instruction memory instructions) internal pure returns (bytes memory) {
        if (instructions.calls.length > 1) {
            bytes memory executionCalldata;

            for (uint256 i = 0; i < instructions.calls.length; i++) {
                executionCalldata = abi.encodePacked(
                    executionCalldata,
                    abi.encode(
                        instructions.calls[i].to,
                        instructions.calls[i].value,
                        instructions.calls[i].data.length > 0 ? instructions.calls[i].data : bytes(hex"")
                    )
                );
            }

            return abi.encodeWithSignature("execute(bytes32,bytes)", EXECUTE_BATCH, executionCalldata);
        } else {
            bytes memory executionCalldata = abi.encodePacked(
                instructions.calls[0].to,
                instructions.calls[0].value,
                instructions.calls[0].data.length > 0 ? instructions.calls[0].data : bytes(hex"")
            );

            return abi.encodeWithSignature("execute(bytes32,bytes)", EXECUTE_SINGLE, executionCalldata);
        }
    }
}
