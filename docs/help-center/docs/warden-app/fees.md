---
sidebar_position: 8
---

# Fees

## Overview

In this article, you'll find a detailed breakdown of fees applied to [swaps & transfers](manage-assets#send-or-swap-assets) and other interactions on Warden. Please note that some fees may vary depending on the [AI Agent](explore-ai-agents) and the [network](/#supported-networks).

## Transfer fees

All transfers incur this fee:

| Fee type      | Amount | Currency    | Description                                              |
| ------------- | -------|-------------| -------------------------------------------------------- |
| Gas fee       | varies | native coin | A fee paid to the network for processing the transaction |

## Swap fees

All swaps incur these fees:

| Fee type      | Amount | Currency           | Description                                              |
| ------------- | -------|--------------------| -------------------------------------------------------- |
| Gas fee       | varies | native coin        | A fee paid to the network for processing the transaction |
| Platform fee  | 0.85%  | input/output token | A percentage charged by Warden     

## Messari fees

All queries to the [Messari Deep Research Agent](explore-ai-agents#messari-deep-research) incur this fee:

| Fee type      | Amount   | Currency     | Description                                              |
| ------------- | -------- |--------------| -------------------------------------------------------- |
| Messari fee   | 0.25 USD | USDC/SOL/ETH | A fee paid to Messari per report                         |

The Agent charges fees in the first available currency in this order of priority:

- **USDC** on Solana, Base, or Ethereum
- **SOL** on Solana
- **ETH** on Base or Ethereum

## deBridge fees

All [deBridge](explore-ai-agents#debridge) transactions incur these fees:

| Fee type               | Amount                       | Currency            | Description                                                      |
| -----------------------| -----------------------------|---------------------| ---------------------------------------------------------------- |
| Gas fee                | varies                       | native coin         | A fee paid to the source network for processing the transaction  |
| deBridge flat fee      | fixed; periodically adjusted | native coin         | A fee paid to deBridge validators for processing the transaction |
| deBridge protocol fee  | 0.04%                        | input token         | A percentage charged by the deBridge protocol                    |
| Platform fee           | 0.85%                        | input/output token  | A percentage charged by Warden                                   |

## Kaibot fees

All queries to the [Kaibot Agent](explore-ai-agents#kaibot) incur this fee:

| Fee type      | Amount   | Currency     | Description                                              |
| ------------- | -------- |--------------| -------------------------------------------------------- |
| Kaibot fee    | 0.25 USD | USDC/SOL/ETH | A fee paid to Kaibot per report                          |

The Agent charges fees in the first available currency in this order of priority:

- **USDC** on Solana, Base, or Ethereum
- **SOL** on Solana
- **ETH** on Base or Ethereum
