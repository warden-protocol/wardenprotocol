---
sidebar_position: 3
---

# x/warden

## Overview

The `x/warden` module is a [Cosmos SDK](https://docs.cosmos.network/) module allowing users to create and manage their Spaces and request Keychains to sign payloads.

This module implements Warden's core concepts, which you can find in our Glossary:

- [Space](/learn/glossary#space)
- [Keychain](/learn/glossary#keychain)
- [Key](/learn/glossary#key)

## Concepts

### Space

A **Space** is a collection of users (owners) that share a common set of [Rules](/learn/glossary#approval-rule):

- **Admin Rule:** It's a applied to all admin operations such as adding or removing Space owners.
- **Signing Rule:** It's applied to all signature operations such as [requesting a new key](/learn/glossary#key-request) or [signature](/learn/glossary#signature-request).
- **Default Rule:** It's applied if no Rule is specified, allowing any operation if at least 1 of the Space owners approves it.

See also [Glossary: Space](/learn/glossary#space).

### Key

A **key** is the public part of a key pair, which is stored on-chain. Every key belongs to a certain [Space](#space).

Keys have unique identifiers used to refer to them when requesting a [Keychain](#keychain) to sign a payload.

See also [Glossary: Key](/learn/glossary#key).

### Keychain

A Keychain generates [keys](#key) and signs transactions. Optionally, it can set a fee for each request.

Keychains can be registered on-chain. Each Keychain has the following:

- A list of admins that can update the Keychain information
- A list of addresses called [Writers](/learn/glossary#keychain-writer): the only ones authorized to send updates to users' requests

See also [Glossary: Keychain](/learn/glossary#keychain).

### Analyzer

An Analyzer is a CosmWasm contract that can intercept a payload before it's signed by a [Keychain](#keychain).

An Analyzer can be used for the following purposes:

- To extract metadata from the payload, that can be referenced by Rules' expressions;
- To manipulate the payload before it is signed, e.g. hashing it following a specific algorithm

For example, it's possible to write an "Ethereum analyzer" that will extract informations such as the value being transferr and the address of the recipient, and will hash the payload using Ethereum's keccak256 algorithm.

This allow Keychains to only receive the final payload, without the need to have any knowledge of the payload's content.

## State

The `x/warden` module keeps state of the following primary objects:

- Spaces
- Keychains
- KeyRequests
- Keys
- SignRequests

In addition, the `x/warden` module keeps the following indexes to manage the aforementioned state:

- Keys by Space ID index
- Spaces by Owner address index

## Rules

The `x/warden` module provides the following variables to be used in Rules:

- `warden.space.owners`: the list of owners of a [Space](#space);
- `warden.analyzers.<addr>.<name>`: the variable `<name>` of the Analyzer registered at address `<addr>`

## Messages

### MsgNewSpace

Create a new [Space](#space), optionally specifying an Admin Rule, a Signing Rule, and additional owners.

Note: when not specified, both the Admin Rule and the Signing Rule are set to the default value of "at least one of its owners approves it".

This message is expected to fail in the following cases:

- An owner is specified twice.

### MsgNewKeychain

Create a new Keychain, specifying a human-readable description, optionally the fees for Key and Signature requests.

The creator will be the first admin of the Keychain.

This message is expected to fail in the following cases:

- The description is empty.

### MsgUpdateKeychain

Update the Keychain at the specified ID, specifying a human-readable description, and the fees for Key and Signature requests.

This message is expected to fail in the following cases:

- The description is empty.
- The creator is not an admin of the Keychain.

### MsgAddKeychainWriter

Adds a new writer to a Keychain.

This message is expected to fail in the following cases:

- The writer is already a writer of the Keychain.
- The creator is not an admin of the Keychain.

### MsgUpdateKeyRequest

Update the KeyRequest at the specified ID, submitting the public key bytes in
case of success, or a human-readable reason in case of failure.

This message is expected to fail in the following cases:

- The request is not found.
- The creator is not a writer of the Keychain for the request.
- The status field doesn't match the content of the result field.

### MsgFulfilSignatureRequest

Update the SignatureRequest at the specified ID, submitting the signature bytes
in case of success, or a human-readable reason in case of failure.

This message is expected to fail in the following cases:

- The request is not found.
- The creator is not a writer of the Keychain for the request.
- The status field doesn't match the content of the result field.

## Actions

The following can't be executed directly by users, must be wrapped inside `x/act`'s Actions instead.

### MsgAddSpaceOwner

Rule applied: `Space.AdminRule` if present, the default Rule otherwise.

Adds an owner to a [Space](#space).

This message is expected to fail in the following cases:

- The owner is already a member of the Space.

### MsgRemoveSpaceOwner

Rule applied: `Space.AdminRule` if present, the default Rule otherwise.

Remove an owner from a [Space](#space).

This message is expected to fail in the following cases:

- The owner is not a member of the Space.

### MsgUpdateSpace

Rule applied: `Space.AdminRule` if present, the default Rule otherwise.

Updates the Admin Rule and Signing Rule of a [Space](#space).

This message is expected to fail in the following cases:

- The specified Admin Rule ID doesn't exist.
- The specified Signing Rule ID doesn't exist.

### MsgNewKeyRequest

Rule applied: `Space.SigningRule` if present, the default Rule otherwise.

Create a new KeyRequest for the specified Keychain. The resulting Key will
belong to the specified [Space](#space).

Optionally, a Rule for the new key can be specified that will be applied to
signing operations of the key.

This message is expected to fail in the following cases:

- The Space doesn't exist.
- The Keychain doesn't exist.
- The Rule doesn't exist.

### MsgUpdateKey

Rule applied: `Key.Rule` if present, `Space.SigningRule` if present, the default Rule otherwise.

Update the key at the specified ID, specifying the new Rule for the key.

This message is expected to fail in the following cases:

- The key doesn't exist.
- The Rule doesn't exist.

### MsgNewSignatureRequest

Rule applied: `Key.Rule` if present, `Space.SigningRule` if present, the default Rule otherwise.

Create a new SignatureRequest for the specified key, for the Keychain that created the key.

A list of Analyzers addresses can be specified, they will be invoked as part of this message to extract information from the payload.

This message is expected to fail in the following cases:

- The key doesn't exist.
- One of the analyzers doesn't exist.
- One of the invoked analyzers fails.
- More than one analyzer returns a `data_for_signing` field.

## Events

See the [Protobuf definitions](https://github.com/warden-protocol/wardenprotocol/blob/main/proto/warden/warden/v1beta2/events.proto).

## Analyzers

Analyzers are CosmWasm smart contracts that implement the interface described below.

See a [sample Analyzer](https://github.com/warden-protocol/wardenprotocol/tree/main/contracts/contracts/basic-analyzer/src).

### Input

An `Analyze` message is expected to be handled by the `execute` function of the Analyzer contract.

The `input` field of the message is the binary payload submitted by the user during `MsgNewSignatureRequest`.

```rust
pub enum ExecuteMsg {
    Analyze { input: Binary },
}
```

### Output

As a result, the Analyzer contract should return a `Response` with the data field populated with a JSON-encoded `AnalyzeResult`:

```rust
pub struct AnalyzeResult<T> {
    pub data_for_signing: Option<Binary>,
    pub result: T,
}
```

where `T` is another struct specific to the Analyzer containing numeric or string fields.

The `data_for_signing` field is the data that will be signed by the Keychain when the `MsgNewSignatureRequest` is executed.

The `result` struct's fields will be available for Rules to reference.

