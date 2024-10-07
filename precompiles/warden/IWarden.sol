// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.18;

import "../common/Types.sol";

/// @dev The IWarden contract's address.
address constant IWARDEN_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000900; 

/// @dev The IWarden contract's instance.
IWarden constant IWARDEN_CONTRACT = IWarden(IWARDEN_PRECOMPILE_ADDRESS);

struct KeychainFees {
    Coin[] KeyReq;
    Coin[] SigReq;
}

struct Key {
    uint64 Id;
    uint64 SpaceId;
    uint64 KeychainId;
    int32 Type;
    bytes PublicKey;
    uint64 ApproveTemplateId;
    uint64 RejectTemplateId;
}

struct KeyResponse {
    Key Key;
    AddressesResponse[] Addresses;
}

struct AddressesResponse {
    string Address;
    int32 Type;
}

struct KeyRequest {
    uint64 Id;
    string Creator;
    uint64 SpaceId;
    uint64 KeychainId;
    int32 KeyType;
    int32 Status;
    string RejectReason;
    uint64 ApproveTemplateId;
    uint64 RejectTemplateId;
    Coin[] DeductedKeychainFees;
}

struct Keychain {
    uint64 Id;
	string Creator;
	string Name;
	string[] Admins;
	string[] Writers;
	KeychainFees Fees;
	string Description;
	string Url;
	string KeybaseId;
}

struct SignRequest {
    uint64 Id;
    string Creator;
    uint64 KeyId;
    bytes DataForSigning;
    int32 Status;
    bytes Result;
    bytes EncryptionKey;
    Coin[] DeductedKeychainFees;
}

