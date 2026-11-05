---
sidebar_position: 6
---

# Node API

:::info
Warden Chain halted on 29 October 2026 after the [WARD migration](/ward/migration). These node and validator guides are kept for reference only.
:::

**Nodes** are servers running the [Warden Chain](/learn/glossary#warden-chain) software (binary) and serving as central points of contact for the network.

There are two ways to communicate with a node:

- **HTTP API**, default port `1317`
- **gRPC API**, default port `9090`

To find the source definitions for all endpoints, see `.proto` files in the [`proto` directory](https://github.com/warden-protocol/wardenprotocol/tree/main/proto).