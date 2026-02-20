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

## Agent parameters

When created an Agent, you're prompted to specify the following parameters:

- **Name** and **Description**
- **Template**
 - **Blank**: A minimal A2A server with no AI model — echoes input back (good for testing). Later you'll need to take additional steps such as specifying your preferred LLM in the code.
 - **OpenAI**: An AI-powered agent using OpenAI/GPT — can reason and respond to tasks. You'll be prompted to provide your **OpenAI API key** from [Prerequisites](#prerequisites).
- **Communication style**
  - **Streaming**: Tokens stream in real-time as the model generates — faster perceived response.
  - **Mulit-turn converstions**: Response arrives all at once after completion — simpler to work with.
- **Skills** (optional): Skills describe what your agent can do (e.g. "summarize text", "translate"). They are advertised in the agent card so other agents and clients can discover capabilities.
- **x402 payments** (optional)

## Agent models 

Based on your choices, the CLI will create an Agent based one of the supported models:

- **OpenAI + Streaming**: A GPT-powered Agent with streaming responses
- **OpenAI + Multi-turn**: A GPT-powered Agent with conversation history
- **Blank + Streaming**: A minimal streaming Agent that echoes input
- **Blank + Multi-turn**: A minimal multi-turn conversation agent

## x402 payments

XXX

## Project structure

XXX
