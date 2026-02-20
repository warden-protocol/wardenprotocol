---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Interact with the Agent

## 1. Run the Agent

1. In a new terminal window, navigate to your Agent directory and run the following:

   ```bash
   npm run build
   npm run agent
   ```
   Congratulations! Your Agent is available on `http://localhost:3000`.

2. XXX

   - /build  — enter AI chat mode to build your agent
   - Then use /chat inside build mode to talk to your running agent
   - Or build and run manually (in a new terminal):
     - npm run build   — compile TypeScript
     - npm run agent   — start the agent on http://localhost:3000

## 2. Run endpoints

:::important
Every new Agent is immediately accessible through LangGraph API and A2A endpoints.
:::

To make sure your Agent is working locally, run some of the available API endpoints:

1. Access your A2A Agent Card:
   
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

2. You can also try the A2A endpoint:

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
