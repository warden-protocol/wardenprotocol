---
sidebar_position: 5
---

# ERC-8004 registration

## Overview

After [hosting your Agent](../host-your-agent), you can register it on the [ERC-8004 Identity Registry](https://eips.ethereum.org/EIPS/eip-8004).

This mints an **Agent NFT** on your chosen chain and sets the **Agent URI** pointing to your Agent's metadata.

Warden Code supports [30 EVM chains](#networks), and allows registration across multiple networks.

## Registering

To register, run this command and select one of the [supported networks](#networks):

```bash
/register
```

Warden Code will validate your configuration: name, description, production URL, skills.

Pre-registration checks run automatically:

- **Errors** (block registration): missing name, missing description, localhost URL
- **Warnings** (require confirmation): no skills, short description, skills missing name or description

## Deactivating/activating

To deactivate/activate the Agent, run the following:

```bash
/deactivate
```

```bash
/activate
```

These commands toggle the Agent's `active` flag in `agent-registration.json` and push the update to all registered chains.

## Networks

The available networks include 30 EVM chains (14 testnets, 16 mainnets):

<table>
  <thead>
    <tr>
      <th colspan="2">Mainnets</th>
      <th colspan="2">Testnets</th>
    </tr>
    <tr>
      <th>Network</th>
      <th>ID</th>
      <th>Network</th>
      <th>ID</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>**Base**</td><td>8453</td><td>**Base Sepolia**</td><td>84532</td></tr>
    <tr><td>**Ethereum**</td><td>1</td><td>**Ethereum Sepolia**</td><td>11155111</td></tr>
    <tr><td>**Arbitrum**</td><td>42161</td><td>**Arbitrum Sepolia**</td><td>421614</td></tr>
    <tr><td>**Optimism**</td><td>10</td><td>**Optimism Sepolia**</td><td>11155420</td></tr>
    <tr><td>**Polygon**</td><td>137</td><td>**Polygon Amoy**</td><td>80002</td></tr>
    <tr><td>**Abstract**</td><td>2741</td><td>**Abstract Testnet**</td><td>11124</td></tr>
    <tr><td>**Avalanche**</td><td>43114</td><td>**Avalanche Fuji**</td><td>43113</td></tr>
    <tr><td>**Celo**</td><td>42220</td><td>**Celo Alfajores**</td><td>44787</td></tr>
    <tr><td>**Gnosis**</td><td>100</td><td>N/A</td><td>N/A</td></tr>
    <tr><td>**Linea**</td><td>59144</td><td>**Linea Sepolia**</td><td>59141</td></tr>
    <tr><td>**Mantle**</td><td>5000</td><td>**Mantle Sepolia**</td><td>5003</td></tr>
    <tr><td>**MegaETH**</td><td>6342</td><td>**MegaETH Testnet**</td><td>6342001</td></tr>
    <tr><td>**Scroll**</td><td>534352</td><td>**Scroll Sepolia**</td><td>534351</td></tr>
    <tr><td>**Taiko**</td><td>167000</td><td>N/A</td><td>N/A</td></tr>
    <tr><td>**Monad**</td><td>143</td><td>**Monad Testnet**</td><td>10143</td></tr>
    <tr><td>**BSC**</td><td>56</td><td>**BSC Testnet**</td><td>97</td></tr>
  </tbody>
</table>

## Metadata

**ERC-8004 metadata** is a JSON document describing the Agent's identity, capabilities, and other details. Once your register your Agent, its metadata will be publicly available and linked to your Agent's NFT.

You can find this data in your project: `src/public/.well-known/agent-registration.json`

:::note
During registration, Warden Code automatically updates this file.
:::

## Reputation

Users can rate Agents, affecting their **reputation**. It's a purely front-end feature (no server changes).

The `/register` command automatically populates the `registrations[]` array in [`agent-registration.json`](#metadata) with entries like this:

```json
{
  "agentId": 2302,
  "agentRegistry": "eip155:11155111:0x8004A818BFB912233c491871b3d84c89A494BD9e"
}
```

 Once the array has entries, the [frontend](basics#frontend) enables ERC-8004 reputation features:

- **Reputation display**: The info bar displays aggregated on-chain reputation, fetched from `ReputationRegistry` across all registered chains: star rating, numeric score, review count.

- **Feedback submission**: Each Agent response shows a 5-star rating row. Clicking a star submits `giveFeedback` to `ReputationRegistry` on the cheapest available L2 (auto-switches MetaMask if needed).

- **Self-rating prevention**: a pre-flight `isAuthorizedOrOwner` check prevents the MetaMask transaction popup when the Agent owner tries to rate their own Agent.
