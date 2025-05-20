---
sidebar_position: 7
---

# Glossary

## Abstract syntax tree

An abstract syntax tree (AST) is a formal representation of an [Approval Rule](#approval-rule) definition. This is how it's created:

1. A user defines a new Approval Rule in the [Intent-Specific Language](#intent-specific-language).
2. A tokenizer breaks the Approval Rule into tokens representing the smallest elements of the [Intent-Specific Language](#intent-specific-language).
3. A parser validates the syntactic structure of the definition and represents it as an AST, which is stored onchain.

---

## Action

An Action is an onchain transaction on Warden Protocol or an offchain operation, such as creating a post on the X network. An Action is executed after an [Approval](#approval) is granted based on a user-defined [Approval Rule](#approval-rule), as specified in an [Intent](#intent).

To perform an onchain Action, one can use [SpaceWard](#spaceward), run [node commands](#node), or prompt a [Warden AI Agent](#ai-agent). Here are some examples of onchain Actions:

- A smart contract invocation, such as swapping ETH for MATIC on UniSwap
- A [key request](#key-request) or a [signature request](#signature-request)
- Adding a member to a [Space](#space)

This concept is implemented in the `x/act` [module](#module). Learn more: [`x/act`](warden-protocol-modules/x-act).

---

## AI Agent

A Warden AI Agent is an AI-driven program that supports both offchain and onchain operations. Thanks to their native integration with Warden Protocol, Warden Agents can perform onchain [Actions](#action), such as creating [Spaces](#space), generating [keys](#key), executing transactions, and so on. You can easily build Warden Agents with the [Warden Agent Kit](#warden-agent-kit).

Warden Agents' integration with AI is ensured by three components:

- [Orders](#order): EVM smart contracts performing onchain [Actions](#action) at any destination chain
- `x/async`: a [Warden module](#module) implementing [Tasks](#task), [AVR Plugins](#avr-plugin), and [Prophets](#prophet)
- [SPEX](#spex): Statistical Proof of Execution

Learn more: [Build an Agent](/build-an-agent/introduction).

---

## Analyzer

An Analyzer is a [CosmWasm](https://cosmwasm.com) contract that intercepts a payload before it's signed by a [Keychain](#keychain). 

Using Analyzers allows Keychains to receive the final payload without the need to have any knowledge of its content. Analyzers can extract payload metadata and manipulate the payload before it's signed.

This concept is implemented in the `x/warden` [module](#module). Learn more: [`x/warden`](warden-protocol-modules/x-warden).

---

## Approval

An Approval is a permission for an [Action](#action) to be performed. Approvals are granted according to user-defined [Approval Rules](#approval-rule).

---

## Approval Rule

An Approval Rule is a set of user-defined conditions under which an [Action](#action) is performed. For example, a Rule can allow executing a transaction only if 2 of 3 approvers sign it.

You can define Approval Rules as part of [Intents](#intent), using the [Intent-Specific Language](#intent-specific-language). Warden's [Intent Engine](#intent-engine) ensures the validity of transactions by checking Rules, represented as [abstract syntax trees](#abstract-syntax-tree).

This concept is implemented in the `x/act` [module](#module). Learn more: [`x/act`](warden-protocol-modules/x-act).

---

## AVR Plugin

An AVR Plugin, or Asynchronous Verifiable Resource, is code determining what kind of [Task](#task) input to accept and how to handle it in order to retrieve the result (output). Plugins are executed by [Prophets](#prophet).

Developers can create their own Plugins or use the existing ones. Currently, we support two Plugins, which allow executing the following Task types:

- AI-driven price predictions (verified by [SPEX](#spex))
- HTTP requests to external services, such as blockchain APIs

AVR Plugins provide a universal and standard way for smart contracts to access any resource or operate offchain systems. This concept is implemented in the `x/async` [module](#module). Learn more: [`x/async`](warden-protocol-modules/x-async).

---

## Bonded validator

A bonded validator is an active validator  participating in consensus ([staking](#staking)). Bonded validators validate transactions, propose blocks, and earn rewards for their contributions to the network.

See also: [Unbonding validator](#unbonding-validator), [Unbonded validator](#unbonded-validator).

---

## Bridging

Bridging is a method allowing users to transfer assets across different blockchain networks. This technology utilizes crosschain bridges—smart contracts that receive and lock tokens on the source chain and then mint a corresponding number of wrapped tokens on the destination chain. Warden currently supports bridging through Axelar.

Learn more: [Bridging](bridging).

---

## Builder incentive

Warden Protocol is open to third-party contributions: core protocol development or building [Intelligent Applications](#intelligent-application) in the Warden ecosystem. We'll reward both types of contributions with builder incentives in [WARD](#ward-token). More details will be announced soon.

---

## Delegator

A delegator is an individual or entity that participates in the [staking](#staking) process by delegating their [WARD tokens](#ward-token) to a [validator](#validator). Delegation allows securing the network and sharing rewards with validators without the responsibility of running a [node](#node).

All delegators inherit the state from their validator: [bonded](#bonded-validator), [unbonding](#unbonding-validator), or [unbonded](#unbonded-validator). To avoid risks, delegators should perform due diligence on validators and spread their stake over multiple validators. Delegators can also participate in [governance](#governance).

---

## Full node

A full node is a server running a software (binary) that maintains a complete up-to-date version of a protocol with full transaction history. You can run a full [Warden Protocol node](#node) yourself.

---

## Governance

Warden Protocol supports onchain governance. It's a mechanism allowing the decentralized community to update the protocol through direct voting that is recorded onchain. Voting is available for the participants of [staking](#staking): [validators](#validator) and [delegators](#delegator).

The voting power depends on the [validator's weight](#validators-weight) or the amount of [WARD](#ward-token) a delegator staked. By default, [delegators](#delegator) inherit votes of their validator. Alternatively, a delegator can cast their own vote, which will reduce the validator's voting power.

---

## Intelligent Application

An Intelligent Application is a smart contract integrating AI or any offchain logic. Unlike traditional contracts bound by static logic, Intelligent Apps unlock more dynamic user experiences: they are able to reason, adapt, and interact across onchain and offchain environments.

With Warden, you can build crypto super apps, smart [AI Agents](#ai-agent), and intelligent custody solutions. For example, see [SpaceWard](#spaceward) and the [Warden App](https://app.wardenprotocol.org/).

We support two smart contract platforms: EVM and CosmWasm. In contracts, you can interact with our [modules](#module) and [AVR Plugins](#avr-plugin) toaccess all Warden's core features from any chain. For advanced usage of smart contracts, refer to [Order](#order).

Learn more: [Build an app](/build-an-app/introduction), [Build an Agent](/build-an-agent/introduction).

---

## Intent

An Intent is a user-defined script specifying the following:

- An [Action](#action)—any onchain action on Warden Protocol
- An [Approval Rule](#approval-rule)—a set of conditions under which the Action is performed

After an Action is initiated, the [Intent Engine](#intent-engine) checks the Approval Rule. If the conditions are met, an [Approval](#approval) is granted, and the Action is carried out.

---

## Intent Engine

The Intent Engine is an immutable onchain interpreter of the [Intent-Specific Language](#intent-specific-language), acting as a gatekeeper. When a user initiates a transaction ([Action](#action)), the Intent Engine checks the user's [Approval Rule](#approval-rule), represented as an [abstract syntax tree](#abstract-syntax-tree), and returns `true` or `false`—granting or not granting an [Approval](#approval).

---

## Intent-Specific Language

The Intent-Specific Language (ISL) is a language that allows users to configure [Approval Rules](#approval-rule) (as part of [Intents](#intent)). It's composable, extensive, declarative, human-readable, and English-like. The ISL is interpreted by the [Intent Engine](#intent-engine).

---

## Key

Keys in blockchain are paired to identify users and secure the ownership of wallets:

- **Public key**: A public wallet address
- **Private key**: A private code for signing transactions on the wallet

On Warden, [Keychains](#keychain) generate key pairs and sign transactions with private keys. Every key belongs to a certain [Space](#space).

This concept is implemented in the `x/warden` [module](#module). Learn more: [`x/warden`](warden-protocol-modules/x-warden).

---

## Key request

A key request is a request asking a [Keychain](#keychain) to generate a pair of private and public [keys](#key). Keychain operators can charge [key request fees](#key-request-fee) for doing it. This is how such requests are processed:

1. A user sends a key request with a [Keychain ID](#keychain-id) identifying the preferred Keychain.
2. The [Intent Engine](#intent-engine) checks the user's [Approval Rule](#approval-rule), specified in an [Intent](#intent).
3. If the Approval Rule is met, the Keychain generates a key pair and stores the private key. A [Keychain Writer](#keychain-writer) publishes the public key to Warden Protocol.

Learn more: [Key request flow](warden-protocol-modules/x-warden#key-request-flow).

---

## Key request fee

[Keychain](#keychain) operators can set fees in [WARD](#ward-token) for [key requests](#key-request). The Keychain collects fees to its [ID](#keychain-id), and then the Keychain operator can manage these funds. Key request fees are indicated in aWARD (0.000000000000000001 WARD).

---

## Keychain

Every [Intelligent Application](#intelligent-application) has at least one Keychain—a custodian that generates and stores [keys](#key) and signs transactions.

Warden Protocol allows users or external organizations to become Keychain operators. They can onboard their own Keychains and charge fees for [key requests](#key-request) and [signature requests](#signature-request). Note that Keychain operators typically use MPC networks to generate keys and signatures.

This concept is implemented in the `x/warden` [module](#module). Learn more: [`x/warden`](warden-protocol-modules/x-warden), [Build a Keychain](/build-a-keychain/introduction).

---

## Keychain ID

Keychain ID identifies a [Keychain](#keychain) in [key requests](#key-request) and [signature requests](#signature-request) and collects fees from users.

---

## Keychain Writer

A Keychain Writer is an account that publishes signatures and public keys on behalf of a [Keychain](#keychain). It happens when the Keychain responds to a [key request](#key-request) or a [signature request](#signature-request). The Keychain operator can create multiple Writers, each with its own address.

---

## Keychain SDK

The Keychain SDK is a Go SDK that abstracts the communication with [Warden Protocol nodes](#node), facilitating the development of [Keychains](#keychain).

Learn more: [Keychain SDK](/build-a-keychain/implementations/keychain-sdk).

---

## Module

Warden protocol modules are [Cosmos SDK](https://docs.cosmos.network) modules containing most of Warden Protocol's logic. Users can interact with modules by sending transactions or querying [nodes](#node). We also provide [precompiles](#precompile) that allow [Intelligent Application](#intelligent-application) builders to call certain modules in EVM smart contracts.

Learn more: [Warden Protocol modules](warden-protocol-modules/introduction).

---

## Node

A Warden Protocol node is a server running the software (binary) of Warden Protocol. To run a blockchain node in Warden, build and run the chain binary called `wardend`. To interact with a node, use the [Node API](/operate-a-node/node-api) and [node commands](/operate-a-node/node-commands).

Reasons for running a node include the following:

- Accessing archive data
- Providing services: RPC, GRPC, API, etc.
- Becoming a [validator](#validator)

---

## Oracle service

An oracle is a third-party service that enables smart contracts to access real-life data feeds: prices, stock market data, weather conditions, etc. Warden is integrated with [Skip:Connect](https://docs.skip.build/connect/introduction)—an oracle service provided by Skip Protocol and offering mostly price data. Connect's data is [validated](#validator) by Warden's network and written onchain.

Learn more: [Oracle services](oracle-services).

---

## Order

An Order is a Solidity smart contract performing onchain actions at any destination chain.

When creating an Order, you can implement custom logic by using [Warden modules](#module), [Keychains](#keychain), and other features. In particular, the `x/async` module with [AVR Plugins](#avr-plugin) allows you to create smart contracts utilizing outputs of AI models. Orders can send any transactions to any Ethereum-based and EVM L2 application.

Learn more: [Build an onchain AI Agent](/build-an-agent/build-an-onchain-ai-agent/introduction).

---

## Precompile

Warden precompiles are precompiled smart contracts that you can call in your EVM smart contract to interact with [Warden Protocol modules](#module). This allows [Intelligent Application](#intelligent-application) builders to manage [Spaces](#space), [Keychains](#keychain), [Actions](#action), [Rules](#approval-rule), [Tasks](#task), and other components.

Learn more: [Interact with Warden modules](/build-an-app/interact-with-warden-modules/introduction).

---

## Prophet

A Prophet is a subprocess running on [validator](#validator) nodes, which has two responsibilities:

- Fetching [Task](#task) requests and executing [AVR Plugins](#avr-plugin) to provide Task results
- Fetching requests satisfied by other validators to vote on the results

Prophets run on validator nodes separately from the [wardend process](#node), without blocking the consensus. Running a Prophet is optional for a validator.

This concept is implemented in the `x/async` [module](#module). Learn more: [`x/async`](warden-protocol-modules/x-async).

---

## Signature request

A signature request is a request asking a [Keychain](#keychain) to sign a transaction with a private [key](#key). Keychain operators can charge [signature request fees](#signature-request-fee) for doing it. This is how such requests are processed:

1. A user sends a signature request with a [Keychain ID](#keychain-id) identifying the preferred Keychain.
2. The [Intent Engine](#intent-engine) checks the user's [Approval Rule](#approval-rule), specified in an [Intent](#intent).
3. If the Approval Rule is met, a [Keychain Writer](#keychain-writer) publishes a signature to Warden Protocol.

Learn more: [Signature request flow](warden-protocol-modules/x-warden#signature-request-flow).

---

## Signature request fee

[Keychain](#keychain) operators can set fees in [WARD](#ward-token) for [signature requests](#signature-request). The Keychain collects fees to its [ID](#keychain-id), and then the Keychain operator can manage these funds. Signature request fees are indicated in aWARD (0.000000000000000001 WARD).

---

## Space

A Space is a hub allowing its owner (or multiple owners) to manage [keys](#key). Spaces aggregate accounts for different blockchains and provide access to [Intelligent Applications](#intelligent-application).

This concept is implemented in the `x/warden` [module](#module). Learn more: [`x/warden`](warden-protocol-modules/x-warden).

---

## SpaceWard

SpaceWard is an [Intelligent Application](#intelligent-application) functioning as the front-end interface for Warden. It provides a user-friendly platform where you can create [Spaces](#space), manage wallets and [Intents](#intent), and interact with decentralized applications (dApps) and other components of the Web3 ecosystem.

Learn more: [SpaceWard documentation](https://help.wardenprotocol.org).

---

## SPEX

SPEX (Statistical Proof of Execution) is a sampling-based verifiable computing protocol that ensures the integrity of computational tasks through probabilistic guarantees. This includes tasks with potentially non-deterministic outputs, such as those involving large language models (LLMs) or stochastic training pipelines.

SPEX is used as a verifiability layer for AI on Warden Protocol. At the moment, SPEX verifies AI-driven price predictions generated by the `x/async` [Warden module](#module) and [AVR Plugins](#avr-plugin). However, you can extend the module with other computational tasks and use SPEX to protect them.

Learn more: [SPEX](warden-protocol-modules/x-async#spex).

---

## Staking

Staking is the process of participating in the proof-of-stake (POS) consensus mechanism. [Validators](#validator) and [delegators](#delegator) stake their [WARD tokens](#ward-token) for a chance to validate blocks and transactions and earn staking rewards.

The consensus mechanism chooses validators based on their [weight](#validators-weight). If a validator is successful, its delegators will earn rewards too. If a validator is slashed, the delegator’s stake will be slashed. Staking also allows validators and delegators to participate in [governance](#governance).

---

## Task

A Task is an offchain user-defined unit of computation that is executed asynchronously. The result is stored onchain. Tasks don't slow the blockchain down thanks to asynchronous execution.

A user requests a Task, specifying an input and an [AVR Plugin](#avr-plugin), which determines what format of input to accept and how to handle it.  There are different types of Tasks, depending on the Plugin type. After that, a [validator](#validator) running a [Prophet](#prophet) executes the Plugin and provides the Task result, and other validators vote on correctness of the result.

This concept is implemented in the `x/async` [module](#module). Learn more: [`x/async`](warden-protocol-modules/x-async).

---

## Validator

A validator is an individual or entity that participates in the [staking](#staking) process by running a [full](#full-node) or pruned [Warden Protocol node](#node) and validating blocks and transactions. 

Validators act on behalf of their [delegators](#delegator) and earn [commissions](#validators-commission). Each validator has a certain [weight](#validators-weight) and state: [bonded](#bonded-validator), [unbonding](#unbonding-validator), or [unbonded](#unbonded-validator). Validators can also participate in [governance](#governance) and hadling [Tasks](#task).

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

Validators enter this state either when they decide to stop participating in [staking](#staking) or when they're slashed for misbehavior. During the unbonding period, validators aren't participating in the consensus process and aren't earning rewards.

---

## WARD token

WARD is the native utility token integral to the Warden Protocol ecosystem. It facilitates various operations such as [governance](#governance), [staking](#staking), protocol fees and acts as a medium of payment for operators, such as [Keychain](#keychain) operators.

Learn more: [WARD token](/tokens/ward-token/ward).

---

## Warden Agent Kit

The Warden Agent Kit allows creating [AI Agents](#ai-agent) that are able to access both offchain and onchain functionalities. The kit offers native integration with Warden Protocol for onchain [Actions](#action) and supports compatibility with Typescript, any AI Agent framework, and [LangChain](https://js.langchain.com/docs/introduction/) tools.

Learn more: [Warden Agent Kit](/build-an-agent/warden-agent-kit/introduction).

---

## Warden App

The Warden App is an AI-driven [Intelligent Application](#intelligent-application) that lets users perform complex Web3 actions—like swaps and transfers—through simple chat or voice commands. The Warden App does all the thinking and problem solving for the user, making complex work like cross-chain transactions, portfolio management, or risk assessments easy.

To test the Warden App, [join our waitlist](https://app.wardenprotocol.org/).
