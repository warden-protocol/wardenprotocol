---
sidebar_position: 3
---

# x/warden

## Overview

The `x/warden` module is a [Cosmos SDK](https://docs.cosmos.network/) module allowing users to create and manage their Spaces and request Keychains to sign payloads.

This module implements Warden's core concepts:

- [Space](/learn/glossary#space)
- [Keychain](/learn/glossary#keychain)
- [Key](/learn/glossary#key)

## Concepts

### Space

See [Space](/learn/glossary#space).

A Space is a collection of users that share a common set of Rules.

The Admin Rule is a applied to all the "admin" operations (e.g. adding or
removing owners).

The Signing Rule is a applied to all the "sign" operations (e.g. requesting a
new key, requesting a new signature).

If not specified, the default Rule is "allow any operation when at least one of
its owner approves it".

### Key

See [Key](/learn/glossary#key).

The public part of a key. It is stored on-chain and has a unique identifier
that can be used to refer to it when requesting a Keychain to sign a payload.

Every Key belongs to a Space.

### Keychain

See [Keychain](/learn/glossary#keychain).

A Keychain can be registered on chain. It has a list of admins that can update
it's information.

A Keychain contains a list of addresses called "writers" that are the only ones
authorized to send updates to users' requests.

Optionally, a Keychain can set a fee for each request.

### Analyzer

A CosmWasm contract that can intercept a payload before it is signed by a
Keychain.

An Analyzer can be used:

* to extract metadata from the payload, that can be referenced by Rules'
  expressions;
* to manipulate the payload before it is signed, e.g. hashing it following a
  specific algorithm

For example, it's possible to write an "Ethereum analyzer" that will extract
informations such as the value being transferr and the address of the
recipient, and will hash the payload using Ethereum's keccak256 algorithm.

This allow Keychains to only receive the final payload, without the need to
have any knowledge of the payload's content.

## State

The `x/warden` module keeps state of the following primary objects:

* Spaces
* Keychains
* KeyRequests
* Keys
* SignRequests

In addition, the `x/warden` module keeps the following indexes to manage the
aforementioned state:

* Keys by Space ID index
* Spaces by Owner address index

## Rules

The `x/warden` module provides the following variables to be used in Rules:

* `warden.space.owners`: the list of owners of a Space;
* `warden.analyzers.<addr>.<name>`: the variable `<name>` of the Analyzer
  registered at address `<addr>`

## Messages

### MsgNewSpace

Create a new Space, optionally specifying an Admin Rule, a Signing Rule, and
additional owners.

Note: when not specified, both the Admin Rule and the Signing Rule are set to
the default value of "at least one of its owners approves it".

This message is expected to fail if:

* an owner is specified twice;

### MsgNewKeychain

Create a new Keychain, specifying a human-readable description, optionally the
fees for Key and Signature requests.

The creator will be the first admin of the Keychain.

This message is expected to fail if:

* the description is empty;

### MsgUpdateKeychain

Update the Keychain at the specified ID, specifying a human-readable
description, and the fees for Key and Signature requests.

This message is expected to fail if:

* the description is empty;
* the creator is not an admin of the Keychain;

### MsgAddKeychainWriter

Adds a new writer to a Keychain.

This message is expected to fail if:

* the writer is already a writer of the Keychain;
* the creator is not an admin of the Keychain;

### MsgUpdateKeyRequest

Update the KeyRequest at the specified ID, submitting the public key bytes in
case of success, or a human-readable reason in case of failure.

This message is expected to fail if:

* the request is not found;
* the creator is not a writer of the Keychain for the request;
* the status field doesn't match the content of the result field;

### MsgFulfilSignatureRequest

Update the SignatureRequest at the specified ID, submitting the signature bytes
in case of success, or a human-readable reason in case of failure.

This message is expected to fail if:

* the request is not found;
* the creator is not a writer of the Keychain for the request;
* the status field doesn't match the content of the result field;

## Actions

The following can't be executed directly by users, must be wrapped inside
`x/act`'s Actions instead.

### MsgAddSpaceOwner

Rule applied: `Space.AdminRule` if present, default Space rule otherwise.

Adds an owner to a Space.

This message is expected to fail if:

* the owner is already a member of the Space;

### MsgRemoveSpaceOwner

Rule applied: `Space.AdminRule` if present, default Space rule otherwise.

Remove an owner from a Space.

This message is expected to fail if:

* the owner is not a member of the Space;

### MsgUpdateSpace

Rule applied: `Space.AdminRule` if present, default Space rule otherwise.

Update a Space's Admin Rule and Signing Rule.

This message is expected to fail if:

* the specified Admin Rule ID doesn't exist;
* the specified Signing Rule ID doesn't exist;

### MsgNewKeyRequest

Rule applied: `Space.SigningRule` if present, default Space rule otherwise.

Create a new KeyRequest for the specified Keychain. The resulting Key will
belong to the specified Space.

Optionally, a Rule for the new Key can be specified that will be applied to
signing operations of the Key.

This message is expected to fail if:

* the space doesn't exist;
* the keychain doesn't exist;
* the rule doesn't exist;

### MsgUpdateKey

Rule applied: `Key.Rule` if present, `Space.SigningRule` if present, default
Space rule otherwise.

Update the Key at the specified ID, specifying the new Rule for the Key.

This message is expected to fail if:

* the key doesn't exist;
* the rule doesn't exist;

### MsgNewSignatureRequest

Rule applied: `Key.Rule` if present, `Space.SigningRule` if present, default
Space rule otherwise.

Create a new SignatureRequest for the specified Key, for the Keychain that
created the Key.

A list of Analyzers addresses can be specified, they will be invoked as part of
this message to extract informations from the payload.

This message is expected to fail if:

* the key doesn't exist;
* one of the analyzers doesn't exist;
* one of the invoked analyzers fails;
* more than one analyzer returns a `data_for_signing` field;

## Events

See the [Protobuf definitions](https://github.com/warden-protocol/wardenprotocol/blob/main/proto/warden/warden/v1beta2/events.proto).

## Analyzers

Analyzers are CosmWasm smart contracts that implement the interface described
below.

See a [sample Analyzer](https://github.com/warden-protocol/wardenprotocol/tree/main/contracts/contracts/basic-analyzer/src).

### Input

An `Analyze` message is expected to be handled by the `execute` function of
the Analyzer contract.

The `input` field of the message is the binary payload submitted by the
user during `MsgNewSignatureRequest`.

```rust
pub enum ExecuteMsg {
    Analyze { input: Binary },
}
```

### Output

As a result, the Analyzer contract should return a `Response` with the data
field populated with a JSON-encoded `AnalyzeResult`:

```rust
pub struct AnalyzeResult<T> {
    pub data_for_signing: Option<Binary>,
    pub result: T,
}
```

where `T` is another struct specific to the Analyzer containing numeric or
string fields.

The `data_for_signing` field is the data that will be signed by the Keychain
when the `MsgNewSignatureRequest` is executed.

The `result` struct's fields will be available for Rules to reference.

