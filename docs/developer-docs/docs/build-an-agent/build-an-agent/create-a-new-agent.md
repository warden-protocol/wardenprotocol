---
sidebar_position: 2
---
# Create a new Agent

## Overview

This guide explains how to create your first Agent with [Warden Code](../developer-tools/warden-code#x402-payments)—a CLI for developing Agents compatible with Warden.

You'll install and run Warden Code, provide the required details, and the Agent will be immediately available for testing.

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

Create a directory for your new project, navigate there, and run Warden Code:

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
   Now the CLI will prompt you to provide the required details.

2. Provide the Agent name and description.

3. Select a template:
   - **Blank**: A minimal A2A server with no AI model. It just echoes the input back, which is good for testing. Later, you can specify the preferred LLM in the Agent code.
   - **OpenAI**: An AI-powered agent using OpenAI to reason and respond to tasks. You'll be prompted to provide your **OpenAI API key** from [Prerequisites](#prerequisites).

4. Select the communication style:

   - **Streaming**: Tokens stream in real-time as the model generates, leading to a faster perceived response.
   - **Mulit-turn converstions**: Responses arrive all at once after completion, which is simpler to work with.

5. Optionally, provide skills describing what your Agent can do. This does not affect the real capabilities of the Agent—you'll need to [implement custom logic](implement-custom-logic) later.

   :::tip
   You Agent's skills are advertised in the [A2A Agent Card](https://a2a-protocol.org/latest/tutorials/python/3-agent-skills-and-card/). This allows them to be discovered by other Agents and clients. After Warden Code generates your project, you can update the card at any time by editing `public/.well-known/agent-card.json`.
   :::

6. Optionally, enable x402 payments. You'll need to select a network and provide your wallet address for receiving payments. To learn more, see [x402 payments](../developer-tools/warden-code#x402-payments).

7. Confirm Agent creation.

## Result

Depending on your choices, Warden Code generates a new project based one of the supported [Agent models](../developer-tools/warden-code#agent-models).

This project includes the following key files:

- `src/agent.ts`: Your Agent's logic
- `public/.well-known/agent-card.json`: The metadata other Agents use to discover yours
- `.env`: Your OpenAI API key (if provided) and other environment variables

To learn more, see [Project structure](../developer-tools/warden-code#project-structure).

:::warning
Never expose your API keys on GitHub. Before publishing your project, you must keep the API key in a safe space and delete it from the `.env` file.
:::

## Next steps

Now you can do the following:

- [Implement custom logic](implement-custom-logic)
- [Interact with your Agent locally](interact-with-the-agent)

:::tip
If you get stuck or have any questions, join the developer channel in our Discord: [`#developers`](https://discord.com/channels/1199357852666560654/1222892775876333629).
:::
