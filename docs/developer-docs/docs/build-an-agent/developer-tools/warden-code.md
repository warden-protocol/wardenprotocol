---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Warden Code

## Overview

**Warden Code** is a CLI for scaffolding production-ready AI Agents **compatible with Warden**.

Generated Agents also support open standards such as the **A2A protocol**, **x402 payments**, and **ERC-8004 identity**, which allows them to function across the broader Agent ecosystem.

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
      [Register on ERC-8004](../register-on-erc-8004)
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

Run with [x402 payments](#x402-payments) temporarily disabled:

```bash
X402=false npm start
```

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

### API server

Agents generated with Warden Code use a server that exposes two types of endpoints: [A2A](#a2a-endpoints--methods) and [LangGraph](#langgraph-endpoints). For more details, see the reference sections below.

:::note
You can find the server setup `src/server.ts`.
:::

When you create an Agent, Warden Code generates a random **Agent API key**. By default, the server requires it for **authentication**.

:::important 
The Agent API key is stored in the `.env` file as `AGENT_API_KEY`.
:::

This key is used in the following ways:

- **API requests**  
  POST requests require authentication, while GET requests remain public. The key must be passed as a Bearer token in the `Authorization` header:

  ```bash
  -H "Authorization: Bearer AGENT_API_KEY"
  ```

- **CLI usage**  
  If you chat with your Agent using the `/chat` command, it automatically reads `AGENT_API_KEY` from `.env`. If no key is found or the key is rejected, Warden Code prompts you for a valid key.

- **Usage with x402**  
  When [x402 payments](#x402-payments) are enabled, API key authentication takes priority. Requests with a valid Bearer token bypass the payment middleware entirely. Requests without a valid key fall through to the x402 payment flow.

:::tip Tips
- To rotate the key, replace the value and restart or redeploy the Agent server.
- To disable authentication, remove the `AGENT_API_KEY` line from `.env`. In production, omit the variable from the [hosting service configuration](../host-your-agent#3-deploy-your-agent).
:::

## x402 payments

Every scaffolded Agent includes [x402 payment](https://x402.org) infrastructure—Coinbase's **HTTP 402** payment protocol.

### Enabling

x402 payments are disabled by default. This is how you can enable them:

- When [creating a new Agent](../build-an-agent/create-a-new-agent), choose **Enable x402 payments**.
- After creating an Agent, run `/config` and select **Payments**.
- You can also directly edit [x402 parameters](#parameters) in the `.env` file.

### Parameters

When enabling x402 payments, you need to specify x402 parameters, which are stored in the `.env` file. Each payment network has its own set of variables, differentiated by prefixes.

| Name      | Variable | Description |
| --------- | -------- | ----------- |
| **Network** | `X402_<PREFIX>_NETWORK` | The network for receiving payments. Select one of the [supported networks](#networks). For development, use test networks: they require no real funds. |
| **Wallet** | `X402_<PREFIX>_PAY_TO` | Your EVM wallet address for receiving payments (`0x...`). |
| **Price** | `X402_<PREFIX>_PRICE` | The preferred price per request. It's set in **USDC** and defaults to `0.01`. Removing this value disables the corresponding network. |
| **Facilitator** | `X402_FACILITATOR_URL` | The preferred payment facilitator. Warden Code automatically enables one of the [default facilitators](#facilitators), but you can edit this value in the `.env` file. |

:::tip
You can remove all `X402_<PREFIX>_PAY_TO` values to disable x402 payments for testing purposes.

Alternatively, you can do this:

- [Start the Agent](../build-an-agent/test-the-agent-locally) with `X402=false npm start`.
- Keep [authentication](#api-server) enabled and bypass payments in the [`/chat` mode](../build-an-agent/test-the-agent-locally#chat-using-the-cli).
:::

### Networks

The available networks include the following:

| Network | ID | Pay-to format |
| ------- | -- | ------------- |
| Base Sepolia (testnet) | `eip155:84532` | `0x` + 40 hex chars |
| Base (mainnet) | `eip155:8453` | `0x` + 40 hex chars |

:::note
All networks are listed in `.env.example`.
:::

### Facilitators

When you enable x402 payments, Warden code automatically selects one of the following **payment facilitators** (based on the network):

- Testnets: [x402.org](https://x402.org/facilitator) 
- Mainnets: [PayAI](https://facilitator.payai.network)

The PayAI facilitator offers **1,000 free settlements** per month. For higher volumes, create a merchant account at [merchant.payai.network](https://merchant.payai.network) and add the following variables to your `.env` file:

- `PAYAI_API_KEY_ID`
- `PAYAI_API_KEY_SECRET`

:::note
Authentication is handled automatically by the `@payai/facilitator` package when the facilitator URL contains `payai.network`.
:::

### Dependencies

When x402 is enabled, the following packages are added to the generated Agent's dependencies:

- `express` and `@types/express`
- `@x402/express` (payment middleware)
- `@x402/core` (protocol types and facilitator client)
- `@payai/facilitator` (facilitator authentication)
- `@x402/evm` (EVM payment scheme verification)

### Payment flow

Clients that support x402 (such as `@x402/fetch`) handle the payment flow automatically:

1. The server returns a HTTP 402 response with payment requirements.
2. The client signs a USDC transaction.
3. The server verifies the payment before processing the request.

## A2A endpoints & methods

All Warden Agents are immediately compatible with the **A2A protocol**, supporting the **Agent Card** and the **JSON-RPC** endpoint with the core methods.

To learn more, see the [A2A specification](https://a2a-protocol.org/latest/specification).

### Agent Card

| Name | Method | Endpoint |
| ---- | ------ | -------- |
| Get Agent Card | GET  | `/.well-known/agent-card.json` |
| A2A JSON-RPC | POST  | `/` |

### JSON-RPC endpoint

| Name | Method | Endpoint |
| ---- | ------ | -------- |
| A2A JSON-RPC | POST  | `/` |

This endpoint uses just the base URL. To run a specific **A2A method**, specify it in the request body:

| Name | Method | JSON-RPC method |
|------|--------|-----------------|
| [Send Message](#send-message) | POST | `message/send` |
| [Send Streaming Message](#send-streaming-message) | POST | `message/stream` |
| [Get Task](#get-task) | POST | `tasks/get` |
| [Cancel Task](#cancel-task) | POST | `tasks/cancel` |
| [Subscribe to Task](#subscribe-to-task) | POST | `tasks/resubscribe` |

You can find detailed descriptions of all methods in the sections below.

### Send Message

<Tabs>
<TabItem value="postman" label="Postman" default>
**POST** `BASE_URL`  
**Headers**: `Content-Type`: `application/json`  
**Authorization**: Type: Bearer Token, Token: `AGENT_API_KEY`  
**Body**:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "method": "message/send",
  "params": {
    "message": {
      "role": "user",
      "parts": [
        {
          "kind": "text",
          "text": "PROMPT_TEXT"
        }
      ],
      "messageId": ""
    },
    "thread": {
      "threadId": ""
    }
  }
}
``` 
</TabItem>
<TabItem value="curl" label="cURL" default>

```bash
curl BASE_URL \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer AGENT_API_KEY' \
  --data '{
    "jsonrpc": "2.0",
    "id": "",
    "method": "message/send",
    "params": {
      "message": {
        "role": "user",
        "parts": [
          {
            "kind": "text",
            "text": "PROMPT_TEXT"
          }
        ],
        "messageId": ""
      },
      "thread": {
        "threadId": ""
      }
    }
  }'
```
</TabItem>    
</Tabs>

:::tip
This method returns a `result` object containing the LLM response, conversation history, and execution status. Task methods require the **task ID**, which is returned as `result.id`.
:::

### Send Streaming Message

<Tabs>
<TabItem value="postman" label="Postman" default>
**POST** `BASE_URL`  
**Headers**: `Content-Type`: `application/json`  
**Authorization**: Type: Bearer Token, Token: `AGENT_API_KEY`  
**Body**:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "method": "message/stream",
  "params": {
    "message": {
      "role": "user",
      "parts": [
        {
          "kind": "text",
          "text": "PROMPT_TEXT"
        }
      ],
      "messageId": ""
    },
    "thread": {
      "threadId": ""
    }
  }
}
``` 
</TabItem>
<TabItem value="curl" label="cURL" default>

```bash
curl BASE_URL \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer AGENT_API_KEY' \
  --data '{
    "jsonrpc": "2.0",
    "id": "",
    "method": "message/stream",
    "params": {
      "message": {
        "role": "user",
        "parts": [
          {
            "kind": "text",
            "text": "PROMPT_TEXT"
          }
        ],
        "messageId": ""
      },
      "thread": {
        "threadId": ""
      }
    }
  }'
```
</TabItem>    
</Tabs>

:::tip
This method streams task status updates. When the response is ready, the stream includes the generated LLM message. Task methods require the **task ID**, which is returned as `result.id`.
:::

### Get Task

<Tabs>
<TabItem value="postman" label="Postman" default>
**POST** `BASE_URL`  
**Headers**: `Content-Type`: `application/json`  
**Authorization**: Type: Bearer Token, Token: `AGENT_API_KEY`  
**Body**:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "method": "tasks/get",
  "params": {
    "id": ""
  }
}
``` 
</TabItem>
<TabItem value="curl" label="cURL" default>

```bash
curl BASE_URL \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer AGENT_API_KEY' \
  --data '{
    "jsonrpc": "2.0",
    "id": "",
    "method": "tasks/get",
    "params": {
      "id": "TASK_ID"
    }
  }'
```
</TabItem>    
</Tabs>

:::tip
In `params.id`, specify the **task ID**. You can obtain this value from `result.id`, returned by [Send Message](#send-message) or [Send Streaming Message](#send-streaming-message).
:::

### Cancel Task

<Tabs>
<TabItem value="postman" label="Postman" default>
**POST** `BASE_URL`  
**Headers**: `Content-Type`: `application/json`  
**Authorization**: Type: Bearer Token, Token: `AGENT_API_KEY`  
**Body**:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "method": "tasks/cancel",
  "params": {
    "id": "TASK_ID"
  }
}
``` 
</TabItem>
<TabItem value="curl" label="cURL" default>

```bash
curl BASE_URL \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer AGENT_API_KEY' \
  --data '{
    "jsonrpc": "2.0",
    "id": "",
    "method": "tasks/cancel",
    "params": {
      "id": "TASK_ID"
    }
  }'
```
</TabItem>    
</Tabs>

:::tip
In `params.id`, specify the **task ID**. You can obtain this value from `result.id`, returned by [Send Message](#send-message) or [Send Streaming Message](#send-streaming-message).
:::

### Subscribe to Task

<Tabs>
<TabItem value="postman" label="Postman" default>
**POST** `BASE_URL`  
**Headers**: `Content-Type`: `application/json`  
**Authorization**: Type: Bearer Token, Token: `AGENT_API_KEY`  
**Body**:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "method": "tasks/resubscribe",
  "params": {
    "id": "TASK_ID"
  }
}
``` 
</TabItem>
<TabItem value="curl" label="cURL" default>

```bash
curl BASE_URL \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer AGENT_API_KEY' \
  --data '{
    "jsonrpc": "2.0",
    "id": "",
    "method": "tasks/resubscribe",
    "params": {
      "taskId": "TASK_ID"
    }
  }'
```
</TabItem>    
</Tabs>

:::tip
In `params.id`, specify the **task ID**. You can obtain this value from `result.id`, returned by [Send Message](#send-message) or [Send Streaming Message](#send-streaming-message).
:::

## LangGraph endpoints

All Warden Agents are immediately compatible with the **LangGraph Agent Server API**.

Warden Code exposes a subset of this API. Below, you can find a full list of supported endpoints with links to the [LangGraph API reference](https://docs.langchain.com/langsmith/server-api-ref).

### Assistants

| Name | Method | Endpoint |
| ---- | ------ | -------- |
| [Search Assistants](https://docs.langchain.com/langsmith/agent-server-api/assistants/search-assistants) | POST | `/assistants/search` |
| [Get Assistant](https://docs.langchain.com/langsmith/agent-server-api/assistants/get-assistant) | GET | `/assistants/{assistant_id}` |

### Threads

| Name | Method | Endpoint |
| ---- | ------ | -------- |
| [Create Thread](https://docs.langchain.com/langsmith/agent-server-api/threads/create-thread) | POST | `/threads` |
| [Search Threads](https://docs.langchain.com/langsmith/agent-server-api/threads/search-threads) | POST | `/threads/search` |
| [Get Thread](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread) | GET | `/threads/{thread_id}` |
| [Get Thread State](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread-state) | GET | `/threads/{thread_id}/state` |
| [Get Thread History](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread-history) | GET | `/threads/{thread_id}/history` |
| [Delete Thread](https://docs.langchain.com/langsmith/agent-server-api/threads/delete-thread) | DELETE | `/threads/{thread_id}` |

### Thread runs

| Name | Method | Endpoint |
| ---- | ------ | -------- |
| [Create Background Run](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/create-background-run) | POST | `/threads/{thread_id}/runs` |
| [Create Run, Stream Output](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/create-run-stream-output) | POST | `/threads/{thread_id}/runs/stream` |
| [Create Run, Wait for Output](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/create-run-wait-output) | POST | `/threads/{thread_id}/runs/wait` |

### Stateless runs

| Name | Method | Endpoint |
| ---- | ------ | -------- |
| [Create Run, Stream Output](https://docs.langchain.com/langsmith/agent-server-api/stateless-runs/create-run-stream-output) | POST | `/runs/stream` |
| [Create Run, Wait for Output](https://docs.langchain.com/langsmith/agent-server-api/stateless-runs/create-run-wait-for-output) | POST | `/runs/wait` |

### System

| Name | Method | Endpoint |
| ---- | ------ | -------- |
| [Server Information](https://docs.langchain.com/langsmith/agent-server-api/system/server-information) | GET | `/info` |
| [Health Check](https://docs.langchain.com/langsmith/agent-server-api/system/health-check) | GET | `/ok` |

## Functions

*Coming soon.*
