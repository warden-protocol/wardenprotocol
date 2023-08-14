// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

contract TestRevert {
    // 0x9ffb86a5
    function revertWithMsg() public pure {
        revert("Function has been reverted");
    }

    // 0x3246485d
    function revertWithoutMsg() public pure {
        revert();
    }
}
