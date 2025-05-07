---
sidebar_position: 2
---

# Quick start

## Overview

This guide will help you quickly set up and start building **AI Agents** capable of interacting with both onchain and offchain systems. Whether you're new to AI Agents or an experienced developer, the **Warden Agent Kit** provides the tools and resources to get you up and running in no time.

Before following this guide, you can quickly familiarize yourself with the Warden Agent Kit's capabilities by exploring the [CLI Agent example](cli-agent-example) and the [Agent Kit examples repository](https://github.com/warden-protocol/agent-kit-examples).

## Prerequisites

Before you start, meet the following prerequisites:

- [Install Node.js](https://nodejs.org/en/download) 18+ or later.
- [Create an OpenAI API key](https://platform.openai.com/docs/quickstart#create-and-export-an-api-key) and make sure your account is funded.
- Make sure you have a wallet and access to its private key.

## 1. Install LangChain

First, install the Warden Agent Kit Extension—Langchain:

```bash
npm install @wardenprotocol/warden-langchain @langchain/openai @langchain/langgraph
```

Or, if you're using Yarn, run this command:

```bash
yarn add @wardenprotocol/warden-langchain @langchain/openai @langchain/langgraph
```

## 2. Set environment variables

Set the following environment variables:

```bash
export PRIVATE_KEY=your-wallet-private-key
export OPENAI_API_KEY=your-openai-api-key
export FAUCET_TOKEN=faucet-token  # Optional: Only required if you're using the faucet tool
```

:::tip
To get a Warden Faucet API token, reach out to us in [Discord](https://discord.com/invite/wardenprotocol).
:::


## 3. Import the packages

Use the following code to import the required packages:

```javascript
import { WardenAgentKit } from "@wardenprotocol/warden-agent-kit-core";
import { WardenToolkit } from "@wardenprotocol/warden-langchain";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
```

## 4. Initialize the Agent Kit

Then configure and initialize the Warden Agent Kit:

```javascript
// Configure Warden Agent Kit
const config = {
    privateKeyOrAccount:
        (process.env.PRIVATE_KEY as `0x${string}`) || undefined,
};

// Initialize Warden Agent Kit
const agentkit = new WardenAgentKit(config);

// Initialize Warden Agent Kit Toolkit and get tools
const wardenToolkit = new WardenToolkit(agentkit);
const tools = wardenToolkit.getTools();
```

## 5. Use Langchain tools

To use [Langchain tools](add-agent-capabilities#incorporate-langchain-tools), add the following:

```javascript
// Initialize LLM
const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
});

// Store buffered conversation history in memory
const memory = new MemorySaver();
const agentConfig = {
    configurable: { thread_id: "Warden Agent Kit CLI Agent Example!" },
};

// Create React Agent using the LLM and Warden Agent Kit tools
const agent = createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
    messageModifier:
        "You're a helpful assistant that can help with a variety of tasks related to web3 tranactions." +
        "You should only use the provided tools to carry out tasks, interperate the users input" +
        "and select the correct tool to use for the required tasks or tasks.",
});

return { agent, config: agentConfig };
```

## Next steps

You can take the following next steps:

- Explore the available [Agent Actions](agent-actions).
- [Add Agent capabilities](add-agent-capabilities): incorporate existing LangChain tools or add a custom tool.
