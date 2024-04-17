# ELI5

The Warden Protocol provides modular L1 blockchain infrastructure for omnichain applications. Our mission is to empower application developers to simply launch secure OApps.

## What are OApps?
  

OApps are modularly secure, omnichain interoperable and chain abstracted evolutions of traditional smart contracts. They consist of three parts: a smart contract, a single- or multiple keychains, and an intent configurator.

## Modular security

  

Web3 will not onboard billions of users unless we fundamentally rethink user security. Warden’s modular blockchain infrastructure unbundles the application layer for greater security. Apps can support the same applications deployed with different security models, leveraging intents and keychains, thereby decoupling protocol-layer from application-layer security.

  

Keychains

A keychain is any type of custodian of private keys. Keychains generate, store keys and sign transactions. Users can use Warden’s Intent Configurator to configure their own application security setting, putting them in control of defining their own spectrum of custody: from holding their own keys, to sharding their keys and splitting them between users and enterprises, to delegating custody to an ISO-compliant, SOC-audited digital asset custodian, through to leveraging the latest in distributed key management protocols. Warden is also exploring a new variant of multisig, composed of different keychains & custodial models collaborating via user-driven intents.

  

## Intents

Intents are a set of user-supplied conditions under which a keychain signs a transaction with a private key. They are predicates over transactional data and external inputs; an arbitrary on-chain code evaluated at runtime by the settlement layer that enforces the terms of an interaction in a transparent, human-readable form. Warden offers users an Intent Configurator. This can be accessed via a GUI or over CLI, and lets a user interface and configure their chosen keychain. The OApps modular security stack embeds user intents into the applications security architecture.

Warden has created an intent specific language (“ISL”) which standardises interface-, transmission semantics and execution behaviours. It’s a composable, extensive, declarative, human-readable, English-like language purpose built so users can configure and preview the transaction conditions for their keychains.

  

Omnichain Interoperability

  

Currently, there are over 1.000 different chains and over 120 different L1s - each with their own protocol standards, consensus mechanisms, hashing algorithms and more. These ecosystems are mostly siloed and inaccessible. OApps were designed for unprecedented cross-chain interoperability, and specifically engineered to overcome isolated, fragmented environments. Users can seamlessly swap their tokens across supported chains and bridge to 64 connected chains.

  
  

## Chain Abstraction

Imagine you have different online accounts for email, social media, and e-commerce, each with its own username and password. It can be tough to remember all of them!

Now, think of a password manager like a special notebook where you can store all your usernames and passwords securely in one place. Instead of trying to remember each one, you just need to remember the password for your password manager.

Chain abstraction in Warden Protocol works similarly. Instead of managing multiple wallets or accounts for different blockchains separately, you can bring them all together into one "space" within Warden Protocol. Just like a password manager keeps your login information organized and secure, account aggregation in Warden Protocol helps you manage all your wallets conveniently and securely in one place.

----------

Now that we have learned the basics, let's focus on how you can use Warden.

For users Create Spaces, protect your wallets with intents and interact with the web3 space through SpaceWard. SpaceWard is an example application on Warden, and it acts as the front-end for the Warden Protocol, enabling account aggregation, and omnichain wallet management.

For builders Build OApps on Warden that are modularly secure, omnichain interoperable and chain-abstracted.
