pragma solidity >0.5.0;

contract BurnGas {
    int[] expensive;

    function burnGas(uint256 count) public {
        for (uint i = 0; i < count; i++) {
            unchecked {
                expensive.push(10);
            }
        }
    }
}
