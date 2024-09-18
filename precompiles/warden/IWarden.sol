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
    /// @dev Defines a method for adding a new admin to keychain.
    /// @param keychainId The keychain id
    /// @param newAdmin The new admin's address
    /// @return adminsCount The new count of admins
    function addKeychainAdmin(
        uint64 keychainId,
        address newAdmin
    ) external returns (uint64 adminsCount);

    /// @dev AddKeychainAdmin defines an Event emitted when add a new admin to keychain.
    /// @param NewAdmin The address of the admin
    /// @param id The keychain id
    /// @param adminsCount The new count of admins
    event AddKeychainAdmin(address indexed NewAdmin, uint64 id, uint64 adminsCount);
}
