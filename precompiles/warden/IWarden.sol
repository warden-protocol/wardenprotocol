// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.18;

import "../common/Types.sol";

/// @dev The IWarden contract's address.
address constant IWARDEN_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000900;

/// @dev The IWarden contract's instance.
IWarden constant IWARDEN_CONTRACT = IWarden(IWARDEN_PRECOMPILE_ADDRESS);

struct KeychainFees {
    Types.Coin[] keyReq;
    Types.Coin[] sigReq;
}

struct Key {
    uint64 id;
    uint64 spaceId;
    uint64 keychainId;
    KeyType keyType;
    bytes publicKey;
    uint64 approveTemplateId;
    uint64 rejectTemplateId;
}

struct KeyResponse {
    Key key;
    AddressesResponse[] addresses;
}

struct AddressesResponse {
    string addressValue;
    AddressType addressType;
}

struct KeyRequest {
    uint64 id;
    address creator;
    uint64 spaceId;
    uint64 keychainId;
    KeyType keyType;
    KeyRequestStatus status;
    string rejectReason;
    uint64 approveTemplateId;
    uint64 rejectTemplateId;
    Types.Coin[] deductedKeychainFees;
}

struct Keychain {
    uint64 id;
    address creator;
    string name;
    address[] admins;
    address[] writers;
    KeychainFees fees;
    string description;
    string url;
    string keybaseId;
}

struct SignRequest {
    uint64 id;
    address creator;
    uint64 keyId;
    bytes dataForSigning;
    SignRequestStatus status;
    bytes result;
    bytes encryptionKey;
    Types.Coin[] deductedKeychainFees;
    BroadcastType broadcastType;
}

struct Space {
    uint64 id;
    address creator;
    address[] owners;
    uint64 nonce;
    uint64 approveAdminTemplateId;
    uint64 rejectAdminTemplateId;
    uint64 approveSignTemplateId;
    uint64 rejectSignTemplateId;
}

enum AddressType {
    Unspecified,
    Ethereum,
    Osmosis
}

enum KeyType {
    Unspecified,
    EcdsaSecp256k1,
    EddsaEd25519
}

enum KeyRequestStatus {
    Unspecified,
    Pending,
    Fulfilled,
    Rejected
}

enum SignRequestStatus {
    Unspecified,
    Pending,
    Fulfilled,
    Rejected
}

enum BroadcastType {
    Disabled,
    Automatic
}

enum OptionalBroadcastType {
    Nonspecified,
    Disabled,
    Automatic
}

/**
 * @author Warden Team
 * @title x/warden Interface
 * @dev The interface through which users and solidity contracts will interact with x/warden.
 * @custom:address 0x0000000000000000000000000000000000000900
 */
interface IWarden {
    /// @dev Defines a method for adding a new admin to a keychain.
    /// @param keychainId The keychain id
    /// @param newAdmin The new admin's address
    /// @return success If execution was successful
    function addKeychainAdmin(
        uint64 keychainId,
        address newAdmin
    ) external returns (bool success);

    /// @dev Defines a method for adding a new writer to a keychain.
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

    /// @dev Defines a method to add a space owner.
    /// @param spaceId The space id
    /// @param newOwner The new owner
    /// @param nonce The nonce
    /// @param actionTimeoutHeight The block height up until this action can be executed
    /// @param expectedApproveExpression The definition of expected approval expression the action is created with
    /// @param expectedRejectExpression The definition of expected reject expression the action is created with
    /// @return success If execution was successful
    function addSpaceOwner(
        uint64 spaceId,
        address newOwner,
        uint64 nonce,
        uint64 actionTimeoutHeight,
        string calldata expectedApproveExpression,
        string calldata expectedRejectExpression
    ) external returns (bool success);

    /// @dev Defines a method to remove a space owner.
    /// @param spaceId The space id
    /// @param owner The owner
    /// @param nonce The nonce
    /// @param actionTimeoutHeight The block height up until this action can be executed
    /// @param expectedApproveExpression The definition of expected approval expression the action is created with
    /// @param expectedRejectExpression The definition of expected reject expression the action is created with
    /// @return success If execution was successful
    function removeSpaceOwner(
        uint64 spaceId,
        address owner,
        uint64 nonce,
        uint64 actionTimeoutHeight,
        string calldata expectedApproveExpression,
        string calldata expectedRejectExpression
    ) external returns (bool success);

