# `x/qassets`

## Abstract

This document specifies the QAssets module of the Fusion Chain.

The QAssets module is responsible for minting and burning of QAssets. QAssets are
bridged assets from L1 blockchains. From there on, accounts can manage their
QAssets through the `qassets` module which has an interface to the `bank` module to send QAssets.

## Contents

* [Concepts](#concepts)
    * [QAssets](#qassets)
* [State](#state)
    * [QAssets](#qasset)
* [Msg Service](#msg-service)
    * [Msg/Mint](#msgmint)
    * [Msg/Send](#msgsend)
    * [Msg/Burn](#msgburn)
* [Client](#client)
    * [CLI](#cli)
    * [gRPC](#grpc)
    * [REST](#rest)

## Concepts

### QAssets

QAssets are bridged assets coming from other blockchains and tracked in the `bank` module.
To bridge and mint QAssets, users have to send the funds on the source blockchain to Qredo's
omnibus address, which gets picked up by the Verifiable Oracles which create a ZKP and 
report the change to the Fusion Chain's verifier smart contract. After the ZKP has been 
successfully verified, the verifier contract sends a mint message to the QAssets module
that programmatically creates a deterministic denom for the asset and mints the respective
amount to the sender's workspace account. From there on, the owners manage the QAssets 
collectively and within their workspace policies through the bank module. 

## State

### QAsset

TBD

## Msg Service

### Msg/Mint

QAssets can be created with the `MsgMint`. 

```go reference
https://github.com/qredo/fusionchain/blob/bc0fc8691de8fbf55e450f6e9335f6a1b3ea23e0/blockchain/proto/fusionchain/qassets/tx.proto#L25C1-L33C2
```

Minting QAssets takes the transaction's creator address, the source wallet, the workspace address it should be minted to, if it is a token or a coin, the token name, the token contract address and the amount. The verifier contract forwards this information as it's derived from the submitted ZKP from the Verifiable Oracle. 

It's expected to fail if

* creator is not correctly set (e.g. wrong address format, duplicates, or with 0 weight).
* FromWalletId is invalid, or does not belong to a wallet registered on Fusion Chain
* ToWorkspaceAddr is invalid, or it does not contain the FromWalletId
* TokenContractAddr is invalid

### Msg/Send

Workspace owners can send between workspaces QAssets with `MsgSend`.

```go reference
https://github.com/qredo/fusionchain/blob/bc0fc8691de8fbf55e450f6e9335f6a1b3ea23e0/blockchain/proto/fusionchain/qassets/tx.proto#L49C1-L55C2
```

Sending QAssets takes the transaction's creator address, the source workspace address, the destination workspace address, the QAsset denom and the amount.

It's expected to fail if:

* creator is not correctly set (e.g. wrong address format, duplicates, or with 0 weight).
* FromWalletId is invalid, or does not belong to a wallet registered on Fusion Chain
* ToWorkspaceAddr is invalid, or it does not contain the FromWalletId
* QAssetDenom is invalid

### Msg/Burn

Workspace owners can burn and withdraw QAssets to their original blockchain with `MsgBurn`.

```go reference
https://github.com/qredo/fusionchain/blob/bc0fc8691de8fbf55e450f6e9335f6a1b3ea23e0/blockchain/proto/fusionchain/qassets/tx.proto#L37C1-L45C2
```

Burning QAssets takes the transaction's creator address, the source workspace address, the L1 address it should be withdrawn to, if it is a token or a coin, the token name, the token contract address and the amount. 

It's expected to fail if:

* creator is not correctly set (e.g. wrong address format, duplicates, or with 0 weight).
* FromWalletId is invalid, or does not belong to a wallet registered on Fusion Chain
* ToWorkspaceAddr is invalid, or it does not contain the FromWalletId
* TokenContractAddr is invalid

## Client

### CLI

A user can query and interact with the `qassets` module using the CLI.

#### Query

The `query` commands allow users to query `qassets` state.

```bash
fchain query qassets --help
```

##### placeholder

The `placeholder` command allows the devs to remain a structure. 

```bash
fchain query qassets placeholder 
```

Example Output:

```bash
placeholder
```

### gRPC

A user can query the `qassets` module using gRPC endpoints.

#### placeholder

The `placeholder` command allows the devs to remain a structure. 

```bash
fusionchain.qassets.Query.Placeholder
```

Example:

```bash
grpcurl -plaintext localhost:9790 fusionchain.qassets.Query.Placeholder
```

Example Output:

```bash
TBD
```

### REST

A user can query the `qassets` module using REST endpoints.

#### Workspaces

The `placeholder` command allows the devs to remain a structure. 

```bash
/fusionchain/qassets/placeholder
```

Example:

```bash
curl localhost:1717/fusionchain/qassets/placeholder

```

Example Output:

```bash
TBD
```
