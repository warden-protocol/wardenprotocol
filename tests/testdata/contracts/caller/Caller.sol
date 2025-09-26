// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Caller {
    // Call another contract's function by address
    function callOtherContract(
        address _contract,
        bytes memory _data
    ) public returns (bytes memory) {
        (bool success, bytes memory result) = _contract.call(_data);
        require(success, "External call failed");
        return result;
    }
}
