---
sidebar_position: 1
---

# Barra overview

:::important
Barra is our new EVM testnet, currently available only to selected validators.
:::

## Version history

| Release                                                                                 | Block height | Date               | Upgrade guide                        |
| --------------------------------------------------------------------------------------- | ------------ | ------------------ | ------------------------------------ |
| [v0.7.0-rc4](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.7.0-rc4) | 0            | September 10, 2025 | N/A                                  |
| [v0.7.0](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.7.0)         | 1233000      | October 21, 2025   |[Upgrade to v0.7.0](upgrade/v0.7.0)   |
| [v0.7.1](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.7.1)         | 1233000      | October 21, 2025   |[Upgrade to v0.7.1](upgrade/v0.7.1)   |

## Binary

The latest binary version compatible with Barra is [wardend v0.7.1](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.7.1).


## Endpoints

To interact with the node, use the trusted Barra endpoints:

```bash title="EVM"
# For interaction with the EVM-compatible layer of the protocol
https://evm.barra.wardenprotocol.org/
```
:::tip
We recommend using the EVM endpoint **for all interactions**.
:::
```bash title="EVM WSS"
# For apps that use WebSockets to communicate with the chain
https://evm-ws.barra.wardenprotocol.org
```
```bash title="RPC"
# For interacting with the chain through RPC requests
https://rpc.barra.wardenprotocol.org/
```
```bash title="REST"
# For querying chain data in frontend applications
https://api.barra.wardenprotocol.org/
```
```bash title="gRPC"
# For data streaming
https://grpc.barra.wardenprotocol.org/
```
:::note
You can also find these endpoints on GitHub in [chain.json](https://github.com/warden-protocol/networks/blob/main/testnets/barra/chain.json).
:::

## Chain ID

This is Barra's chain ID for interacting with the node:

```bash
barra_9191-1
```

## Denomination

Barra's denomination is `award` (1 award = 10^-18 [WARD](/ward/introduction)).

## Faucet

Here is the faucet for getting [WARD](/ward/introduction) on Barra:

- [Barra faucet](https://faucet.barra.wardenprotocol.org/)
