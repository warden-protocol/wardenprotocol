---
sidebar_position: 1
id: home-doc
slug: /
---

# Introduction to Warden

## Warden Protocol

**Warden Protocol** is a full-stack purpose-built L1 blockchain designed for developers to build **Intelligent Applications**.

Warden creates a verifiable, AI-native blockchain where models are accessible to anyone and anywhere, their outputs directly powering smart applications.

These are our design principles:

- **Anything**: Build without limits—our Intelligent Applications run seamlessly onchain and operate offchain, or vice versa.
- **Anyone**: Developers on Cosmos, Ethereum, or Solana can build with Warden.
- **Anywhere**: Warden is chain-agnostic and accessible everywhere.

You can find a detailed overview of our mission in [Warden Manifesto](/learn/warden-manifesto).

## Protocol layers

Warden is an AI-ready protocol with three layers:

- **Blockchain layer**  
Warden lets users access responses from [Asynchronous Verifiable Resources](/learn/glossary#avr-plugin) (AVR Plugins) onchain. AVRs are a universal and standard way for smart contracts to access any resource or operate offchain systems. Users can also build, publish, and monetize their AVRs. The blockchain level acts as a coordination, messaging, and provenance layer AVR creators.

- **Verifiability layer**  
Warden's verifiability layer acts like a firewall that uses cryptography to verify AVR responses. [Statistical Proof of Execution](/learn/warden-protocol-modules/x-async#spex) (SPEX) ensures the model you see is the model you get, and in addition it can check if the outputs are accurate and confident enough to be used in applications.

- **Application layer**  
Warden's developer platform features two smart contract platforms: [EVM and CosmWasm](/build-an-app/introduction#smart-contracts). Application builders can create AVRs and use them to build the logic of their applications. Warden also provides custom infrastructure for AI-specific needs and interoperability tools allowing users to access AVRs from anywhere.

## Intelligent Applications

An **Intelligent Application** is a smart contract integrating AI or any offchain logic. Unlike traditional contracts bound by static logic, Intelligent Apps unlock more dynamic user experiences: they're able to reason, adapt, and interact across onchain and offchain environments.

Warden allows integrating Intelligent Apps with AI, which will simplify front-ends, interpret complex data sets, adapt to environments, and reach intelligent decisions. At the same time, blockchain-enabled backends ensure high integrity data, decentralization, and automated execution.

Currently, we're focused on the following Intelligent Applications:

- **Crypto super apps**  
  To demonstrate how powerful AI will be for crypto UX, we built the [Warden App](https://app.wardenprotocol.org). It lets users perform complex Web3 actions—like swaps and transfers—through simple chat or voice commands. The Warden App does all the thinking and problem solving for the user, making complex work like cross-chain transactions, portfolio management, or risk assessments easy.

- **Smart Agents**  
  Warden Agents are smart contracts managed onchain. This makes them defensibly sovereign, autonomous, and non-custodial. In H2 2025, we'll launch **Warden Buffett**—a reference trading agent made with our own Agent Kit. It'll be the first truly autonomous, profit-generating entity that lives onchain.

- **Intelligent custody**  
  We believe that machine learning, artificial intelligence, and automation will fundamentally reshape custody. AI will enable personalization, intelligent portfolio optimizations, and dynamic risk management systems. To build out this vision, we created [SpaceWard](https://spaceward.chiado.wardenprotocol.org)—a reference “omnichain SAFE”.

## Warden AI Agents

A **Warden AI Agent** is an AI-driven program that supports both offchain and onchain operations. Thanks to their native integration with Warden Protocol, Warden Agents can perform various onchain [Actions](/learn/glossary#action). You can easily build Agents with the [Warden Agent Kit](/category/warden-agent-kit).

Within Warden, AI is integrated on the verification and execution layers. Our verification layer uses blockchain, cryptography, and consensus to verify AI results are correct. On the execution layer, you can easily integrate AI with your application, protocols, and smart contracts, automating their execution across any chain.

Warden allows inference endpoints to create cryptographic proofs that verify that an AI model produced a specific output. These proofs are then verified on Warden's blockchain through a new consensus mechanism, ensuring AI outputs are not just delivered, but can be trusted.

AI integration is ensured by three key components:

- [The `x/async` module](/learn/warden-protocol-modules/x-async) with [AVR Plugins](/learn/glossary#avr-plugin)
- [SPEX (statistical proof of execution)](/learn/warden-protocol-modules/x-async#spex)
- [Orders](/learn/glossary#order)

## Build with Warden

Here is what you can do with Warden:

- **Build an Intelligent Application**  
[Intelligent Applications](#intelligent-applications) are smart contracts integrating AI or any offchain logic. You can deploy EVM-compatible Intelligent Apps with Solidity or Rust & CosmWasm.

- **Build an AI Agent**  
Warden allows you to integrate AI into your Intelligent Apps, utilizing outputs of AI models and building [AI Agents](#warden-ai-agents).

- **Operate a Keychain**  
[Keychains](/learn/glossary#keychain) are custodians that generate and store keys and sign transactions on any chain. You can become a Keychain operator or build a custom Keychain.

- **Run a validator node**  
You can run a [validator](/learn/glossary#validator) node and earn rewards while securing Warden's network.

## Documentation overview

Welcome to the Warden Protocol documentation!

Use the top menu to navigate across the main sections of the docs and learn how to join Warden:

- **Learn**: The basic information about the protocol
- [Build an App](/build-an-app/introduction): Guides for Intelligent Application developers
- [Build an Agent](/build-an-agent/introduction): Guides for AI Agent builders
- [Build a Keychain](/build-a-keychain/introduction): Guides for Keychain operators
- [Operate a Node](/operate-a-node/introduction): Guides for node operators
- [Tokens](/tokens/introduction): A detailed overview of Warden tokenomics
- [SpaceWard](https://help.wardenprotocol.org): User guides for SpaceWard, our front-end Intelligent Application

## Contribute

If you're going to contribute to the protocol, see [protocol developer docs on GitHub](https://github.com/warden-protocol/wardenprotocol/tree/v0.6.3/protocol-developer-docs).
