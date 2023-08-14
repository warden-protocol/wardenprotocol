pragma solidity 0.4.24;

import "./DelegateProxy.sol";
import "./DepositableStorage.sol";


contract DepositableDelegateProxy is DepositableStorage, DelegateProxy {
    event ProxyDeposit(address sender, uint256 value);

    function () external payable {
        uint256 forwardGasThreshold = FWD_GAS_LIMIT;
        bytes32 isDepositablePosition = DEPOSITABLE_POSITION;

        // Optimized assembly implementation to prevent EIP-1884 from breaking deposits, reference code in Solidity:
        // https://github.com/aragon/aragonOS/blob/v4.2.1/contracts/common/DepositableDelegateProxy.sol#L10-L20
        assembly {
            // Continue only if the gas left is lower than the threshold for forwarding to the implementation code,
            // otherwise continue outside of the assembly block.
            if lt(gas, forwardGasThreshold) {
                // Only accept the deposit and emit an event if all of the following are true:
                // the proxy accepts deposits (isDepositable), msg.data.length == 0, and msg.value > 0
                if and(and(sload(isDepositablePosition), iszero(calldatasize)), gt(callvalue, 0)) {
                    // Equivalent Solidity code for emitting the event:
                    // emit ProxyDeposit(msg.sender, msg.value);

                    let logData := mload(0x40) // free memory pointer
                    mstore(logData, caller) // add 'msg.sender' to the log data (first event param)
                    mstore(add(logData, 0x20), callvalue) // add 'msg.value' to the log data (second event param)

                    // Emit an event with one topic to identify the event: keccak256('ProxyDeposit(address,uint256)') = 0x15ee...dee1
                    log1(logData, 0x40, 0x15eeaa57c7bd188c1388020bcadc2c436ec60d647d36ef5b9eb3c742217ddee1)

                    stop() // Stop. Exits execution context
                }

                // If any of above checks failed, revert the execution (if ETH was sent, it is returned to the sender)
                revert(0, 0)
            }
        }

        address target = implementation();
        delegatedFwd(target, msg.data);
    }
}
