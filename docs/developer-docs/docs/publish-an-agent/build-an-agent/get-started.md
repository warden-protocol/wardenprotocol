---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get started

## Overview

The **Warden Agent Development CLI** allows you to easily build an **A2A LangGraph Agent** compatible with Warden.

This guide explains how to create your first Agent: you'll run the CLI, provide the required details, and the Agent will be immediately available for local testing.

## Prerequisites

Before you start, complete the following prerequisites:

- [Install Node.js](https://nodejs.org/en/download) 18 or higher.
- Get an API key for your preferred LLM.
   
## 1. Install and run the CLI

1. First, clone the Warden Agent Development CLI:

   ```bash
   git clone https://github.com/warden-protocol/warden-code.git
   ```
2. Then install it:

   ```bash
   npm install -g warden-code
   ``` 
 
   Alternatively, you can use `pnpm` or `npx`:
   
   ```bash
   pnpm add -g warden-code
   ```
   ```bash
   npx warden-code
   ```
3. Navigate to the `warden-code` directory:

   ```bash
   cd warden-code
   ```

4. Run the SDK:

   ```bash
   warden
   ```

   You'll see the list of available commands:

   ```bash 
   Available Commands:
   
     /new - Create a new agent interactively
     /help - Show available commands
     /clear - Clear the terminal screen
     /exit - Exit the CLI
   
   Type /help <command> for more info on a specific command
   ```

## 2. Create an Agent

Now you can create your Agent:

1. Initiate Agent creation:

   ```bash
   /new
   ```
2. Provide the following details: (?)

   This will generate a new Agent. You can check its code in `warden-code/src/agent.ts`. (?)

3. Duplicate `.env.example` and rename it to `.env`. Add your LLM API key from [Prerequisites](#prerequisites):
   
   ```bash
   OPENAI_API_KEY=OPEN_AI_API_KEY
   ```
Congratulations! Your Agent is available on `http://localhost:3000`.

## 3. Test your Agent locally

:::important
Every new Agent is immediately accessible through LangGraph API. To learn more, see [LangGraph API reference](https://langchain-ai.github.io/langgraph/cloud/reference/api/api_ref.html). Alternatively, you can view and test all endpoints locally: `http://localhost:3000/docs`. (?)
:::

To make sure your Agent is working locally, run some of the LangGraph API endpoints:

1. Run the [Search Assistants](https://langchain-ai.github.io/langgraph/cloud/reference/api/api_ref.html#tag/assistants/post/assistants/search) endpoint to get your Agent's ID:

   <Tabs>
   <TabItem value="postman" label="Postman" default>
   **POST** `http://localhost:3000/assistants/search`  
   **Headers**: `Content-Type`: `application/json`  
   **Body**:

   ```json
   {
     "metadata": {},
     "graph_id": "agent",
     "limit": 10,
     "offset": 0,
     "sort_by": "assistant_id",
     "sort_order": "asc",
     "select": [
       "assistant_id"
     ]
   }
   ``` 
   </TabItem>
   <TabItem value="curl" label="cURL" default>

   ```bash
   curl http://localhost:3000/assistants/search \
     --request POST \
     --header 'Content-Type: application/json' \
     --data '{
       "metadata": {},
       "graph_id": "",
       "limit": 10,
       "offset": 0,
       "sort_by": "assistant_id",
       "sort_order": "asc",
       "select": [
         "assistant_id"
       ]
     }'
   ```
   </TabItem>    
   </Tabs>

   The ID will be returned in the `assistant_id` field. Typically, it's `fe096781-5601-53d2-b2f6-0d3403f7e9ca`.

2. Now you can access your A2A Agent Card:
   
   ```text
   http://localhost:3000/.well-known/agent-card.json?assistant_id=fe096781-5601-53d2-b2f6-0d3403f7e9ca
   ```
   
   The card will display your Agent's name and capabilities, alongside with other information.

3. Finally, try the [A2A Post](https://langchain-ai.github.io/langgraph/cloud/reference/api/api_ref.html#tag/a2a) endpoint:

   <Tabs>
   <TabItem value="postman" label="Postman" default>
   **POST** `http://localhost:3000/a2a/fe096781-5601-53d2-b2f6-0d3403f7e9ca`  
   **Headers**: `Accept`: `application/json`, `Content-Type`: `application/json`  
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
   curl http://localhost:3000/a2a/fe096781-5601-53d2-b2f6-0d3403f7e9ca \
     --request POST \
     --header 'Accept: application/json' \
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
      
   If everything is fine, you'll receive a response including your prompt, assistant's reply, and other data.

4. In addition, you can check logs in [LangSmith Studio](https://smith.langchain.com/studio): navigate to **Tracing Project** in the left menu and select your project. The logs will display data on all threads and runs (Agent invocations). (?)

## Next steps

Now you can implement a custom logic: just edit your Agent's code in `warden-code/src/agent.ts`.

For inspiration, see our [examples](examples).

