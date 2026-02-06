---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get started

## Overview

The **Warden Agent Development CLI** allows you to easily build an **A2A LangGraph Agent** compatible with Warden.

This guide explains how to create your first Agent: you'll run the CLI, provide the required details, and the Agent will be immediately available for local testing.

## Agent templates

When [creating an Agent](#2-create-an-agent), you'll be prompted to select one of the supported Agent templates:

- **OpenAI + Streaming**: A GPT-powered Agent with streaming responses
- **OpenAI + Multi-turn**: A GPT-powered Agent with conversation history
- **Blank + Streaming**: A minimal streaming Agent that echoes input
- **Blank + Multi-turn**: A minimal multi-turn conversation agent

This guide will focus on creating a **GPT-powered Agent** for the sake of quick onboarding.

:::tip
If you choose **Blank** when creating an Agent, you can use it with any preferred LLM.
:::

## Prerequisites

Before you start, complete the following prerequisites:

- [Install Node.js](https://nodejs.org/en/download) 18 or higher.
- [Get an OpenAI API key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key) or an API key for any preferred LLM.

## 1. Install and run the CLI

1. First, clone the Warden Agent Development CLI:

   ```bash
   git clone https://github.com/warden-protocol/warden-code.git
   ```
3. Navigate to the `warden-code` directory:

   ```bash
   cd warden-code
   ```

3. Install the tool:

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

4. Install the required packages: (?)

   ```bash
   pnpm add @inquirer/prompts
   pnpm add -D vitest
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
2. You'll be prompted to provide the following details:

   - Agent name
   - Agent description
   - Template: **Blank**/**OpenAI**
   - Capability: **Streaming**/**Multi-turn conversations**
   - Skills (optional)

   To follow this guide, select **OpenAI** in the third step.

   :::tip
   Depending on your choices, the CLI tool will use one of the four [Agent templates](#agent-templates). Note that if you select a **Blank** template, later you'll need to take additional steps such as specifying your preferred LLM in the code.
   :::

3. Confirm Agent creation. You'll find your Agent's code in `warden-code/src/agent.ts`.

4. Duplicate `.env.example` and rename it to `.env`.

5. In the `.env` file, add your OpenAI API key from [Prerequisites](#prerequisites). You can leave other settings unchanged:
   
   ```bash
   HOST=localhost
   PORT=3000
   OPENAI_API_KEY=your-api-key-here
   OPENAI_MODEL=gpt-4o-mini
   ```

6. In a new terminal window, navigate to the `warden-code` directory and run the following:

   ```bash
   pnpm install
   pnpm build
   pnpm agent
   ```
   Congratulations! Your Agent is available on `http://localhost:3000`.

## 3. Test your Agent locally

:::important
Every new Agent is immediately accessible through LangGraph API. To learn more, see [LangGraph API reference](https://langchain-ai.github.io/langgraph/cloud/reference/api/api_ref.html). Alternatively, you can view and test all endpoints locally: `http://localhost:3000/docs`. (?)
:::

To make sure your Agent is working locally, run some of the LangGraph API endpoints:

1. Access your A2A Agent Card:
   
   ```text
   http://localhost:3000/.well-known/agent-card.json?assistant_id=fe096781-5601-53d2-b2f6-0d3403f7e9ca
   ```
   The card will display your Agent's name and capabilities, alongside with other information:

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

2. Run the [Search Assistants](https://langchain-ai.github.io/langgraph/cloud/reference/api/api_ref.html#tag/assistants/post/assistants/search) endpoint to get your Agent's ID:

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

3. Finally, try...
      
   If everything is fine, you'll receive a response including your prompt, assistant's reply, and other data.

4. In addition, you can check logs in [LangSmith Studio](https://smith.langchain.com/studio): navigate to **Tracing Project** in the left menu and select your project. The logs will display data on all threads and runs (Agent invocations). (?)

## Next steps

Now you can implement a custom logic: just edit your Agent's code in `warden-code/src/agent.ts`.

For inspiration, see our [examples](examples).

