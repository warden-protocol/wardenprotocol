---
sidebar_position: 4
---

# x402 payments

## Overview

Every scaffolded Agent includes [x402 payments](https://x402.org) infrastructure—Coinbase's **HTTP 402** payment protocol.

## Enabling/disabling

By default, x402 payments are disabled. This is how you can enable them:

- When [creating a new Agent](../build-an-agent/create-a-new-agent), choose **Enable x402 payments**.
- After creating an Agent, [run `/config`](../build-an-agent/configure-the-agent) and select **Payments**.
- You can also directly edit [x402 parameters](#parameters) in the `.env` file.

:::note
When x402 payments are enabled, the [frontend](basics#frontend) displays a button for connecting to MetaMask.
:::

After this, you can temporarily disable x402 payments for testing purposes:

- [Start the Agent](../build-an-agent/test-the-agent-locally) with `X402=false npm start`
- Remove all `X402_<PREFIX>_PAY_TO` values from the `.env` file

:::tip
Alternatively, you can keep [API key authentication](basics#api-key-authentication) enabled and bypass payments in the [chat mode](../build-an-agent/test-the-agent-locally#chat-using-the-cli).
:::

## Parameters

When enabling x402 payments, you need to specify x402 parameters, which are stored in the `.env` file. Each [payment network](#networks) has its own set of variables, differentiated by prefixes.

| Name      | Variable | Description |
| --------- | -------- | ----------- |
| **Network** | `X402_<PREFIX>_NETWORK` | The network for receiving payments, identified by ID. For development, use test chains: they require no real funds. See the [supported networks](#networks). |
| **Wallet** | `X402_<PREFIX>_PAY_TO` | Your EVM wallet address for receiving payments (`0x` + 40 hex characters). |
| **Price** | `X402_<PREFIX>_PRICE` | The preferred price per request. It's set in **USDC** and defaults to `0.01`. Removing this value disables the corresponding network. |
| **Facilitator** | `X402_FACILITATOR_URL` | The preferred facilitator for processing payments. Warden Code automatically enables one of the [default facilitators](#facilitators), but you can edit this value in the `.env` file. |

## Networks

The available **payment networks** are listed below.

Each network has its own set of [parameters](#parameters) in the `.env` file, differentiated by prefixes, and its default [facilitator](#facilitators).

| Network | ID | Currency | Facilitator | Prefix |
| ------- | -- | -------- | ----------- | ------ |
| **Base Sepolia** (testnet) | `eip155:84532` | test USDC | [x402.org](https://x402.org/facilitator) | `X402_BASE_SEPOLIA` |
| **Base** (mainnet) | `eip155:8453` | real USDC | [PayAI](https://facilitator.payai.network) | `X402_BASE` |

You can find all networks with their parameters in `.env.example`:

```text
X402_FACILITATOR_URL=https://x402.org/facilitator

# Base Sepolia (testnet)
X402_BASE_SEPOLIA_PAY_TO=
X402_BASE_SEPOLIA_PRICE=0.01
X402_BASE_SEPOLIA_NETWORK=eip155:84532

# Base (mainnet)
# X402_BASE_PAY_TO=
# X402_BASE_PRICE=0.01
# X402_BASE_NETWORK=eip155:8453
```

## Facilitators

A **payment facilitator** is a service that handles verifying and submitting x402 payments.

When you enable x402, Warden Code automatically selects one of the following facilitators (based on the network):

- Testnets: [x402.org](https://x402.org/facilitator) 
- Mainnets: [PayAI](https://facilitator.payai.network)

The PayAI facilitator offers **1,000 free settlements** per month. For higher volumes, create a merchant account at [merchant.payai.network](https://merchant.payai.network) and add the following variables to your `.env` file:

- `PAYAI_API_KEY_ID`
- `PAYAI_API_KEY_SECRET`

:::note
Authentication is handled automatically by the `@payai/facilitator` package when the facilitator URL contains `payai.network`.
:::

## Dependencies

When x402 is enabled, the following packages are added to the generated Agent's dependencies:

- `express` and `@types/express`
- `@x402/express` (payment middleware)
- `@x402/core` (protocol types and facilitator client)
- `@payai/facilitator` (facilitator authentication)
- `@x402/evm` (EVM payment scheme verification)

## Payment flow

Clients that support x402 (such as `@x402/fetch`) handle the payment flow automatically:

1. The server returns an HTTP 402 response with payment requirements.
2. The client signs a USDC transaction.
3. The server verifies the payment before processing the request.
