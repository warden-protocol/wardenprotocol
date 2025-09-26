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

## deBridge fees

All [deBridge](explore-ai-agents#debridge) transactions incur these fees:

| Fee type               | Amount                       | Currency            | Description                                                      |
| -----------------------| -----------------------------|---------------------| ---------------------------------------------------------------- |
| Gas fee                | varies                       | native coin         | A fee paid to the source network for processing the transaction  |
| deBridge flat fee      | fixed; periodically adjusted | native coin         | A fee paid to deBridge validators for processing the transaction |
| deBridge protocol fee  | 0.04%                        | input token         | A percentage charged by the deBridge protocol                    |
| Platform fee           | 0.85%                        | input/output token  | A percentage charged by Warden

## Informational Agent fees

Below you can find a list of **informational Agents**, which focus on collecting and analyzing data. All reports provided by these Agents incur the following fee:

| Fee type      | Amount   | Currency     | Description                                              |
| ------------- | -------- |--------------| -------------------------------------------------------- |
| Agent fee     | 0.25 USD | USDC/SOL/ETH | A fee paid to the Agent per report                         |

Agents charge this fee in the first available currency, based on this priority:

- **USDC** on Solana, Base, or Ethereum
- **SOL** on Solana
- **ETH** on Base or Ethereum

This fee applies to the following Agents:

- [Messari Deep Research](explore-ai-agents#messari-deep-research)
- [Kaibot](explore-ai-agents#kaibot)
- [WachAI](explore-ai-agents#wachai)