    /// @dev Defines a method to create a new key request.
    /// @param spaceId The space id
    /// @param keychainId The keychain id
    /// @param keyType The key type
    /// @param approveTemplateId The approve template id
    /// @param rejectTemplateId The reject template id
    /// @param maxKeychainFees The max keychain fees
    /// @param nonce The nonce
    /// @param actionTimeoutHeight The block height up until this action can be executed
    /// @param expectedApproveExpression The definition of expected approval expression the action is created with
    /// @param expectedRejectExpression The definition of expected reject expression the action is created with
    /// @return success If execution was successful
    function newKeyRequest(
        uint64 spaceId,
        uint64 keychainId,
        KeyType keyType,
        uint64 approveTemplateId,
        uint64 rejectTemplateId,
        Types.Coin[] calldata maxKeychainFees,
        uint64 nonce,
        uint64 actionTimeoutHeight,
        string calldata expectedApproveExpression,
        string calldata expectedRejectExpression
    ) external returns (bool success);

    /// @dev Defines a method to create a new signature request.
    /// @param keyId The key id
    /// @param input The input
    /// @param analyzers The analyzers
    /// @param encryptionKey The encryption key
    /// @param maxKeychainFees The max keychain fees
    /// @param nonce The nonce
    /// @param actionTimeoutHeight The block height up until this action can be executed
    /// @param expectedApproveExpression The definition of expected approval expression the action is created with
    /// @param expectedRejectExpression The definition of expected reject expression the action is created with
    /// @param broadcastType The broadcast type
    /// @return success If execution was successful
    function newSignRequest(
        uint64 keyId,
        bytes calldata input,
        bytes[] calldata analyzers,
        bytes calldata encryptionKey,
        Types.Coin[] calldata maxKeychainFees,
        uint64 nonce,
        uint64 actionTimeoutHeight,
        string calldata expectedApproveExpression,
        string calldata expectedRejectExpression,
        BroadcastType broadcastType
    ) external returns (bool success);

    /// @dev Defines a method to update a key.
    /// @param keyId The key id
    /// @param approveTemplateId The approve template id
    /// @param rejectTemplateId The reject template id
    /// @param actionTimeoutHeight The block height up until this action can be executed
    /// @param expectedApproveExpression The definition of expected approval expression the action is created with
    /// @param expectedRejectExpression The definition of expected reject expression the action is created with
    /// @return success If execution was successful
    function updateKey(
        uint64 keyId,
        uint64 approveTemplateId,
        uint64 rejectTemplateId,
        uint64 actionTimeoutHeight,
        string calldata expectedApproveExpression,
        string calldata expectedRejectExpression
    ) external returns (bool success);

    /// @dev Defines a method to update a space.
    /// @param spaceId The space id
    /// @param nonce The nonce
    /// @param approveAdminTemplateId The template id of approve admin action
    /// @param rejectAdminTemplateId The template id of reject admin action
    /// @param approveSignTemplateId The template id of approve sign action
    /// @param rejectSignTemplateId The template id of reject sign action
    /// @param actionTimeoutHeight The block height up until this action can be executed
    /// @param expectedApproveExpression The definition of expected approval expression the action is created with
    /// @param expectedRejectExpression The definition of expected reject expression the action is created with
    /// @return success If execution was successful
    function updateSpace(
        uint64 spaceId,
        uint64 nonce,
        uint64 approveAdminTemplateId,
        uint64 rejectAdminTemplateId,
        uint64 approveSignTemplateId,
        uint64 rejectSignTemplateId,
        uint64 actionTimeoutHeight,
        string calldata expectedApproveExpression,
        string calldata expectedRejectExpression
    ) external returns (bool success);

    /// @dev Defines a method to query keys.
    /// @param pageRequest The pagination details
    /// @return keys An array of `KeyResponse` structs containing the retrieved keys
    /// @return pageResponse  pagination details
    function allKeys(
        Types.PageRequest calldata pageRequest,
        int32[] calldata deriveAddresses
    ) external view returns(KeyResponse[] memory keys, Types.PageResponse memory pageResponse);

    /// @dev Defines a method to query key by id.
    /// @param id The id of the key
    /// @param deriveAddresses The array of address types to derive
    /// @return key `KeyResponse` struct containing the retrieved key
    function keyById(
        uint64 id,
        int32[] calldata deriveAddresses
    ) external view returns(KeyResponse memory key);

