pragma solidity >0.5.0;

contract TestChainID {
    function currentChainID() public view returns (uint) {
        uint id;
        assembly {
            id := chainid()
        }
        return id;
    }
}

