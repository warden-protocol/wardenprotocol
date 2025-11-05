---
sidebar_position: 10
---

# Fees

## Overview

In this article, you'll find a detailed breakdown of fees applied to [swaps & transfers](manage-assets#send-or-swap-assets) and other interactions on Warden. Please note that some fees may vary depending on the [AI Agent](explore-ai-agents) and the [network](/#supported-networks).

## Platform fee

In certain cases, Warden charges the platform fee:

| Fee type      | Amount | Currency           | Description                                              |
| ------------- | -------|--------------------| -------------------------------------------------------- |
| Platform fee  | 0.85%  | input/output token | A percentage charged by Warden                           |

This fee applies to the following Agents:

- [Levva](explore-ai-agents#levva)
- All Agents that perform [swaps](#swap-fees)

## Transfer fees

All transfers incur the gas fee:

| Fee type      | Amount | Currency    | Description                                              |
| ------------- | -------|-------------| -------------------------------------------------------- |
| Gas fee       | varies | native coin | A fee paid to the network for processing the transaction |

## Swap fees

All swaps incur these fees:

| Fee type      | Amount | Currency           | Description                                              |
| ------------- | -------|--------------------| -------------------------------------------------------- |
| Gas fee       | varies | native coin        | A fee paid to the network for processing the transaction |
| Platform fee  | 0.85%  | input/output token | A percentage charged by Warden                           |

## deBridge fees

All [deBridge](explore-ai-agents#debridge) transactions incur these fees:

| Fee type               | Amount                       | Currency            | Description                                                      |
| -----------------------| -----------------------------|---------------------| ---------------------------------------------------------------- |
| Gas fee                | varies                       | native coin         | A fee paid to the source network for processing the transaction  |
| deBridge flat fee      | fixed; periodically adjusted | native coin         | A fee paid to deBridge validators for processing the transaction |
| deBridge protocol fee  | 0.04%                        | input token         | A percentage charged by the deBridge protocol                    |
| Platform fee           | 0.85%                        | input/output token  | A percentage charged by Warden

## Research Agent fees

All reports provided by [research Agents](explore-ai-agents#research-agents) incur the following fee:

| Fee type      | Amount   | Currency     | Description                                              |
| ------------- | -------- |--------------| -------------------------------------------------------- |
| Agent fee     | 0.25 USD | USDC/SOL/ETH | A fee paid to the Agent per report                       |

:::note
Agents charge it in the first available currency, based on this priority:

- **USDC** on Solana, Base, or Ethereum
- **SOL** on Solana
- **ETH** on Base or Ethereum
:::

## Betflix fees

Trading with [Betflix](play-betflix) incurs the following fees:

- Wins: **15%**
- Losses: **5%**

:::note
The remaining amount from losing bets goes to the community treasury (currently $2,000).
:::

:::tip
We're currently running a campaign that lets you play Betflix with **zero fees**.
:::
