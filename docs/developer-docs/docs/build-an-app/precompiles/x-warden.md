﻿---
sidebar_position: 1
---

# x/warden

## Overview

The [`IWarden` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/warden/IWarden.sol) allows calling the [`x/warden`](/learn/warden-protocol-modules/x-warden) module from EVM smart contracts.

In this article, you'll find a full list of available methods and events. You can use them for querying and managing the following components:

- [Spaces](/learn/glossary#space)
- [Keys](/learn/glossary#key)
- [Keychains](/learn/glossary#keychain)
- [Key requests](/learn/glossary#key-request)
- [Signature requests](/learn/glossary#signature-request)

To learn how to use this precompile, refer to [Interact with `x/warden`](/category/interact-with-xwarden).

## Precompile address

To reference the `IWarden` precompile in your code, use the following precompile address:

```
0x0000000000000000000000000000000000000900
```

## Spaces

### Create a new Space

- **Method**: `newSpace()`
- **Description**: Creates a new Space. Emits the [`NewSpace`](#newspace) event.
- **Parameters**:  
  ```sol
  @param approveAdminTemplateId The template id of approve admin action
  @param rejectAdminTemplateId The template id of reject admin action
  @param approveSignTemplateId The template id of approve sign action
  @param rejectSignTemplateId The template id of reject sign action
  @param additionalOwners Additional space owners
  ```
- **Output**:  
  ```sol
  @return id The id of the space
  ```
- **Usage example**: [Create a new Space](../interact-with-warden-modules/interact-with-x-warden/manage-spaces#create-a-new-space)

### Update a Space

- **Method**: `updateSpace()`
- **Description**: Updates a Space. Emits the [`UpdateSpace`](#updatespace) event.
- **Parameters**:  
  ```sol
  @param spaceId The space id
  @param nonce The nonce
  @param approveAdminTemplateId The template id of approve admin action
  @param rejectAdminTemplateId The template id of reject admin action
  @param approveSignTemplateId The template id of approve sign action
  @param rejectSignTemplateId The template id of reject sign action
  @param actionTimeoutHeight The block height up until this action can be executed
  @param expectedApproveExpression The definition of expected approval expression the action is created with
  @param expectedRejectExpression The definition of expected reject expression the action is created with
  ```
- **Output**:  
  ```sol
  @return id The id of the space
  ```
- **Usage example**: [Update a Space](../interact-with-warden-modules/interact-with-x-warden/manage-spaces#update-a-space)

### Add a Space owner

- **Method**: `addSpaceOwner()`
- **Description**: Adds an owner to a Space. Emits the [`AddSpaceOwner`](#addspaceowner) event.
- **Parameters**:  
  ```sol
  @param spaceId The space id
  @param newOwner The new owner
  @param nonce The nonce
  @param actionTimeoutHeight The block height up until this action can be executed
  @param expectedApproveExpression The definition of expected approval expression the action is created with
  @param expectedRejectExpression The definition of expected reject expression the action is created with
  ```

### Remove a Space owner

- **Method**: `removeSpaceOwner()`
- **Description**: Removes an owner from a Space. Emits the [`RemoveSpaceOwner`](#removespaceowner) event.
- **Parameters**:    
  ```sol
  @param spaceId The space id
  @param owner The owner
  @param nonce The nonce
  @param actionTimeoutHeight The block height up until this action can be executed
  @param expectedApproveExpression The definition of expected approval expression the action is created with
  @param expectedRejectExpression The definition of expected reject expression the action is created with
  @return success If execution was successful
  ```
- **Usage example**: [Remove a space owner](../interact-with-warden-modules/interact-with-x-warden/manage-spaces#remove-a-space-owner)

### Query Spaces

- **Method**: `spaces()`
- **Description**: Returns a list of all Spaces. See the [`Space`](#space) struct.
- **Parameters** :
  ```sol
  @param pageRequest The pagination details
  ```
- **Output**:  
  ```sol
  @return spaces An array of `Space` structs containing the retrieved sign requests
  @return pageResponse  pagination details
  ```
- **Usage example**: [Query Spaces](../interact-with-warden-modules/interact-with-x-warden/manage-spaces#query-spaces)

### Query Spaces by owner

- **Method**: `spacesByOwner()`
- **Description**: Returns a list of Spaces by owner. See the [`Space`](#space) struct.
- **Parameters**:  
  ```sol
  @param pageRequest The pagination details
  @param owner The owner address
  ```
- **Output**:
  ```sol
  @return spaces An array of `Space` structs containing the retrieved sign requests
  @return pageResponse  pagination details
  ```
- **Usage example**: [Query Spaces by owner](../interact-with-warden-modules/interact-with-x-warden/manage-spaces#query-spaces-by-owner)

### Query a Space by ID

- **Method**: `spaceById()`
- **Description**: Returns a Space by ID. See the [`Space`](#space) struct.
- **Parameters**:  
  ```sol
  @param id The id of the space
  ```
- **Output**:  
  ```sol
  @return space The space
  ```
- **Usage example**: [Query a Space by ID](../interact-with-warden-modules/interact-with-x-warden/manage-spaces#query-a-space-by-id)

## Keys

### Update a key

- **Method**: `updateKey()`
- **Description**: Updates a key with a given ID. Emits the [`UpdateKey`](#updatekey) event.
- **Parameters**:  
  ```sol
  @param keyId The key id
  @param approveTemplateId The approve template id
  @param rejectTemplateId The reject template id
  @param actionTimeoutHeight The block height up until this action can be executed
  @param expectedApproveExpression The definition of expected approval expression the action is created with
  @param expectedRejectExpression The definition of expected reject expression the action is created with
  ```
- **Output**:  
  ```sol
  @return success If execution was successful
  ```
- **Usage example**: [Update a key](../interact-with-warden-modules/interact-with-x-warden/manage-keys#update-a-key)

### Query keys

- **Method**: `allKeys()`
- **Description**: Returns a list of all keys. See the [`KeyResponse`](#keyresponse) struct.
- **Parameters**:  
  ```sol
  @param pageRequest The pagination details
  ```
- **Output**:  
  ```sol
  @return keys An array of `KeyResponse` structs containing the retrieved keys
  @return pageResponse  pagination details
  ```
- **Usage example**: [Query keys](../interact-with-warden-modules/interact-with-x-warden/manage-keys#query-keys)

### Query keys by Space ID

- **Method**: `keysBySpaceId()`
- **Description**: Returns a list of keys by Space ID. See the [`KeyResponse`](#keyresponse) struct.
- **Parameters**:  
  ```sol
  @param spaceId The id of the space
  @param deriveAddresses The array of address types to derive
  ```
- **Output**:  
  ```sol
  @return keys An array of `KeyResponse` structs containing the retrieved keys
  @return pageResponse  pagination details
  ```
- **Usage example**: [Query keys by Space ID](../interact-with-warden-modules/interact-with-x-warden/manage-keys#query-keys-by-space-id)

### Query a key by ID

- **Method**: `keyById()`
- **Description**: Returns a key by ID. See the [`KeyResponse`](#keyresponse) struct.
- **Parameters**:  
  ```sol
  @param id The id of the key
  @param deriveAddresses The array of address types to derive
  ```
- **Output**: 
  ```sol
  @return key `KeyResponse` struct containing the retrieved key
  ```
- **Usage example**: [Query a key by ID](../interact-with-warden-modules/interact-with-x-warden/manage-keys#query-a-key-by-id)

## Keychains

### Create a new Keychain

- **Method**: `newKeychain()`
- **Description**: Creates a new Keychain, emits the [`NewKeychain`](#newkeychain) event. You can specify [`KeychainFees`](#keychainfees).
- **Parameters**:  
  ```sol
  @param name The keychain name
  @param keychainFees The keychain fees
  @param description The keychain description
  @param url The keychain url
  @param keybaseId The keychain keybase id
  ```
- **Output**: 
  ```sol
  @return id The id of the keychain
  ```
- **Usage example**: [Create a new Keychain](../interact-with-warden-modules/interact-with-x-warden/manage-keychains#create-a-new-keychain)

### Update a Keychain

- **Method**: `updateKeychain()`
- **Description**: Updates a Keychain, emits the [`updateKeychain`](#updatekeychain) event. You can specify [`KeychainFees`](#keychainfees).
- **Parameters**:  
  ```sol
  @param keychainId The keychain id
  @param name The keychain name
  @param keychainFees The keychain fees
  @param description The keychain description
  @param url The keychain url
  @param keybaseId The keychain keybase id
  ```
- **Output**:  
  ```sol
  @return success If execution was successful
  ```
- **Usage example**: [Update a Keychain](../interact-with-warden-modules/interact-with-x-warden/manage-keychains#update-a-keychain)

### Add a Keychain admin

- **Method**: `addKeychainAdmin()`
- **Description**: Adds an admin to a Keychain. Emits the [`AddKeychainAdmin`](#addkeychainadmin) event.
- **Parameters**: 
  ```sol
  @param keychainId The keychain id
  @param newAdmin The new admin's address
  ```
- **Output**:
  ```sol
  @return success If execution was successful
  ```
- **Usage example**: [Add a Keychain admin](../interact-with-warden-modules/interact-with-x-warden/manage-keychains#add-a-keychain-admin)

### Remove a Keychain admin

- **Method**: `removeKeychainAdmin()`
- **Description**: Removes an admin from a Keychain.  Emits the [`RemoveKeychainAdmin`](#removekeychainadmin) event.
- **Parameters**:  
  ```sol
  @param keychainId The id of the keychain
  @param admin The admin address
  ```
- **Output**:  
  ```sol
  @return success If execution was successful
  ```
- **Usage example**: [Remove a Keychain admin](../interact-with-warden-modules/interact-with-x-warden/manage-keychains#remove-a-keychain-admin)

### Add a Keychain Writer

- **Method**: `addKeychainWriter()`
- **Description**: Adds a Writer to a Keychain. Emits the [`AddKeychainWriter`](#addkeychainwriter) event.
- **Parameters**:  
  ```sol
  @param keychainId The keychain id
  @param newWriter The new writer's address
  ```
- **Output**:
  ```sol
  @return success If execution was successful
  ```
- **Usage example**: [Add a Keychain Writer](../interact-with-warden-modules/interact-with-x-warden/manage-keychains#add-a-keychain-writer)

### Query Keychains

- **Method**: `keychains()`
- **Description**: Returns a list of all Keychains. See the [`Keychain`](#keychain) struct.
- **Parameters**:  
  ```sol
  @param pageRequest The pagination details
  ```
- **Output**:  
  ```sol
  @return keychains An array of `Keychain` structs containing the retrieved key requests
  @return pageResponse  pagination details
  ```
- **Usage example**: [Query Keychains](../interact-with-warden-modules/interact-with-x-warden/manage-keychains#query-keychains)
  
### Query a Keychain by ID

- **Method**: `keychainById()`
- **Description**: Returns a Keychain by ID. See the [`Keychain`](#keychain) struct.
- **Parameters**:    
  ```sol
  @param id The id of the keychain
  ```
- **Output**:  
  ```sol
  @return keychain The keychain
  ```
- **Usage example**: [Query a Keychain by ID](../interact-with-warden-modules/interact-with-x-warden/manage-keychains#query-a-keychain-by-id)

## Key requests

### Create a new key request

- **Method**: `newKeyRequest()`
- **Description**: Creates a new key request, emits the [`NewKeyRequest`](#newkeyrequest) event. You should specify [`KeyType`](#keytype) and other parameters.
- **Parameters**:
  ```sol
  @param spaceId The space id
  @param keychainId The keychain id
  @param keyType The key type
  @param approveTemplateId The approve template id
  @param rejectTemplateId The reject template id
  @param maxKeychainFees The max keychain fees
  @param nonce The nonce
  @param actionTimeoutHeight The block height up until this action can be executed
  @param expectedApproveExpression The definition of expected approval expression the action is created with
  @param expectedRejectExpression The definition of expected reject expression the action is created with
  ```
- **Output**:  
  ```sol
  @return success If execution was successful
  ```
- **Usage example**: [Create a new key request](../interact-with-warden-modules/interact-with-x-warden/manage-key-requests#create-a-new-key-request)

### Fulfill a key request

- **Method**: `fulfilKeyRequest()`
- **Description**: Fulfills a key request. Emits the [`NewKey`](#newkey) event.
- **Parameters**:  
  ```sol
  @param requestId The request id
  @param pubKey The new created public key
  ```
- **Output**:
  ```sol
  @return success If execution was successful
  ```
- **Usage example**: [Fulfill a key request](../interact-with-warden-modules/interact-with-x-warden/manage-key-requests#fulfill-a-key-request)

### Reject a key request

- **Method**: `rejectKeyRequest()`
- **Description**: Rejects a key request. Emits the [`RejectKeyRequest`](#rejectkeyrequest) event.
- **Parameters**:
  ```sol
  @param requestId The request id
  @param rejectReason The reject reason
  ```
- **Output**:
  ```sol
  @return success If execution was successful
  ```
- **Usage example**: [Reject a key request](../interact-with-warden-modules/interact-with-x-warden/manage-key-requests#reject-a-key-request)

### Query key requests

- **Method**: `keyRequests()`
- **Description**: Returns a list of all key requests. See the [`KeyRequest`](#keyrequest) struct.
- **Parameters**:
  ```sol
  @param pageRequest The pagination details
  @param keychainId The id of the keychain
  @param status The key requests status
  @param spaceId The id of the space
  ```
- **Output**: 
  ```sol
  @return keyRequests An array of `KeyRequest` structs containing the retrieved key requests
  @return pageResponse  pagination details
  ```
- **Usage example**: [Query key requests](../interact-with-warden-modules/interact-with-x-warden/manage-key-requests#query-key-requests)

### Query a key request by ID

- **Method**: `keyRequestById()`
- **Description**: Returns a key request by ID. See the [`KeyRequest`](#keyrequest) struct.
- **Parameters**:  
  ```sol
  @param id The id of the keyRequest
  ```
- **Output**:  
  ```sol
  @return keyRequest The key request
  ```
- **Usage example**: [Query a key request by ID](../interact-with-warden-modules/interact-with-x-warden/manage-key-requests#query-a-key-request-by-id)

## Signature requests

### Create a new signature request

- **Method**: `newSignRequest()`
- **Description**: Creates a new signature request. Emits the [`NewSignRequest`](#newsignrequest) event.
- **Parameters**:  
  ```sol
  @param keyId The key id
  @param input The input
  @param analyzers The analyzers
  @param encryptionKey The encryption key
  @param maxKeychainFees The max keychain fees
  @param nonce The nonce
  @param actionTimeoutHeight The block height up until this action can be executed
  @param expectedApproveExpression The definition of expected approval expression the action is created with
  @param expectedRejectExpression The definition of expected reject expression the action is created with
  ```
- **Output**:
  ```sol
  @return success If execution was successful
  ```
- **Usage example**: [Create a new signature request](../interact-with-warden-modules/interact-with-x-warden/manage-signature-requests#create-a-new-signature-request)

### Fulfill a signature request

- **Method**: `fulfilSignRequest()`
- **Description**: Fulfills a signature request. Emits the [`FulfilSignRequest`](#fulfill-a-signature-request) event.
- **Parameters**: 
  ```sol
  @param requestId The request id
  @param signedData The signed data
  ```
- **Output**: 
  ```sol
  @return success If execution was successful
  ```
- **Usage example**: [Fulfill a signature request](../interact-with-warden-modules/interact-with-x-warden/manage-signature-requests#fulfill-a-signature-request)

### Reject a signature request

- **Method**: `rejectSignRequest()`
- **Description**: Rejects a signature request. Emits the [`RejectSignRequest`](#rejectsignrequest) event.
- **Parameters**:  
  ```sol
  @param requestId The request id
  @param rejectReason The reject reason
  ```
- **Output**:
  ```sol
  @return success If execution was successful
  ```
- **Usage example**: [Reject a signature request](../interact-with-warden-modules/interact-with-x-warden/manage-signature-requests#reject-a-signature-request)

### Query signature requests

- **Method**: `signRequests()`
- **Description**: Returns a list of all signature requests. See the [`SignRequest`](#signrequest) struct.
- **Parameters**:
  ```sol
  @param pageRequest The pagination details
  @param keychainId The id of the keychain
  @param status The sign requests status
  ```
- **Output**:
  ```sol
  @return signRequests An array of `SignRequest` structs containing the retrieved sign requests
  @return pageResponse  pagination details
  ```
- **Usage example**: [Query signature requests](../interact-with-warden-modules/interact-with-x-warden/manage-signature-requests#query-signature-requests)

### Query a signature request by ID

- **Method**: `signRequestById()`
- **Description**: Returns a signature request by ID.
- **Parameters**:
  ```sol
  @param id The id of the sign request
  ```
- **Output**:
  ```sol
  @return signRequest The sign request
  ```
- **Usage example**: [Query a signature request by ID](../interact-with-warden-modules/interact-with-x-warden/manage-signature-requests#query-a-signature-request-by-id)

## Structs

### `Space`

- **Description**: A struct representing a Space, returned when you query [Spaces](#spaces).

```
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
```

### `Key`

- **Description**: A struct representing a key. Includes the [`KeyType`](#keytype) enum.

```
struct Key {
    uint64 id;
    uint64 spaceId;
    uint64 keychainId;
    KeyType keyType;
    bytes publicKey;
    uint64 approveTemplateId;
    uint64 rejectTemplateId;
}
```

### `AddressesResponse`

- **Description**: A struct representing an address. Includes the [`AddressType`](#addresstype) enum.

```
struct AddressesResponse {
    string addressValue;
    AddressType addressType;
}
```

### `KeyResponse`

- **Description**: A response returned when you query [keys](#keys). Includes the [`Key`](#key) and [`AddressesResponse`](#addressesresponse) structs.

```
struct KeyResponse {
    Key key;
    AddressesResponse[] addresses;
}
```

### `KeychainFees`

- **Description**: A struct representing Keychain fees.

```
struct KeychainFees {
    Types.Coin[] keyReq;
    Types.Coin[] sigReq;
}
```

### `Keychain`

- **Description**: A struct representing a Keychain. Includes the [`KeychainFees`](#keychainfees) struct.

```
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
```

### `KeyRequest`

- **Description**: A struct representing a key request, returned when you [query a key request by ID](#query-a-key-request-by-id). Includes the [`KeyType`](#keytype) and [`KeyRequestStatus`](#keyrequeststatus) enums.

```
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
```

### `SignRequest`

- **Description**: A struct representing a signature request, returned when you [query a signature request by ID](#query-a-signature-request-by-id). Includes the [`SignRequestStatus`](#signrequeststatus) and [`BroadcastType`](#broadcasttype) enums.

```
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
```

## Enums

### `KeyType`

- **Description**: The key type.

```
enum KeyType {
    Unspecified,
    EcdsaSecp256k1,
    EddsaEd25519
}
```

### `AddressType`

- **Description**: The address type.

```
enum AddressType {
    Unspecified,
    Ethereum,
    Osmosis
}
```

### `KeyRequestStatus`

- **Description**: The status of a key request.

```
enum KeyRequestStatus {
    Unspecified,
    Pending,
    Fulfilled,
    Rejected
}
```

### `SignRequestStatus`

- **Description**: The status of a signature request.

```
enum SignRequestStatus {
    Unspecified,
    Pending,
    Fulfilled,
    Rejected
}
```

### `BroadcastType`

- **Description**: The broadcast type.

```
enum BroadcastType {
    Disabled,
    Automatic
}
```

## Events

### `NewSpace`

- **Description**: An event emitted when [a new Space is created](#create-a-new-space).
- **Parameters**:  
  ```sol
  @param id The space id
  @param creator The creator address
  @param ownersCount The count of space owners
  @param approveAdminTemplateId The template id of approve admin action
  @param rejectAdminTemplateId The template id of reject admin action
  @param approveSignTemplateId The template id of approve sign action
  @param rejectSignTemplateId The template id of reject sign action
  ```

### `UpdateSpace`

- **Description**: An event emitted when [a Space is updated](#update-a-space).
- **Parameters**: 
  ```sol
  @param spaceId The id of the space being updated
  @param approveAdminTemplateId The id of the template to be applied to every approve admin operation
  @param rejectAdminTemplateId The id of the template to be applied to every reject admin operation
  @param approveSignTemplateId The id of the template to be applied to every approve sign operation
  @param rejectSignTemplateId The id of the template to be applied to every reject sign operation
  ```

### `AddSpaceOwner`

- **Description**: An event emitted when [a Space owner is added](#add-a-space-owner).
- **Parameters**:  
  ```sol
  @param spaceId The space id
  @param newOwner The new owner address
  ```

### `RemoveSpaceOwner`

- **Description**: An event emitted when [a Space owner is removed](#remove-a-space-owner).
- **Parameters**:  
  ```sol
  @param spaceId The space id
  @param removedOwner The removed owner address
  ```

### `UpdateKey`

- **Description**: An event emitted when [a key is updated](#update-a-key).
- **Parameters**:
  ```sol
  @param id The id of the key
  @param approveTemplateId The approve template id
  @param rejectTemplateId The reject template id
  ```

### `NewKeychain`

- **Description**: An event emitted when [a new Keychain is created](#create-a-new-keychain).
- **Parameters**: 
  ```sol
  @param id The keychain id
  @param creator The creator address
  ```

### `UpdateKeychain`

- **Description**: An event emitted when [a Keychain is updated](#update-a-keychain). Includes the [`KeychainFees`](#keychainfees) struct.
  - **Parameters**:  
  ```sol
  @param id The keychain id
  @param keychainFees The keychain fees
  ```

### `AddKeychainAdmin`

- **Description**: An event emitted when [a Keychain admin is added](#add-a-keychain-admin).
- **Parameters**:  
  ```sol
  @param newAdmin The address of the admin
  @param id The keychain id
  @param adminsCount The new count of admins
  ```

### `RemoveKeychainAdmin`

- **Description**: An event emitted when [a Keychain admin is removed](#remove-a-keychain-admin).
- **Parameters**: 
  ```sol
  @param keychainId The keychain id
  @param admin The admin address
  @param adminsCount The count of keychain admins
  ```

### `AddKeychainWriter`

- **Description**: An event emitted when [a Keychain Writer is added](#add-a-keychain-writer).
- **Parameters**:  
  ```sol
  @param newWriter The address of the writer
  @param id The keychain id
  @param writersCount The new count of writers
  ```

### `NewKeyRequest`

- **Description**: An event emitted when [a new key request is created](#create-a-new-key-request). Includes the [`KeyType`](#keytype) enum.
- **Parameters**:
  ```sol
  @param id The id of the created key request
  @param spaceId The space id
  @param keychainId The keychain id
  @param approveTemplateId The approve template id
  @param rejectTemplateId The reject template id
  @param keyType The key type
  @param creator The creator address
  ```

### `NewKey`

- **Description**: An event emitted when [a key request is fulfilled](#fulfill-a-key-request). Includes the [`KeyType`](#keytype) enum.
- **Parameters**:
  ```sol
  @param id The key id
  @param keyType The key type
  @param spaceId The space id
  @param keychainId The keychain id
  @param approveTemplateId The approve template id
  @param rejectTemplateId The reject template id
  ```

### `RejectKeyRequest`

- **Description**: An event emitted when [a key request is rejected](#reject-a-key-request).
- **Parameters**: 
  ```sol
  @param id The request id
  ```

### `NewSignRequest`

- **Description**: An event emitted when [a new signature request is created](#create-a-new-signature-request).
- **Parameters**: 
  ```sol
  @param id The id of the signature request
  @param keyId The id of the Key to be used for signing
  @param creator The creator address
  ```

### `FulfilSignRequest`

- **Description**: An event emitted when [a signature request is fulfilled](#fulfill-a-signature-request).
- **Parameters**:
  ```sol
  @param id The request id
  ```

### `RejectSignRequest`

- **Description**: An event emitted when [a signature request is rejected](#reject-a-signature-request).
- **Parameters**:  
  ```sol
  @param id The request id
  ```
