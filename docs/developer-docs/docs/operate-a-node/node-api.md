---
sidebar_position: 8
---

# Node API

Warden Protocol nodes are central points of contact for Warden Protocol. They're responsible for routing requests to [Keychains](/learn/glossary#keychain) and for routing responses back to the client.

There are two ways to communicate with a node:

- **HTTP API**, default port `1317`
- **gRPC API**, default port `9090`

To find the source definitions for all endpoints, see `.proto` files in the [`proto` directory](https://github.com/warden-protocol/wardenprotocol/tree/main/proto).