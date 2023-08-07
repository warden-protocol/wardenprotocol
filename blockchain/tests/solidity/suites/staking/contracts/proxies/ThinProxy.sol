pragma solidity ^0.5.17;

import "../lib/os/DelegateProxy.sol";
import "../lib/os/UnstructuredStorage.sol";


contract ThinProxy is DelegateProxy {
    using UnstructuredStorage for bytes32;

    constructor(address _implementation) public {
        _implementationSlot().setStorageAddress(_implementation);
    }

    function () external {
        delegatedFwd(implementation(), msg.data);
    }

    function proxyType() public pure returns (uint256) {
        return FORWARDING;
    }

    function implementation() public view returns (address) {
        return _implementationSlot().getStorageAddress();
    }

    function _implementationSlot() internal pure returns (bytes32);
}
