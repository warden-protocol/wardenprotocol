---
sidebar_position: 1
---

# Introduction

## The `venice` AVR Plugin

The Venice Plugin allows Warden Protocol smart contracts to interact with AI models through the [`x/async` precompile](../../precompiles/x-async). This tutorial shows you how to create smart contracts that make [Venice AI](https://venice.ai) inference requests and handle responses using Foundry.

Follow tutorials in this section to learn how to do the following:
- Create smart contracts that interact with Venice AI models
- Deploy and test contracts using cast commands
- Extract and analyze AI response data
- Handle multiple AI requests

## Architecture

The Venice Plugin integration works through several components:

- Your smart contract: Contains the business logic and AI request handling
- The `x/async` precompile: Warden's built-in async task management system
- The Venice Plugin: Processes AI requests on validator nodes
- AI models: External AI services that generate responses

## Get started

To get started, [set up your environment](set-up-the-environment).