struct Space {
    uint64 Id;
    string Creator;
    string[] Owners;
    uint64 Nonce;
    uint64 ApproveAdminTemplateId;
    uint64 RejectAdminTemplateId;
    uint64 ApproveSignTemplateId;
    uint64 RejectSignTemplateId;
}

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

    /// @dev Defines a method to create a new keychain.
    /// @param name The keychain name
    /// @param keychainFees The keychain fees
    /// @param description The keychain description
    /// @param url The keychain url
    /// @param keybaseId The keychain keybase id
    /// @return id The id of the keychain
    function newKeychain(
        string calldata name,
        KeychainFees calldata keychainFees,
        string calldata description,
        string calldata url,
        string calldata keybaseId
    ) external returns (uint64 id);

    /// @dev Defines a method to create a new space.
    /// @param approveAdminTemplateId The template id of approve admin action
    /// @param rejectAdminTemplateId The template id of reject admin action
    /// @param approveSignTemplateId The template id of approve sign action
    /// @param rejectSignTemplateId The template id of reject sign action
    /// @param additionalOwners Additional space owners
    /// @return id The id of the space
    function newSpace(
        uint64 approveAdminTemplateId,
        uint64 rejectAdminTemplateId,
        uint64 approveSignTemplateId,
        uint64 rejectSignTemplateId,
        address[] calldata additionalOwners
    ) external returns (uint64 id);

    /// @dev Defines a method to remove an admin from keychain.
    /// @param keychainId The id of the keychain
    /// @param admin The admin address
    /// @return success If execution was successful
    function removeKeychainAdmin(
        uint64 keychainId,
        address admin
    ) external returns (bool success);

    /// @dev Defines a method to update a keychain.
    /// @param keychainId The keychain id
    /// @param name The keychain name
    /// @param keychainFees The keychain fees
    /// @param description The keychain description
    /// @param url The keychain url
    /// @param keybaseId The keychain keybase id
    /// @return success If execution was successful
    function updateKeychain(
        uint64 keychainId,
        string calldata name,
        KeychainFees calldata keychainFees,
        string calldata description,
        string calldata url,
        string calldata keybaseId
    ) external returns (bool success);

    function allKeys(
        PageRequest calldata pageRequest,
        int32[] calldata deriveAddresses
    ) external view returns(KeyResponse[] memory keys, PageResponse memory pageResponse);

    function keyById(
        uint64 Id,
        int32[] calldata deriveAddresses
    ) external view returns(KeyResponse memory key);

    function keysBySpaceId(
        PageRequest calldata pageRequest,
        uint64 spaceId,
        int32[] calldata deriveAddresses
    ) external view returns(KeyResponse[] memory keys, PageResponse memory pageResponse);

    function keyRequestById(
        uint64 Id
    ) external view returns(KeyRequest memory keyRequest);

    function keyRequests(
        PageRequest calldata pageRequest,
        uint64 keychainId,
        int32 status,
        uint64 spaceId
    ) external view returns(KeyRequest[] memory keys, PageResponse memory pageResponse);

    function keychainById(
        uint64 id
    ) external view returns(Keychain memory keychain);

    function keychains(
        PageRequest calldata pageRequest
    ) external view returns(Keychain[] memory keychain, PageResponse memory pageResponse);

    function signRequestById(
        uint64 id
    ) external view returns(SignRequest memory signRequest);

    function signRequests(
        PageRequest calldata pageRequest,
        uint64 keychainId,
        int32 status
    ) external view returns(SignRequest[] memory signRequests, PageResponse memory pageResponse);

    function spaceById(
        uint64 id
    ) external view returns(Space memory space);

    function spaces(
        PageRequest calldata pageRequest
    ) external view returns(Space[] memory spaces, PageResponse memory pageResponse);

    function spacesByOwner(
        PageRequest calldata pageRequest,
        address owner
    ) external view returns(Space[] memory spaces, PageResponse memory pageResponse);

    /// @dev AddKeychainAdmin defines an Event emitted when add a new admin to keychain.
    /// @param newAdmin The address of the admin
    /// @param id The keychain id
    /// @param adminsCount The new count of admins
    event AddKeychainAdmin(address indexed newAdmin, uint64 id, uint64 adminsCount);

    /// @dev AddKeychainWriter defines an Event emitted when add a new writer to keychain.
    /// @param newWriter The address of the admin
    /// @param id The keychain id
    /// @param adminsCount The new count of admins
    event AddKeychainWriter(address indexed newWriter, uint64 id, uint64 adminsCount);

    /// @dev NewKey defines an Event emitted when a key request fulfiled.
    /// @param id The key id
    /// @param keyType The key type
    /// @param spaceId The space id
    /// @param keychainId The keychain id
    /// @param approveTemplateId The approve template id
    /// @param rejectTemplateId The reject template id
    event NewKey(uint64 id, int32 keyType, uint64 spaceId, uint64 keychainId, uint64 approveTemplateId, uint64 rejectTemplateId);

    /// @dev RejectKeyRequest defines an Event emitted when a key request rejected.
    /// @param id The request id
    event RejectKeyRequest(uint64 id);

    /// @dev FulfilSignRequest defines an Event emitted when a sign request fulfiled.
    /// @param id The request id
    event FulfilSignRequest(uint64 id);

    /// @dev RejectSignRequest defines an Event emitted when a sign request rejected.
    /// @param id The request id
    event RejectSignRequest(uint64 id);

    /// @dev NewKeychain defines an Event emitted when a new keychain created.
    /// @param id The keychain id
    /// @param creator The creator address
    event NewKeychain(uint64 id, address indexed creator);

    /// @dev NewSpace defines an Event emitted when a new space created.
    /// @param id The space id
    /// @param creator The creator address
    /// @param ownersCount The count of space owners
    /// @param approveAdminTemplateId The template id of approve admin action
    /// @param rejectAdminTemplateId The template id of reject admin action
    /// @param approveSignTemplateId The template id of approve sign action
    /// @param rejectSignTemplateId The template id of reject sign action
    event NewSpace(uint64 id, address indexed creator, uint64 ownersCount, uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId);

    /// @dev RemoveKeychainAdmin defines an Event emitted when an admin removed from keychain.
    /// @param keychainId The keychain id
    /// @param admin The admin address
    /// @param adminsCount The count of keychain admins
    event RemoveKeychainAdmin(uint64 keychainId, address indexed admin, uint64 adminsCount);

    /// @dev UpdateKeychain defines an Event emitted when a keychain updated.
    /// @param id The keychain id
    /// @param creator The creator address
    event UpdateKeychain(uint64 id, address indexed creator);
}
