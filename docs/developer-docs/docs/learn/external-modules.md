---
sidebar_position: 6
---

# Cosmos modules

## Overview

In this section, you'll find descriptions of external [Cosmos SDK](https://docs.cosmos.network) modules used by Warden Protocol. For more details, follow the provided links to external documentation.

## x/evm

The `x/evm` module is a Cosmos SDK module by **Cosmos EVM** (former **Evmos**) that allows for the deployment of smart contracts, interaction with the Ethereum Virtual Machine (EVM), and the use of EVM tooling.

To start using `x/evm`, follow this guide:

- [Deploy an EVM contract](/build-an-agent/deploy-an-evm-contract)

Learn more:

- [Cosmos EVM](https://evm.cosmos.network)
- [`x/evm` on GitHub](https://github.com/evmos/ethermint/tree/v0.22.0/x/evm)

## x/oracle

The `x/oracle` module is a Cosmos SDK module by **Skip Protocol** that enables storing prices onchain in **Skip:Connect** (an oracle service).

To use `x/oracle`, call the [`x/oracle` precompile](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/precompiles/slinky/ISlinky.sol) in your contract. To get started and find usage examples, see these guides:

Learn more:

- [Connect documentation](https://docs.skip.build/connect/introduction)
- [`x/oracle` on GitHub](https://github.com/warden-protocol/connect/tree/main/x/oracle)
- [Warden docs: Oracle services](oracle-services)
