---
sidebar_position: 2
---

# Glossary

---EDIT---

## Abstract syntax tree

An abstract syntax tree (AST) is an formal representation of an [Intent](#intent) definition in the [Intent-Specific Language](#intent-specific-language). When a user creates a new intent, a parser validates the syntactic structure of the Intent definition and represents it as an AST, which is stored on-chain.

---

## Bridging

Bridging is a process allowing users to transfer assets between different blockchain networks. Warden has native bridging functionality built in conjunction with an industry leader. It'll be announced soon.

(?) Can we add more?

---

## Builder incentive

A large portion of [WARD](#ward-token) supply is allocated for builder incentives. A link to the relevant builder grants will be dropped shortly.

(?) Can we add more?

---

## Chain Abstraction

Chain Abstraction is one of the key features of Warden. Instead of managing multiple wallets or accounts for different blockchains, you can aggregate them in one [Space](#space) within Warden Protocol. Spaces allow you to use [OApps](#omnichain-application) for signing transactions and messages at any destination chain, while traditional smart contract applications only target users of a single chain.

---

## Delegator

A delegator is an individual or entity that participates in the [staking](#staking) process by delegating their [WARD tokens](#ward-token) to a [validator](#validator). The purpose of delegation is securing the network and earning rewards without the responsibility of running a [full node](#full-node).

If a validator is successful, its delegators will consistently earn rewards. Conversely, if a validator is slashed for malicious behavior, the delegator’s stake will also be slashed. This is why it's important that delegators perform due diligence on validators before delegating. Delegators may also diversify their risk by spreading their stake over multiple validators.

---

## Full node

A full node is a server running a program (binary) that maintains a complete up-to-date version of a protocol with full transaction history. Each full node can also validate blocks and transactions in consensus with others.

Full nodes play a critical role in the decentralized nature of blockchain systems since they perform validation independently, without relying on a central authority. You can run a [Warden Protocol Node](#warden-protocol-node) and become a [validator](#validator) yourself.

(?) Does it sound correct?

---

## Governance

Governance is the process of making decisions about the operation and development of a blockchain network.

---

## Intent

An Intent is a set of user-defined conditions under which a [Keychain](#keychain) signs a transaction with a [private key](#key). Intents play an important role in Warden's [Modular Security](#modular-security).

You can define Intents using an [Intent Configurator](#intent-configurator) and the [Intent-Specific Language](#intent-specific-language). Then Warden's [Intent Engine](#intent-engine) processes Intents to ensure the validity of transactions.

---

## Intent Configurator

Each [Omnichain Application](#omnichain-application) has an Intent Configurator, which lets users interface and configure intents using a GUI or CLI.

(?) Can we add more?

---

## Intent Engine

Warden Protocol has an immutable on-chain Intent Engine that acts as a gatekeeper. Its purpose is to determine the outcome of an [Intent](#intent) verification, returning either true or false. A [Keychain](#keychain) can modify a user's state only when this user's Intents are respected.

(?) Does intent Engine returns true of false after checking the Abstract syntax tree?

---

## Intent-Specific Language

Warden has created an Intent-Specific Language (ISL) – a composable, extensive, declarative, human-readable, English-like language that allows users to configure [Intents](#intent).

When a user defines a new Intent, a tokenizer breaks down its definition into tokens, where each token represents the smallest atomic element of the ISL. Then a parser validates the definition by reading the resulting token stream. See also: [Abstract syntax tree](#abstract-syntax-tree), [Intent Engine](#intent-engine).

---

## Key

~ A key is...

- **Public key**
- **Private key**

---

## Keychain

A Keychain is a custodian of private keys playing an important role in Warden's [Modular Security](#modular-security). Keychains generate and store [keys](#key) and sign transactions if user [Intents](#intent) are satisfied.

Warden Protocol allows users or external organizations to onboard their own Keychains. Keychain operators can directly charge a fee for key and signature requests that will be paid in [WARD](#ward-token).

---

## Keychain Address

~ A Keychain Address is...

---

## Keychain Party

A Keychain Party represents a [Keychain](#keychain) system. It publishes responses to key and signature requests.

Keychain Parties are added through on-chain transactions to the Keychain object. Only Keychain Parties are able to publish responses to Warden Protocol.

(?)

---

## Keychain SDK

Keychain SDK is a Go SDK that abstracts the communication with [Warden Protocol Nodes](#warden-protocol-node), facilitation the development of [Keychains](#keychain).

(+) A link to the docs

---

## Modular security

~ Modular security is one of the key features of Warden...

---

Modular key management refers to a flexible approach to managing cryptographic keys used in blockchain systems. Instead of relying on a single provider for key management, users have the option to choose from a variety of key management solutions, or keychains. These keychains allow users to generate and store their wallet addresses (public keys) securely and sign transactions with their private keys.

---

Users can distribute the responsibility of key management across multiple keychains, enhancing security and reducing the risk of single points of failure.

---

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

~ An Omnichain Application (OApp) is...

---

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

~ An Omnichain Contract is...

---

Warden Protocol comes with two smart contract execution engines: w-WASM and w-EVM. The w-EVM module is currently being built, enabling builders to build and ship the language they love!

---

## Omnichain Interoperability

Omnichain Interoperability is one of the key features of Warden. Warden's [Omnichain Applications](#omnichain-applications) allow users to seamlessly swap their tokens across supported chains and bridge to 64 connected chains. Warden Protocol supports cross-chain transactions with Ethereum, other IBC-enabled chains, and any ECDSA- or EDDSA-based chain supported by a [Keychain](#keychain) – for example, Bitcoin.

---

## Oracle service

Warden is integrating a highly performant native oracle service, available to all builders on Warden. This will be announced soon.

(?) Can we add more?

---

## Space

A Space is a Warden address that serves as a management hub for a collection of [keys](#key). Spaces aggregate accounts for different blockchains by allowing users to interact with [Omnichain Applications](#omnichain-application). See also: [Chain Abstraction](#chain-abstraction).

---

## SpaceWard

SpaceWard is an [Omnichain Application](#omnichain-application) functioning as the front-end interface for Warden. It provides a user-friendly platform where you can create [Spaces](#space), manage wallets and [intents](#intent), and interact with decentralized applications (dApps) and other components of the Web3 ecosystem.

---

## Staking

Staking is the process of participating in the proof-of-stake (POS) consensus mechanism. Warden participants, [validators](#validator) and [delegators](#delegator), stake their [WARD tokens](#ward-token) tokens for a chance to validate transactions and earn staking rewards.

Delegators bond their tokens to validators, increasing their weight (total stake). Weight also depends on the amount of tokens validators delegate to themselves. The consensus mechanism selects validators to propose blocks based on their weight, so a validator with more tokens bonded can propose blocks more frequently and generate more rewards. Then rewards are distributed between the validator and its delegators.

---

## Validator

A validator is a participant in a blockchain network that runs a [full node](#full-node) and validates blocks and ransactions in consensus with other validators. In addition, validators can perform [governance](#governance).

To reach consensus, validators participate in [staking](#staking): they cast votes in blocks on behalf of their [delegators](#delegator). Voting involves broadcasting cryptographic signatures produced with a [private key](#private-key). In exchange for their work, validators receive [commissions](#validators-commission).

See also: [Validator states](#validator-states).

---

## Validator's commission

A validator’s commission is the percentage of [staking](#staking) rewards earned by a validator's pool that the validator retains for themselves. The rest is distributed to [delegators](#delegator).

A validator can configure their own commission, but only once, when initially declaring candidacy. The following parameters are available:

- An initial commission
- A maximum daily commission change rate
- A maximum commission.

---

## Validator states

[Validators](#validator) can exist in different states depending on their participation in the consensus process and status in the network:

- **Bonded**: An active validator that is participating in consensus. Bonded validators validate transactions, propose blocks, and earn rewards for their contributions to the network.

- **Unbonding**: A validator that is transitioning from bonded to unbonded. Validators enter this state either when they decide to stop participating or when they are slashed for misbehavior. During the unbonding period, validators aren't participating in the consensus process and aren't earning rewards.

- **Unbonded**: An inactive validator that isn't signing blocks. Unbonded validators can't be slashed and can’t earn rewards.

Note that all [delegators](#delegator) have the same state as their validators.

---

## WARD token

WARD is the native utility token integral to the Warden Protocol ecosystem. It facilitates various operations such as [governance](#governance), [staking](#staking), protocol fees and acts as a medium of payment for operators, such as [Keychain](#keychain) operators.

---

## Warden Protocol Node

Warden Protocol Node is any blockchain node in the Warden Protocol network. Nodes are responsible for routing requests to the appropriate [Keychain](#keychain) and routing responses back to the client.

To run a blockchain node, build and run the chain binary called `wardend`. To interact with a node, use the [Node API](/validate-and-run-a-node/node-api-reference). Note that running a node is a prerequisite for becoming a [validator](#validator). See also: [Full node](#full-node).

(?) How is it related to the full node?

## WARP token

WARP is a dynamic counterpart to [WARD](#ward-token), adding liquidity and gamification to the Warden Protocol ecosystem. It fuels engagement and participation through innovative tokenomics.

---
