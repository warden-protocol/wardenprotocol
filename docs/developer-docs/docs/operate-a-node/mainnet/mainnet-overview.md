---
sidebar_position: 1
---

# Mainnet overview

:::important
Mainnet is our new EVM network, currently available only to selected validators.
:::

## Version history

| Release                                                                                 | Block height | Date               | Upgrade guide                        |
| --------------------------------------------------------------------------------------- | ------------ | ------------------ | ------------------------------------ |
| [v0.7.0](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.7.0)         | 0            | October 21, 2025   | N/A                                  |
| [v0.7.1](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.7.1)         | 0            | October 21, 2025   |[Upgrade to v0.7.1](upgrade/v0.7.1)   |
| [v0.7.2](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.7.2)         | 745500       | October 24, 2025   |[Upgrade to v0.7.2](upgrade/v0.7.2)   |

## Binary

The latest binary version compatible with Mainnet is [wardend v0.7.2](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.7.2).


## Endpoints

To interact with the node, use the trusted Mainnet endpoints below.
:::tip
We recommend using the EVM endpoint **for all interactions**.
:::

```bash title="EVM"
# For interaction with the EVM-compatible layer of the protocol
https://evm.wardenprotocol.org/
```
```bash title="EVM WSS"
# For apps that use WebSockets to communicate with the chain
https://evm-ws.wardenprotocol.org/
```
```bash title="RPC"
# For interacting with the chain through RPC requests
https://rpc.wardenprotocol.org/
```
```bash title="REST"
# For querying chain data in frontend applications
https://api.wardenprotocol.org/
```
```bash title="gRPC"
# For data streaming
https://grpc.wardenprotocol.org/
```

## Chain ID

This is Mainnet's chain ID for interacting with the node:

```bash
warden_8765-1
```

## Denomination

Mainnet's denomination is `award` (1 award = 10^-18 [WARD](/ward/introduction)).
