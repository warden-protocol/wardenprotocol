// Brought from https://github.com/aragon/aragonOS/blob/v4.3.0/contracts/common/Autopetrified.sol
// Adapted to use pragma ^0.5.17 and satisfy our linter rules

pragma solidity ^0.5.17;

import "./Petrifiable.sol";


contract Autopetrified is Petrifiable {
    constructor() public {
        // Immediately petrify base (non-proxy) instances of inherited contracts on deploy.
        // This renders them uninitializable (and unusable without a proxy).
        petrify();
    }
}
