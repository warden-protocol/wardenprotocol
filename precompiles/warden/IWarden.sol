// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.18;

import "../common/Types.sol";

/// @dev The IWarden contract's address.
address constant IWARDEN_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000900; 

/// @dev The IWarden contract's instance.
IWarden constant IWARDEN_CONTRACT = IWarden(IWARDEN_PRECOMPILE_ADDRESS);

struct KeychainFees {
    Types.Coin[] KeyReq;
    Types.Coin[] SigReq;
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
    Types.Coin[] DeductedKeychainFees;
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
    Types.Coin[] DeductedKeychainFees;
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

enum KeyType {
    Unspecified,
    EcdsaSec256k1,
    EddsaEd25519
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
    /// @return success If execution was successful
    function newSignRequest(
	    uint64 keyId,
        bytes calldata input,
        address[] calldata analyzers,
        bytes calldata encryptionKey,
	    Types.Coin[] calldata maxKeychainFees,
	    uint64 nonce,
	    uint64 actionTimeoutHeight,
	    string calldata expectedApproveExpression,
	    string calldata expectedRejectExpression
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

    function allKeys(
        Types.PageRequest calldata pageRequest,
        int32[] calldata deriveAddresses
    ) external view returns(KeyResponse[] memory keys, Types.PageResponse memory pageResponse);

    function keyById(
        uint64 Id,
        int32[] calldata deriveAddresses
    ) external view returns(KeyResponse memory key);

    function keysBySpaceId(
        Types.PageRequest calldata pageRequest,
        uint64 spaceId,
        int32[] calldata deriveAddresses
    ) external view returns(KeyResponse[] memory keys, Types.PageResponse memory pageResponse);

    function keyRequestById(
        uint64 Id
    ) external view returns(KeyRequest memory keyRequest);

    function keyRequests(
        Types.PageRequest calldata pageRequest,
        uint64 keychainId,
        int32 status,
        uint64 spaceId
    ) external view returns(KeyRequest[] memory keys, Types.PageResponse memory pageResponse);

    function keychainById(
        uint64 id
    ) external view returns(Keychain memory keychain);

    function keychains(
        Types.PageRequest calldata pageRequest
    ) external view returns(Keychain[] memory keychain, Types.PageResponse memory pageResponse);

    function signRequestById(
        uint64 id
    ) external view returns(SignRequest memory signRequest);

    function signRequests(
        Types.PageRequest calldata pageRequest,
        uint64 keychainId,
        int32 status
    ) external view returns(SignRequest[] memory signRequests, Types.PageResponse memory pageResponse);

    function spaceById(
        uint64 id
    ) external view returns(Space memory space);

    function spaces(
        Types.PageRequest calldata pageRequest
    ) external view returns(Space[] memory spaces, Types.PageResponse memory pageResponse);

    function spacesByOwner(
        Types.PageRequest calldata pageRequest,
        address owner
    ) external view returns(Space[] memory spaces, Types.PageResponse memory pageResponse);

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
    /// @param keychainFees The keychain fees
    event UpdateKeychain(uint64 id, KeychainFees keychainFees);

    /// @dev AddSpaceOwner defines an Event emitted when a new space owner is added.
    /// @param spaceId The space id
    /// @param newOwner The new owner address
    event AddSpaceOwner(uint64 indexed spaceId, address newOwner);

    /// @dev RemoveSpaceOwner defines an Event emitted when a space owner is removed.
    /// @param spaceId The space id
    /// @param removedOwner The new owner address
    event RemoveSpaceOwner(uint64 indexed spaceId, address removedOwner);

    /// @dev NewKeyRequest defines an Event emitted when a new key request is created.
    /// @param id The id of the created key request
    /// @param spaceId The space id
    /// @param keychainId The keychain id
    /// @param approveTemplateId The approve template id
    /// @param rejectTemplateId The reject template id
    /// @param keyType The key type
    /// @param creator The creator address
    event NewKeyRequest(uint64 indexed id, uint64 spaceId, uint64 keychainId, uint64 approveTemplateId, uint64 rejectTemplateId, uint8 keyType, address creator);

    /// @dev NewSignRequest defines an Event emitted when a new signature request is created.
    /// @param id The id of the signature request
    /// @param keyId The id of the Key to be used for signing
    /// @param creator The creator address
    event NewSignRequest(uint64 indexed id, uint64 keyId, address creator);

    /// @dev UpdateKey defines an Event emitted when a key is updated.
    /// @param id The id of the key
    /// @param approveTemplateId The approve template id
    /// @param rejectTemplateId The reject template id
    event UpdateKey(uint64 indexed id, uint64 approveTemplateId, uint64 rejectTemplateId);

    /// @dev UpdateSpace defines an Event emitted when a space is updated.
    /// @param space_id The id of the space being updated
    /// @param approveAdminTemplateId The id of the template to be applied to every approve admin operation
    /// @param rejectAdminTemplateId The id of the template to be applied to every reject admin operation
    /// @param approveSignTemplateId The id of the template to be applied to every approve sign operation
    /// @param rejectSignTemplateId The id of the template to be applied to every reject sign operation
    event UpdateSpace(uint64 indexed space_id, uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId);
}
