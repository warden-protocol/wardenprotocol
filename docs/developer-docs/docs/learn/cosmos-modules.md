---
sidebar_position: 4
---

# Cosmos modules

## Overview

In this section, you'll find descriptions of external [Cosmos SDK](https://docs.cosmos.network) modules used by Warden Protocol. For more details, follow the provided links to external documentation.

## x/evm

The `x/evm` module is a Cosmos SDK module by **Cosmos EVM** (former **Evmos**) that allows for the deployment of smart contracts, interaction with the Ethereum Virtual Machine (EVM), and the use of EVM tooling.

Learn more:

- [Cosmos EVM](https://evm.cosmos.network)
- [`x/evm` on GitHub](https://github.com/evmos/ethermint/tree/v0.22.0/x/evm)

## x/oracle

The `x/oracle` module is a Cosmos SDK module by **Skip Protocol** that enables **Skip:Connect**—an [oracle service](glossary#oracle-service) supporting data feeds for over 2,000 currencies.

Learn more:

- [Connect documentation](https://docs.skip.build/connect/introduction)
- [`x/oracle` on GitHub](https://github.com/warden-protocol/connect/tree/main/x/oracle)
- [Available data feeds on GitHub](https://github.com/warden-protocol/connect/blob/30bf58f5ad6dcf417a3747b7cfffdc637ae3c70f/cmd/constants/markets.go#L1615)

:::tip
The data provided by Connect is [validated](glossary#validator) by Warden's network and written onchain. If you're a validator, see the guide explaining how to [operate Connect](/operate-a-node/operate-skip-connect).
:::
