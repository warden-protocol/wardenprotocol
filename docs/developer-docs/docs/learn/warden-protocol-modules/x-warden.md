---
sidebar_position: 2
---

# x/warden

## Overview

The `x/warden` module is a [Cosmos SDK](https://docs.cosmos.network/) module allowing users to create and manage their Spaces and request Keychains to sign payloads.

This module implements Warden's core concepts:

- [Space](#space)
- [Keychain](#keychain)
- [Key](#key)

## Usage

You can call the `x/warden` module from your EVM smart contract using the [`x/warden` precompile](/build-an-app/precompiles/x-warden), as shown in the [Interact with `x/warden`](/category/interact-with-xwarden) section.

The `x/warden` module is used for signing transactions in our [automated Orders example](/build-an-agent/build-an-onchain-ai-agent/implement-automated-orders/introduction).


## Concepts

### Space

A **Space** is a collection of users (owners) that share a common set of [Rules](/learn/warden-protocol-modules/x-act#rule):

- **Admin Rule**: It's a applied to all admin operations such as adding or removing Space owners.
- **Signing Rule**: It's applied to all signature operations such as [requesting a new key](/learn/glossary#key-request) or [signature](/learn/glossary#signature-request).
- **Default Rule**: It's applied if no Rule is specified, allowing any operation if at least 1 of the Space owners approves it.

See also [Glossary: Space](/learn/glossary#space).

### Key

A **key** is the public part of a key pair, which is stored onchain. Every key belongs to a certain [Space](#space).

Keys have unique identifiers used to refer to them when requesting a [Keychain](#keychain) to sign a payload.

See also [Glossary: Key](/learn/glossary#key).

### Keychain

A Keychain fulfills [key requests](/learn/glossary#key-request) and [signature requests](/learn/glossary#signature-request) from users. Optionally, it can set a fee for each request.

Keychains can be registered onchain. Each Keychain has the following:

- A list of admins that can update the Keychain information
- A list of [Writers](/learn/glossary#keychain-writer)—the only addresses authorized to send updates to requests

See also [Glossary: Keychain](/learn/glossary#keychain), [Request flow](/learn/request-flow).

### Analyzer

An **Analyzer** is a [CosmWasm](https://cosmwasm.com) contract that can intercept a payload before it's signed by a [Keychain](#keychain). Using Analyzers allows Keychains to receive the final payload without the need to have any knowledge of its content.

This is what Analyzers can do:

- Extract payload metadata, which then can be referenced in [Rule](/learn/warden-protocol-modules/x-act#rule) expressions
- Manipulate the payload before it's signed—for example, hash it following a specific algorithm

To illustrate this, it's possible to write an Ethereum Analyzer that will do the following:

- Extract information: the value being sent and the destination address
- Hash the payload using Ethereum's Keccak256 algorithm

You can learn more in the [Analyzers](#analyzers) section of this article.

## State

The `x/warden` module keeps the state of the following primary objects:

- Spaces
- Keys
- Keychains
- KeyRequests
- SignRequests

To manage this state, the module also keeps the following indexes:

- Keys by Space ID
- Spaces by owner address

## Rules

The `x/warden` module provides the following variables to be used in [Rules](/learn/warden-protocol-modules/x-act#rule):

- `warden.space.owners`: The list of [Space](#space) owners
- `warden.analyzers.<addr>.<name>`: The [Analyzer](#analyzer) name and address

## Messages

### `MsgNewSpace`

Creates a new [Space](#space), optionally specifying the following:

- The Admin Rule
- The Signing Rule
- Additional owners

**Note**: If not specified, both the Admin and Signing Rules are set to the default Rule allowing any operation if at least 1 of the Space owners approves it.

This message is expected to fail in the following cases:

- An owner is specified twice.

### `MsgNewKeychain`

Creates a new [Keychain](#keychain), specifying the following:

- A human-readable description
- A [key request fee](/learn/glossary#key-request-fee) (optionally)
- A [signature request fee](/learn/glossary#signature-request-fee) (optionally)

**Note**: The Keychain creator will be its first admin.

This message is expected to fail in the following cases:

- The description is empty.

### `MsgUpdateKeychain`

Updates a [Keychain](#keychain) by ID, specifying the following:

- A human-readable description
- A [key request fee](/learn/glossary#key-request-fee)
- A [signature request fee](/learn/glossary#signature-request-fee)

This message is expected to fail in the following cases:

- The description is empty.
- The creator isn't an admin of the Keychain.

### `MsgAddKeychainWriter`

Adds a new [Writer](/learn/glossary#keychain-writer) to a [Keychain](#keychain).

This message is expected to fail in the following cases:

- The Writer is already a Writer of the Keychain.
- The creator isn't an admin of the Keychain.

### `MsgFulfilKeyRequest`

Updates a [key request](/learn/glossary#key-request) (`KeyRequest`) by ID:

- On success, submits the [public key](#key) bytes.
- On failure, submits a human-readable reason.

This message is expected to fail in the following cases:

- The request isn't found.
- The creator isn't a [Writer](/learn/glossary#keychain-writer) of the Keychain.
- The status field doesn't match the contents of the result field.

Learn more: [Key request flow](/learn/request-flow#key-request-flow)

### `MsgFulfilSignRequest`

Updates a [signature request](/learn/glossary#signature-request) (`SignRequest`) by ID:

- On success, submits the signature bytes.
- On failure, submits a human-readable reason.

This message is expected to fail in the following cases:

- The request isn't found.
- The creator isn't a [Writer](/learn/glossary#keychain-writer) of the Keychain.
- The status field doesn't match the content of the result field.

Learn more: [Signature request flow](/learn/request-flow#signature-request-flow)

## Actions

The following messages must be wrapped inside [Actions](/learn/warden-protocol-modules/x-act#action) from the `x/act` module (instead of being executed directly by users).

### `MsgAddSpaceOwner`

Adds an owner to a [Space](#space).

The Rule applied: `Space.AdminRule` if present, the default Rule otherwise.

This message is expected to fail in the following cases:

- The owner is already a member of the Space.

### `MsgRemoveSpaceOwner`

Removes an owner from a [Space](#space).

The Rule applied: `Space.AdminRule` if present, the default Rule otherwise.

This message is expected to fail in the following cases:

- The owner isn't a member of the Space.

### `MsgUpdateSpace`

Updates the Admin Rule and Signing Rule of a [Space](#space).

The Rule applied: `Space.AdminRule` if present, the default Rule otherwise.

This message is expected to fail in the following cases:

- The specified Admin Rule ID doesn't exist.
- The specified Signing Rule ID doesn't exist.

### `MsgNewKeyRequest`

Creates a new [key request](/learn/glossary#key-request) (`KeyRequest`) for a given [Keychain](#keychain). The resulting [Key](#key) will belong to a given [Space](#space). Optionally, the following can be specified:

- A Rule that will be applied to the signing operations of the new Key

The Rule applied: `Space.SigningRule` if present, the default Rule otherwise.

This message is expected to fail in the following cases:

- The Space doesn't exist.
- The Keychain doesn't exist.
- The Rule doesn't exist.

Learn more: [Key request flow](/learn/request-flow#key-request-flow)

### `MsgUpdateKey`

Updates a [Key](#key) by ID, specifying the following:

- A new Rule for the Key

The Rule applied: `Key.Rule` if present, `Space.SigningRule` if present, the default Rule otherwise.

This message is expected to fail in the following cases:

- The Key doesn't exist.
- The Rule doesn't exist.

### `MsgNewSignRequest`

Creates a new [signature request](/learn/glossary#signature-request) (`SignRequest`) for a given [Key](#key) and the [Keychain](#keychain) that created it. The following can be specified:

- A list of [Analyzer](#analyzer) addresses. They will be invoked as part of this message to extract information from the payload.

The Rule applied: `Key.Rule` if present, `Space.SigningRule` if present, the default Rule otherwise.

This message is expected to fail in the following cases:

- The Key doesn't exist.
- One of the Analyzers doesn't exist.
- One of the invoked Analyzers fails.
- More than one Analyzer returns the `data_for_signing` field.

Learn more: [Signature request flow](/learn/request-flow#signature-request-flow)

## Events

See the [Protobuf definitions on GitHub](https://github.com/warden-protocol/wardenprotocol/blob/main/proto/warden/warden/v1beta3/events.proto).

## Analyzers

[Analyzers](#analyzer) are CosmWasm smart contracts that implement the interface described below.

See a [sample Analyzer on GitHub](https://github.com/warden-protocol/wardenprotocol/tree/main/contracts/contracts/basic-analyzer/src).

### Input

An `Analyze` message is expected to be handled by the `execute` function of the Analyzer contract.

The `input` field of the message is the binary payload submitted by a user in [`MsgNewSignRequest`](#msgnewsignrequest).

```rust
pub enum ExecuteMsg {
    Analyze { input: Binary },
}
```

### Output

As a result, the Analyzer contract should return a `Response` where the data field is populated with a JSON-encoded `AnalyzeResult`:

```rust
pub struct AnalyzeResult<T> {
    pub data_for_signing: Option<Binary>,
    pub result: T,
}
```

In this code, `T` is another struct specific to the Analyzer, containing numeric or string fields.

The `data_for_signing` field is the data that will be signed by the [Keychain](#keychain) when the `MsgNewSignRequest` message is executed.

The fields of the `result` struct will be available for [Rules](/learn/warden-protocol-modules/x-act#rule) to reference.
