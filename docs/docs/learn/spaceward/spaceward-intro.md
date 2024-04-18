---
sidebar_position: 1
---

# SpaceWard Intro

Try SpaceWard on Alfama testnet  👉  https://spaceward.alfama.wardenprotocol.org

**SpaceWard**  is the front-end for the Warden Protocol, enabling account aggregation and modular security omnichain operations.

**For users**  Use the most secure multi-chain multi-sig wallet. Create Spaces, protect your wallets and program transactions with intents and interact with the web3 space.

**For builders**  Build OApps on Warden or any compatible blockchain, protected by modular security.

To engage with SpaceWard, a Warden wallet is required (Keplr, xDefi, Leap), which must be connected. This connection enables the addition of the Warden Protocol chain, facilitating interaction with both SpaceWard and the protocol.

![spaceward](https://i.ibb.co/3yTD32Q/Screenshot-2024-02-15-at-15-58-13.png)

****
## Overview of the main actions

![Overview](https://i.ibb.co/j8pkPqR/Screenshot-2024-02-15-at-18-58-20.png)

Within SpaceWard, you have the ability to carry out a wide range of protocol-related activities:

1.  Establish and choose spaces.
2.  Produce keys (wallet addresses).
3.  Examine all assets contained within your keys.
4.  Check and execute operations based on your activities (for example, approving intent requests).
5.  Set up and oversee intents.
6.  Initiate transactions to transfer and acquire assets.
7.  Connect with decentralized applications (dApps) through WalletConnect or access them via the Apps repository.
8.  Monitor transaction progress and access details via the Explorer.
9.  Acquire WARD on the testnet by utilizing the faucet.

***

## Transaction flow


![Warden Protocol diagram](https://i.ibb.co/6yYvGJK/Screenshot-2024-02-09-at-12-21-22.png)

In this guide, we outline the process of securely conducting transactions across multiple blockchains using intent-based operations through SpaceWard. This streamlined workflow empowers both users and developers with an efficient and user-friendly method for omnichain interactions. Here's how it works:

1.  Users have the flexibility to initiate transactions from their preferred decentralized application (dApp) across any Ethereum Virtual Machine (EVM) or Cosmos-based dApp. These transactions originate from wallets that users have previously created using one of the available Keychains.
    
2.  Upon initiation, the transaction passes through a series of intents. These intents act as checkpoints that either approve or reject the transaction based on pre-established conditions.
    
3.  When the intents validate and approve the transaction, the system then communicates with the Keychain associated with the user's wallet, requesting a signature for the transaction.
    
4.  Once signed, the transaction is then broadcast to the appropriate blockchain network for execution.

By following this procedure, users and developers can efficiently carry out modular secured, intent-based omnichain operations, enhancing the security and interoperability.