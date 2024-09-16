// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.18;

/// @dev The IAct contract's address.
address constant IACT_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000901; 

/// @dev The IAct contract's instance.
IAct constant IACT_CONTRACT = IAct(IACT_PRECOMPILE_ADDRESS);

/**
 * @author Act Team
 * @title x/act Interface
 * @dev The interface through which users and solidity contracts will interact with x/act.
 * @custom:address 0x0000000000000000000000000000000000000901
 */
interface IAct {
}
