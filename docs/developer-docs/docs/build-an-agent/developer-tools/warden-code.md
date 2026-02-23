---
sidebar_position: 1
---

# Warden Code

## Overview

**Warden Code** is a CLI for scaffolding production-ready Agents compatible with Warden.

With Warden Code, you can do the following:

- Quickly generate a ready-to-use project
- Edit the Agent code using an AI assistant
- Chat with your Agent through the CLI

The CLI is built on top of the [Warden Agent Kit](warden-agent-kit), which provides the server endpoints and built-in capabilities for generated Agents:

- Compatibility with the [A2A protocol](https://a2a-protocol.org/latest/topics/what-is-a2a/)
- Support for [x402 payments](https://www.x402.org)
- Compatibility with LangGraph SDK clients through the [LangGraph Agent Server API](https://docs.langchain.com/langsmith/server-api-ref)

:::important GitHub
Warden Code is available on GitHub: [`warden-code`](https://github.com/warden-protocol/warden-code).
:::

## CLI Commands

XXX

## Agent models 

Depending on your choices you make when creating a new Agent, Warden Code uses one of the supported Agent models:

- **OpenAI + Streaming**: A GPT-powered Agent with streaming responses
- **OpenAI + Multi-turn**: A GPT-powered Agent with conversation history
- **Blank + Streaming**: A minimal streaming Agent that echoes input
- **Blank + Multi-turn**: A minimal multi-turn conversation agent

## x402 payments

XXX

## Project structure

XXX
