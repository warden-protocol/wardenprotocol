---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a new Agent

## Overview

**Warden Code** is a CLI tool that allows you to easily build an **A2A LangGraph Agent** compatible with Warden.

This guide explains how to create your first Agent: you'll run the CLI, provide the required details, and the Agent will be immediately available for local testing.

## Prerequisites

Before you start, complete the following prerequisites:

- [Install Node.js](https://nodejs.org/en/download) 18 or higher.
- [Get an OpenAI API key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key) or an API key for any preferred LLM.

## 1. Install Warden Code

Install Warden Code globally:

```bash
npm install -g warden-code
``` 
 
Alternatively, you can run it directly:
   
```bash
npx warden-code
```

This launches an interactive CLI where you can create new agents.

:::tip
If you need to update previously installed Warden Code, run this:

```bash
npm update -g warden-code
```
:::

## 2. Run Warden Code

Now you can run Warden Code:

```bash
warden
```

You'll see the list of available commands:

```bash 
Available Commands:

/build - Enter AI-powered chat mode to build your agent
/chat - Chat with a running agent via A2A or LangGraph
/new - Create a new agent interactively
/help - Show available commands
/clear - Clear the terminal screen
/exit - Exit the CLI
```

## 3. Create an Agent

To create an Agent, take the following steps:

1. Initiate Agent creation:

   ```bash
   /new
   ```
2. The CLI will prompt you to provide the following details:

   - **Name** and **Description**
   - **Template**
     - **Blank**: A minimal A2A server with no AI model — echoes input back (good for testing). Later you'll need to take additional steps such as specifying your preferred LLM in the code.
     - **OpenAI**: An AI-powered agent using OpenAI/GPT — can reason and respond to tasks. You'll be prompted to provide your **OpenAI API key** from [Prerequisites](#prerequisites).
    - **Communication style**
      - **Streaming**: Tokens stream in real-time as the model generates — faster perceived response.
      - **Mulit-turn converstions**: Response arrives all at once after completion — simpler to work with.
    - **Skills** (optional): Skills describe what your agent can do (e.g. "summarize text", "translate"). They are advertised in the agent card so other agents and clients can discover capabilities.
    - **x402 payments** (optional)

3. Confirm Agent creation.

## Result

Depending on your choices, the CLI tool used one of the four [Agent models](../developer-tools/warden-code#agent-models).

What was created:
- src/agent.ts    — your agent's logic (this is the main file you'll edit)
- src/server.ts   — HTTP server that exposes your agent via A2A and LangGraph
- agent-card.json — metadata other agents use to discover yours
- .env            — environment variables (port, URL, API keys)

:::tip
Your OpenAI API key was added to the `.env` file. You can always change it there, as well as the model.
:::

## Next steps

XXX

:::tip
If you get stuck or have any questions, join the developer channel in our Discord: [`#developers`](https://discord.com/channels/1199357852666560654/1222892775876333629).
:::
