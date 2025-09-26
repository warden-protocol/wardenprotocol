// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

// From https://book.getfoundry.sh/tutorials/create2-tutorial
contract Create2 {
    error Create2EmptyBytecode();

    error Create2FailedDeployment();

    function deploy(bytes32 salt, bytes memory creationCode) external payable returns (address addr) {
        if (creationCode.length == 0) {
            revert Create2EmptyBytecode();
        }

        // solhint-disable-next-line
        assembly {
            addr := create2(callvalue(), add(creationCode, 0x20), mload(creationCode), salt)
        }

        if (addr == address(0)) {
            revert Create2FailedDeployment();
        }
    }

    function computeAddress(bytes32 salt, bytes32 creationCodeHash) external view returns (address addr) {
        address contractAddress = address(this);

        // solhint-disable-next-line
        assembly {
            let ptr := mload(0x40)

            mstore(add(ptr, 0x40), creationCodeHash)
            mstore(add(ptr, 0x20), salt)
            mstore(ptr, contractAddress)
            let start := add(ptr, 0x0b)
            mstore8(start, 0xff)
            addr := keccak256(start, 85)
        }
    }
}
