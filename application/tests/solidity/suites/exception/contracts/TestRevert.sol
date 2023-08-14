// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract State {
    uint256 a = 0;
    function set(uint256 input) public { 
        a = input; 
        require(a < 10);
    }
    function force_set(uint256 input) public { 
        a = input; 
    }
    function query() public view returns(uint256) {
        return a;
    }
}

contract TestRevert {
    State state;
    uint256 b = 0;
    uint256 c = 0;
    constructor() {
        state = new State();
    }
    function try_set(uint256 input) public {
        b = input;
        try state.set(input) {
        } catch (bytes memory) {
        }
        c = input;
    }
    function set(uint256 input) public {
        state.force_set(input);
    }
    function query_a() public view returns(uint256) {
        return state.query();
    }
    function query_b() public view returns(uint256) {
        return b;
    }
    function query_c() public view returns(uint256) {
        return c;
    }
}
