---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# A2A endpoints & methods

## Overview

All Warden Agents are immediately compatible with the **A2A protocol**, supporting the **Agent Card** and the **JSON-RPC** endpoint with the core methods.

To learn more, see the [A2A specification](https://a2a-protocol.org/latest/specification).

For usage examples, see [Test the Agent locally](../build-an-agent/test-the-agent-locally#chat-using-the-api) and [Host your Agent](../host-your-agent#chat-using-the-api).

## Get Agent Card

| Name | Method | Endpoint |
| ---- | ------ | -------- |
| Get Agent Card | GET  | `/.well-known/agent-card.json` |

An [A2A Agent Card](https://a2a-protocol.org/latest/specification/#8-agent-discovery-the-agent-card) is a JSON file that describes your Agent's capabilities. It enables clients and other Agents to discover and understand what the Agent can do.

:::tip
You can change this metadata at any moment, as explained in [Update the Agent Card](../build-an-agent/configure-the-agent#update-the-a2a-agent-card).
:::

Typically, Agent Cards look like this:

```json
{
    "name": "general-test",
    "description": "A helpful AI agent named general-test",
    "url": "http://localhost:3000",
    "version": "0.1.0",
    "capabilities": {
        "streaming": true,
        "multiTurn": false
    },
    "skills": [],
    "defaultInputModes": [
        "text"
    ],
    "defaultOutputModes": [
        "text"
    ]
}
```

## JSON-RPC endpoint

The [A2A JSON-RPC](https://a2a-protocol.org/latest/specification/#9-json-rpc-protocol-binding) endpoint allows initiating various [A2A operations](https://a2a-protocol.org/latest/specification/#3-a2a-protocol-operations) such as sending messages and managing tasks. It uses just the base URL:

| Name | Method | Endpoint |
| ---- | ------ | -------- |
| A2A JSON-RPC | POST  | `/` |

To run a particular A2A method, specify it in the JSON-RPC request body:

| Name | JSON-RPC method |
| ---- | --------------- |
| [Send Message](#send-message) | `message/send` |
| [Send Streaming Message](#send-streaming-message) | `message/stream` |
| [Get Task](#get-task)| `tasks/get` |
| [Cancel Task](#cancel-task) | `tasks/cancel` |
| [Subscribe to Task](#subscribe-to-task) | `tasks/resubscribe` |

You can find detailed descriptions of each method in the sections below.

## Send Message

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

## Send Streaming Message

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

## Get Task

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

## Cancel Task

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

## Subscribe to Task

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
      "id": "TASK_ID"
    }
  }'
```
</TabItem>    
</Tabs>

:::tip
In `params.id`, specify the **task ID**. You can obtain this value from `result.id`, returned by [Send Message](#send-message) or [Send Streaming Message](#send-streaming-message).
:::
