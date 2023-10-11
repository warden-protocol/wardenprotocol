# `x/identity`

## Abstract

This document specifies the identity module of the Fusion Chain.

The identity module is responsible for specifying and managing workspaces and keyrings.
A workspace represents a group of owners that manage and act in the name of the workspace
to request keys and signatures, manage L1 wallets and QAssets. 
A keyring represents an outside actor that provides key management services like an MPC cluster.

## Contents

* [Concepts](#concepts)
    * [Workspaces](#workspaces)
    * [Keyrings](#keyrings)
* [State](#state)
    * [Workspace](#workspace)
    * [Action](#action)
    * [Keyring](#keyring)
* [Msg Service](#msg-service)
    * [Msg/NewWorkspace](#msgnewworkspace)
    * [Msg/AddWorkspaceOwner](#msgaddworkspaceowner)
    * [Msg/RemoveWorkspaceOwner](#msgremoveworkspaceowner)
    * [Msg/AppendChildWorkspace](#msgappendchildworkspace)
    * [Msg/ApproveAction](#msgapproveaction)
    * [Msg/NewKeyring](#msgnewkeyring)
    * [Msg/AddKeyringParty](#msgaddkeyringparty)
* [Client](#client)
    * [CLI](#cli)
    * [gRPC](#grpc)
    * [REST](#rest)

## Concepts

### Workspaces

A workspace lets Fusion Chain accounts manage their L1 assets and QAssets collectively 
and acts as the main identity abstraction model for the Fusion Chain. Any Fusion Chain 
account can create a workspace and manage it to add or remove other accounts, called owners, 
or adjust the workspace's policies. The owners can act in the name of the workspace, particularly for QAssets management, or for themselves through the request of keys and signatures of L1 wallets. 
Workspaces can also control other workspaces, indicated by the childworkspace attribute, 
enabling a hierarchical and distinct way of managing assets. A workspace also has an admin- 
and signing policy that defines required approvals to authorize respective operations. 
Invoking a policy that requires approval for others creates an action to which eligible 
owners respond. 

A workspace is an account with an address prefixed by `qredoworkspace`. It utilizes
an interface to the `bank` module to interact with assets on the Fusion Chain. 

### Keyrings

A keyring specifies an external key management service to Fusion Chain, like a Multi-Party
Computation (MPC) cluster. A keyring has its own identifier that gets added to key- and 
signature requests to identify by whom the request should be processes. Consequently, the
keyring only needs to subscribe to requests that contain their respective keyring id. 

In the future, a keyring object should be able to define its own fee model in the keyring
object.	

## State

### Workspace

`workspace/value/ | []byte(addr) -> ProtocolBuffer(Workspace) `
addr is generated with `bech32("qredoworkspace", sha256(bigEndian(workspaceCount)))`
`workspaceCount` is incremented when creating a new workspace

### Action

`action/value/ | BigEndian(actionCount) -> ProtocolBuffer(Action)`
`actionCount` is incremented when creating a new action

### Keyring 

`keyring/value/ | BigEndian(keyringCount) -> ProtocolBuffer(Keyring)`
`keyringCount` is incremented when creating a new keyring

## Msg Service

### Msg/NewWorkspace

A new workspace can be created with the `MsgNewWorkspace`, which has a creator address.

```go reference
https://github.com/qredo/fusionchain/blob/962d2b28de5d3d5844b4774180cb9c24d7132b5c/blockchain/proto/fusionchain/identity/tx.proto#L41
```

It's expected to fail if

* creator is not correctly set (e.g. wrong address format, duplicates, or with 0 weight).

### Msg/AddWorkspaceOwner

Workspace owners can be proposed to be added with the `AddWorkspaceOwner`.

```go reference
https://github.com/qredo/fusionchain/blob/962d2b28de5d3d5844b4774180cb9c24d7132b5c/blockchain/proto/fusionchain/identity/tx.proto#L45C1-L49C2
```

An owner gets proposed to be added by specifying the creator of the transaction, the workspace and the new owner's account. 
It then requires approval of the respective approver set. 

It's expected to fail if:

* the newOwner is not correctly set (e.g. wrong address format, duplicates, or with 0 weight)
* after certain time, the required approvals have not been met

### Msg/RemoveWorkspaceOwner

Workspace owners can be proposed to be removed with the `RemoveWorkspaceOwner`.

```go reference
https://github.com/qredo/fusionchain/blob/962d2b28de5d3d5844b4774180cb9c24d7132b5c/blockchain/proto/fusionchain/identity/tx.proto#L53C1-L57C2
```

An owner gets proposed to be removed by specifying the creator of the transaction, the workspace and the owner's account to be removed. 
It then requires approval of the respective approver set. 

It's expected to fail if:

* the creator is not an owner of the workspace
* the owner is not correctly set (e.g. wrong address format, duplicates, or with 0 weight)
* after certain time, the required approvals have not been met

### Msg/AppendChildWorkspace

The `AppendChildWorkspace` can be used to propose adding a child workspace to a workspace.

```go reference
https://github.com/qredo/fusionchain/blob/962d2b28de5d3d5844b4774180cb9c24d7132b5c/blockchain/proto/fusionchain/identity/tx.proto#L84C1-L88C2
```

An owner of a workspace can propose adding a different workspace as its child workspace. 
The message specifies the creator of the transaction, the parentworkspaceaddress and the childworkspaceaddress. 

It's expected to fail if:

* the signer is not an owner of the group.
* the workspace addresses are not correctly set (e.g. wrong address format, duplicates, or with 0 weight)

### Msg/ApproveAction

Owners of a workspace can approve an Action with `MsgApproveAction`, which defines the transaction's creator address, an action type and the action id.

```go reference
https://github.com/qredo/fusionchain/blob/962d2b28de5d3d5844b4774180cb9c24d7132b5c/blockchain/proto/fusionchain/identity/tx.proto#L61C1-L65C2
```

It's expected to fail if:

* the signer is not inside the workspace to respond or already has approved it
* the action id is invalid (because it does not exist or has been closed already)

### Msg/NewKeyring

The `NewKeyring` can be used to add a new keyring object on the Fusion Chain.

```go reference
https://github.com/qredo/fusionchain/blob/962d2b28de5d3d5844b4774180cb9c24d7132b5c/blockchain/proto/fusionchain/identity/tx.proto#L69C1-L72C2
```

A new keyring object can be created with the `MsgNewKeyring`, which has the creator of the transaction and a description as input. Processing the transaction returns the keyring id. 

It's not expected to fail.

### Msg/AddKeyringParty

The `MsgAddKeyringParty` can be used to add a new party to the keyring. It takes the creator of the transaction, the keyringId and the new party as inputs. 

```go reference
https://github.com/qredo/fusionchain/blob/962d2b28de5d3d5844b4774180cb9c24d7132b5c/blockchain/proto/fusionchain/identity/tx.proto#L76C1-L80C2
```

A new keyring party can be added with the `MsgAddKeyringParty`, which has the keyring-id of the keyring and a new party to be added to the keyring. 

It's expected to fail if the signer is not the initiator of the keyring.

## Client

### CLI

A user can query and interact with the `identity` module using the CLI.

#### Query

The `query` commands allow users to query `identity` state.

```bash
fchain query identity --help
```

##### workspaces

The `workspaces` command allows users to query for existing workspaces on the Fusion Chain. 

```bash
fchain query identity workspaces 
```

Example Output:

```bash
pagination:
  next_key: null
  total: "1"
workspaces:
- address: qredoworkspace14a2hpadpsy9h5m6us54
  creator: qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j
  owners:
  - qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j
```

##### WorkspacesByOwner

The `workspaces-by-owner` command allows users to query for workspaces information by account address of a potential owner.

```bash
fchain workspaces-by-owner [owner]
```

Example:

```bash
fchain query identity workspaces-by-owner qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j
```

Example Output:

```bash
pagination:
  next_key: null
  total: "1"
workspaces:
- address: qredoworkspace14a2hpadpsy9h5m6us54
  creator: qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j
  owners:
  - qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j
```

##### actions

The `actions` command allows users to query for pending actions.

```bash
fchain query identity actions
```

Example:

```bash
fchain query identity actions
```

Example Output:

```bash
- approvers:
  - qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j
  completed: true
  id: "0"
  msg:
    '@type': /fusionchain.identity.MsgAddWorkspaceOwner
    creator: qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j
    new_owner: qredo1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3cmt9j9w
    workspace_addr: qredoworkspace14a2hpadpsy9h5m6us54
pagination:
  next_key: null
  total: "1"
```

##### keyrings

The `keyrings` command allows users to query for existing keyrings registered on the Fusion Chain.

```bash
fchain query identity keyrings
```

Example:

```bash
fchain query identity keyrings
```

Example Output:

```bash
keyrings:
- admins:
  - qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j
  creator: qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j
  description: ACME corp
  id: "0"
  parties:
  - qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j
pagination:
  next_key: null
  total: "1"
```

### gRPC

A user can query the `identity` module using gRPC endpoints.

#### Workspaces

The `workspaces` command allows users to query for existing workspaces on the Fusion Chain. 

```bash
fusionchain.identity.Query.Workspaces
```

Example:

```bash
grpcurl -plaintext localhost:9090 fusionchain.identity.Query.Workspaces
```

Example Output:

```bash
{
  "pagination": {
    "total": "1"
  },
  "workspaces": [
    {
      "address": "qredoworkspace14a2hpadpsy9h5m6us54",
      "creator": "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j",
      "owners": [
        "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j"
      ]
    }
  ]
}
```

#### WorkspacesByOwner

The `WorkspacesByOwner` command allows users to query for workspaces information by account address of a potential owner.

```bash
fusionchain.identity.Query.WorkspacesByOwner
```

Example:

```bash
grpcurl -plaintext -d '{"owner":"qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j"}' localhost:9090 fusionchain.identity.Query.WorkspacesByOwner
```

Example Output:

```bash
{
  "pagination": {
    "total": "1"
  },
  "workspaces": [
    {
      "address": "qredoworkspace14a2hpadpsy9h5m6us54",
      "creator": "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j",
      "owners": [
        "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j"
      ]
    }
  ]
}
```

#### Actions

The `actions` command allows users to query for pending actions.

```bash
fusionchain.identity.Query.Actions
```

Example:

```bash
grpcurl -plaintext localhost:9090 fusionchain.identity.Query.Actions
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
        "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j"
      ],
      "completed": true,
      "msg": {"@type":"/fusionchain.identity.MsgAddWorkspaceOwner","creator":"qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j","newOwner":"qredo1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3cmt9j9w","workspaceAddr":"qredoworkspace14a2hpadpsy9h5m6us54"}
    }
  ]
}
```

#### Keyrings

The `keyrings` command allows users to query for existing keyrings registered on the Fusion Chain.

```bash
fusionchain.identity.Query.Keyrings
```

Example:

```bash
grpcurl -plaintext localhost:9090 fusionchain.identity.Query.Keyrings 
```

Example Output:

```bash
{
  "pagination": {
    "total": "1"
  },
  "keyrings": [
    {
      "creator": "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j",
      "description": "ACME corp",
      "admins": [
        "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j"
      ],
      "parties": [
        "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j"
      ]
    }
  ]
}
```

### REST

A user can query the `identity` module using REST endpoints.

#### Workspaces

The `workspaces` command allows users to query for existing workspaces on the Fusion Chain. 

```bash
/fusionchain/identity/workspaces
```

Example:

```bash
curl localhost:1317/fusionchain/identity/workspaces

```

Example Output:

```bash
{
   "pagination":{
      "next_key":null,
      "total":"1"
   },
   "workspaces":[
      {
         "address":"qredoworkspace14a2hpadpsy9h5m6us54",
         "creator":"qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j",
         "owners":[
            "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j",
            "qredo1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3cmt9j9w"
         ],
         "child_workspaces":[
            
         ],
         "admin_policy":"",
         "sign_policy":""
      }
   ]
}
```

#### WorkspacesByOwner

The `WorkspacesByOwner` command allows users to query for workspaces information by account address of a potential owner.

```bash
/fusionchain/identity/workspaces_by_owner
```

Example:

```bash
curl 'http://localhost:1317/fusionchain/identity/workspaces_by_owner?owner=qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j'
```

Example Output:

```bash
{
   "pagination":{
      "next_key":null,
      "total":"1"
   },
   "workspaces":[
      {
         "address":"qredoworkspace14a2hpadpsy9h5m6us54",
         "creator":"qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j",
         "owners":[
            "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j",
            "qredo1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3cmt9j9w"
         ],
         "child_workspaces":[
            
         ],
         "admin_policy":"",
         "sign_policy":""
      }
   ]
}
```

#### Actions

The `actions` command allows users to query for pending actions.

```bash
/fusionchain/identity/actions
```

Example:

```bash
curl localhost:1317/fusionchain/identity/actions
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
            "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j"
         ],
         "completed":true,
         "msg":{
            "@type":"/fusionchain.identity.MsgAddWorkspaceOwner",
            "creator":"qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j",
            "workspace_addr":"qredoworkspace14a2hpadpsy9h5m6us54",
            "new_owner":"qredo1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3cmt9j9w"
         }
      }
   ]
}
```

#### Keyrings

The `keyrings` command allows users to query for existing keyrings registered on the Fusion Chain.

```bash
/fusionchain/identity/keyrings
```

Example:

```bash
curl localhost:1317/fusionchain/identity/keyrings
```

Example Output:

```bash
{
   "pagination":{
      "next_key":null,
      "total":"1"
   },
   "keyrings":[
      {
         "id":"0",
         "creator":"qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j",
         "description":"ACME corp",
         "admins":[
            "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j"
         ],
         "parties":[
            "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j"
         ]
      }
   ]
}
```
