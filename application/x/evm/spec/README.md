<!--
order: 0
title: EVM Overview
parent:
  title: "evm"
-->

# `evm`

## Abstract

This document defines the specification of the Ethereum Virtual Machine (EVM) as a Cosmos SDK module.

Since the introduction of Ethereum in 2015, the ability to control digital assets through [**smart contracts**](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html) has attracted a large community of developers to build decentralized applications on the Ethereum Virtual Machine (EVM). This community is continuously creating extensive tooling and introducing standards, which are further increasing the adoption rate of EVM compatible technology.

The growth of EVM-based chains (e.g. Ethereum), however, has uncovered several scalability challenges that are often referred to as the [Trilemma of decentralization, security, and scalability](https://vitalik.ca/general/2021/04/07/sharding.html). Developers are frustrated by high gas fees, slow transaction speed & throughput, and chain-specific governance that can only undergo slow change because of its wide range of deployed applications. A solution is required that eliminates these concerns for developers, who build applications within a familiar EVM environment.

The `x/evm` module provides this EVM familiarity on a scalable, high-throughput Proof-of-Stake blockchain. It is built as a [Cosmos SDK module](https://docs.cosmos.network/master/building-modules/intro.html) which allows for the deployment of smart contracts, interaction with the EVM state machine (state transitions), and the use of EVM tooling. It can be used on Cosmos application-specific blockchains, which alleviate the aforementioned concerns through high transaction throughput via [Tendermint Core](https://github.com/tendermint/tendermint), fast transaction finality, and horizontal scalability via [IBC](https://ibcprotocol.org/).

The `x/evm` is part of the [ethermint library](https://pkg.go.dev/github.com/evmos/ethermint). For an example of how Ethermint can be used on any Cosmos-SDK chain, please refer to [Evmos](https://www.github.com/tharsis/evmos).

## Contents

1. **[Concepts](01_concepts.md)**
2. **[State](02_state.md)**
3. **[State Transitions](03_state_transitions.md)**
4. **[Transactions](04_transactions.md)**
5. **[ABCI](05_abci.md)**
6. **[Hooks](05_hooks.md)**
7. **[Events](06_events.md)**
8. **[Parameters](07_params.md)**
9. **[Client](07_client.md)**

## Module Architecture

> **NOTE:**: If you're not familiar with the overall module structure from
the SDK modules, please check this [document](https://docs.cosmos.network/master/building-modules/structure.html) as
prerequisite reading.

```shell
evm/
├── client
│   └── cli
│       ├── query.go      # CLI query commands for the module
│       └── tx.go         # CLI transaction commands for the module
├── keeper
│   ├── keeper.go         # ABCI BeginBlock and EndBlock logic
│   ├── keeper.go         # Store keeper that handles the business logic of the module and has access to a specific subtree of the state tree.
│   ├── params.go         # Parameter getter and setter
│   ├── querier.go        # State query functions
│   └── statedb.go        # Functions from types/statedb with a passed in sdk.Context
├── types
│   ├── chain_config.go
│   ├── codec.go          # Type registration for encoding
│   ├── errors.go         # Module-specific errors
│   ├── events.go         # Events exposed to the Tendermint PubSub/Websocket
│   ├── genesis.go        # Genesis state for the module
│   ├── journal.go        # Ethereum Journal of state transitions
│   ├── keys.go           # Store keys and utility functions
│   ├── logs.go           # Types for persisting Ethereum tx logs on state after chain upgrades
│   ├── msg.go            # EVM module transaction messages
│   ├── params.go         # Module parameters that can be customized with governance parameter change proposals
│   ├── state_object.go   # EVM state object
│   ├── statedb.go        # Implementation of the StateDb interface
│   ├── storage.go        # Implementation of the Ethereum state storage map using arrays to prevent non-determinism
│   └── tx_data.go        # Ethereum transaction data types
├── genesis.go            # ABCI InitGenesis and ExportGenesis functionality
├── handler.go            # Message routing
└── module.go             # Module setup for the module manager
```
