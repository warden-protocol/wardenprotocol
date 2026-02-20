---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Host your Agent

## Overview

You can **self-host your Agent** using **any hosting stack**.

The following guide covers the essential steps you need to take after [creating a Warden Agent](build-an-agent/create-a-new-agent), but the exact flow may vary depending on your hosting stack.

## 1. Edit the Agent code

First, prepare your agent for deployment:

1. Configure how your Agent determines its external base URL. In `agent.ts`, replace the following code:

   ```ts
   const PORT = Number(process.env.PORT) || 3000;
   const HOST = process.env.HOST || "localhost";
   const BASE_URL = `http://${HOST}:${PORT}`;
   ```
   
   with this:
   
   ```ts
   const PORT = Number(process.env.PORT) || 3000;
   const BASE_URL =
     process.env.EXTERNAL_URL ??
     `http://localhost:${PORT}`;
   ```

   In production, `EXTERNAL_URL` must be set to the publicly accessible URL of your deployed service. The exact environment variable depends on your hosting provider.

   :::tip
   Many platforms expose this variable automatically, for example: `RENDER_EXTERNAL_URL` ([Render](https://render.com)), `VERCEL_URL` ([Vercel](https://vercel.com)), and so on.
   :::

2. In `tsconfig.json`, exclude Warden Code from the build. Replace the following code:

   ```json
   "exclude": [
     "node_modules",
     "dist"
    ]
   ```
   
   with this:

   ```json
   "exclude": [
     "node_modules",
     "dist",
     "src/cli"
   ]
   ```

   :::note
   Warden Code is not part of the deployed server—it's used only for Agent creation and local development.
   :::

## 2. Publish the code

Now you need to publish your Agent on GitHub:

1. Keep your LLM API key in a safe space and delete the `.env` file.

   :::warning
   Never expose your API keys on GitHub.
   :::

2. Create a new repository on GitHub.

3. Push your Agent code to the repository. Include all files from the `warden-code` directory.

## 3. Deploy your Agent

To set up a hosting service, take these steps:

1. Create a new web service with your preferred hosting provider.

2. In the service configuration, set the required environment variables:

   - `OPENAI_MODEL`
   - `OPENAI_API_KEY` (or an API key for any preferred LLM)

3. Set a build command:
   
   ```bash
   pnpm build
   ```

4. Set a start command: 
   
   ```bash
   pnpm agent
   ```

5. Connect your repository with the hosting service.

6. Trigger the deployment if it doesn't start automatically.

Congratulations! Now your Agent and the supported API endpoints will be available on a public URL provided by the hosting.

## 4. Verify deployment

:::important
Every new Agent is immediately accessible through LangGraph API and A2A endpoints.
:::

To make sure your Agent is accessible, run some of the available API endpoints:

1. Access your A2A Agent Card. Replace `BASE_URL` with the public URL provided by the hosting:
   
   ```text
   BASE_URL/.well-known/agent-card.json
   ```
   The card will display your Agent's name and capabilities, along with other information:

   ```json
   {
       "name": "general-test",
       "description": "A helpful AI agent named general-test",
       "url": "BASE_URL",
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

2. You can also try the A2A endpoint. Replace `BASE_URL` with the public URL provided by the hosting:

   <Tabs>
   <TabItem value="postman" label="Postman" default>
   **POST** `BASE_URL`  
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
   curl BASE_URL \
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


