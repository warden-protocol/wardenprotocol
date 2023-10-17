# `x/policy`

## Abstract

This document specifies the policy module of the Fusion Chain.

The policy module is responsible for storing policies and do verification
checks of transactions that include a policy. 
A policy represents a set of conditions that need to be met in order to
successfully verify a transaction's policy. 
Submitting a transaction with a policy does result in actions for eligible 
owners of the respective workspace. 


## Contents

* [Concepts](#concepts)
    * [Policy](#policy)
* [State](#state)
* [Msg Service](#msg-service)
* [Client](#client)
    * [CLI](#cli)
    * [gRPC](#grpc)
    * [REST](#rest)

## Concepts

### Policy

The policy language describes an ambitious wallet policy language, with a compiler and 
an on-chain verifier. Policies can refer to individual signatures (`@Trader1`), 
threshold signatures/policies (any n […]), native currencies, accounting 
currencies, oracles, ZK proofs and more.

## State

Currently, the policy module does not store any state by itself.

## Msg Service

The policy module currently does not expose any messages to be submitted. 

## Client

### CLI

A user can query and interact with the `policy` module using the CLI.

#### Query

The `query` commands allow users to query `policy` state.

```bash
fchain query policy --help
```

##### Verify

The `verify` command allows users to query for the state of a policy to a given payload. 

```bash
fchain query policy verify [policy] [payload] 
```

Example Output:

```bash
TBD
```

### gRPC

A user can query the `policy` module using gRPC endpoints.

#### Verify

The `verify` command allows users to query for the state of a policy to a given payload. 

```bash
fusionchain.policy.Query.Verify
```

Example:

```bash
grpcurl -plaintext localhost:9090 fusionchain.policy.Query.Verify
```

Example Output:

```bash
TBD
```

### REST

A user can query the `policy` module using REST endpoints.

#### Verify

The `verify` command allows users to query for the state of a policy to a given payload. 

```bash
/fusionchain/policy/verify/{policy}/{payload}
```

Example:

```bash
curl localhost:1317/fusionchain/policy/verify/{policy}/{payload}
```

Example Output:

```bash
TBD
```
