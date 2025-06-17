---
sidebar_position: 1
---

# Introduction

## The `venice` AVR Plugin

The Venice plugin allows Warden Protocol smart contracts to interact with AI models through the [`x/async` precompile](../../precompiles/x-async). This tutorial shows you how to create smart contracts that make Venice AI requests and handle responses using Foundry.

## What you'll learn

In this tutorial, you'll learn how to:

- **Create smart contracts** that interact with Venice AI models
- **Deploy and test contracts** using cast commands
- **Extract and analyze AI response data**
- **Handle multiple AI requests**

## Architecture overview

The Venice plugin integration works through several components:

- **Your Smart Contract**: Contains the business logic and AI request handling
- **x/async Precompile**: Warden's built-in async task management system
- **Venice Plugin**: Processes AI requests on validator nodes
- **AI Models**: External AI services that generate responses

## Next steps

Ready to get started? Let's begin by [setting up the development environment](set-up-the-environment).
