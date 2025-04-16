---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Chiado overview

:::important
Chiado is our new and improved testnet. Please make sure to transition all your testing and development processes here.
:::

## Version history

| Release                                                                         | Block height         | Date          | Upgrade guide                        |
| ------------------------------------------------------------------------------- | -------------------- | ------------- | ------------------------------------ |
| [v0.5.4](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.5.4) | genesis              |               |                                      |
| [v0.6.2](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.6.2) | 2041100              | March 5, 2025 | [Upgrade to v0.6.2](upgrade/v0.6.2)  |
| [v0.6.3](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.6.3) | XXX                  | XXX           | [Upgrade to v0.6.3](upgrade/v0.6.3)  |

## Binary

The latest binary version compatible with Chiado is [wardend v.0.6.3](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.6.3).


## Endpoints

To interact with the node, use trusted Chiado endpoints:

```bash title="RPC"
https://rpc.chiado.wardenprotocol.org/
```

```bash title="REST"
https://api.chiado.wardenprotocol.org/
```

```bash title="gRPC"
https://grpc.chiado.wardenprotocol.org/
```

```bash title="EVM"
https://evm.chiado.wardenprotocol.org
```

:::note Notes
- You can also find these endpoints on GitHub in [chain.json](https://github.com/warden-protocol/networks/tree/main/testnets/chiado/chain.json).
- The EVM endpoint allows [deploying EVM contracts](/build-an-app/deploy-smart-contracts-on-warden/deploy-an-evm-contract).
:::

## Chain ID

This is Chiado's chain ID for interacting with the node:

```bash
chiado_10010-1
```

## Denomination

Chiado's denomination is `award` / 0.000000000000000001 [WARD](/tokens/ward-token/ward).

## Faucet

Here is the faucet for getting [WARD](https://docs.wardenprotocol.org/tokens/ward-token/ward) on Chiado:

- [Chiado faucet](https://faucet.chiado.wardenprotocol.org/)
