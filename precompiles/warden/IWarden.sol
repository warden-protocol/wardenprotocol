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
    /// @return success If execution was successful
    function addKeychainAdmin(
        uint64 keychainId,
        address newAdmin
    ) external returns (bool success);

    /// @dev Defines a method for adding a new writer to keychain.
    /// @param keychainId The keychain id
    /// @param newWriter The new writer's address
    /// @return success If execution was successful
    function addKeychainWriter(
        uint64 keychainId,
        address newWriter
    ) external returns (bool success);

    /// @dev Defines a method to fulfil a key request.
    /// @param requestId The request id
    /// @param pubKey The new created public key
    /// @return success If execution was successful
    function fulfilKeyRequest(
        uint64 requestId,
        bytes calldata pubKey
    ) external returns (bool success);

    /// @dev Defines a method to reject a key request.
    /// @param requestId The request id
    /// @param rejectReason The reject reason
    /// @return success If execution was successful
    function rejectKeyRequest(
        uint64 requestId,
        string calldata rejectReason
    ) external returns (bool success);

    /// @dev Defines a method to fulfil a sign request.
    /// @param requestId The request id
    /// @param signedData The signed data
    /// @return success If execution was successful
    function fulfilSignRequest(
        uint64 requestId,
        bytes calldata signedData
    ) external returns (bool success);

    /// @dev Defines a method to reject a sign request.
    /// @param requestId The request id
    /// @param rejectReason The reject reason
    /// @return success If execution was successful
    function rejectSignRequest(
        uint64 requestId,
        string calldata rejectReason
    ) external returns (bool success);

    /// @dev AddKeychainAdmin defines an Event emitted when add a new admin to keychain.
    /// @param NewAdmin The address of the admin
    /// @param id The keychain id
    /// @param adminsCount The new count of admins
    event AddKeychainAdmin(address indexed NewAdmin, uint64 id, uint64 adminsCount);

    /// @dev AddKeychainWriter defines an Event emitted when add a new writer to keychain.
    /// @param NewWriter The address of the admin
    /// @param id The keychain id
    /// @param adminsCount The new count of admins
    event AddKeychainWriter(address indexed NewWriter, uint64 id, uint64 adminsCount);

    /// @dev NewKey defines an Event emitted when a key request fulfiled.
    /// @param id The key id
    /// @param key_type The key type
    /// @param space_id The space id
    /// @param keychain_id The keychain id
    /// @param approve_template_id The approve template id
    /// @param reject_template_id The reject template id
    event NewKey(uint64 id, int32 key_type, uint64 space_id, uint64 keychain_id, uint64 approve_template_id, uint64 reject_template_id);

    /// @dev RejectKeyRequest defines an Event emitted when a key request rejected.
    /// @param id The request id
    event RejectKeyRequest(uint64 id);

    /// @dev FulfilSignRequest defines an Event emitted when a sign request fulfiled.
    /// @param id The request id
    event FulfilSignRequest(uint64 id);

    /// @dev RejectSignRequest defines an Event emitted when a sign request rejected.
    /// @param id The request id
    event RejectSignRequest(uint64 id);
}
