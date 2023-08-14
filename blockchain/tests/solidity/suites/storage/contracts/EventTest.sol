// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract EventTest {

    uint256 number;

    event ValueStored1(
        uint value1
    );
    event ValueStored2(
        string msg,
        uint value1
    );
    event ValueStored3(
        string msg,
        uint indexed value1,
        uint value2
    );

    function store(uint256 num) public {
        number = num;
    }

    function storeWithEvent(uint256 num) public {
        number = num;
        emit ValueStored1(num);
        emit ValueStored2("TestMsg", num);
        emit ValueStored3("TestMsg", num, num);
    }

}