    /// @dev Defines a method to query keys by space id.
    /// @param pageRequest The pagination details
    /// @param spaceId The id of the space
    /// @param deriveAddresses The array of address types to derive
    /// @return keys An array of `KeyResponse` structs containing the retrieved keys
    /// @return pageResponse  pagination details
    function keysBySpaceId(
        Types.PageRequest calldata pageRequest,
        uint64 spaceId,
        int32[] calldata deriveAddresses
    ) external view returns(KeyResponse[] memory keys, Types.PageResponse memory pageResponse);

    /// @dev Defines a method to query keyRequest by id.
    /// @param id The id of the keyRequest
    /// @return keyRequest The key request
    function keyRequestById(
        uint64 id
    ) external view returns(KeyRequest memory keyRequest);

    /// @dev Defines a method to query keyRequests.
    /// @param pageRequest The pagination details
    /// @param keychainId The id of the keychain
    /// @param status The key requests status
    /// @param spaceId The id of the space
    /// @return keyRequests An array of `KeyRequest` structs containing the retrieved key requests
    /// @return pageResponse  pagination details
    function keyRequests(
        Types.PageRequest calldata pageRequest,
        uint64 keychainId,
        KeyRequestStatus status,
        uint64 spaceId
    ) external view returns(KeyRequest[] memory keyRequests, Types.PageResponse memory pageResponse);

    /// @dev Defines a method to query keychain by id.
    /// @param id The id of the keychain
    /// @return keychain The keychain
    function keychainById(
        uint64 id
    ) external view returns(Keychain memory keychain);

    /// @dev Defines a method to query keychains.
    /// @param pageRequest The pagination details
    /// @return keychains An array of `Keychain` structs containing the retrieved key requests
    /// @return pageResponse  pagination details
    function keychains(
        Types.PageRequest calldata pageRequest
    ) external view returns(Keychain[] memory keychains, Types.PageResponse memory pageResponse);

    /// @dev Defines a method to query sign request by id.
    /// @param id The id of the sign request
    /// @return signRequest The sign request
    function signRequestById(
        uint64 id
    ) external view returns(SignRequest memory signRequest);

    /// @dev Defines a method to query sign requests.
    /// @param pageRequest The pagination details
    /// @param keychainId The id of the keychain
    /// @param status The sign requests status
    /// @param optionalBroadcastType The optional broadcast type to query
    /// @return signRequests An array of `SignRequest` structs containing the retrieved sign requests
    /// @return pageResponse  pagination details
    function signRequests(
        Types.PageRequest calldata pageRequest,
        uint64 keychainId,
        SignRequestStatus status,
        OptionalBroadcastType optionalBroadcastType
    ) external view returns(SignRequest[] memory signRequests, Types.PageResponse memory pageResponse);

    /// @dev Defines a method to query space by id.
    /// @param id The id of the space
    /// @return space The space
    function spaceById(
        uint64 id
    ) external view returns(Space memory space);

    /// @dev Defines a method to query spaces.
    /// @param pageRequest The pagination details
    /// @return spaces An array of `Space` structs containing the retrieved sign requests
    /// @return pageResponse  pagination details
    function spaces(
        Types.PageRequest calldata pageRequest
    ) external view returns(Space[] memory spaces, Types.PageResponse memory pageResponse);

    /// @dev Defines a method to query spaces by owner.
    /// @param pageRequest The pagination details
    /// @param owner The owner address
    /// @return spaces An array of `Space` structs containing the retrieved sign requests
    /// @return pageResponse  pagination details
    function spacesByOwner(
        Types.PageRequest calldata pageRequest,
        address owner
    ) external view returns(Space[] memory spaces, Types.PageResponse memory pageResponse);

    /// @dev AddKeychainAdmin defines an Event emitted when add a new admin to a keychain.
    /// @param newAdmin The address of the admin
    /// @param id The keychain id
    /// @param adminsCount The new count of admins
    event AddKeychainAdmin(address newAdmin, uint64 indexed id, uint64 adminsCount);

    /// @dev AddKeychainWriter defines an Event emitted when add a new writer to a keychain.
    /// @param newWriter The address of the writer
    /// @param id The keychain id
    /// @param writersCount The new count of writers
    event AddKeychainWriter(address newWriter, uint64 indexed id, uint64 writersCount);

