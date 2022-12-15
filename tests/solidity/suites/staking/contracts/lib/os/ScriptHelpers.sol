// Brought from https://github.com/aragon/aragonOS/blob/v4.3.0/contracts/evmscript/ScriptHelpers.sol
// Adapted to use pragma ^0.5.17 and satisfy our linter rules

pragma solidity ^0.5.17;


library ScriptHelpers {
    function getSpecId(bytes memory _script) internal pure returns (uint32) {
        return uint32At(_script, 0);
    }

    function uint256At(bytes memory _data, uint256 _location) internal pure returns (uint256 result) {
        assembly {
            result := mload(add(_data, add(0x20, _location)))
        }
    }

    function addressAt(bytes memory _data, uint256 _location) internal pure returns (address result) {
        uint256 word = uint256At(_data, _location);

        assembly {
            result := div(and(word, 0xffffffffffffffffffffffffffffffffffffffff000000000000000000000000),
            0x1000000000000000000000000)
        }
    }

    function uint32At(bytes memory _data, uint256 _location) internal pure returns (uint32 result) {
        uint256 word = uint256At(_data, _location);

        assembly {
            result := div(and(word, 0xffffffff00000000000000000000000000000000000000000000000000000000),
            0x100000000000000000000000000000000000000000000000000000000)
        }
    }

    function locationOf(bytes memory _data, uint256 _location) internal pure returns (uint256 result) {
        assembly {
            result := add(_data, add(0x20, _location))
        }
    }

    function toBytes(bytes4 _sig) internal pure returns (bytes memory) {
        bytes memory payload = new bytes(4);
        assembly { mstore(add(payload, 0x20), _sig) }
        return payload;
    }
}
