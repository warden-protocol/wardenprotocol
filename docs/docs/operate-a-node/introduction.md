---
sidebar_position: 1
---

# Introduction

A Warden Protocol Node is a server running the software (binary) of the Warden Protocol. Nodes route requests to [Keychains](/learn/glossary#keychain), route responses back to the client, and [validate](/learn/glossary#validator) blocks and transactions.

Reasons for running a node include the following:

- Accessing archive data
- Providing services: RPC, GRPC, API, etc.
- Becoming a [validator](/learn/glossary#validator)

This section explains how to run a node and become a validator.

:::tip
To run a blockchain node in Warden, build and run the chain binary called `wardend`. You can run either a [full node](/learn/glossary#full-node) or a pruned node (if you prune older blocks). To interact with a node, use the [Node API](node-api-reference).
:::

:::tip
If you're [building an Omnichain Application](/build-an-oapp/introduction) and wish to run a node locally for testing purposes, check this guide: [Run a Keychain from CLI](/build-an-oapp/test/run-a-keychain-from-cli).
:::