    /// @dev NewKey defines an Event emitted when a key request fulfilled.
    /// @param id The key id
    /// @param keyType The key type
    /// @param spaceId The space id
    /// @param keychainId The keychain id
    /// @param approveTemplateId The approve template id
    /// @param rejectTemplateId The reject template id
    event NewKey(uint64 indexed id, KeyType keyType, uint64 spaceId, uint64 keychainId, uint64 approveTemplateId, uint64 rejectTemplateId);

    /// @dev RejectKeyRequest defines an Event emitted when a key request rejected.
    /// @param id The request id
    event RejectKeyRequest(uint64 indexed id);

    /// @dev FulfilSignRequest defines an Event emitted when a sign request fulfilled.
    /// @param id The request id
    event FulfilSignRequest(uint64 indexed id);

    /// @dev RejectSignRequest defines an Event emitted when a sign request rejected.
    /// @param id The request id
    event RejectSignRequest(uint64 indexed id);

    /// @dev NewKeychain defines an Event emitted when a new keychain is created.
    /// @param id The keychain id
    /// @param creator The creator address
    event NewKeychain(uint64 indexed id, address creator);

    /// @dev NewSpace defines an Event emitted when a new space is created.
    /// @param id The space id
    /// @param creator The creator address
    /// @param ownersCount The count of space owners
    /// @param approveAdminTemplateId The template id of approve admin action
    /// @param rejectAdminTemplateId The template id of reject admin action
    /// @param approveSignTemplateId The template id of approve sign action
    /// @param rejectSignTemplateId The template id of reject sign action
    event NewSpace(uint64 indexed id, address creator, uint64 ownersCount, uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId);

    /// @dev RemoveKeychainAdmin defines an Event emitted when an admin removed from keychain.
    /// @param keychainId The keychain id
    /// @param admin The admin address
    /// @param adminsCount The count of keychain admins
    event RemoveKeychainAdmin(uint64 indexed keychainId, address admin, uint64 adminsCount);

    /// @dev UpdateKeychain defines an Event emitted when a keychain is updated.
    /// @param id The keychain id
    /// @param keychainFees The keychain fees
    event UpdateKeychain(uint64 indexed id, KeychainFees keychainFees);

    /// @dev AddSpaceOwner defines an Event emitted when a new space owner is added.
    /// @param spaceId The space id
    /// @param newOwner The new owner address
    event AddSpaceOwner(uint64 indexed spaceId, address newOwner);

    /// @dev RemoveSpaceOwner defines an Event emitted when a space owner is removed.
    /// @param spaceId The space id
    /// @param removedOwner The removed owner address
    event RemoveSpaceOwner(uint64 indexed spaceId, address removedOwner);

    /// @dev NewKeyRequest defines an Event emitted when a new key request is created.
    /// @param id The id of the created key request
    /// @param spaceId The space id
    /// @param keychainId The keychain id
    /// @param approveTemplateId The approve template id
    /// @param rejectTemplateId The reject template id
    /// @param keyType The key type
    /// @param creator The creator address
    event NewKeyRequest(uint64 indexed id, uint64 spaceId, uint64 keychainId, uint64 approveTemplateId, uint64 rejectTemplateId, KeyType keyType, address creator);

    /// @dev NewSignRequest defines an Event emitted when a new signature request is created.
    /// @param id The id of the signature request
    /// @param keyId The id of the Key to be used for signing
    /// @param creator The creator address
    /// @param broadcastType The broadcast type
    event NewSignRequest(uint64 indexed id, uint64 keyId, address creator, BroadcastType broadcastType);

    /// @dev UpdateKey defines an Event emitted when a key is updated.
    /// @param id The id of the key
    /// @param approveTemplateId The approve template id
    /// @param rejectTemplateId The reject template id
    event UpdateKey(uint64 indexed id, uint64 approveTemplateId, uint64 rejectTemplateId);

    /// @dev UpdateSpace defines an Event emitted when a space is updated.
    /// @param spaceId The id of the space being updated
    /// @param approveAdminTemplateId The id of the template to be applied to every approve admin operation
    /// @param rejectAdminTemplateId The id of the template to be applied to every reject admin operation
    /// @param approveSignTemplateId The id of the template to be applied to every approve sign operation
    /// @param rejectSignTemplateId The id of the template to be applied to every reject sign operation
    event UpdateSpace(uint64 indexed spaceId, uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId);
}
