---
sidebar_position: 1
---

# Introduction

## Warden AI Agents

Warden Protocol allows you to develop **Warden Agents**—AI-driven programs that support both offchain and onchain operations.

Thanks to their native integration with Warden Protocol, Warden Agents can perform onchain [Actions](/learn/glossary#action), such as creating [Spaces](/learn/glossary#space), generating [keys](/learn/glossary#key), executing transactions, and managing [Orders](build-an-onchain-ai-agent/introduction).

You can easily build Agents with the [Warden Agent Kit](warden-agent-kit/introduction).

## AI integration

Within Warden, AI is integrated on the verification and execution layers. Our verification layer uses blockchain, cryptography, and consensus to verify AI results are correct. On the execution layer, you can easily integrate AI with your application, protocols, and smart contracts, automating their execution across any chain.

Warden allows inference endpoints to create cryptographic proofs that verify that an AI model produced a specific output. These proofs are then verified on Wardens’ blockchain through a new consensus mechanism, ensuring AI outputs are not just delivered, but can be trusted.

AI integration is ensured by three key components:

- [The `x/async` module](/learn/warden-protocol-modules/x-async) with [AVR Plugins](/learn/warden-protocol-modules/x-async#avr-plugin)
- [SPEX (statistical proof of execution)](/learn/warden-protocol-modules/x-async#spex)
- [Orders](build-an-onchain-ai-agent/introduction)

## Section overview

In this section, you can find guides and examples demonstrating how to do the following:

- [Build an Agent using the Warden Agent Kit](warden-agent-kit/introduction)
- [Enable onchain capabilities for your Agent](build-an-onchain-ai-agent/introduction)

## Get started

To get started, follow the [Warden Agent Kit quick start guide](warden-agent-kit/quick-start).
