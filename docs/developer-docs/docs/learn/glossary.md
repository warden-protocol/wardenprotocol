---
sidebar_position: 2
---

# Glossary

## Abstract syntax tree

An abstract syntax tree (AST) is a formal representation of an [Approval Rule](#approval-rule) definition. This is how it's created:

1. A user defines a new Approval Rule in the [Intent-Specific Language](#intent-specific-language).
2. A tokenizer breaks the Approval Rule into tokens representing the smallest elements of the [Intent-Specific Language](#intent-specific-language).
3. A parser validates the syntactic structure of the definition and represents it as an AST, which is stored on-chain.

---

## Action

An Action is an on-chain action (transaction) on the Warden Protocol:

- A smart contract invocation, such as swapping ETH for MATIC on UniSwap
- A [key request](#key-request) or a [signature request](#signature-request)
- Adding a member to a [Space](#space) in [SpaceWard](#spaceward)

An Action happens after an [Approval](#approval) is granted according to a user-defined [Approval Rule](#approval-rule), as specified in an [Intent](#intent). In the future, we're going to implement off-chain Actions, such as sending a message to a Slack channel.

---

## Approval

An Approval is a permission for an [Action](#action) to be performed. Approvals are granted according to user-defined [Approval Rules](#approval-rule).

---

## Approval Rule

An Approval Rule is a set of user-defined conditions under which an [Action](#action) is performed. For example, a Rule can allow executing a transaction only if 2 of 3 approvers sign it. Rules contribute to Warden's [Modular Security](#modular-security).

You can define Approval Rules as part of [Intents](#intent), using the [Intent-Specific Language](#intent-specific-language). Warden's [Intent Engine](#intent-engine) ensures the validity of transactions by checking Rules, represented as [abstract syntax trees](#abstract-syntax-tree).

---

## Bonded validator

A bonded validator is an active validator  participating in consensus ([staking](#staking)). Bonded validators validate transactions, propose blocks, and earn rewards for their contributions to the network.

See also: [Unbonding validator](#unbonding-validator), [Unbonded validator](#unbonded-validator).

---

## Bridging

Bridging is a method allowing users to transfer assets across different blockchain networks. This technology utilizes cross-chain bridges – smart contracts that receive and lock tokens on the source chain and then mint a corresponding number of wrapped tokens on the destination chain. Warden currently supports bridging through Axelar.

Learn more: [Bridging](bridging)

---

## Builder incentive

The Warden Protocol is open to third-party contributions: core protocol development or building [Omnichain Applications](#omnichain-application) in the Warden ecosystem. We'll reward both types of contributions with builder incentives in [WARD](#ward-token). More details will be announced soon.

---

## Chain Abstraction

Chain Abstraction is one of Warden's key features. Instead of managing multiple wallets or accounts for different blockchains, you can aggregate them in one [Space](#space) within the Warden Protocol. [Omnichain Applications](#omnichain-application) allow signing transactions and messages at any destination chain.

---

## Delegator

A delegator is an individual or entity that participates in the [staking](#staking) process by delegating their [WARD tokens](#ward-token) to a [validator](#validator). Delegation allows securing the network and sharing rewards with validators without the responsibility of running a [node](#warden-protocol-node).

All delegators inherit the state from their validator: [bonded](#bonded-validator), [unbonding](#unbonding-validator), or [unbonded](#unbonded-validator). To avoid risks, delegators should perform due diligence on validators and spread their stake over multiple validators. Delegators can also participate in [governance](#governance).

---

## Full node

A full node is a server running a software (binary) that maintains a complete up-to-date version of a protocol with full transaction history. You can run a full [Warden Protocol node](#warden-protocol-node) yourself.

---

## Governance

The Warden Protocol supports on-chain governance. It's a mechanism allowing the decentralized community to update the protocol through direct voting that is recorded on-chain. Voting is available for the participants of [staking](#staking): [validators](#validator) and [delegators](#delegator).

The voting power depends on the [validator's weight](#validators-weight) or the amount of [WARD](#ward-token) a delegator staked. By default, [delegators](#delegator) inherit votes of their validator. Alternatively, a delegator can cast their own vote, which will reduce the validator's voting power.

---

## Intent

An Intent is a user-defined script specifying the following:

- An [Action](#action) – any on-chain action on the Warden Protocol
- An [Approval Rule](#approval-rule) – a set of conditions under which the Action is performed

After an Action is initiated, the [Intent Engine](#intent-engine) checks the Approval Rule. If the conditions are met, an [Approval](#approval) is granted, and the Action is carried out.

---

## Intent Engine

The Intent Engine is an immutable on-chain interpreter of the [Intent-Specific Language](#intent-specific-language), acting as a gatekeeper. When a user initiates a transaction ([Action](#action)), the Intent Engine checks the user's [Approval Rule](#approval-rule), represented as an [abstract syntax tree](#abstract-syntax-tree), and returns `true` or `false` – granting or not granting an [Approval](#approval).

---

## Intent-Specific Language

The Intent-Specific Language (ISL) is a language that allows users to configure [Approval Rules](#approval-rule) (as part of [Intents](#intent)). It's composable, extensive, declarative, human-readable, and English-like. The ISL is interpreted by the [Intent Engine](#intent-engine).

---

## Key

Keys in blockchain are paired to identify users and secure the ownership of wallets:

- **Public key**: A public wallet address
- **Private key**: A private code for signing transactions on the wallet

Warden offers [Modular Key Management](#modular-key-management): you can use [Keychains](#keychain) to generate key pairs and sign transactions. This is how it works: [Key request](#key-request), [Signature request](#signature-request).

---

## Key request

A key request is a request asking a [Keychain](#keychain) to generate a pair of private and public [keys](#key). Keychain operators can charge [key request fees](#key-request-fee) for doing it. This is how such requests are processed:

1. A user sends a key request with a [Keychain ID](#keychain-id) identifying the preferred Keychain.
2. The [Intent Engine](#intent-engine) checks the user's [Approval Rule](#approval-rule), specified in an [Intent](#intent).
3. If the Approval Rule is met, the Keychain generates a key pair and stores the private key. A [Keychain Writer](#keychain-writer) publishes the public key to the Warden Protocol.

Learn more: [Key request flow](/learn/request-flow#key-request-flow)

---

## Key request fee

[Keychain](#keychain) operators can set fees in [WARD](#ward-token) for [key requests](#key-request). The Keychain collect fees to its [ID](#keychain-id), and then the Keychain operator can manage these funds. Key request fees are indicated in uWARD.

---

## Keychain

Every [Omnichain Application](#omnichain-application) has at least one Keychain – a custodian that generates and stores [keys](#key) and signs transactions. Keychains contribute to Warden's [Modular Key Management](#modular-key-management) and [Modular Security](#modular-security).

The Warden Protocol allows users or external organizations become Keychain operators. They can onboard their own Keychains and charge fees for [key requests](#key-request) and [signature requests](#signature-request). Note that Keychain operators typically use MPC networks to generate keys and signatures. To build a Keychain, you can use the [Keychain SDK](#keychain-sdk).

---

## Keychain ID

Keychain ID identifies a [Keychain](#keychain) in [key requests](#key-request) and [signature requests](#signature-request) and collects fees from users.

---

## Keychain Writer

A Keychain Writer is an account that publishes signatures and public keys on behalf of a [Keychain](#keychain). It happens when the Keychain responds to a [key request](#key-request) or a [signature request](#signature-request). The Keychain operator can create multiple Writers, each with its own address.

---

## Keychain SDK

The Keychain SDK is a Go SDK that abstracts the communication with [Warden Protocol nodes](#warden-protocol-node), facilitating the development of [Keychains](#keychain). You can find the available functions here: [Keychain SDK functions](/build-a-keychain/keychain-sdk).

---

## Modular Key Management

Modular Key Management is a flexible approach to managing keys in Warden. Instead of relying on a single provider for key management, users can manage different [keys](#key) with different [Keychains](#keychain). It reduces the risk of single points of failure and gives users greater control over their keys.

---

## Modular Security

Modular Security is one of Warden's key features. Thanks to modularity, the same [Omnichain Application](#omnichain-application) can combine different security models:

- OApp users can set and manage their own application security settings with the help of [Approval Rules](#approval-rule) and [Keychains](#keychain).
- Each OApp is collectively secured by all the tokens [staked](#staking) on the protocol.

By decoupling application-layer and protocol-layer security, Warden takes the best from monolithic and isolated security systems and reducing the risks of both.

---

## Omnichain Application

An Omnichain Application (OApp) is a powerful evolution of traditional smart contracts. It allows signing transactions at any chain, while traditional smart contract applications only target users of a single chain.

OApps contribute to all Warden's key features: [Chain Abstraction](#chain-abstraction), [Modular Security](#modular-security), and [Omnichain Interoperability](#omnichain-interoperability).

---

## Omnichain Contract

An Omnichain Contract is a smart contract that allows signing transactions and messages at any destination chain. It's the main part of any [Omnichain Application](#omnichain-application). Omnichain Contracts contribute to Warden's [Chain Abstraction](#chain-abstraction).

---

## Omnichain Interoperability

Omnichain Interoperability is one of Warden's key features. It refers to the possibility of communication between different blockchain networks.

While most interoperability providers focus on particular ecosystems, Warden's goal is connecting different ecosystems. [Omnichain Applications](#omnichain-application) not only provide cross-chain swapping and [bridging](#bridging) but also are able to exchange information with each other. This allows overcoming the fragmentation of the blockchain landscape.

---

## Oracle service

An oracle is a third-party service that enables smart contracts access real-life data feeds: prices, stock marked data, weather conditions, etc. Warden is integrated with [Slinky](https://skip-protocol-docs.netlify.app/slinky/overview) – an oracle service provided by Skip Protocol and offering mostly price data.

Learn more: [Oracle services](oracle-services)

---

## Signature request

A signature request is a request asking a [Keychain](#keychain) to sign a transaction with a private [key](#key). Keychain operators can charge [signature request fees](#signature-request-fee) for doing it. This is how such requests are processed:

1. A user sends a signature request with a [Keychain ID](#keychain-id) identifying the preferred Keychain.
2. The [Intent Engine](#intent-engine) checks the user's [Approval Rule](#approval-rule), specified in an [Intent](#intent).
3. If the Approval Rule is met, a [Keychain Writer](#keychain-writer) publishes a signature to the Warden Protocol.

Learn more: [Signature request flow](/learn/request-flow#signature-request-flow)

---

## Signature request fee

[Keychain](#keychain) operators can set fees in [WARD](#ward-token) for [signature requests](#signature-request). The Keychain collect fees to its [ID](#keychain-id), and then the Keychain operator can manage these funds. Signature request fees are indicated in uWARD.

---

## Space

A Space is a hub allowing its owner (or multiple owners) to manage [keys](#key). Spaces contribute to Warden's [Chain Abstraction](#chain-abstraction): they aggregate accounts for different blockchains and provide access to [Omnichain Applications](#omnichain-application).

---

## SpaceWard

SpaceWard is an [Omnichain Application](#omnichain-application) functioning as the front-end interface for Warden. It provides a user-friendly platform where you can create [Spaces](#space), manage wallets and [Intents](#intent), and interact with decentralized applications (dApps) and other components of the Web3 ecosystem.

Learn more: [Help Center](https://help.wardenprotocol.org)

---

## Staking

Staking is the process of participating in the proof-of-stake (POS) consensus mechanism. [Validators](#validator) and [delegators](#delegator) stake their [WARD tokens](#ward-token) for a chance to validate blocks and transactions and earn staking rewards.

The consensus mechanism chooses validators based on their [weight](#validators-weight). If a validator is successful, its delegators will earn rewards too. If a validator is slashed, the delegator’s stake will be slashed. Staking also allows validators and delegators to participate in [governance](#governance).

---

## Validator

A validator is an individual or entity that participates in the [staking](#staking) process by running a [full](#full-node) or pruned [Warden Protocol node](#warden-protocol-node) and validating blocks and transactions. 

Validators act on behalf of their [delegators](#delegator) and earn [commissions](#validators-commission). Each validator has a certain [weight](#validators-weight) and state: [bonded](#bonded-validator), [unbonding](#unbonding-validator), or [unbonded](#unbonded-validator). Validators can also participate in [governance](#governance).

---

## Validator's commission

A validator’s commission is the percentage of [staking](#staking) rewards earned by a validator's pool that the validator retains. The rest is distributed to [delegators](#delegator). Validators can configure their own commissions, but only once, when initially declaring candidacy. The following parameters are available:

- An initial commission
- A maximum daily commission change rate
- A maximum commission

---


## Validator's weight

Each [validator](#validator) has its own [WARD tokens](#ward-token) and tokens bonded by its [delegators](#delegator). The total amount of tokens determines the validator's weight.

The consensus mechanism selects validators to propose blocks based on validators' weight, so a validator with more tokens bonded can propose blocks more frequently and generate more rewards. Weight also determines the validator's voting power in [governance](#governance).

---

## Unbonded validator

An unbonded validator is an inactive validator that isn't signing blocks. Unbonded validators can't be slashed and can’t earn rewards.

See also: [Bonded validator](#bonded-validator), [Unbonding validator](#unbonding-validator).

---

## Unbonding validator

An unbonding validator is a validator that is transitioning from [bonded](#bonded-validator) to [unbonded](#unbonded-validator).

Validators enter this state either when they decide to stop participating in [staking](#staking) or when they are slashed for misbehavior. During the unbonding period, validators aren't participating in the consensus process and aren't earning rewards.

---

## WARD token

WARD is the native utility token integral to the Warden Protocol ecosystem. It facilitates various operations such as [governance](#governance), [staking](#staking), protocol fees and acts as a medium of payment for operators, such as [Keychain](#keychain) operators.

Learn more: [WARD token](/tokens/ward-token/ward)

---

## Warden Protocol node

A Warden Protocol node is a server running the software (binary) of the Warden Protocol. To run a blockchain node in Warden, build and run the chain binary called `wardend`. To interact with a node, use the [Node API](/operate-a-node/node-api-reference).

Reasons for running a node include the following:

- Accessing archive data
- Providing services: RPC, GRPC, API, etc.
- Becoming a [validator](#validator)

---

## WARP token

WARP is a dynamic counterpart to [WARD](#ward-token), adding liquidity and gamification to the Warden Protocol ecosystem. It fuels engagement and participation through innovative tokenomics.

Learn more: [WARP token](/tokens/warp-token/warp)

---

## Coming soon

:::tip
We're currently implementing a breaking update to the Warden Protocol. [Omnichain Application](#omnichain-application) developers will be able to build and integrate AI-driven [Agents](#agent) – autonomous trainable programs independently managing complex processes. Below you'll find the key terms related to this update.
:::

### Agent

An Agent is an autonomous trainable program driven by artificial intelligence. Agents execute advanced smart [Workflows](#workflow), seamlessly managing complex processes without the need for direct human intervention.

*This is a new feature that is coming soon.*

---

### Trigger

A Trigger is an event listener that watches for a data update starting a [Workflow](#workflow). There are two types of Triggers:

- **On-chain Trigger**: It can listen to such events as changes in a price feed from an [oracle](#oracle-service).

- **Off-chain Trigger**: It can track messages in Slack, updates in a Google spreadsheet, etc. You can implement off-chain Triggers through webhooks and API calls.

*This is a new feature that is coming soon.*

### Workflow

A **Workflow** is a sequence of actual steps executed by an [Agent](#agent) and defined by an [Intent](#intent). Each Workflow includes at least one of the following steps, not necessarily coming in the same order:

- A [Trigger](#trigger) registers a data update.
- An [Approval](#approval) is received.
- The Agent takes an [Action](#action).

*This is a new feature that is coming soon.*

---
