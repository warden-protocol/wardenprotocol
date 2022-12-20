pragma solidity >0.5.0;

contract Greeter {
    string public greeting;

    event ChangeGreeting(address from, string value);

    constructor() public {
        greeting = "Hello";
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
        emit ChangeGreeting(msg.sender, _greeting);
    }

    function greet() public view returns (string memory) {
        return greeting;
    }
}
