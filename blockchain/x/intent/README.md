# `x/intent`

## Abstract

This document specifies the intent module of the Warden Protocol.

The intent module is responsible for storing intents and do verification
checks of transactions that include a intent. 
A intent represents a set of conditions that need to be met in order to
successfully verify a transaction's intent. 
Submitting a transaction with a intent does result in actions for eligible 
owners of the respective space. 


## Contents

* [Concepts](#concepts)
    * [Intent](#intent)
* [State](#state)
* [Msg Service](#msg-service)
* [Client](#client)
    * [CLI](#cli)
    * [gRPC](#grpc)
    * [REST](#rest)

## Concepts

### Intent

The intent language describes an ambitious wallet intent language, with a compiler and 
an on-chain verifier. Intents can refer to individual signatures (`@Trader1`), 
threshold signatures/intents (any n […]), native currencies, accounting 
currencies, oracles, ZK proofs and more.

## State

Currently, the intent module does not store any state by itself.

## Msg Service

The intent module currently does not expose any messages to be submitted. 

## Client

### CLI

A user can query and interact with the `intent` module using the CLI.

#### Query

The `query` commands allow users to query `intent` state.

```bash
w query intent --help
```

##### Verify

The `verify` command allows users to query for the state of a intent to a given payload. 

```bash
w query intent verify [intent] [payload] 
```

Example Output:

```bash
TBD
```

### gRPC

A user can query the `intent` module using gRPC endpoints.

#### Verify

The `verify` command allows users to query for the state of a intent to a given payload. 

```bash
wardenprotocol.intent.Query.Verify
```

Example:

```bash
grpcurl -plaintext localhost:9090 wardenprotocol.intent.Query.Verify
```

Example Output:

```bash
TBD
```

### REST

A user can query the `intent` module using REST endpoints.

#### Verify

The `verify` command allows users to query for the state of a intent to a given payload. 

```bash
/wardenprotocol/intent/verify/{intent}/{payload}
```

Example:

```bash
curl localhost:1317/wardenprotocol/intent/verify/{intent}/{payload}
```

Example Output:

```bash
TBD
```
