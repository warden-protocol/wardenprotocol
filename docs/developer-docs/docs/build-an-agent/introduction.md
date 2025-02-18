---
sidebar_position: 1
---

# Introduction

## AI Agents

The Warden Protocol allows you to **AI Agents**—AI-driven programs that support both offchain and onchain operations.

Thanks to their native integration with the Warden Protocol, Warden Agents can perform onchain [Actions](/learn/glossary#action), such as creating [Spaces](/learn/glossary#space), generating [keys](glossary#key), executing transactions, and managing [Orders](/build-an-onchain-ai-agent/introduction). AI integration is ensured by Warden's AI Blockchain Interface (see below).

You can easily build Agents with the [Warden Agent Kit](warden-agent-kit/introduction).

## AI Blockchain Interface

**Artificial Intelligence Blockchain Interface** (**AIBI**) brings AI onchain with an intuitive interface for developers to integrate AI into their applications and create AI Agents.

Inspired by proof-of-computation and computational pipelines, AIBI allows inference endpoints to create cryptographic proofs that verify that an AI model produced a specific prediction. These proofs are then verified on Wardens’ blockchain through a new consensus mechanism, ensuring AI outputs are not just delivered, but can be trusted.

Within Warden, AI is integrated on two layers:

- **Verification layer**  
Warden is designed to bring AIs onchain safely. Our verification layer uses blockchain, cryptography, and consensus to verify AI results are correct.

- **Execution layer**  
Easily integrate AI with your application, protocols, and smart contracts. Automate their execution across any chain.

The core components of AIBI include [Orders](build-an-onchain-ai-agent/introduction) and the [`x/async` Warden module](/learn/warden-protocol-modules/x-async).


## Section overview

In this section, you can find guides and examples demonstrating how to do the following:

- [Build an Agent using the Warden Agent Kit](warden-agent-kit/introduction)
- [Enable onchain capabilities for your Agent](build-an-onchain-ai-agent/introduction)

## Get started

To get started, follow the [Warden Agent Kit Quick start guide](warden-agent-kit/quick-start).
