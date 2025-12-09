---
sidebar_position: 10
---

# Fees

## Overview

In this article, you'll find a detailed breakdown of fees applied to [swaps & transfers](manage-assets#send-or-swap-assets) and other interactions on Warden. Please note that some fees may vary depending on the [AI Agent](explore-ai-agents) and the [network](/#supported-networks).

## Platform fee

In certain cases, Warden charges the platform fee:

| Fee type      | Amount | Currency           | Description                    |
| ------------- | ------ | ------------------ | ------------------------------ |
| Platform fee  | 0.85%  | input/output token | A percentage charged by Warden |

This fee applies to the following actions:

- All [swaps](#swap-fees)
- All [deBridge transactions](#debridge-fees)

## Transfer fee

All transfers are subject to the gas fee:

| Fee type      | Amount | Currency    | Description                                              |
| ------------- | ------ | ----------- | -------------------------------------------------------- |
| Gas fee       | varies | native coin | A fee paid to the network for processing the transaction |

## Swap fees

All swaps include these fees:

| Fee type      | Amount | Currency           | Description                                              |
| ------------- | ------ | ------------------ | -------------------------------------------------------- |
| Gas fee       | varies | native coin        | A fee paid to the network for processing the transaction |
| Platform fee  | 0.85%  | input/output token | A percentage charged by Warden                           |

## Trade fees

For each [perp trade](trade) (order execution), the following fees are charged from your [trading wallet](trade#manage-the-trading-wallet):

| Fee type         | Amount | Currency | Description                              |
| ---------------- | ------ | -------- | ---------------------------------------- |
| Hyperliquid fee  | 0.045% | USDC     | A fee paid to Hyperliquid for each trade |
| Warden trade fee | 0.025% | USDC     | A fee paid to Warden for each trade      |

## Trading wallet fees

When you deposit to your [trading wallet](trade#manage-the-trading-wallet) from Arbitrum, you pay only for the native bridge:

| Fee type         | Amount | Currency | Description                                           |
| ---------------- | ------ | -------- | ----------------------------------------------------- |
| Arbitrum gas fee | varies | USDC     | A fee paid to Arbitrum for processing the transaction |

Withdrawing to Arbitrum is subject to a flat fee:

| Fee type           | Amount | Currency | Description                                           |
| ------------------ | ------ | -------- | ----------------------------------------------------- |
| Withdrawal gas fee | 1      | USDC     | A flat fee for covering Arbitrum gas                  |

As to other chains, we manage deposits and withdrawals through [OneBalance](https://www.onebalance.io), charging dynamic fees:

| Fee type    | Amount | Currency | Description                                              |
| ----------- | ------ | -------- | -------------------------------------------------------- |
| Gas fee     | varies | USDC     | The underlying bridge/network gas (source + destination) |
| Service fee | varies | USDC     | A service fee for handling the transaction               |

## Betflix fees

Trading with [Betflix](play-betflix) includes the following fees, charged from your [Betflix wallet](play-betflix#manage-betflix-wallet):

| Fee type      | Amount   | Currency  | Description                        |
| ------------- | -------- | --------- | ---------------------------------- |
| Win fee       | 15%      | USDC      | A fee paid to Warden for each win  |
| Loss fee      | 5%       | USDC      | A fee paid to Warden for each loss |

:::note
The remaining amount from losing bets goes to the community treasury (currently $2,000).
:::

## Agent fees

In this section, you'll find additional Agent-specific fees.

### deBridge fees

All [deBridge](explore-ai-agents#debridge) transactions include the following fees:

| Fee type               | Amount                       | Currency            | Description                                                      |
| ---------------------- | ---------------------------- | ------------------- | ---------------------------------------------------------------- |
| Gas fee                | varies                       | native coin         | A fee paid to the source network for processing the transaction  |
| deBridge flat fee      | fixed; periodically adjusted | native coin         | A fee paid to deBridge validators for processing the transaction |
| deBridge protocol fee  | 0.04%                        | input token         | A percentage charged by the deBridge protocol                    |
| Platform fee           | 0.85%                        | input/output token  | A percentage charged by Warden                                   |

### Kaibot fee

All reports provided by [Kaibot](explore-ai-agents#kaibot) are subject to this fee:

| Fee type      | Amount   | Currency                             | Description                        |
| ------------- | -------- | ------------------------------------ | ---------------------------------- |
| Agent fee     | 0.25 USD | [USDC/SOL/ETH](#currency-priorities) | A fee paid to the Agent per report |

### Messari fee

All reports provided by [Messari Deep Research](explore-ai-agents#messari-deep-research) are subject to this fee:

| Fee type      | Amount   | Currency                             | Description                        |
| ------------- | -------- | ------------------------------------ | ---------------------------------- |
| Agent fee     | 0.25 USD | [USDC/SOL/ETH](#currency-priorities) | A fee paid to the Agent per report |

### WachAI fee

All reports provided by [WachAI](explore-ai-agents#wachai) are subject to this fee:

| Fee type      | Amount   | Currency                             | Description                        |
| ------------- | -------- | ------------------------------------ | ---------------------------------- |
| Agent fee     | 0.25 USD | [USDC/SOL/ETH](#currency-priorities) | A fee paid to the Agent per report |

### Currency priorities

Agents typically charge fees using the first available currency, following this priority:

- **USDC** on Solana, Base, or Ethereum
- **SOL** on Solana
- **ETH** on Base or Ethereum
