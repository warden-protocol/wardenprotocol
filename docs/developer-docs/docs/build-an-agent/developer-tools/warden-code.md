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

Agents generated with Warden Code support the following key capabilities:

- Compatibility with [Warden](https://help.wardenprotocol.org)
- Discoverability outside of Warden through [ERC-8004 identity registries](https://eips.ethereum.org/EIPS/eip-8004)
- Interaction with other Agents through the [A2A protocol](https://a2a-protocol.org/latest/)
- Monetization through [x402 payments](https://www.x402.org)
- Endpoints compatible with the [LangGraph Agent Server API](https://docs.langchain.com/langsmith/server-api-ref)
- Built-in chat UI that automatically loads the A2A Agent Card and x402 wallets

To learn more, see [Warden Agent capabilities](../warden-agent-capabilities).

In addition, Warden Code provides the AI-powered build mode allowing you to [implement custom Agent logic](../build-an-agent/implement-custom-logic#build-with-ai) with an AI assistant.

## Basics

### Installation

Use the `npm` commands below to install, update, and run Warden Code. This requires [Node.js](https://nodejs.org/en/download) 18 or higher.

Install globally:

```bash
npm install -g warden-code
```

Update:

```bash
npm install -g warden-code
```

Run:

```bash
warden
```


### CLI commands

With Warden Code, you can use the command line to generate a project, edit your code with an AI assistant, configure your Agent, and much more.

Run `warden` to initiate Warden Code and use the following commands:

<table style={{ width: "100%", tableLayout: "fixed" }}>
  <colgroup>
    <col style={{ width: "110px" }} />
    <col />
    <col style={{ width: "220px" }} />
  </colgroup>

  <tr>
    <th>Command</th>
    <th>Description</th>
    <th>Guides</th>
  </tr>

  <tr>
    <td>`/new`</td>
    <td>Create a new Agent interactively</td>
    <td>
      [Create a new Agent](../build-an-agent/create-a-new-agent)
    </td>
  </tr>

  <tr>
    <td>`/build`</td>
    <td>Enter the AI-powered mode to build your Agent</td>
    <td>
      [Implement custom logic](../build-an-agent/implement-custom-logic#build-with-ai)
       </td>
  </tr>

  <tr>
    <td>`/chat`</td>
    <td>Chat with a running Agent using A2A or LangGraph</td>
    <td>
      [Test the Agent locally](../build-an-agent/test-the-agent-locally#chat-using-the-cli)
    </td>
  </tr>

  <tr>
    <td>`/config`</td>
    <td>View and edit the Agent configuration</td>
    <td>
      [Configure the Agent](../build-an-agent/configure-the-agent)
    </td>
  </tr>

  <tr>
    <td>`/register`</td>
    <td>Register the Agent onchain (ERC-8004)</td>
    <td rowSpan={3}>
      [Register on ERC-8004](../build-an-agent/configure-the-agent)
    </td>
  </tr>

  <tr>
    <td>`/activate`</td>
    <td>Activate a registered Agent onchain (ERC-8004)</td>
  </tr>

  <tr>
    <td>`/deactivate`</td>
    <td>Deactivate a registered Agent onchain (ERC-8004)</td>
  </tr>

  <tr>
    <td>`/help`</td>
    <td>Show available commands</td>
    <td>N/A</td>
  </tr>

  <tr>
    <td>`/clear`</td>
    <td>Clear the terminal screen</td>
    <td>N/A</td>
  </tr>

  <tr>
    <td>`/exit`</td>
    <td>Exit the CLI</td>
    <td>N/A</td>
  </tr>

</table>

### Project structure

When you [create a new Agent](../build-an-agent/create-a-new-agent#3-create-an-agent), Warden Code generates the following project structure:

```
my-agent/
├── src/
│   ├── agent.ts      # Your Agent's logic: the handler function
│   ├── server.ts     # Server setup, static file serving, protocol routing
│   └── payments.ts   # x402 payment setup (created only if you enable x402)
├── public/
│   ├── index.html    # The chat frontend: auto-loads the A2A Agent Card, x402 wallets
│   └── .well-known/
│       ├── agent-card.json           # The A2A Agent Card: the identity, capabilities, skills
│       └── agent-registration.json   # ERC-8004 registration metadata
├── package.json
├── tsconfig.json
├── Dockerfile
├── .env.example
└── .gitignore
```

### Agent models

Depending on the choices you make when [creating an Agent](../build-an-agent/create-a-new-agent#3-create-an-agent), Warden Code uses one of the supported Agent models:

- **OpenAI + Streaming**: A GPT-powered Agent with streaming responses
- **OpenAI + Multi-turn**: A GPT-powered Agent with conversation history
- **Blank + Streaming**: A minimal streaming Agent that echoes input
- **Blank + Multi-turn**: A minimal multi-turn conversation agent

### Running the Agent

The `npm` commands below allow you to build and initiate your Agent. Navigate to your project's root directory and run them in a separate terminal window.

Build:

```bash
npm run build
```

Run:

```bash
npm start
```

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
| [Search Assistants](https://docs.langchain.com/langsmith/agent-server-api/assistants/search-assistants) | POST | `/assistants/search` |
| [Get Assistant](https://docs.langchain.com/langsmith/agent-server-api/assistants/get-assistant) | GET | `/assistants/{assistant_id}` |

#### Threads

| Name | Method | Endpoint |
|------|--------|----------|
| [Create Thread](https://docs.langchain.com/langsmith/agent-server-api/threads/create-thread) | POST | `/threads` |
| [Search Threads](https://docs.langchain.com/langsmith/agent-server-api/threads/search-threads) | POST | `/threads/search` |
| [Get Thread](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread) | GET | `/threads/{thread_id}` |
| [Get Thread State](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread-state) | GET | `/threads/{thread_id}/state` |
| [Get Thread History](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread-history) | GET | `/threads/{thread_id}/history` |
| [Delete Thread](https://docs.langchain.com/langsmith/agent-server-api/threads/delete-thread) | DELETE | `/threads/{thread_id}` |

#### Thread runs

| Name | Method | Endpoint |
|------|--------|----------|
| [Create Background Run](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/create-background-run) | POST | `/threads/{thread_id}/runs` |
| [Create Run, Stream Output](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/create-run-stream-output) | POST | `/threads/{thread_id}/runs/stream` |
| [Create Run, Wait for Output](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/create-run-stream-output) | POST | `/threads/{thread_id}/runs/wait` |

#### Stateless runs

| Name | Method | Endpoint |
|------|--------|----------|
| [Create Run, Stream Output](https://docs.langchain.com/langsmith/agent-server-api/stateless-runs/create-run-stream-output) | POST | `/runs/stream` |
| [Create Run, Wait for Output](https://docs.langchain.com/langsmith/agent-server-api/stateless-runs/create-run-wait-for-output) | POST | `/runs/wait` |

#### System

| Name | Method | Endpoint |
|------|--------|----------|
| [Server Information](https://docs.langchain.com/langsmith/agent-server-api/system/server-information) | GET | `/info` |
| [Health Check](https://docs.langchain.com/langsmith/agent-server-api/system/health-check) | GET | `/ok` |

## Functions

*Coming soon.*
