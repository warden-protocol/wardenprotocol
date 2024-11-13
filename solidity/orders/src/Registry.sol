// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

event Registered(address indexed creator, address indexed execution);

contract Registry {
    mapping(address executionAddress => address orderCreator) public executions;

    function register(address execution) public {
        executions[execution] = msg.sender;
        emit Registered(msg.sender, execution);
    }
}
