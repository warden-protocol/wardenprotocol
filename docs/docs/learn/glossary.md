---
sidebar_position: 2
---

# Glossary

---EDIT---

## ~ Abstract syntax tree

When a user creates a new intent, a tokenizer breaks down the intent definition into tokens, where each token represents the smallest atomic element of the intent-specific language. A recursive descent parser validates that the intent definition is syntactically valid. It reads the resulting token stream and creates an abstract syntax tree (AST). ASTs are an extensible, formal representation of the syntactic structure of an intent definition and are stored on-chain.

---

## ~ Bridging

Warden has native bridging functionality built in conjunction with an industry leader. This will be announced soon.

---

Bridging assets is another potential use case. In some instances - for example when an underlying asset is too expensive to slow - like in the case of Ethereum or Bitcoin, there can be value to wrapping an asset. An OApp developer could build a token bridge using account aggregation, that keeps an account of deposits of a given token on an address and issues the respective token balance on another chain. Additionally, Warden will leverage a modular implementation of Axelar’s cross-chain communication protocol, to enable rapid, programmable bridging of assets.

---

## ~ Builder incentive

A large portion of $WARD supply is allocated for builder incentives. A link to the relevant builder grants will be dropped shortly.

---

## + Chain Abstraction

Chain Abstraction is one of the key features of Warden. Instead of managing multiple wallets or accounts for different blockchains, you can aggregate them in one [Space](#space) within Warden Protocol. Spaces allow you to use [OApps](#omnichain-application) for signing transactions and messages at any destination chain, while traditional smart contract applications only target users of a single chain.

---

## + Delegator

A delegator is an individual or entity that participates in the [staking](#staking) process by delegating their WARD tokens to a [validator](#validator). The purpose of delegation is securing the network and earning rewards without the responsibility of running a [full node](full-node).

If a validator is successful, its delegators will consistently earn rewards. Conversely, if a validator is slashed for malicious behavior, the delegator’s stake will also be slashed. This is why it's important that delegators perform due diligence on validators before delegating. Delegators may also diversify their risk by spreading their stake over multiple validators.

---

## (?) Full node

A full node is a server running a program that maintains a complete up-to-date version of a protocol with full transaction history. Each full node can also validate blocks and transactions in consensus with others.

Full nodes play a critical role in the decentralized nature of blockchain systems since they perform validation independently, without relying on a central authority. You can run a [Warden Protocol Node](#warden-protocol-node) and become a [validator](#validator) yourself.

---

## + Governance

Governance is the process of making decisions about the operation and development of a blockchain network.

---

## Intent

Intents are a set of user-supplied conditions under which a keychain signs a transaction with a private key. They are predicates over transactional data and external inputs; an arbitrary on-chain code evaluated at runtime by the settlement layer that enforces the terms of an interaction in a transparent, human-readable form. Warden offers users an Intent Configurator. This can be accessed via a GUI or over CLI, and lets a user interface and configure their chosen keychain. The OApps modular security stack embeds user intents into the applications security architecture.

Warden has created an intent specific language (“ISL”) which standardizes interface-, transmission semantics and execution behaviors. It’s a composable, extensive, declarative, human-readable, English-like language purpose built so users can configure and preview the transaction conditions for their keychains.

---

**Q: What are intents?** A: Intents are a set of user-supplied conditions under which a keychain signs a transaction with a private key. They define the criteria that must be met for a transaction to be considered valid and added to the blockchain.

**Q: How do intents work?** A: Warden Protocol has an immutable on-chain, Intent Engine that acts as a gatekeeper. Its sole purpose is to determine the outcome of an intent verification, returning only either true or false. It is only when a user's supplied intents are immutably respected that a keychain can modify a user's state.

**Q: Why are intents important?** A: Intents ensure that only valid transactions are processed on the blockchain, maintaining its security and integrity. They help establish trust by enforcing the rules that govern the network's operations.

**Q: How do I set my intents?** A: Warden users have an Intent Configurator which can be accessed via a GUI or over CLI. This lets a user interface and configure intents with their chosen keychain.

---

## Intent Engine

---

## Intent-Specific Language

Intent-Specific Language (ISL) is...

---

## Key

- Public key
- Private key

---

## Keychain

A keychain is any type of custodian of private keys. Keychains generate, store keys and sign transactions. Users can use Warden’s Intent Configurator to configure their own application security setting, putting them in control of defining their own spectrum of custody: from holding their own keys, to sharding their keys and splitting them between users and enterprises, to delegating custody to an ISO-compliant, SOC-audited digital asset custodian, through to leveraging the latest in distributed key management protocols. Warden is also exploring a new variant of multisig, composed of different keychains & custodial models collaborating via user-driven intents.

---

***Q: What is modular key management?*** A: Modular key management refers to a flexible approach to managing cryptographic keys used in blockchain systems. Instead of relying on a single provider for key management, users have the option to choose from a variety of key management solutions, or keychains. These keychains allow users to generate and store their wallet addresses (public keys) securely and sign transactions with their private keys.

**Q: How does modular key management work?** A: With modular key management, users can select key management solutions that best suit their security and usability preferences. They can distribute the responsibility of key management across multiple keychains, enhancing security and reducing the risk of single points of failure. In the context of the Warden Protocol, modular key management ensures that users have greater control over their cryptographic keys and can choose the most suitable key management solutions for their needs.

**Q: What are the benefits of modular key management?** A: Modular key management provides users with flexibility, security, and interoperability in managing their cryptographic keys. It allows them to choose from a range of key management solutions, adapt to changing security requirements, and integrate with different blockchain systems and applications. By decentralizing key management, modular key management enhances the resilience and trustworthiness of blockchain networks and ensures that users maintain control over their digital assets.

---

A keychain is any type of custodian of private keys. Keychains generate, store keys and sign transactions. Users can use Warden’s Intent Configurator to configure their own application security setting, putting them in control of defining their own spectrum of custody: from holding their own keys, to sharding their keys and splitting them between users and enterprises, to delegating custody to an ISO-compliant, SOC-audited digital asset custodian, through to leveraging the latest in distributed key management protocols. Warden is also exploring a new variant of multisig, composed of different keychains & custodial models collaborating via user-driven intents.

Each OApp has an Intent Configurator. This can be accessed via a GUI or over CLI, and lets a user interface and configure intents with their chosen keychain. Intents are a set of user-supplied conditions under which a keychain signs a transaction with a private key. They are predicates over transactional data and external inputs; an arbitrary on-chain code evaluated at runtime by the settlement layer that enforces the terms of an interaction in a transparent, human-readable form. The OApps modular security stack embeds user intents into the applications security architecture.

Today there is no standard mechanism to express, compose and parse intents, similar to the time before SQL when querying databases was tricky. In order to enable arbitrary use cases from several OApps, we unified the syntax with which users can express their intents and configure their keychain. This embedded, intent specific language (“ISL”) standardizes interface-, transmission semantics and execution behaviors. It’s a composable, extensive, declarative, human-readable, English-like language purpose built so users can configure and preview the transaction conditions for their keychains.

Keychains sign transactions only when a user’s intents are satisfied. Warden Protocol has an immutable on-chain, Intent Engine that acts as a gatekeeper. In order to prioritize security, minimize attack surface and focus on first principles, the intent engine is designed as a functional program with a boolean predicate. Its sole purpose is to determine the outcome of an intent verification, returning only either true or false. It is only when a user’s supplied intents are immutably respected that a keychain can modify a user’s state. Each time a transaction arrives in the mempool, a Warden Protocol validator runs the transaction against the set of user-created intents to verify if they are met. It is only when an intent validates the transactions, that the Warden Protocol validators include it in a block on the chain.

Keychains sign transactions only when a user’s intents are satisfied. Warden Protocol has an immutable on-chain, Intent Engine that acts as a gatekeeper. In order to prioritize security, minimize attack surface and focus on first principles, the intent engine is designed as a functional program with a boolean predicate. Its sole purpose is to determine the outcome of an intent verification, returning only either true or false. It is only when a user’s supplied intents are immutably respected that a keychain can modify a user’s state. Each time a transaction arrives in the mempool, a Warden Protocol validator runs the transaction against the set of user-created intents to verify if they are met. It is only when an intent validates the transactions, that the Warden Protocol validators include it in a block on the chain.

---

Warden Protocol allows users or outside institutions to onboard their own keychain. To onboard a new Keychain, users can submit a NewKeychain transaction with a certain payload specifying the keychain and keychain settings.

---

Keychain operators can directly charge a fee for key- and signature requests that will be paid in WARD. This directly creates a revenue stream for keychain operators to the respective keychain address. keychain admins can manage these funds.

---

## Keychain Address

---

## Keychain Party

Responses to key- and signature requests are being published to Warden Protocol by a keychain party which represents the keychain system. The keychain parties are being added through on-chain transactions to the keychain object on Warden Protocol. Only the keychain parties are able to publish responses to Warden Protocol.

---

Keychain SDK

---

## Modular security

Web3 will not onboard billions of users unless we fundamentally rethink user security. Warden’s modular blockchain infrastructure unbundles the application layer for greater security. Apps can support the same applications deployed with different security models, leveraging intents and keychains, thereby decoupling protocol-layer from application-layer security.

---

Web3 will not onboard billions of users unless we rethink and unbundle the security stack.

Shared protocol security entails applications on a given infrastructure adhering to the infrastructure’s security requirements, like L2 solutions. These monolithic systems impose equal security on their applications. A vulnerability on a monolithic protocol suddenly doesn’t affect a single application, but depending on the type of bug, it can impact several, leaving developers and users with no means of recourse or correctional mechanism.

In contrast, isolated security allows each application to define its own security. This is sometimes seen on apps built on messaging protocols, like LayerZero. Each application developer defines its own relayer, oracle and validation libraries alongside a set of other security configurations. Each user has to separately validate the risk inclined with every application they want to use. It also assumes developers are trusted, reliable and honest third-parties.

Warden Protocol distinguishes between application, and protocol-level security. Each OApp inherits protocol security from Warden Protocol. The protocol acts as a security aggregator and stabilizing force for the OApp ecosystem. Security guarantees include its replicated, permissionless proof-of-stake consensus mechanism, the fault-tolerant and liveness properties of consensus, the validator set and node authentication, its secure channel communication, fork detection and handling, as well as its finality and censorship resistance. OApp developers retain network effects, and they don’t have to bootstrap new validators for nascent applications. They don’t incur the overhead of having to operate their own infrastructure, they have a lower security budget and are less susceptible to sybil-, long-range, eclipse or 51% attacks which will all contribute to lowering the barriers to new deployment. Each OApp is collectively secured by all the WARD staked on Warden Protocol.

Additionally, OApps inherit application-level security from keychains, and their Intent Engines. This is critical, because the application layer is closest to users, and represents the largest attack vector. With keychains and the Intent Engine, OApp users can configure distributed key creation, signatures, threshold signature schemes, role-based access controls and administrate signing authorization. This creates resilience against private key exploits, theft, spoofing and sweeping.

Thanks to this modularity, OApps can support the same application deployed with different security models, achieving homogeneous protocol security with heterogeneous, isolated application security. Users can choose their trust assumption, while application developers retain the network effects of being able to use the same shared protocol security without incurring security fragmentation when scaling the number of applications. In addition, they stay responsive when new security technologies emerge.

---

## Omnichain Application

OApps are modularly secure, omnichain interoperable and chain abstracted evolutions of traditional smart contracts. They consist of three parts: a smart contract, a single- or multiple keychains, and an intent configurator.

---

OApps are a powerful evolution to traditional smart contracts. They consist of three parts: application & contracting logic, a stack of keychains, and a user-supplied, parametrizable intent configurator. Owing to this OApps can achieve remarkable features: they are modularly secure, omnichain interoperable and chain-abstracted.

OApps are modularly secure. OApps can support the same applications deployed with different security models, thereby decoupling protocol-layer from application-layer security. The result is homogeneous protocol security, with a heterogeneous application security that minimizes security fragmentation, and captures a user’s true intents when interacting with an application. Users can choose their trust assumptions, while application developers retain the network effects of being able to use a shared protocol security. Any TVL intensive DeFi application, that necessitates substantial deposits, such as Liquid Staking Protocols, AMMs, Money Markets or DEXes, could experience significant advantages from deploying as an OApp.

OApps are omnichain interoperable. Collectively, many OApps form an application mesh topology. This mesh is resiliently designed for cross-interoperability, overcoming isolated and fragmented ecosystems. Their connections are persistent and universal - whether it's letting users seamlessly swap across supported chains, interact with applications from other chains or exchange native assets for wrapped ones.

OApps are chain-abstracted. Whereas traditional smart contract applications only target users of a single chain, OApps can sign transactions and messages targeted for any other foreign chain. They can read and write to other chains which enables a host of completely new use cases enabled by OApps.

OApps are remarkably lightweight and straightforward to build. Developers can write in the language they love, use the tooling, frontend libraries, node & RPC providers, and wallet providers that they are most accustomed to.

---

**Q: What are OApps?** A: OApps are a powerful evolution of traditional smart contracts. They consist of three parts: application & contracting logic, a stack of keychains, and a user-supplied, parametrizable intent configurator. Owing to this, OApps can achieve remarkable features: they are modularly secure, omnichain interoperable, and chain-abstracted.

**Q: Why do OApps have an advantage over traditional smart contracts?** A: In addition to the above features, their omnichain nature opens the widest range of potential use cases. They are interoperable across OApps and other blockchains, leveraging various interoperability and messaging architecture. OApps are also able to sign transactions and messages targeted for any other foreign chain. With this, they can read and write to other chains which enables a host of completely new use cases enabled by OApps. Bitcoin on EVM, Solana on Cosmos, or truly omnichain dApps - anything is possible with OApps!

---

## Omnichain Contract

**Q: What smart contract language does Warden support?** A: Warden Protocol comes with two smart contract execution engines: w-WASM and w-EVM. The w-EVM module is currently being built, enabling builders to build and ship the language they love!

---

## Omnichain Interoperability

Currently, there are over 1.000 different chains and over 120 different L1s - each with their own protocol standards, consensus mechanisms, hashing algorithms and more. These ecosystems are mostly siloed and inaccessible. OApps were designed for unprecedented cross-chain interoperability, and specifically engineered to overcome isolated, fragmented environments. Users can seamlessly swap their tokens across supported chains and bridge to 64 connected chains.

---

**Q: How does Warden achieve omnichain interoperability?** A: Warden is designed to overcome isolated and fragmented environments. The goal here is to abstract away the various boundaries between blockchains. With Warden, users and OApps can seamlessly swap tokens across supported chains and bridge to 64 connected chains. Warden Protocol supports cross-chain transactions with Ethereum, other IBC-enabled chains and any ECDSA or EDDSA-based chain supported by a keychain (e.g. Bitcoin).

---

## Oracle service

**Q: Does Warden have any oracle services?** A: Yes, Warden is integrating a highly performant native oracle service, available to all builders on Warden. This will be announced soon.

---

## Space

A space functions as a management hub for a collection of keys, akin to an organization. It enables you to maintain separate spaces for distinct purposes, such as distinguishing between personal and professional uses.

---

Spaces are identity-abstracted, privacy-preserved, account-aggregated Warden addresses with which users can interact with OApps or entirely separate web3 applications.

---

## SpaceWard

**Q: What is SpaceWard?** A: SpaceWard is an example of the powerful type of OApps that can be built on Warden. Think of SpaceWard as the front-end interface for Warden. It provides users with a user-friendly platform to access and manage their wallets, create Spaces (account aggregation environments for wallets), and interact with decentralized applications (dApps) and other components of the web3 ecosystem.

**Q: What can you do with SpaceWard?** A: With SpaceWard, users can securely manage accounts and wallets on any blockchain. Users can aggregate and drive all their web3 activity from SpaceWard, protected by extensible intents. Developers have an environment to build and deploy applications on both Warden and any other blockchain.

**Q: Why is SpaceWard important?** A: SpaceWard simplifies the user experience for interacting with blockchain networks and decentralized services. It provides an intuitive interface for managing wallets and accessing the features of the Warden Protocol, making blockchain technology more accessible to a wider audience.

---

Try SpaceWard on Buenavista testnet 👉 https://spaceward.buenavista.wardenprotocol.org

SpaceWard is the front-end for the Warden Protocol, enabling account aggregation and modular security omnichain operations.

For users Use the most secure multi-chain multi-sig wallet. Create Spaces, protect your wallets and program transactions with intents and interact with the web3 space.

For builders Build OApps on Warden or any compatible blockchain, protected by modular security.

To engage with SpaceWard, a Warden wallet is required (Keplr, xDefi, Leap), which must be connected. This connection enables the addition of the Warden Protocol chain, facilitating interaction with both SpaceWard and the protocol.

---


## Staking

Staking refers to the process of participating in a blockchain network’s proof-of-stake (POS) consensus mechanism by locking up a certain amount of tokens as collateral to support the network’s operations. Staking occurs when Warden users delegate their WARD to a validator. This increases a validator’s weight, which in turn improves the likelihood of being selected to validate blocks and earn rewards.

A validator’s weight (total stake) is determined by the amount of staking tokens (WARD) they delegate to themselves plus the WARD bonded to them by external delegators. The weight of a validator determines whether or not they are active validators and how frequently they can propose a block. A validator with a higher weight will propose blocks more frequently and in turn generate more revenue.

---

## + Validator

A validator is a participant in a blockchain network that runs a [full node](#full-node) and validates blocks and ransactions in consensus with other validators. In addition, validators can perform [governance](#governance).

To reach consensus, validators participate in [staking](#staking): they cast votes in blocks on behalf of their [delegators](#delegator). Voting involves broadcasting cryptographic signatures produced with a [private key](#private-key). In exchange for their work, validators receive [commissions](#validators-commission).

See also: [Validator states](#validator-states).

---

## + Validator's commission

A validator’s commission is the percentage of [staking](#staking) rewards earned by a validator's pool that the validator retains for themselves. The rest is distributed to [delegators](#delegator).

A validator can configure their own commission, but only once, when initially declaring candidacy. The following parameters are available:

- An initial commission
- A maximum daily commission change rate
- A maximum commission.

---

## + Validator states

[Validators](#validator) can exist in different states depending on their participation in the consensus process and status in the network:

- **Bonded**: An active validator that is participating in consensus. Bonded validators validate transactions, propose blocks, and earn rewards for their contributions to the network.

- **Unbonding**: A validator that is transitioning from bonded to unbonded. Validators enter this state either when they decide to stop participating or when they are slashed for misbehavior. During the unbonding period, validators aren't participating in the consensus process and aren't earning rewards.

- **Unbonded**: An inactive validator that isn't signing blocks. Unbonded validators can't be slashed and can’t earn rewards.

Note that all [delegators](#delegator) have the same state as their validators.

---

## Warden Protocol Node

Node, any blockchain node in the Warden Protocol network

---

The Node is a central point of contact for the Warden Protocol. It's
responsible for routing requests to the appropriate Keychain, and for routing
responses back to the client.

Interacting with the node is possible through a HTTP API, or through a gRPC
API.

The full list of available endpoints is documented in the API
reference.

---

To run a blockchain node, build and run the chain binary called `wardend`.