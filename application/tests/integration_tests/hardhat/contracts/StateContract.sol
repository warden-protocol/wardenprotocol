// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StateContract {
    address payable private owner;
    uint256 storedData;

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "tx sender is not contract owner");
        _;
    }

    function add(uint256 a, uint256 b) public returns (uint256) {
        storedData = a + b;
        return storedData;
    }

    function get() public view returns (uint256) {
        return storedData;
    }

    function destruct() public onlyOwner {
        selfdestruct(owner);
    }
}