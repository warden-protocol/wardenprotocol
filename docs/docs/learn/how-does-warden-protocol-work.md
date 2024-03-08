# How does Warden Protocol work?

The Warden Protocol is an intent-centric blockchain that enables various execution layers for interoperability, modular key management and smart contract execution.

## How does it work?
![Warden Protocol diagram](https://i.ibb.co/6yYvGJK/Screenshot-2024-02-09-at-12-21-22.png)

In this guide, we outline the process of securely conducting transactions across multiple blockchain platforms using intent-based operations. This streamlined workflow empowers both users and developers with an efficient and user-friendly method for multi-chain interactions. Here's how it works:

1.  Users have the flexibility to initiate transactions from their preferred decentralized application (dApp) across any Ethereum Virtual Machine (EVM) or Cosmos-based dApp. These transactions originate from wallets that users have previously created using one of the available Keychains.
    
2.  Upon initiation, the transaction passes through a series of intents. These intents act as checkpoints that either approve or reject the transaction based on pre-established conditions.
    
3.  When the intents validate and approve the transaction, the system then communicates with the Keychain associated with the user's wallet, requesting a signature for the transaction.
    

4.  Once signed, the transaction is then broadcast to the appropriate blockchain network for execution.

By following this procedure, users and developers can efficiently carry out secure, intent-based operations across multiple blockchain networks, enhancing the usability and accessibility of multi-chain ecosystems.
