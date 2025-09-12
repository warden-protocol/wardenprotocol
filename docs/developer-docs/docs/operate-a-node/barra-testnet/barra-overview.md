---
sidebar_position: 1
---

# Barra overview

:::important
Barra is our new testnet, currently available only to selected validators. It's a vanilla Cosmos chain with EVM support.
:::

## Version history

| Release                                                                                 | Block height | Date               |
| --------------------------------------------------------------------------------------- | ------------ | ------------------ |
| [v0.7.0-rc3](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.7.0-rc3) | 0            | September 10, 2025 |

## Binary

The latest binary version compatible with Barra is [wardend v0.7.0-rc3](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.7.0-rc3).


## Endpoints

To interact with the node, use trusted Barra endpoints:

```bash title="RPC"
https://rpc.barra.wardenprotocol.org/
```

```bash title="REST"
https://api.barra.wardenprotocol.org/
```

```bash title="gRPC"
https://grpc.barra.wardenprotocol.org/
```

```bash title="EVM"
https://evm.barra.wardenprotocol.org/
```

:::note
You can also find these endpoints on GitHub in [chain.json](https://github.com/warden-protocol/networks/tree/main/testnets/barra/chain.json).
:::

## Chain ID

This is Barra's chain ID for interacting with the node:

```bash
barra_9191-1
```

## Denomination

Barra's denomination is `award` (1 award = 10^-18 [WARD](/tokens/ward-token/ward)).

## Faucet

Here is the faucet for getting [WARD](/tokens/ward-token/ward) on Barra:

- [Barra faucet](https://faucet.barra.wardenprotocol.org/)
