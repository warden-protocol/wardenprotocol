pragma solidity ^0.5.17;

import "../lib/os/ERC20.sol";

import "../Staking.sol";
import "./ThinProxy.sol";


contract StakingProxy is ThinProxy {
    // keccak256("aragon.network.staking")
    bytes32 internal constant IMPLEMENTATION_SLOT = 0xbd536e2e005accda865e2f0d1827f83ec8824f3ea04ecd6131b7c10058635814;

    constructor(Staking _implementation, ERC20 _token) ThinProxy(address(_implementation)) public {
        bytes4 selector = _implementation.initialize.selector;
        bytes memory initializeData = abi.encodeWithSelector(selector, _token);
        (bool success,) = address(_implementation).delegatecall(initializeData);

        if (!success) {
            assembly {
                let output := mload(0x40)
                mstore(0x40, add(output, returndatasize))
                returndatacopy(output, 0, returndatasize)
                revert(output, returndatasize)
            }
        }
    }

    function _implementationSlot() internal pure returns (bytes32) {
        return IMPLEMENTATION_SLOT;
    }
}
