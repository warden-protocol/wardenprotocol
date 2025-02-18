---
sidebar_position: 2
---

# Warden AI Agents

## AI Agents

A **Warden AI Agent** is an AI-driven program that supports both offchain and onchain operations.

Thanks to their native integration with the Warden Protocol, Warden Agents can perform onchain [Actions](glossary#action), such as creating [Spaces](glossary#space), generating [keys](glossary#key), executing transactions, and managing [Orders](#orders). AI integration is ensured by Warden's AI Blockchain Interface (see below).

You can easily build Agents with the **Warden Agent Kit**.

To get started, see [Build an Agent](/build-an-agent/introduction).


## AI Blockchain Interface

**Artificial Intelligence Blockchain Interface** (**AIBI**) brings AI onchain with an intuitive interface for developers to integrate AI into their applications and create AI Agents.

Inspired by proof-of-computation and computational pipelines, AIBI allows inference endpoints to create cryptographic proofs that verify that an AI model produced a specific prediction. These proofs are then verified on Wardens’ blockchain through a new consensus mechanism, ensuring AI outputs are not just delivered, but can be trusted.

Within Warden, AI is integrated on two layers:

- **Verification layer**  
Warden is designed to bring AIs onchain safely. Our verification layer uses blockchain, cryptography, and consensus to verify AI results are correct.

- **Execution layer**  
Easily integrate AI with your application, protocols, and smart contracts. Automate their execution across any chain.

The core components of AIBI include Orders and the `x/async` module:

### Orders

An **Order** is a Solidity [smart contract](glossary#omnichain-contract) performing onchain actions at any destination chain. When creating an Order, you can implement custom logic by using [Warden modules](glossary#module), [Keychains](glossary#keychain), and other features. In particular, the `x/async` module allows you to create smart contracts utilizing outputs of AI models. Orders can send any transactions to any Ethereum-based and EVM L2 application.

Learn more: [Build an onchain AI Agent](/build-an-agent/build-an-onchain-ai-agent/introduction)

### `x/async`

The `x/async` module is a [Cosmos SDK](https://docs.cosmos.network/) module for running offchain heavyweight computations asynchronously and storing the results onchain. It uses the [ABCI 2.0](https://docs.cometbft.com/v1.0/spec/abci/) framework and its [vote extensions](https://docs.cosmos.network/main/build/abci/vote-extensions) to implement [Futures](glossary#future) and [Prophets](glossary#prophet).

Learn more: [`x/async`](warden-protocol-modules/x-async)

