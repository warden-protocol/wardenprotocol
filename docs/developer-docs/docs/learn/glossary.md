﻿---
sidebar_position: 6
---

# Glossary

## Agent Card

Each [AI Agent](#ai-agent) on Warden has an Agent Card—an offchain JSON document compliant with the [A2A Protocol specification](https://a2a-protocol.org/latest/specification/). The Agent Card defines the Agent's identity, capabilities, skills, service endpoint URL, and the methods for authentication and interaction.

See also: [Agent Passport](#agent-passport).

*This feature is coming soon.*

## Agent Identity

Each [AI Agent](#ai-agent) on Warden has an Agent Identity—a unique onchain identifier stored in [ERC-8004's Identity Registry](https://eips.ethereum.org/EIPS/eip-8004#identity-registry). This identity consists of the following:

- The Agent's global onchain ID
- An EVM-compatible address for the Agent
- An offchain domain hosting the [Agent Card](#agent-card)

See also: [Agent Passport](#agent-passport).

*This feature is coming soon.*

## Agent network

The Agent network is the infrastructure that supports the entire lifecycle of [AI Agents](#ai-agent). It provides the full-stack foundation for the Agent economy, unifying Agents that would otherwise remain fragmented across frameworks and custom stacks without reaching users.

The core elements of the Agent network are [Warden Studio](#warden-studio), [Warden Chain](#warden-chain), [Warden Agent Hub](#warden-agent-hub), and [Warden](#warden).

---

## Agent Passport

An Agent Passport is an ensemble of [Agent Identity](#agent-identity), the corresponding [Agent Card](#agent-card) information, and the Agent's monetization settings. In [Warden Studio](#warden-studio), developers provide these details when registering Agents, and the system automatically generates Passports upon publication.

*This feature is coming soon.*

---

## AI Agent

An AI Agent is an AI-driven program that supports both offchain and onchain operations. Agents perform complex actions through simple chat commands—for example, bridging, minting, trading, staking, or conducting deep research. At the moment, we focus on financial, autopilot, institutional (custodial), and ecosystem Agents.

[Warden Protocol](#warden-protocol) manages the entire life cycle of Agents in the [Agent network](#agent-network):

- Developers build Agents in [Warden Studio](#warden-studio).
- Agents are published directly on [Warden Chain](#warden-chain).
- Users discover Agents in [Warden](#warden)'s [Agent Hub](#warden-agent-hub).

---

## Application layer

At the application layer of [Warden Protocol](#warden-protocol), developers can easily build [AI Agents](#ai-agent) and instantly make them accessible to all [Warden](#warden) users. [Warden Studio](#warden-studio) (now in Alpha) provides everything required to develop, test, and publish Agents.

---

## Big Brain

[Warden Protocol](#warden-protocol)'s Big Brain is a protocol-enabled, domain-specific LLM trained on 1T tokens, catalyzing [AI Agent](#ai-agent) performance as the evolving hive mind. Big Brain learns from every [Warden](#warden) interaction and rewards contributors who help it improve.

*This feature is coming soon.*

---

## Blockchain layer

The blockchain layer provides the core infrastructure for [AI Agents](#ai-agent): identity, coordination, and provenance. Agents are deployed directly onto [Warden Chain](#warden-chain).

---

## Bonded validator

A bonded validator is an active validator participating in consensus ([staking](#staking)). Bonded validators validate transactions, propose blocks, and earn rewards for their contributions to the network.

See also: [Unbonding validator](#unbonding-validator), [Unbonded validator](#unbonded-validator).

---

## Delegator

A delegator is an individual or entity that participates in the [staking](#staking) process by delegating their [WARD tokens](#ward-token) to a [validator](#validator). Delegation allows validators to secure the network and share rewards with them without the responsibility of running a [node](#node).

All delegators inherit the state from their validator: [bonded](#bonded-validator), [unbonding](#unbonding-validator), or [unbonded](#unbonded-validator). To avoid risks, delegators should perform due diligence on validators and spread their stake over multiple validators. Delegators can also participate in [governance](#governance).

---

## Full node

A full node is a server running software (a binary) that maintains a complete up-to-date version of a protocol with full transaction history. You can run a full [Warden node](#node) yourself.

---

## Governance

[Warden Chain](#warden-chain) supports onchain governance—a mechanism allowing the decentralized community to update the protocol through direct voting that is recorded onchain. Voting is available to [staking](#staking) participants: [validators](#validator) and [delegators](#delegator).

The voting power depends on the [validator's weight](#validators-weight) or the amount of [WARD](#ward-token) a delegator staked. By default, [delegators](#delegator) inherit votes of their validator. Alternatively, a delegator can cast their own vote, which will reduce the validator's voting power.

---

## Node

A Warden node is a server running the [Warden Chain](#warden-chain) software (binary). To run a blockchain node in Warden, build and run the chain binary called `wardend`. To interact with a node, use the [Node API](/operate-a-node/node-api) and [node commands](/operate-a-node/node-commands).

Reasons for running a node include the following:

- Accessing archive data
- Providing services: RPC, GRPC, API, etc.
- Becoming a [validator](#validator)

---

## Oracle service

An oracle is a third-party service that enables smart contracts to access real-life data feeds: prices, stock market data, weather conditions, etc. Warden is integrated with [Skip:Connect](https://docs.skip.build/connect/introduction)—an oracle service provided by Skip Protocol and offering mostly price data. Connect's data is [validated](#validator) by Warden's network and written onchain.

Learn more: [Cosmos modules: `x/oracle`](cosmos-modules#xoracle).

---

## Proof of Inference

Proof of Inference is Warden's onchain audit trail for [AI Agents](#ai-agent) that links payments to user prompts and inferences.

When a user submits a prompt, Warden generates a hash of the prompt together with the hash of the returned inference, and stores both in an onchain proof. Developers can generate the same hash offchain and match it against the onchain record. This creates a transparent trail showing that a specific inference request was made and paid for.

*This feature is coming soon.*


## SPEX

SPEX (Statistical Proof of Execution) is a sampling-based verifiable computing protocol that ensures the integrity of computational tasks through probabilistic guarantees. This includes tasks with potentially non-deterministic outputs, such as those involving large language models (LLMs) or stochastic training pipelines. SPEX is used as a verifiability layer for AI on [Warden Protocol](#warden-protocol).

Learn more: [SPEX](spex).

---

## Staking

Staking is the process of participating in the proof-of-stake (PoS) consensus mechanism. [Validators](#validator) and [delegators](#delegator) stake their [WARD tokens](#ward-token) for a chance to validate blocks and transactions and earn staking rewards.

The consensus mechanism chooses validators based on their [weight](#validators-weight). If a validator is successful, its delegators will earn rewards too. If a validator is slashed, the delegator’s stake will be slashed. Staking also allows validators and delegators to participate in [governance](#governance).

---

## Validator

A validator is an individual or entity that participates in the [staking](#staking) process by running a [full](#full-node) or pruned [Warden node](#node) and validating blocks and transactions. 

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

## Verifiability layer

The verifiability layer of [Warden Protocol](#warden-protocol) uses blockchain, cryptography, and consensus to guarantee the integrity of AI models. [SPEX](#spex) (Statistical Proof of Execution) ensures the model you see is the model you get and can also assess whether outputs are accurate and reliable enough to be used in applications.

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

**$WARD** is the native utility token for the [Warden Protocol](#warden-protocol)'s ecosystem, sitting at the heart of both [Warden Chain](#warden-chain) and [Warden](#warden). $WARD facilitates various operations—such as [governance](#governance), [staking](#staking), rewards—and serves as a medium of payment for any developer publishing an [Agent](#ai-agent) on Warden. For Warden, it'll act as a gas abstraction token and unlock gated functionality. 

Learn more: [$WARD](/tokens/ward-token/ward).

---

## Warden

Warden is an AI-driven application built on [Warden Protocol](#warden-protocol). In Warden, users access all [AI Agents](#ai-agent), models, and chains through a single interface, performing advanced workflows in natural language. Agents are available in Warden's [Agent Hub](#warden-agent-hub); Warden provides a [Proof of Inference](#proof-of-inference) for each user request.

Try it out: [Warden](https://app.wardenprotocol.org).  
Learn more: [Warden documentation](https://help.wardenprotocol.org).

## Warden Agent Hub

Warden Agent Hub is a marketplace in [Warden](#warden) where users discover [AI Agents](#ai-agent) operating across Web2 and Web3 ecosystems. By putting Agents in front of an engaged user base, the Hub solves the toughest challenge in tech: distribution. Moreover, Agents listed here can collaborate to solve complex problems.

Learn more: [Warden documentation](https://help.wardenprotocol.org/warden-app/explore-ai-agents).  

---

## Warden Chain

Warden Chain is a purpose-built EVM blockchain for [AI Agents](#ai-agent). It provides the decentralized infrastructure that makes the [Warden Protocol](#warden-protocol) logic operational.

Once an Agent is built, it's minted directly onto the chain, where it signs requests, collects fees, and pays for services. In this way, Warden Chain serves as the entry point to discover, interact, and transact with Agents in the ecosystem.

Learn more: [Warden networks](/learn/warden-networks).

---

## Warden Protocol

Warden Protocol is the full-stack framework powering the [AI Agent](#ai-agent) economy. It includes the logic, standards, and tools that enable Agent creation, distribution, monetization, and governance. Key components of this system are [Warden Chain](#warden-chain), [Proof of Inference](#proof-of-inference), [SPEX](spex), and more.

There are four protocol layers:

- [Blockchain layer](#blockchain-layer)
- [Verifiability layer](#verifiability-layer)
- [Application layer](#application-layer)
- [Big Brain](#big-brain)

Learn more: [Manifesto](warden-manifesto).

---

## Warden Studio

Warden Studio (now in Alpha) is a toolkit that provides builders everything they need to develop, test, and publish [AI Agents](#ai-agent) directly to [Warden](#warden) users. Upon publication, Warden Studio generates [Agent Passports](#agent-passport).
