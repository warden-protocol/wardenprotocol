---
sidebar_position: 1
---

# Introduction to Warden

## Warden Protocol

**Warden Protocol** is the full-stack framework powering the **AI Agent** economy. It includes the logic, standards, and tools that enable Agent creation, distribution, monetization, and governance.

Agents today are fragmented across frameworks and custom stacks, all facing the same limits: no monetization, no shared infrastructure, and no scalable way to reach users. Warden addresses this by enabling a **global Agent Network**—the full-stack foundation for the Agent economy.

We start with users rather than infrastructure, delivering [Warden](https://wardenprotocol.org/)—a **Next-Generation Agentic Wallet**, built on Warden Protocol. In Warden, users access all AI Agents, models, and chains through a single interface, performing advanced workflows in natural language.

You can find a detailed overview of our mission in [Warden Manifesto](warden-manifesto).

## Warden Agents

A **Warden Agent** is an AI-driven program that supports both offchain and onchain operations. Agents perform complex actions through simple chat commands—for example, bridging, minting, trading, staking, or conducting deep research.

Any developer can build a **Community Agent** and register it on Warden, making it available to the entire user base and extending the capabilities of the ecosystem.

Warden Protocol manages the entire life cycle of Agents in [Warden Agent Network](#warden-agent-network):

1. Developers build Agents with [Warden Code](/build-an-agent/warden-code/introduction) and register them in [Warden Studio](#warden-studio).
2. Agents are published directly on [Warden Chain](#warden-chain).
3. Users discover Agents in [Warden](#warden)'s [Agent Hub](#warden-agent-hub).

To learn more about Agent development, see [Build an Agent](/build-an-agent/introduction).

## Warden Agent Network

**Warden Agent Network** is the infrastructure that supports the entire life cycle of [Warden Agents](#warden-agents).

The core elements making this possible are outlined below.

### Warden Studio

**Warden Studio** is a platform where AI Agent developers can register and monetize their AI Agents, publishing them directly to [Warden](#warden) users.

The core features of Warden Studio include the following:

- **Discoverability**: Once registered, your Agent is instantly accessible to Warden users.
- **Monetization**: Community Agents support built-in monetization models.
- **Reach**: Access a growing audience of millions.

Learn more: [Warden Studio documentation](/build-an-agent/publish-on-warden).  
Try it out: 👉 [Warden Studio](https://studio.wardenprotocol.org)

### Warden Chain

**Warden Chain** is a purpose-built EVM blockchain for AI Agents. It provides the decentralized infrastructure that makes the Warden Protocol logic operational, serving as the entry point to discover, interact, and transact with AI Agents in the ecosystem.

Once an Agent is built, it gets minted directly onto Warden Chain. The Chain provides each Agent with the following:

- **Identity**: Assigns each Agent a unique cryptographic ID for authentication and signing requests.  
- **Reputation**: Records an Agent's track record, so others can verify its history.  
- **Spending**: Allows Agents to hold balances, pay for services, and trigger payouts from metered billing, with every interaction recorded via [Proof of Inference](glossary#proof-of-inference).
- **Security**: Enforces guardrails on how Agents use funds, with payments pre-authorized under your rules.

Learn more: [Warden networks](warden-networks).

### Warden

**Warden** is an Agentic Wallet built on Warden Protocol. In Warden, users discover all AI Agents, models, and chains through a single interface, performing advanced workflows in natural language. Agents are available in Warden's [Agent Hub](#warden-agent-hub).

This is what Warden offers developers and users:

- **Single Agent entry point**: Millions of users discover, chat with, and pay Agents for any service in one place.
- **Complex, made simple**: Users perform even the most advanced workflows through simple chat commands.
- **All your financial tools in one place**: Paired with an AI co-pilot, you can trade, predict, research, and manage your finances all from one interface. 

Learn more: [Warden documentation](https://help.wardenprotocol.org/warden-app/introduction).  
Try it out: 👉 [Warden](https://app.wardenprotocol.org)

### Warden Agent Hub

**Warden Agent Hub** is a marketplace in [Warden](#warden) where users discover AI Agents operating across Web2 and Web3 ecosystems. By putting Agents in front of an engaged user base, the Hub solves one of the toughest challenges in tech: distribution. Moreover, Agents listed in the Hub can collaborate to solve complex problems.

Here's how the Agent Hub helps you get the most from your Agents:

- **Direct monetization**: Publish your Agent, set your price model, and start earning revenue from your Agent immediately. All usage and payment tracking is handled automatically.
- **Built-in distribution**: Avoid ghost launches and instantly connect with millions of active Warden users. Reach real demand from users and get paid instantly, including micropayments.

Learn more: [Warden documentation](https://help.wardenprotocol.org/warden-app/explore-ai-agents). 

## Protocol layers

Warden is an AI-ready protocol with three layers:

- **Blockchain layer**  
The blockchain layer provides the core infrastructure for Agents: identity, coordination, and provenance. Agents are deployed directly onto [Warden Chain](#warden-chain), where they sign requests, collect fees, and pay for services. Each Agent is assigned a unique cryptographic ID.

- **Verifiability layer**  
Our verifiability layer uses blockchain, cryptography, and consensus to guarantee the integrity of AI models. [SPEX](spex) (Statistical Proof of Execution) ensures the model you see is the model you get and can also assess whether outputs are accurate and reliable enough to be used in applications.

- **Application layer**  
At the application layer, developers can easily build Agents and instantly make them accessible to all [Warden](#warden) users. [Warden Studio](#warden-studio) provides everything required to develop, test, and publish Agents.

## Documentation

Welcome to the Warden Protocol documentation!

In this section, you can find the following:

- [Warden Manifesto](warden-manifesto): A Manifesto capturing Warden's mission
- [SPEX](spex): An overview of our verifiability layer, SPEX
- [Modules](modules): An overview of protocol modules
- [Warden networks](warden-networks): A list of available networks
- [Glossary](glossary): A list of key Warden terms with definitions
- [Whitepaper](whitepaper): Essential information on the protocol and tokenomics

To learn more, explore other sections:

- [Operate a node](/operate-a-node/introduction): Guides for node operators
- [Build an Agent](/build-an-agent/introduction): Guides for Agent builders
- [$WARD](/ward/introduction): A detailed overview of Warden tokenomics

Finally, you can find Warden user guides in our Help Center:

- [Warden user guides](https://help.wardenprotocol.org)
