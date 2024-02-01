# `x/identity`

## Abstract

This document specifies the identity module of the Warden Protocol.

The identity module is responsible for specifying and managing spaces and keychains.
A space represents a group of owners that manage and act in the name of the space
to request keys and signatures, manage L1 wallets and QAssets. 
A keychain represents an outside actor that provides key management services.

## Contents

* [Concepts](#concepts)
    * [Spaces](#spaces)
    * [Keychains](#keychains)
* [State](#state)
    * [Space](#space)
    * [Action](#action)
    * [Keychain](#keychain)
* [Msg Service](#msg-service)
    * [Msg/NewSpace](#msgnewspace)
    * [Msg/AddSpaceOwner](#msgaddspaceowner)
    * [Msg/RemoveSpaceOwner](#msgremovespaceowner)
    * [Msg/AppendChildSpace](#msgappendchildspace)
    * [Msg/ApproveAction](#msgapproveaction)
    * [Msg/NewKeychain](#msgnewkeychain)
    * [Msg/AddKeychainParty](#msgaddkeychainparty)
* [Client](#client)
    * [CLI](#cli)
    * [gRPC](#grpc)
    * [REST](#rest)

## Concepts

### Spaces

A space lets Warden Protocol accounts manage their L1 assets and QAssets collectively 
and acts as the main identity abstraction model for the Warden Protocol. Any Warden Protocol 
account can create a space and manage it to add or remove other accounts, called owners, 
or adjust the space's intents. The owners can act in the name of the space, particularly for QAssets management, or for themselves through the request of keys and signatures of L1 wallets. 
Spaces can also control other spaces, indicated by the childspace attribute, 
enabling a hierarchical and distinct way of managing assets. A space also has an admin- 
and signing intent that defines required approvals to authorize respective operations. 
Invoking a intent that requires approval for others creates an action to which eligible 
owners respond. 

A space is an account with an address prefixed by `wardenspace`. It utilizes
an interface to the `bank` module to interact with assets on the Warden Protocol. 

### Keychains

A keychain specifies an external key management service to Warden Protocol. A
keychain has its own identifier that gets added to key- and signature requests
to identify by whom the request should be processes. Consequently, the keychain
only needs to subscribe to requests that contain their respective keychain id. 

In the future, a keychain object should be able to define its own fee model in
the keychain object.	

## State

### Space

`space/value/ | []byte(addr) -> ProtocolBuffer(Space) `
addr is generated with `bech32("wardenspace", sha256(bigEndian(spaceCount)))`
`spaceCount` is incremented when creating a new space

### Action

`action/value/ | BigEndian(actionCount) -> ProtocolBuffer(Action)`
`actionCount` is incremented when creating a new action

### Keychain 

`keychain/value/ | BigEndian(keychainCount) -> ProtocolBuffer(Keychain)`
`keychainCount` is incremented when creating a new keychain

## Msg Service

### Msg/NewSpace

A new space can be created with the `MsgNewSpace`, which has a creator address.

```go reference
https://github.com/warden-protocol/wardenprotocol/blob/962d2b28de5d3d5844b4774180cb9c24d7132b5c/blockchain/proto/wardenprotocol/identity/tx.proto#L41
```

It's expected to fail if

* creator is not correctly set (e.g. wrong address format, duplicates, or with 0 weight).

### Msg/AddSpaceOwner

Space owners can be proposed to be added with the `AddSpaceOwner`.

```go reference
https://github.com/warden-protocol/wardenprotocol/blob/962d2b28de5d3d5844b4774180cb9c24d7132b5c/blockchain/proto/wardenprotocol/identity/tx.proto#L45C1-L49C2
```

An owner gets proposed to be added by specifying the creator of the transaction, the space and the new owner's account. 
It then requires approval of the respective approver set. 

It's expected to fail if:

* the newOwner is not correctly set (e.g. wrong address format, duplicates, or with 0 weight)
* after certain time, the required approvals have not been met

### Msg/RemoveSpaceOwner

Space owners can be proposed to be removed with the `RemoveSpaceOwner`.

```go reference
https://github.com/warden-protocol/wardenprotocol/blob/962d2b28de5d3d5844b4774180cb9c24d7132b5c/blockchain/proto/wardenprotocol/identity/tx.proto#L53C1-L57C2
```

An owner gets proposed to be removed by specifying the creator of the transaction, the space and the owner's account to be removed. 
It then requires approval of the respective approver set. 

It's expected to fail if:

* the creator is not an owner of the space
* the owner is not correctly set (e.g. wrong address format, duplicates, or with 0 weight)
* after certain time, the required approvals have not been met

### Msg/AppendChildSpace

The `AppendChildSpace` can be used to propose adding a child space to a space.

```go reference
https://github.com/warden-protocol/wardenprotocol/blob/962d2b28de5d3d5844b4774180cb9c24d7132b5c/blockchain/proto/wardenprotocol/identity/tx.proto#L84C1-L88C2
```

An owner of a space can propose adding a different space as its child space. 
The message specifies the creator of the transaction, the parentspaceaddress and the childspaceaddress. 

It's expected to fail if:

* the signer is not an owner of the group.
* the space addresses are not correctly set (e.g. wrong address format, duplicates, or with 0 weight)

### Msg/ApproveAction

Owners of a space can approve an Action with `MsgApproveAction`, which defines the transaction's creator address, an action type and the action id.

```go reference
https://github.com/warden-protocol/wardenprotocol/blob/962d2b28de5d3d5844b4774180cb9c24d7132b5c/blockchain/proto/wardenprotocol/identity/tx.proto#L61C1-L65C2
```

It's expected to fail if:

* the signer is not inside the space to respond or already has approved it
* the action id is invalid (because it does not exist or has been closed already)

### Msg/NewKeychain

The `NewKeychain` can be used to add a new keychain object on the Warden Protocol.

```go reference
https://github.com/warden-protocol/wardenprotocol/blob/962d2b28de5d3d5844b4774180cb9c24d7132b5c/blockchain/proto/wardenprotocol/identity/tx.proto#L69C1-L72C2
```

A new keychain object can be created with the `MsgNewKeychain`, which has the creator of the transaction and a description as input. Processing the transaction returns the keychain id. 

It's not expected to fail.

### Msg/AddKeychainParty

The `MsgAddKeychainParty` can be used to add a new party to the keychain. It takes the creator of the transaction, the keychainId and the new party as inputs. 

```go reference
https://github.com/warden-protocol/wardenprotocol/blob/962d2b28de5d3d5844b4774180cb9c24d7132b5c/blockchain/proto/wardenprotocol/identity/tx.proto#L76C1-L80C2
```

A new keychain party can be added with the `MsgAddKeychainParty`, which has the keychain-id of the keychain and a new party to be added to the keychain. 

It's expected to fail if the signer is not the initiator of the keychain.

## Client

### CLI

A user can query and interact with the `identity` module using the CLI.

#### Query

The `query` commands allow users to query `identity` state.

```bash
w query identity --help
```

##### spaces

The `spaces` command allows users to query for existing spaces on the Warden Protocol. 

```bash
w query identity spaces 
```

Example Output:

```bash
pagination:
  next_key: null
  total: "1"
spaces:
- address: wardenspace14a2hpadpsy9h5sm54xj
  creator: warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
  owners:
  - warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
```

##### SpacesByOwner

The `spaces-by-owner` command allows users to query for spaces information by account address of a potential owner.

```bash
w spaces-by-owner [owner]
```

Example:

```bash
w query identity spaces-by-owner warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
```

Example Output:

```bash
pagination:
  next_key: null
  total: "1"
spaces:
- address: wardenspace14a2hpadpsy9h5sm54xj
  creator: warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
  owners:
  - warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
```

##### actions

The `actions` command allows users to query for pending actions.

```bash
w query identity actions
```

Example:

```bash
w query identity actions
```

Example Output:

```bash
- approvers:
  - warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
  completed: true
  id: "0"
  msg:
    '@type': /wardenprotocol.identity.MsgAddSpaceOwner
    creator: warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
    new_owner: warden1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3c5jckcg
    space_addr: wardenspace14a2hpadpsy9h5sm54xj
pagination:
  next_key: null
  total: "1"
```

##### keychains

The `keychains` command allows users to query for existing keychains registered on the Warden Protocol.

```bash
w query identity keychains
```

Example:

```bash
w query identity keychains
```

Example Output:

```bash
keychains:
- admins:
  - warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
  creator: warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
  description: ACME corp
  id: "0"
  parties:
  - warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
pagination:
  next_key: null
  total: "1"
```

### gRPC

A user can query the `identity` module using gRPC endpoints.

#### Spaces

The `spaces` command allows users to query for existing spaces on the Warden Protocol. 

```bash
wardenprotocol.identity.Query.Spaces
```

Example:

```bash
grpcurl -plaintext localhost:9090 wardenprotocol.identity.Query.Spaces
```

Example Output:

```bash
{
  "pagination": {
    "total": "1"
  },
  "spaces": [
    {
      "address": "wardenspace14a2hpadpsy9h5sm54xj",
      "creator": "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5",
      "owners": [
        "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"
      ]
    }
  ]
}
```

#### SpacesByOwner

The `SpacesByOwner` command allows users to query for spaces information by account address of a potential owner.

```bash
wardenprotocol.identity.Query.SpacesByOwner
```

Example:

```bash
grpcurl -plaintext -d '{"owner":"warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"}' localhost:9090 wardenprotocol.identity.Query.SpacesByOwner
```

Example Output:

```bash
{
  "pagination": {
    "total": "1"
  },
  "spaces": [
    {
      "address": "wardenspace14a2hpadpsy9h5sm54xj",
      "creator": "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5",
      "owners": [
        "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"
      ]
    }
  ]
}
```

#### Actions

The `actions` command allows users to query for pending actions.

```bash
wardenprotocol.identity.Query.Actions
```

Example:

```bash
grpcurl -plaintext localhost:9090 wardenprotocol.identity.Query.Actions
```

Example Output:

```bash
{
  "pagination": {
    "total": "1"
  },
  "actions": [
    {
      "approvers": [
        "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"
      ],
      "completed": true,
      "msg": {"@type":"/wardenprotocol.identity.MsgAddSpaceOwner","creator":"warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5","newOwner":"warden1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3c5jckcg","spaceAddr":"wardenspace14a2hpadpsy9h5sm54xj"}
    }
  ]
}
```

#### Keychains

The `keychains` command allows users to query for existing keychains registered on the Warden Protocol.

```bash
wardenprotocol.identity.Query.Keychains
```

Example:

```bash
grpcurl -plaintext localhost:9090 wardenprotocol.identity.Query.Keychains 
```

Example Output:

```bash
{
  "pagination": {
    "total": "1"
  },
  "keychains": [
    {
      "creator": "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5",
      "description": "ACME corp",
      "admins": [
        "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"
      ],
      "parties": [
        "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"
      ]
    }
  ]
}
```

### REST

A user can query the `identity` module using REST endpoints.

#### Spaces

The `spaces` command allows users to query for existing spaces on the Warden Protocol. 

```bash
/wardenprotocol/identity/spaces
```

Example:

```bash
curl localhost:1317/wardenprotocol/identity/spaces

```

Example Output:

```bash
{
   "pagination":{
      "next_key":null,
      "total":"1"
   },
   "spaces":[
      {
         "address":"wardenspace14a2hpadpsy9h5sm54xj",
         "creator":"warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5",
         "owners":[
            "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5",
            "warden1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3c5jckcg"
         ],
         "child_spaces":[
            
         ],
         "admin_intent":"",
         "sign_intent":""
      }
   ]
}
```

#### SpacesByOwner

The `SpacesByOwner` command allows users to query for spaces information by account address of a potential owner.

```bash
/wardenprotocol/identity/spaces_by_owner
```

Example:

```bash
curl 'http://localhost:1317/wardenprotocol/identity/spaces_by_owner?owner=warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5'
```

Example Output:

```bash
{
   "pagination":{
      "next_key":null,
      "total":"1"
   },
   "spaces":[
      {
         "address":"wardenspace14a2hpadpsy9h5sm54xj",
         "creator":"warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5",
         "owners":[
            "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5",
            "warden1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3c5jckcg"
         ],
         "child_spaces":[
            
         ],
         "admin_intent":"",
         "sign_intent":""
      }
   ]
}
```

#### Actions

The `actions` command allows users to query for pending actions.

```bash
/wardenprotocol/identity/actions
```

Example:

```bash
curl localhost:1317/wardenprotocol/identity/actions
```

Example Output:

```bash
{
   "pagination":{
      "next_key":null,
      "total":"1"
   },
   "actions":[
      {
         "id":"0",
         "approvers":[
            "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"
         ],
         "completed":true,
         "msg":{
            "@type":"/wardenprotocol.identity.MsgAddSpaceOwner",
            "creator":"warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5",
            "space_addr":"wardenspace14a2hpadpsy9h5sm54xj",
            "new_owner":"warden1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3c5jckcg"
         }
      }
   ]
}
```

#### Keychains

The `keychains` command allows users to query for existing keychains registered on the Warden Protocol.

```bash
/wardenprotocol/identity/keychains
```

Example:

```bash
curl localhost:1317/wardenprotocol/identity/keychains
```

Example Output:

```bash
{
   "pagination":{
      "next_key":null,
      "total":"1"
   },
   "keychains":[
      {
         "id":"0",
         "creator":"warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5",
         "description":"ACME corp",
         "admins":[
            "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"
         ],
         "parties":[
            "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"
         ]
      }
   ]
}
```
