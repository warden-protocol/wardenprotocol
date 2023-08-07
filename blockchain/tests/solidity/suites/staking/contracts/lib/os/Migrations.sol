// Brought from https://github.com/aragon/aragonOS/blob/v4.3.0/contracts/lib/misc/Migrations.sol
// Adapted to use pragma ^0.5.8 and satisfy our linter rules

pragma solidity ^0.5.8;


contract Migrations {
    address public owner;
    uint256 public lastCompletedMigration;

    modifier restricted() {
        if (msg.sender == owner) {
            _;
        }
    }

    constructor() public {
        owner = msg.sender;
    }

    function setCompleted(uint256 completed) public restricted {
        lastCompletedMigration = completed;
    }

    function upgrade(address newAddress) public restricted {
        Migrations upgraded = Migrations(newAddress);
        upgraded.setCompleted(lastCompletedMigration);
    }
}
