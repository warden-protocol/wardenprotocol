---
sidebar_position: 10
---

# Fees

## Overview

In this article, you'll find a detailed breakdown of fees applied to [swaps & transfers](manage-your-wallets#send-or-swap) and other interactions on Warden. Please note that some fees may vary depending on the [AI Agent](explore-ai-agents) and the [network](/#supported-networks).

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

## Trading fees

For opening a [perpetual trading position](trade), the following fees are charged from your [trading wallet](trade#manage-the-trading-wallet):

| Fee type         | Amount | Currency         | Description                    |
| ---------------- | ------ | ---------------- | -----------------------------  |
| Hyperliquid fee  | 0.045% | USDC on Arbitrum | A fee paid to Hyperliquid      |
| Warden trade fee | 0.025% | USDC on Arbitrum | A percentage charged by Warden |

## Trading wallet fees

When depositing to your [trading wallet](trade#manage-the-trading-wallet) from Arbitrum, you pay only for the native bridge:

| Fee type | Amount | Currency         | Description                          |
| -------- | ------ | ---------------- | ------------------------------------ |
| Gas fee  | varies | USDC on Arbitrum | A fee for processing the transaction |

We automatically bridge deposits from other chains through [OneBalance](https://www.onebalance.io), charging dynamic fees:

| Fee type    | Amount | Currency | Description                                              |
| ----------- | ------ | -------- | -------------------------------------------------------- |
| Gas fee     | varies | USDC     | The underlying bridge/network gas (source + destination) |
| Service fee | varies | USDC     | A service fee for handling the transaction               |

All withdrawals are subject to a flat fee paid to [Hyperliquid](https://hyperliquid.gitbook.io/hyperliquid-docs/hypercore/bridge) on Arbitrum:

| Fee type       | Amount | Currency         | Description               |
| -------------- | ------ | ---------------- | ------------------------- |
| Withdrawal fee | 1      | USDC on Arbitrum | A fee paid to Hyperliquid |

## Betflix fees

Trading with [Betflix](play-betflix) includes the following fees, charged from your [Betflix wallet](play-betflix#manage-the-betflix-wallet):

| Fee type      | Amount   | Currency       | Description                        |
| ------------- | -------- | -------------- | ---------------------------------- |
| Win fee       | 15%      | USDC on Solana | A fee paid to Warden for each win  |
| Loss fee      | 5%       | USDC on Solana | A fee paid to Warden for each loss |

:::note
The remaining amount from losing bets goes to the community treasury (currently $2,000).
:::

## Tap to PUMP fee

Each time you tap in the [Tap to PUMP](earn-rewards#tap-to-pump) game, Warden charges a small fee:

| Fee type        | Amount | Currency         | Description          |
| --------------- | ------ | ---------------- | -------------------- |
| Tap to PUMP fee | 0.1    | USDC/native coin | A fee paid to Warden |

Warden charges this fee using the first available currency, following this priority:

- **USDC** on Solana, Base, or Ethereum
- **SOL** on Solana
- **ETH** on Base or Ethereum

## Airdrop registration fee

When you [register for the WARD airdrop](ward-airdrop), Warden charges a randomized fee to eliminate bot accounts:

| Fee type         | Amount  | Currency         | Description          |
| ---------------- | ------- | ---------------- | -------------------- |
| Registration fee | 3–3.50  | USDC/native coin | A fee paid to Warden |

Warden charges this fee using the first available currency, following this priority:

- **USDC** on Solana, Base, Arbitrum, BNB Smart Chain, or Ethereum
- **SOL** on Solana
- **ETH** on Base or Arbitrum
- **BSC** on BNB Smart Chain
- **ETH** on Ethereum

## Agent fees

In this section, you'll find additional Agent-specific fees.

### Caesar fees

All prompts for [Crypto Research by Caesar](explore-ai-agents#crypto-research-by-caesar) are subject to the following fee, charged from your [Agents Credits wallet](manage-your-wallets#agents-credits):

| Fee type      | Amount | Currency     | Description                        |
| ------------- | ------ | ------------ | ---------------------------------- |
| Agent fee     | 0.40   | USDC on Base | A fee paid to the Agent per prompt |

When you prompt [Deep Research by Caesar](explore-ai-agents#deep-research-by-caesar), it charges this fee from your Agent Credits wallet:

| Fee type      | Amount | Currency     | Description                        |
| ------------- | ------ | ------------ | ---------------------------------- |
| Agent fee     | 0.80   | USDC on Base | A fee paid to the Agent per prompt |

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

| Fee type      | Amount   | Currency                                 | Description                        |
| ------------- | -------- | ---------------------------------------- | ---------------------------------- |
| Agent fee     | 0.25 USD | [USDC/native coin](#currency-priorities) | A fee paid to the Agent per report |

### Messari fee

All reports provided by [Messari Deep Research](explore-ai-agents#messari-deep-research) are subject to this fee:

| Fee type      | Amount   | Currency                                 | Description                        |
| ------------- | -------- | ---------------------------------------- | ---------------------------------- |
| Agent fee     | 0.25 USD | [USDC/native coin](#currency-priorities) | A fee paid to the Agent per report |

### WachAI fee

All reports provided by [WachAI](explore-ai-agents#wachai) are subject to this fee:

| Fee type      | Amount   | Currency                                 | Description                        |
| ------------- | -------- | ---------------------------------------- | ---------------------------------- |
| Agent fee     | 0.25 USD | [USDC/native coin](#currency-priorities) | A fee paid to the Agent per report |

### Currency priorities

Agents typically charge fees using the first available currency, following this priority:

- **USDC** on Solana, Base, or Ethereum
- **SOL** on Solana
- **ETH** on Base or Ethereum
