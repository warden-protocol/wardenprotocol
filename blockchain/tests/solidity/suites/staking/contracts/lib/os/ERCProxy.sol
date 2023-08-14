// Brought from https://github.com/aragon/aragonOS/blob/v4.3.0/contracts/lib/misc/ERCProxy.sol
// Adapted to use pragma ^0.5.17 and satisfy our linter rules

pragma solidity ^0.5.17;


contract ERCProxy {
    uint256 internal constant FORWARDING = 1;
    uint256 internal constant UPGRADEABLE = 2;

    function proxyType() public pure returns (uint256 proxyTypeId);
    function implementation() public view returns (address codeAddr);
}
