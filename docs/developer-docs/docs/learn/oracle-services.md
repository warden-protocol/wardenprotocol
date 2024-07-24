---
sidebar_position: 6
---

# Oracle services

## Overview

An **oracle** is a third-party service that enables smart contracts access real-life **data feeds**: prices, stock marked data, weather conditions, etc.

[Omnichain Application](/learn/glossary#omnichain-application) builders can incorporate **Connect**, an oracle service supported by Warden, into their apps. See the sections below to learn more.

:::tip
Access to oracle data feeds significantly enhances the capabilities of Warden's [Intents](/learn/glossary#intent), allowing users to create highly specific Intents such as limit orders for decentralized exchanges. Once we implement [Triggers](/learn/glossary#trigger), users will also be able to create Intents triggered by changes in data feeds.
:::


## Connect

Warden integrates with [x/oracle](/learn/warden-protocol-modules/external-modules#xoracle) – an external module by **Skip Protocol**. This module provides access to [Connect](https://docs.skip.build/connect/introduction) – an oracle service offering mostly price data (formerly known as Slinky).

Key features of Warden's integration with Connect include the following:

- **Secured by Warden's validator set**  
    This integration uses the security framework of the chain, ensuring rapid price updates without relying on third-party systems.

- **Exceptional performance**  
    With millisecond-fresh price updates for every block, this oracle system can support over 2,000 currencies, providing unmatched flexibility and scalability.

:::tip
The data provided by Connect is [validated](/learn/glossary#validator) by Warden's network and written on-chain. If you're a validator, see the guide explaining how to [operate Connect](/operate-a-node/networks/operate-connect).
:::

## Available data feeds

Slinky can support over 2,000 currencies – see the available [data feeds on GitHub](https://github.com/skip-mev/slinky/blob/30bf58f5ad6dcf417a3747b7cfffdc637ae3c70f/cmd/constants/markets.go#L1615). Please note that this list may change over the course of time.
