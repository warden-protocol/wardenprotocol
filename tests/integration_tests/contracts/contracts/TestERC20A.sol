pragma solidity 0.8.10;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20A is ERC20 {

constructor() public ERC20("TestERC20", "Test") {
_mint(msg.sender, 100000000000000000000000000);
}
}
