pragma solidity 0.4.24;

import "../Initializable.sol";
import "../Petrifiable.sol";


contract LifecycleMock is Initializable, Petrifiable {
    function initializeMock() public {
        initialized();
    }

    function petrifyMock() public {
        petrify();
    }
}
