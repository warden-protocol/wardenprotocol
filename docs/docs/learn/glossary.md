---
sidebar_position: 2
---

# Glossary

---REVIEW---

## Abstract syntax tree

An abstract syntax tree (AST) is an formal representation of an [Intent](#intent) definition in the [Intent-Specific Language](#intent-specific-language). When a user creates a new intent, a parser validates the syntactic structure of the Intent definition and represents it as an AST, which is stored on-chain.

---

## Bridging

Bridging is a process allowing users to transfer assets between different blockchain networks. Warden has native bridging functionality built in conjunction with an industry leader. It'll be announced soon. See also: [Omnichain Interoperability](#omnichain-interoperability).

(?) Can we be more specific?

---

## Builder incentive

A large portion of [WARD](#ward-token) supply is allocated for builder incentives. A link to the relevant builder grants will be dropped shortly.

(?) Can we be more specific?

---

## Chain Abstraction

Chain Abstraction is one of Warden's key features. Instead of managing multiple wallets or accounts for different blockchains, you can aggregate them in one [Space](#space) within the Warden Protocol. [Omnichain Applications](#omnichain-application) allow signing transactions and messages at any destination chain.

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

(?) What else can we say about it?

---

## Intent

An Intent is a set of user-defined conditions under which a [Keychain](#keychain) signs a transaction with a private [key](#key). Intents contribute to Warden's [Modular Security](#modular-security).

You can define Intents using an [Intent Configurator](#intent-configurator) and the [Intent-Specific Language](#intent-specific-language). Warden's [Intent Engine](#intent-engine) processes Intents to ensure the validity of transactions.

---

## Intent Configurator

Each [Omnichain Application](#omnichain-application) has an Intent Configurator, which lets users interface and configure intents using a GUI or CLI. Intents are defined in the [Intent-Specific Language](#intent-specific-language).

---

## Intent Engine

Warden Protocol has an immutable on-chain Intent Engine that acts as a gatekeeper. Its purpose is to determine the outcome of an [Intent](#intent) verification, returning either true or false. A [Keychain](#keychain) can modify a user's state only when this user's Intents are respected.

(?) Does Intent Engine checks the Abstract syntax tree?

---

## Intent-Specific Language

Intent-Specific Language (ISL) is a language that allows users to configure [Intents](#intent). It's composable, extensive, declarative, human-readable, and English-like. See also: [Abstract syntax tree](#abstract-syntax-tree).

---

## Key

There are two types of keys, which are paired to secure the ownership of wallets:

- **Public key**: A public wallet address
- **Private key**: A private code for signing transactions

Warden users can secure and manage their keys with the help of [Keychains](#keychain).

---

## Key request

A key request is a request asking a [Keychain](#keychain) to generate a pair of private and public [keys](#key). Keychain operators can charge [key request fees](#key-request-fee). This is how such requests are processed:

1. A user sends a key request with a [Keychain Address](#keychain-address) identifying the preferred Keychain.
2. The [Intent Engine](#intent-engine) checks user [Intents](#intent).
3. If Intents are satisfied, the Keychain generates and stores a private key.
4. A [Keychain Party](#keychain-party) publishes a public key to Warden Protocol.

(?) Should we treat it as a Warden-specific term and capitalize it?  
(?) Is it true that the Keychain generates and stores a private key?  
(?) Are fees charged even when Intents aren't satisfied?

---

## Key request fee

[Keychain](#keychain) operators can set fees in [WARD](#ward-token) for [key requests](#key-request). The Keychain collect fees to its [Keychain Address](#keychain-address), and then the Keychain operator can manage these funds. Key request fees are indicated in uWARD.

(?) Should we treat it as a Warden-specific term and capitalize it?  

---

## Keychain

Every [Omnichain Application](#omnichain-applications) has at least one Keychain – a custodian that generates and stores [keys](#key) and signs transactions. Keychains contribute to Warden's [Modular Key Management](#modular-key-management) and [Modular Security](#modular-security).

Warden Protocol allows users or external organizations to onboard their own Keychains and charge fees for [key requests](#key-request) and [signature requests](#signature-requests). To build a Keychain, you can use the [Keychain SDK](#keychain-sdk).

---

## Keychain Address

A Keychain Address is a dedicated address that identifies a [Keychain](#keychain) in [key requests](#key-request) and [signature requests](#signature-request) and collects fees from users.

(?) Should we treat it as a Warden-specific term and capitalize it?  
(?) Does it sound correct?

---

## Keychain Party

A Keychain Party is an account that publishes signatures and public keys on behalf of a [Keychain](#keychain). The Keychain operator can create multiple Parties, each with its own address. See also: [Key requests](#key-request), [Signature requests](#signature-request).

(?) Does it sound correct?

---

## Keychain SDK

The Keychain SDK is a Go SDK that abstracts the communication with [Warden Protocol Nodes](#warden-protocol-node), facilitating the development of [Keychains](#keychain). To learn more, see [Keychain SDK functions](/build-a-keychain/keychain-sdk-functions).

---

## Modular Key Management

Modular Key Management is a flexible approach to managing keys in Warden. Instead of relying on a single provider for key management, users can manage different [keys](#key) with different [Keychains](#keychain). It reduces the risk of single points of failure and gives users greater control over their keys.

---

## Modular Security

Modular Security is one of Warden's key features. Thanks to modularity, the same [Omnichain Application](#omnichain-application) can combine different security models:

- OApp users can set and manage their own application security settings with the help of [Intents](#intents) and [Keychains](#keychains).
- Each OApp is collectively secured by all the tokens [staked](#staking) on the protocol.

By decoupling application-layer and protocol-layer security, Warden takes the best from monolithic and isolated security systems and avoids the risks of both.

(?) Does it sound correct?

---

## Omnichain Application

An Omnichain Application (OApp) is a powerful evolution of traditional smart contracts. It allows signing transactions at any chain, while traditional smart contract applications only target users of a single chain. Each OApp consists of three parts:

- An [Omnichain Contract](#omnichain-contract)
- A [Keychain](#keychain) or multiple Keychains
- An [Intent Configurator](#intent-configurator)

OApps contribute to all Warden's key features: [Chain Abstraction](#chain-abstraction), [Modular Security](#modular-security), and [Omnichain Interoperability](#omnichain-interoperability).

---

## Omnichain Contract

An Omnichain Contract is a smart contract that allows signing transactions and messages at any destination chain. It's the main part of any [Omnichain Application](#omnichain-applications). Omnichain Contracts contribute to Warden's [Chain Abstraction](#chain-abstraction).

---

## Omnichain Interoperability

Omnichain Interoperability is one of Warden's key features. Collectively, [Omnichain Applications](#omnichain-applications) form an application mesh topology, which overcomes isolated and fragmented ecosystems.

OApps allow you to swap tokens across supported chains and [bridge](#bridging) to 64 connected chains. You can perform cross-chain transactions with Ethereum, other IBC-enabled chains, and any ECDSA- or EDDSA-based chain supported by a [Keychain](#keychain) – for example, Bitcoin.

---

## Oracle service

Warden is integrating a highly performant native oracle service, available to all builders on Warden. This will be announced soon.

(?) Can we be more specific?

---

## Signature request

A signature request is a request asking a [Keychain](#keychain) to sign a transaction with a private [key](#key). Keychain operators can charge [signature request fees](#signature-request-fee). This is how such requests are processed:

1. A user sends a signature request with a [Keychain Address](#keychain-address) identifying the preferred Keychain.
2. The [Intent Engine](#intent-engine) checks user [Intents](#intent).
3. If Intents are satisfied, a [Keychain Party](#keychain-party) publishes a signature to the Warden Protocol.

(?) Should we treat it as a Warden-specific term and capitalize it?
(?) Are fees charged even when Intents aren't satisfied?

---

## Signature request fee

[Keychain](#keychain) operators can set fees in [WARD](#ward-token) for [signature requests](#signature-request). The Keychain collect fees to its [Keychain Address](#keychain-address), and then the Keychain operator can manage these funds. Signature request fees are indicated in uWARD.

(?) Should we treat it as a Warden-specific term and capitalize it?  

---

## Space

A Space is a Warden address that serves as a management hub for a collection of [keys](#key). Spaces aggregate accounts for different blockchains and provide access to [Omnichain Applications](#omnichain-application). See also: [Chain Abstraction](#chain-abstraction).

---

## SpaceWard

SpaceWard is an [Omnichain Application](#omnichain-application) functioning as the front-end interface for Warden. It provides a user-friendly platform where you can create [Spaces](#space), manage wallets and [intents](#intent), and interact with decentralized applications (dApps) and other components of the Web3 ecosystem.

---

## Staking

Staking is the process of participating in the proof-of-stake (POS) consensus mechanism. The participants, [validators](#validator) and [delegators](#delegator), stake their [WARD tokens](#ward-token) for a chance to validate blocks and transactions and earn staking rewards.

---

## Validator

A validator is an individual or entity that participates in the [staking](#staking) process by running a [full node](#full-node) and validating blocks and transactions.

Validators act on behalf of their [delegators](#delegator) and earn [commissions](#validators-commission). Each validator has a certain [weight](#validators-weight) and can exist in different [states](#validator-state). In addition, validators can participate in [governance](#governance).

---

## Validator's commission

A validator’s commission is the percentage of [staking](#staking) rewards earned by a validator's pool that the validator retains for themselves. The rest is distributed to [delegators](#delegator). A validator can configure their own commission, but only once, when initially declaring candidacy. The following parameters are available:

- An initial commission
- A maximum daily commission change rate
- A maximum commission

---


## Validator's weight

Each [validator](#validator) has their own [WARD tokens](#ward-token) and tokens bonded by their [delegators](#delegators). The total amount of tokens determines the validator's weight.

The consensus mechanism selects validators to propose blocks based on validators' weight, so a validator with more tokens bonded can propose blocks more frequently and generate more rewards.

---

## Validator state

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

Warden Protocol Node is any blockchain node in the Warden Protocol network. Nodes are responsible for routing requests to [Keychains](#keychain) and routing responses back to the client.

To run a blockchain node, build and run the chain binary called `wardend`. To interact with a node, use the [Node API](/operate-a-node/node-api-reference). See also: [Full node](#full-node).

(?) Is it always a full node?

## WARP token

WARP is a dynamic counterpart to [WARD](#ward-token), adding liquidity and gamification to the Warden Protocol ecosystem. It fuels engagement and participation through innovative tokenomics.

---
