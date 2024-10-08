---
sidebar_position: 1
---

# Introduction

## Warden Protocol nodes

A Warden Protocol node is a server running the software (binary) of the Warden Protocol.

Reasons for running a node include the following:

- Accessing archive data
- Providing services: RPC, GRPC, API, etc.
- Becoming a [validator](/learn/glossary#validator)

## Section overview

This section explains how to run a node and become a validator.

Here are the main steps to take:

1. If you wish to run a local chain for testing purposes, follow this guide: [Run a local chain](run-a-local-chain).
2. To get started with our testnet, follow [Join Chiado](chiado-testnet/join-chiado).
3. After joining the network, you can become a validator: [Create a validator](create-a-validator).
4. To run the oracle service integrated with Warden, follow [Operate Skip:Connect](operate-skip-connect).
4. To interact with a node, use the [Node API](node-api-reference) and [node commands](node-commands).
5. You can also learn about our [delegation plan](delegation-plan).

:::tip
We recommend using [Cosmovisor](https://docs.archway.io/validators/running-a-node/cosmovisor) – a utility for managing binary versions of Cosmos SDK-based chains. Its primary function is to enable binary upgrades without manual intervention.
:::
