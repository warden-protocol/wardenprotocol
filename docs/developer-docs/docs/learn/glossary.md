---
sidebar_position: 6
---

# Glossary

## Agent network

The Agent network is the infrastructure that supports the entire lifecycle of [AI Agents](#ai-agent). It provides the full-stack foundation for the Agent economy, unifying Agents that would otherwise remain fragmented across frameworks and custom stacks without reaching users.

The core elements of the Agent network are [Warden Studio](#warden-studio), [Warden Chain](#warden-chain), [Warden Agent Hub](#warden-agent-hub), and [Warden](#warden).

---

## AI Agent

An AI Agent is an AI-driven program that supports both offchain and onchain operations. Agents perform complex actions through simple chat commands—for example, bridging, minting, trading, staking, deep research. At the moment, we focus on financial, autopilot, institutional (custodial), and ecosystem Agents.

We capture the entire life cycle of Agents in our [Agent network](#agent-network) through these core elements: [Warden Studio](#warden-studio), [Warden Chain](#warden-chain), [Warden Agent Hub](#warden-agent-hub), [Warden](#warden).

---

## Application layer 

XXX

---

## Big Brain

Big Brain (under development) is a protocol-enabled, domain-specific LLM trained on 1T tokens, catalyzing [AI Agent](#ai-agent) performance as the evolving hive mind. Big Brain learns from every [Warden](#warden) interaction and rewards contributors who help it improve.

---

## Blockchain layer

The blockchain layer provides the core infrastructure for [AI Agents](#ai-agent): identity, coordination, and provenance. Agents are deployed directly onto [Warden Chain](#warden-chain).

---

## Bonded validator

A bonded validator is an active validator  participating in consensus ([staking](#staking)). Bonded validators validate transactions, propose blocks, and earn rewards for their contributions to the network.

See also: [Unbonding validator](#unbonding-validator), [Unbonded validator](#unbonded-validator).

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

(?)

An Intelligent Application is a smart contract integrating AI or any offchain logic. Unlike traditional contracts bound by static logic, Intelligent Apps unlock more dynamic user experiences: they're able to reason, adapt, and interact across onchain and offchain environments.

With Warden, you can build crypto super apps, smart [AI Agents](#ai-agent), and intelligent custody solutions. For example, see [SpaceWard](#spaceward) and [Warden](https://app.wardenprotocol.org). We support EVM smart contracts.

Learn more: [Warden Manifesto](warden-manifesto).

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

Learn more: [Cosmos modules: `x/oracle`](cosmos-modules#xoracle).

---

## SpaceWard

(?)

SpaceWard is an [Intelligent Application](#intelligent-application) functioning as the front-end interface for Warden. It provides a user-friendly platform where you can create Spaces, manage wallets and Intents, and interact with decentralized applications (dApps) and other components of the Web3 ecosystem.

Learn more: [SpaceWard documentation](https://help.wardenprotocol.org/spaceward).  
Try it out: [SpaceWard](https://spaceward.chiado.wardenprotocol.org).

---

## SPEX

SPEX (Statistical Proof of Execution) is a sampling-based verifiable computing protocol that ensures the integrity of computational tasks through probabilistic guarantees. This includes tasks with potentially non-deterministic outputs, such as those involving large language models (LLMs) or stochastic training pipelines. SPEX is used as a verifiability layer for AI on Warden Protocol.

Learn more: [SPEX](spex).

---

## Staking

(?)

Staking is the process of participating in the proof-of-stake (POS) consensus mechanism. [Validators](#validator) and [delegators](#delegator) stake their [WARD tokens](#ward-token) for a chance to validate blocks and transactions and earn staking rewards.

The consensus mechanism chooses validators based on their [weight](#validators-weight). If a validator is successful, its delegators will earn rewards too. If a validator is slashed, the delegator’s stake will be slashed. Staking also allows validators and delegators to participate in [governance](#governance).

---

## Validator

A validator is an individual or entity that participates in the [staking](#staking) process by running a [full](#full-node) or pruned [Warden Protocol node](#node) and validating blocks and transactions. 

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

XXX

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

(UPD)

**$WARD** is the native utility token for the Warden ecosystem, sitting at the heart of both Warden Protocol and [Warden](#warden). $WARD facilitates various operations—such as [governance](#governance), [staking](#staking), rewards—and serves as a medium of payment for any developer publishing an [Agent](#ai-agent) on Warden. For Warden, it'll act as a gas abstraction token and unlock gated functionality. 

Learn more: [$WARD](/tokens/ward-token/ward).

---

## Warden

Warden is an AI-driven [Intelligent Application](#intelligent-application) built on Warden Protocol. In Warden, users access all [AI Agents](#ai-agent), models, and chains through a single interface, performing advanced workflows in natural language. Agents are available in [Warden Agent Hub](#warden-agent-hub).

Learn more: [Warden documentation](https://help.wardenprotocol.org).  
Try it out: [Warden](https://app.wardenprotocol.org).

---

## Warden Agent Hub

Warden Agent Hub is a marketplace in [Warden](#warden) where users discover AI Agents operating across Web2 and Web3 ecosystems. By putting Agents in front of an engaged user base, the Hub solves the toughest challenge in tech: distribution. Moreover, Agents listed here can collaborate to solve complex problems.

Learn more: [Warden documentation](https://help.wardenprotocol.org/warden-app/explore-ai-agents).  

---

## Warden Agent Kit

(?)

The Warden Agent Kit allows creating [AI Agents](#ai-agent) that are able to access both offchain and onchain functionalities. The kit offers native integration with Warden Protocol for onchain actions and supports compatibility with Typescript, any AI Agent framework, and [LangChain](https://js.langchain.com/docs/introduction/) tools.

---

## Warden Chain

Warden Chain serves as an entry point to discover, interact , and transact with [AI Agents](#ai-agent) in our ecosystem. Once an Agent is built, it gets minted directly onto the chain, where it signs requests, collects fees, and pays for services.

Learn more: [Warden networks](/learn/warden-networks).

---

## Warden Studio

Warden Studio (now in Alpha) is a toolkit giving builders everything they need to develop, test, and publish [AI Agents](#ai-agent) directly to [Warden](#warden) users—from decentralized, verifiable inference to domain-specific language models, verification systems, and core primitives. This toolkit is built for Web3 developers, no-code creators, and Web2 builders.
