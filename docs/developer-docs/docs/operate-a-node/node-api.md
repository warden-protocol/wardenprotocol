---
sidebar_position: 5
---

# Node API

**Nodes** are servers running the software (binary) of [Warden Chain](/learn/glossary#warden-chain) and serving as central points of contact for the network.

There are two ways to communicate with a node:

- **HTTP API**, default port `1317`
- **gRPC API**, default port `9090`

To find the source definitions for all endpoints, see `.proto` files in the [`proto` directory](https://github.com/warden-protocol/wardenprotocol/tree/main/proto).