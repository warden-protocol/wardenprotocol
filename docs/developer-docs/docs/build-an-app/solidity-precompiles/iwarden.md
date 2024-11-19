---
sidebar_position: 1
---

# IWarden

## Overview

The [`IWarden` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/warden/IWarden.sol) allows calling the `x/warden` module from EVM smart contracts.

In this article, you'll find a full list of available methods and events. You can use them for querying and managing the following components:

- [Spaces](#spaces)
- [Keys](#keys)
- [Keychains](#keychains)
- [Key requests](#key-requests)
- [Signature requests](#signature-requests)

## Precompile address

To reference the `IWarden` precompile in your code, use the following precompile address:

```
0x0000000000000000000000000000000000000900
```

## Spaces

### Query Spaces

- **Method**: `spaces()`
- **Description**: Returns a list of all Spaces.
- **Parameters** :
  ```sol
  @param pageRequest The pagination details
  ```
- **Output**:  
  ```sol
  @return spaces An array of `Space` structs containing the retrieved sign requests
  @return pageResponse  pagination details
  ```

### Query a Space by owner

- **Method**: `spacesByOwner()`
- **Description**: Returns a list of Spaces by owner.
- **Parameters**:  
  ```sol
  @dev Defines a method to query spaces by owner.
  @param pageRequest The pagination details
  @param owner The owner address
  ```
- **Output**:
  ```sol
  @return spaces An array of `Space` structs containing the retrieved sign requests
  @return pageResponse  pagination details
  ```

### Query a Space by ID

- **Method**: `spaceById()`
- **Description**: Returns a Space by ID.
- **Parameters**:  
  ```sol
  @param id The id of the space
  ```
- **Output**:  
  ```sol
  @return space The space
  ```

### Create a new Space

- **Method**: `newSpace()`
- **Description**: Creates a new Space.
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

### Update a Space

- **Method**: `updateSpace()`
- **Description**: Updates a Space.
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

### Add a Space owner

- **Method**: `addSpaceOwner()`
- **Description**: Adds an owner to a Space.
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
- **Description**: Removes an owner from a Space.
- **Parameters**:    
  ```sol
  @dev Defines a method to remove a space owner.
  @param spaceId The space id
  @param owner The owner
  @param nonce The nonce
  @param actionTimeoutHeight The block height up until this action can be executed
  @param expectedApproveExpression The definition of expected approval expression the action is created with
  @param expectedRejectExpression The definition of expected reject expression the action is created with
  @return success If execution was successful
  ```

## Keys

### Query keys

- **Method**: `allKeys()`
- **Description**: Returns a list of all keys.
- **Parameters**:  
  ```sol
  @param pageRequest The pagination details
  ```
- **Output**:  
  ```sol
  @return keys An array of `KeyResponse` structs containing the retrieved keys
  @return pageResponse  pagination details
  ```

### Query a key by ID

- **Method**: `keyById()`
- **Description**: Returns a key by ID.
- **Parameters**:  
  ```sol
  @param id The id of the key
  @param deriveAddresses The array of address types to derive
  ```
- **Output**: 
  ```sol
  @return key `KeyResponse` struct containing the retrieved key
  ```

### Query a key by Space ID

- **Method**: `keysBySpaceId()`
- **Description**: Returns a key by Space ID.
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

### Update a key

- **Method**: `updateKey()`
- **Description**: Updates a key with a given ID.
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

## Keychains

### Query Keychains

- **Method**: `keychains()`
- **Description**: Returns a list of all Keychains.
- **Parameters**:  
  ```sol
  @param pageRequest The pagination details
  ```
- **Output**:  
  ```sol
  @return keychains An array of `Keychain` structs containing the retrieved key requests
  @return pageResponse  pagination details
  ```
  
### Query a Keychain by ID

- **Method**: `keychainById()`
- **Description**: Returns a Keychain by ID.
- **Parameters**:    
  ```sol
  @param id The id of the keychain
  ```
- **Output**:  
  ```sol
  @return keychain The keychain
  ```

### Create a new Keychain

- **Method**: `newKeychain()`
- **Description**: Creates a new Keychain.
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

### Update a Keychain

- **Method**: `updateKeychain()`
- **Description**: Updates a Keychain.
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

### Add a Keychain admin

- **Method**: `addKeychainAdmin()`
- **Description**: Adds an admin to a Keychain.
- **Parameters**: 
  ```sol
  @param keychainId The keychain id
  @param newAdmin The new admin's address
  ```
- **Output**:
  ```sol
  @return success If execution was successful
  ```

### Remove a Keychain admin

- **Method**: `removeKeychainAdmin()`
- **Description**: Removes an admin from a Keychain.
- **Parameters**:  
  ```sol
  @param keychainId The id of the keychain
  @param admin The admin address
  ```
- **Output**:  
  ```sol
  @return success If execution was successful
  ```

### Add a Keychain Writer

- **Method**: `addKeychainWriter()`
- **Description**: Adds a Writer to a Keychain.
- **Parameters**:  
  ```sol
  @param keychainId The keychain id
  @param newWriter The new writer's address
  ```
- **Output**:
  ```sol
  @return success If execution was successful
  ```

## Key requests

### Query key requests

- **Method**: `keyRequests()`
- **Description**: Returns a list of all key requests.
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

### Query a key request by ID

- **Method**: `keyRequestById()`
- **Description**: Returns a key request by ID.
- **Parameters**:  
  ```sol
  @param id The id of the keyRequest
  ```
- **Output**:  
  ```sol
  @return keyRequest The key request
  ```

### Create a new key request

- **Method**: `newKeyRequest()`
- **Description**: Creates a new key request.
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

### Fulfill a key request

- **Method**: `fulfilKeyRequest()`
- **Description**: Fulfills a key request.
- **Parameters**:  
  ```sol
  @param requestId The request id
  @param pubKey The new created public key
  ```
- **Output**:
  ```sol
  @return success If execution was successful
  ```

### Reject a key request

- **Method**: `rejectKeyRequest()`
- **Description**: Rejects a key request.
- **Parameters**:
  ```sol
  @param requestId The request id
  @param rejectReason The reject reason
  ```
- **Output**:
  ```sol
  @return success If execution was successful
  ```

## Signature requests

### Query signature requests

- **Method**: `signRequests()`
- **Description**: Returns a list of all signature requests.
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

### Create a new signature request

- **Method**: `newSignRequest()`
- **Description**: Creates a new signature request.
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

### Fulfill a signature request

- **Method**: `fulfilSignRequest()`
- **Description**: Fulfills a signature request.
- **Parameters**: 
  ```sol
  @param requestId The request id
  @param signedData The signed data
  ```
- **Output**: 
  ```sol
  @return success If execution was successful
  ```

#### Reject a signature request

- **Method**: `rejectSignRequest()`
- **Description**: Rejects a signature request.
- **Parameters**:  
  ```sol
  @param requestId The request id
  @param rejectReason The reject reason
  ```
- **Output**:
  ```sol
  @return success If execution was successful
  ```

## Events

### `NewSpace`

- **Description**: An event emitted when [a new Space is created](#create-a-new-space).
- **Parameters**:  
  ```sol
  @dev NewSpace defines an Event emitted when a new space is created.
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

- **Description**: An event emitted when [a Keychain is updated](#update-a-keychain).
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

- **Description**: An event emitted when [a new key request is created](#create-a-new-key-request).
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

- **Description**: An event emitted when [a key request is fulfilled](#fulfill-a-key-request).
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
