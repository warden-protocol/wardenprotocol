# FAQ

## Intents

**Q: What are intents?** 
A: Intents are a set of user-supplied conditions under which a keychain signs a transaction with a private key. They define the criteria that must be met for a transaction to be considered valid and added to the blockchain.

**Q: How do intents work?**
A: Warden Protocol has an immutable on-chain, Intent Engine that acts as a gatekeeper. Its sole purpose is to determine the outcome of an intent verification, returning only either true or false. It is only when a user's supplied intents are immutably respected that a keychain can modify a user's state.

**Q: Why are intents important?** 
A: Intents ensure that only valid transactions are processed on the blockchain, maintaining its security and integrity. They help establish trust by enforcing the rules that govern the network's operations.

**Q: How do I set my intents?** 
A: Warden users have an Intent Configurator which can be accessed via a GUI or over CLI. This lets a user interface and configure intents with their chosen keychain.

***  

## SpaceWard

**Q: What is SpaceWard?** 
A: SpaceWard is an example of the powerful type of OApps that can be built on Warden. Think of SpaceWard as the front-end interface for Warden. It provides users with a user-friendly platform to access and manage their wallets, create Spaces (account aggregation environments for wallets), and interact with decentralized applications (dApps) and other components of the web3 ecosystem.

**Q: What can you do with SpaceWard?** 
A: With SpaceWard, users can securely manage accounts and wallets on any blockchain. Users can aggregate and drive all their web3 activity from SpaceWard, protected by extensible intents. Developers have an environment to build and deploy applications on both Warden and any other blockchain.

  

**Q: Why is SpaceWard important?** 
A: SpaceWard simplifies the user experience for interacting with blockchain networks and decentralized services. It provides an intuitive interface for managing wallets and accessing the features of the Warden Protocol, making blockchain technology more accessible to a wider audience.

***

## OApps  

**Q: What are OApps?** 
A: OApps are a powerful evolution of traditional smart contracts. They consist of three parts: application & contracting logic, a stack of keychains, and a user-supplied, parametrizable intent configurator. Owing to this, OApps can achieve remarkable features: they are modularly secure, omnichain interoperable, and chain-abstracted.

**Q: Why do OApps have an advantage over traditional smart contracts?** 
A: In addition to the above features, their omnichain nature opens the widest range of potential use cases. They are interoperable across OApps and other blockchains, leveraging various interoperability and messaging architecture. OApps are also able to sign transactions and messages targeted for any other foreign chain. With this, they can read and write to other chains which enables a host of completely new use cases enabled by OApps. Bitcoin on EVM, Solana on Cosmos, or truly omnichain dApps - anything is possible with OApps!

***

## Keychains

**Q: What is modular key management?** 
A: Modular key management refers to a flexible approach to managing cryptographic keys used in blockchain systems. Instead of relying on a single provider for key management, users have the option to choose from a variety of key management solutions, or keychains. These keychains allow users to generate and store their wallet addresses (public keys) securely and sign transactions with their private keys.

  
**Q: How does modular key management work?** 
A: With modular key management, users can select key management solutions that best suit their security and usability preferences. They can distribute the responsibility of key management across multiple keychains, enhancing security and reducing the risk of single points of failure. In the context of the Warden Protocol, modular key management ensures that users have greater control over their cryptographic keys and can choose the most suitable key management solutions for their needs.


**Q: What are the benefits of modular key management?** 
A: Modular key management provides users with flexibility, security, and interoperability in managing their cryptographic keys. It allows them to choose from a range of key management solutions, adapt to changing security requirements, and integrate with different blockchain systems and applications. By decentralizing key management, modular key management enhances the resilience and trustworthiness of blockchain networks and ensures that users maintain control over their digital assets.

 ***

## Omnichain Interoperability

**Q: How does Warden achieve omnichain interoperability?** 
A: Warden is designed to overcome isolated and fragmented environments. The goal here is to abstract away the various boundaries between blockchains. With Warden, users and OApps can seamlessly swap tokens across supported chains and bridge to 64 connected chains. Warden Protocol supports cross-chain transactions with Ethereum, other IBC-enabled chains and any ECDSA or EDDSA-based chain supported by a keychain (e.g. Bitcoin).

***

## Chain Abstraction

**Q: How does Warden offer chain abstraction?** 
A: Spaces are users' gateways to the mesh network of OApps and any other blockchain. They are identity-abstracted, privacy-preserved, and account-aggregated Warden addresses with which users can interact with OApps or entirely separate web3 applications. By using key ids, each OApp user can receive an infinite number of remote addresses on every ECDSA-/EDDSA-based blockchain. Traditional smart contract applications only target users of a single chain. Thanks to Spaces, OApps can sign transactions and general messages targeted at any destination chain. OApps can sign transactions executed on other blockchains (e.g., writing to other chains), and thanks to a direct network integration, listeners can query data and events from other chains (e.g., reading from other chains).

 ***

## What else does Warden offer developers and builders?

**Q: Does Warden have a bridge?**
A: Yes, Warden has native bridging functionality built in conjunction with an industry leader. This will be announced soon.

**Q: What smart contract language does Warden support?** 
A: Warden Protocol comes with two smart contract execution engines: w-WASM and w-EVM. The w-EVM module is currently being built, enabling builders to build and ship the language they love!

**Q: Does Warden have any oracle services?** 
A: Yes, Warden is integrating a highly performant native oracle service, available to all builders on Warden. This will be announced soon.

**Q: Are there incentives for builders on Warden?** 
A: Yes! A large portion of $WARD supply is allocated for builder incentives. A link to the relevant builder grants will be dropped shortly.