---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Interact with the Agent

## Overview

XXX

## 1. Run the Agent

1. In a new terminal window, navigate to your Agent directory and compile TypeScript:

   ```bash
   npm run build
   ```

2. Now you can run the Agent:

   ```bash
   npm start
   ```
   Congratulations! Your Agent is available on `http://localhost:3000`. While it's running, you can interact with it as shown below.

## 3. Check the Agent Card

To access your A2A Agent Card, use this URL:
   
```text
http://localhost:3000/.well-known/agent-card.json
```
The card will display your Agent's name and capabilities, along with other information:

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

## 4. Chat with the Agent

### Chat through CLI

- /build -> /chat
- /chat + URL

### Chat through API

Warden CLI is built on top of the Warden Agent Kit, which provides  **A2A** and **LangGraph** server endpoints for generated Agents. After running your Agent, you can try any of them locally.

:::tip
For a full list of supported endpoints, see [Warden Agent Kit](../developer-tools/warden-agent-kit).
:::

For example, you can chat with your Agent through the A2A endpoint:

<Tabs>
<TabItem value="postman" label="Postman" default>
**POST** `http://localhost:3000`  
**Headers**: `Content-Type`: `application/json`  
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
          "text": "What can you do?"
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
curl http://localhost:3000 \
  --request POST \
  --header 'Content-Type: application/json' \
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
            "text": "What can you do?"
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

If everything is fine, you'll receive a response including your prompt, assistant's reply, and other data:

```json
{
    "jsonrpc": "2.0",
    "result": {
        "id": "task-2",
        "context_id": "da79d131-143c-4154-b617-c25945774648",
        "status": {
            "state": "completed",
            "timestamp": "2026-02-09T08:03:07.107Z"
        },
        "kind": "task",
        "history": [
            {
                "role": "user",
                "parts": [
                    {
                        "kind": "text",
                        "text": "What can you do?"
                    }
                ],
                "messageId": "",
                "kind": "message",
                "message_id": "5646cc50-ae72-40a9-87e6-99477e050a4f"
            },
            {
                "role": "agent",
                "parts": [
                    {
                        "kind": "text",
                        "text": "I can assist with a variety of tasks, including but not limited to:\n\n1. Answering questions and providing information on a wide range of topics.\n2. Assisting with problem-solving and brainstorming ideas.\n3. Offering writing support, including proofreading, editing, and generating text.\n4. Providing summaries and explanations of complex concepts.\n5. Helping with language translation and learning.\n6. Offering recommendations for resources, books, or tools.\n7. Engaging in casual conversation and providing companionship.\n\nIf you have a specific request or need assistance with something else, feel free to ask!"
                    }
                ],
                "kind": "message",
                "message_id": "d187905d-2ded-41e5-87ae-db02ee011d88"
            }
        ]
    },
    "id": ""
}
```

### Test x402 payments

XXX

## Next steps

After local testing, you can [host your Agent](../host-your-agent) to make it publicly available.
