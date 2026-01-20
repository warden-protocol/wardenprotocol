---
sidebar_position: 1
id: home-doc
slug: /
---

# Introduction to Warden

## Warden Protocol

**Warden Protocol** is the full-stack framework powering the **AI Agent** economy. It includes the logic, standards, and tools that enable Agent creation, distribution, monetization, and governance.

Agents today are fragmented across frameworks and custom stacks, all facing the same limits: no monetization, no shared infrastructure, and no scalable way to reach users. Warden addresses this by enabling a **global Agent Network**—the full-stack foundation for the Agent economy.

We start with users rather than infrastructure, delivering [Warden](https://wardenprotocol.org/)—a **Next-Generation Agentic Wallet**, built on Warden Protocol. In Warden, users access all AI Agents, models, and chains through a single interface, performing advanced workflows in natural language.

You can find a detailed overview of our mission in [Warden Manifesto](/learn/warden-manifesto).

## AI Agents

An **AI Agent** is an AI-driven program that supports both offchain and onchain operations. Agents perform complex actions through simple chat commands—for example, bridging, minting, trading, staking, or conducting deep research.

Below is a curated list of Agents we currently focus on:

- **Financial Agents**: Simplifying all the complexities in DeFi: swapping assets, bridging across chains, and abstracting gas.
- **Autopilot Agents**: Warden is building distributed non-custodial architecture for autopilot Agents operating when the user is offline.
- **Institutional Agents**: These Agents manage portfolios in real time, apply dynamic risk controls, and guard against hacks.
- **Ecosystem Agents**: Core participants in blockchain ecosystems. They monitor networks for risks, curate proposals, and support governance.

Any developer can build a **Community Agent** and register it on Warden, making it available to the entire user base and extending the capabilities of the ecosystem.

## Warden Agent Network

We capture the entire lifecycle of Agents in our **Agent Network**:

- Developers register Community Agents in [Warden Studio](#warden-studio).
- Agents are published directly on [Warden Chain](#warden-chain).
- Users discover Agents in [Warden](#warden)'s [Agent Hub](#warden-agent-hub).

The core infrastructure elements making this possible are outlined below.

### Warden Studio

**Warden Studio** is a platform that equips builders with the tools they need to launch and monetize their AI Agents—directly to [Warden](#warden) users.

The core features of Warden Studio include the following:

- **Instant launch and global reach:** Skip registrations and approvals—list your Agent in under a minute and reach millions of users from day one.
- **Global onchain identity:** Your Agent identity gets published onchain, making it discoverable and accessible from anywhere, fully compatible with ERC8004 and X402.
- **Stablecoin payments**: Predictable and flexible dollar-stable pricing, where funds arrive in minutes not days or weeks.
- **Flexible pricing**: Supports per-inference billing and subscriptions out of the box.
- **Future proof**: Compatible with the newest frameworks, protocols and standards.

Try it out: [Warden Studio](https://studio.wardenprotocol.org).

### Warden Chain

**Warden Chain** is a purpose-built EVM blockchain for AI Agents. It provides the decentralized infrastructure that makes the Warden Protocol logic operational, serving as the entry point to discover, interact, and transact with AI Agents in the ecosystem.

Once an Agent is built, it gets minted directly onto Warden Chain. The Chain provides each Agent with the following:

- **Identity**: Assigns each Agent a unique cryptographic ID for authentication and signing requests.  
- **Reputation**: Records an Agent's track record, so others can verify its history.  
- **Spending**: Allows Agents to hold balances, pay for services, and trigger payouts from metered billing, with every interaction recorded via [Proof of Inference](/learn/glossary#proof-of-inference).
- **Security**: Enforces guardrails on how Agents use funds, with payments pre-authorized under your rules.

Learn more: [Warden networks](/learn/warden-networks).

### Warden

**Warden** is an agentic wallet built on Warden Protocol. In Warden, users discover all AI Agents, models, and chains through a single interface, performing advanced workflows in natural language. Agents are available in Warden's [Agent Hub](#warden-agent-hub).

This is what Warden offers developers and users:

- **Single Agent entry point**: Millions of users discover, chat with, and pay Agents for any service in one place.
- **Complex, made simple**: Users perform even the most advanced workflows through simple chat commands.
- **All your financial tools in one place**: Paired with an AI co-pilot, you can trade, predict, research, and manage your finances all from one interface. 

Try it out: [Warden](https://app.wardenprotocol.org).

### Warden Agent Hub

**Warden Agent Hub** is a marketplace in [Warden](#warden) where users discover AI Agents operating across Web2 and Web3 ecosystems. By putting Agents in front of an engaged user base, the Hub solves one of the toughest challenges in tech: distribution. Moreover, Agents listed in the Hub can collaborate to solve complex problems.

Here's how the Agent Hub helps you get the most from your Agents:

- **Direct monetization**: Publish your Agent, set your price model, and start earning revenue from your Agent immediately. All usage and payment tracking is handled automatically.
- **Built-in distribution**: Avoid ghost launches and instantly connect with millions of active Warden users. Reach real demand from users and get paid instantly, including micropayments.

Learn more: [Warden documentation](https://help.wardenprotocol.org/warden-app/explore-ai-agents). 

## Protocol layers

Warden is an AI-ready protocol with four layers:

- **Blockchain layer**  
The blockchain layer provides the core infrastructure for Agents: identity, coordination, and provenance. Agents are deployed directly onto [Warden Chain](#warden-chain), where they sign requests, collect fees, and pay for services. Each Agent is assigned a unique cryptographic ID.

- **Verifiability layer**  
Our verifiability layer uses blockchain, cryptography, and consensus to guarantee the integrity of AI models. [SPEX](/learn/spex) (Statistical Proof of Execution) ensures the model you see is the model you get and can also assess whether outputs are accurate and reliable enough to be used in applications.

- **Application layer**  
At the application layer, developers can easily build Agents and instantly make them accessible to all [Warden](#warden) users. [Warden Studio](#warden-studio) provides everything required to develop, test, and publish Agents.

- **Big Brain**  
Big Brain (under development) is a protocol-enabled, domain-specific LLM trained on 1T tokens, catalyzing Agent performance. Big Brain learns from every Warden interaction and will reward those who make it smarter.

## Docs overview

Welcome to the Warden Protocol documentation!

Use the top menu to navigate across the main sections of the docs and learn how to join Warden:

- **Learn**:
  - [Warden Manifesto](/learn/warden-manifesto): A Manifesto capturing Warden's mission
  - [SPEX](/learn/spex): An overview of our verifiability layer, SPEX
  - [Modules](/learn/modules): An overview of protocol modules
  - [Warden networks](/learn/warden-networks): A list of available networks
  - [Glossary](/learn/glossary): A list of key Warden terms with definitions
- [Operate a node](/operate-a-node/introduction): Guides for node operators
- [Publish an Agent](/publish-an-agent/introduction): Onboarding for Community Agent builders
- [$WARD](/ward/introduction): A detailed overview of Warden tokenomics

You can also visit Warden's **Help Center** to find user guides for our applications:

- [Warden](https://help.wardenprotocol.org): User guides for Warden, an AI-powered co-pilot for crypto
