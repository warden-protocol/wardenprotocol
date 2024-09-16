// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.18;

/// @dev The IWarden contract's address.
address constant IWARDEN_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000900; 

/// @dev The IWarden contract's instance.
IWarden constant IWARDEN_CONTRACT = IWarden(IWARDEN_PRECOMPILE_ADDRESS);

/**
 * @author Warden Team
 * @title x/warden Interface
 * @dev The interface through which users and solidity contracts will interact with x/warden.
 * @custom:address 0x0000000000000000000000000000000000000900
 */
interface IWarden {
}
