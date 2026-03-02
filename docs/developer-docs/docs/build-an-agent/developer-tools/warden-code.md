---
sidebar_position: 1
---

# Warden Code

## Overview

**Warden Code** is a CLI for scaffolding production-ready AI Agents **compatible with Warden**.

Generated Agents also support open standards such as athe **A2A protocol**, **x402 payments**, and **ERC-8004 identity**, which allows them to function across the broader Agent ecosystem.

This article is a reference covering the main features of Warden Code. For getting started with Agent development, see [Build an Agent with Warden Code](/category/build-an-agent-with-warden-code).

:::important GitHub
Warden Code is available on GitHub: [`warden-code`](https://github.com/warden-protocol/warden-code).
:::

## Key features

Agents generated with Warden Code support the following key features:

- Compatibility with [Warden](https://help.wardenprotocol.org)
- Discoverability outside of Warden through [ERC-8004 identity registries](https://eips.ethereum.org/EIPS/eip-8004)
- Interaction with other Agents through the [A2A protocol](https://a2a-protocol.org/latest/)
- Monetization through [x402 payments](https://www.x402.org)
- Endpoints compatible with the [LangGraph Agent Server API](https://docs.langchain.com/langsmith/server-api-ref)

To learn more, see [Warden Agent capabilities](../warden-agent-capabilities).

## Basics

### CLI commands

With Warden Code, you can use the command line to generate a project, edit your code with an AI assistant, configure your Agent, and much more:

```bash
/new - Create a new agent interactively
/build - Enter AI-powered chat mode to build your agent
/chat - Chat with a running agent via A2A or LangGraph
/config - View and edit agent configuration
/register - Register agent on-chain (ERC-8004)
/activate - Activate a registered agent on-chain (ERC-8004)
/deactivate - Deactivate a registered agent on-chain (ERC-8004)
/help - Show available commands
/clear - Clear the terminal screen
/exit - Exit the CLI
```

### Agent models

Depending on your choices you make when [creating an Agent](../build-an-agent/create-a-new-agent#3-create-an-agent), Warden Code uses one of the supported Agent models:

- **OpenAI + Streaming**: A GPT-powered Agent with streaming responses
- **OpenAI + Multi-turn**: A GPT-powered Agent with conversation history
- **Blank + Streaming**: A minimal streaming Agent that echoes input
- **Blank + Multi-turn**: A minimal multi-turn conversation agent

### Project structure

Warden Code generates the following project structure:

```
my-agent/
├── src/
│   ├── agent.ts      # Your agent logic (handler function)
│   ├── server.ts     # Server setup, static file serving, protocol routing
│   └── payments.ts   # x402 payment setup (only when payments enabled)
├── public/
│   ├── index.html    # Chat front-end (auto-loads agent card, skills, x402 wallets)
│   └── .well-known/
│       ├── agent-card.json           # Agent identity, capabilities, skills (A2A)
│       └── agent-registration.json   # ERC-8004 registration metadata
├── package.json
├── tsconfig.json
├── Dockerfile
├── .env.example
└── .gitignore
```

### Frontend

*Coming soon.*

## API

### Authentication

*Coming soon.*

### A2A endpoints

*Coming soon.*

### LangGraph endpoints

#### LangGraph Agent Server API

All Warden Agents are immediately compatible with the **LangGraph Agent Server API**.

Warden Code exposes this API only partially. Below, you can find a full list of supported endpoints with links to the [LangGraph API reference](https://docs.langchain.com/langsmith/server-api-ref).

You can test them when [running your Agent locally](../build-an-agent/test-the-agent-locally) or [in production](../host-your-agent).

#### Assistants

| Name | Method | Endpoint |
|------|--------|----------|
| [Search Assistants](...) | POST | `/assistants/search` |
| [Get Assistant](...) | GET | `/assistants/{assistant_id}` |

#### Threads

| Name | Method | Endpoint |
|------|--------|----------|
| [Create Thread](...) | POST | `/threads` |
| [Search Threads](...) | POST | `/threads/search` |
| [Get Thread](...) | GET | `/threads/{thread_id}` |
| [Get Thread State](...) | GET | `/threads/{thread_id}/state` |
| [Get Thread History](...) | GET | `/threads/{thread_id}/history` |
| [Delete Thread](...) | DELETE | `/threads/{thread_id}` |

#### Thread runs

| Name | Method | Endpoint |
|------|--------|----------|
| [Create Background Run](...) | POST | `/threads/{thread_id}/runs` |
| [Create Run, Stream Output](...) | POST | `/threads/{thread_id}/runs/stream` |
| [Create Run, Wait for Output](...) | POST | `/threads/{thread_id}/runs/wait` |

#### Stateless runs

| Name | Method | Endpoint |
|------|--------|----------|
| [Create Run, Stream Output](...) | POST | `/runs/stream` |
| [Create Run, Wait for Output](...) | POST | `/runs/wait` |

#### System

| Name | Method | Endpoint |
|------|--------|----------|
| [Server Information](...) | GET | `/info` |
| [Health Check](...) | GET | `/ok` |

## Functions

*Coming soon.*
