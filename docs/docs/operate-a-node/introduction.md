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

This section explains how to run a node and become a validator.

## Get started

These are the basic steps to get started:

- Download the [wardend binary](https://github.com/warden-protocol/wardenprotocol/releases) or run it in a container and [join Buenavista](networks/join-buenavista).
- To become a validator, follow this guide: [Create a validator](create-a-validator).
- To interact with a node, use the [Node API](node-api-reference).

:::tip
We recommend using [Cosmovisor](https://docs.archway.io/validators/running-a-node/cosmovisor) – a utility for managing binary versions of Cosmos SDK-based chains. Its primary function is to enable binary upgrades without manual intervention.
:::

:::tip
If you're [building an Omnichain Application](/build-an-oapp/introduction) and wish to run a node locally for testing purposes, check this guide: [Run a local chain](/build-an-oapp/test/run-a-local-chain).
:::
