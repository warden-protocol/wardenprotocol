---
sidebar_position: 1
---

# Introduction

## Overview

Try SpaceWard on Buenavista testnet  👉  https://spaceward.buenavista.wardenprotocol.org

**SpaceWard**  is the front-end interface for the Warden Protocol, enabling account aggregation and modularly secure omnichain operations.

**For users:** Use the most secure multi-chain multi-sig wallet. Create Spaces, protect your wallets and program transactions with Intents, and interact with the Web3 space.

**For builders:** Build OApps on Warden or any compatible blockchain, protected by modular security.

To engage with SpaceWard, you need to [connect your wallet](connect-your-wallet) with the Warden Protocol.

## Main features

Within SpaceWard, you have the ability to carry out a wide range of protocol-related activities:

1. Establish and choose spaces
2. Produce keys (wallet addresses)
3. Examine all assets contained within your keys
4. Add or remove Space owners 
5. Set up and oversee intents
6. Check and execute operations based on your activities (for example, approving intent requests)
7. Manage Keychains operations
8. Monitor transaction progress and access details via the Explorer
9. Explore SpaceWard curated dApp list
10. Explore your space and account settings.
11. Monitor any pending actions.
12. Check your current connection to SpaceWard, change wallet or close session
13. External wallets to use your Keychain addresses (MetaMask Snaps, WalletConnect)

![enter image description here](https://i.ibb.co/5MzQqDs/spaceward.png)

## Transaction flow

SpaceWard allows you to securely carry out Intent-based operations across multiple blockchains. Here is how it works:

1. Users have the flexibility to initiate transactions from their preferred decentralized application (dApp) across any Ethereum Virtual Machine (EVM) or Cosmos-based dApp. These transactions originate from wallets that users have previously created using one of the available Keychains.
    
2. Upon initiation, the transaction passes through a series of Intents. Intents act as checkpoints that either approve or reject the transaction based on pre-established conditions.
    
3. When Intents validate and approve the transaction, the system requests a signature from the Keychain associated with the user's wallet.
    
4. Once signed, the transaction is then broadcast to the appropriate blockchain network for execution.

![Warden Protocol diagram](https://i.ibb.co/6yYvGJK/Screenshot-2024-02-09-at-12-21-22.png)