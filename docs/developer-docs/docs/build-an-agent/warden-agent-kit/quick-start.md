---
sidebar_position: 2
---

# Quick start

## Overview

This guide will help you quickly set up and start building AI Agents capable of interacting with both onchain and offchain systems. Whether you're new to AI Agents or an experienced developer, the Warden Agent Kit provides the tools and resources to get you up and running in no time.

The fastest way to get started is by exploring our **CLI Agent Example**, which demonstrates how to build and deploy a basic Agent using the Warden Agent Kit. This example walks you through the essential steps, from setting up your environment to executing onchain interactions.

- Check out the [CLI Agent Example](/build-an-agent/warden-agent-kit/cli-agent-example) for a step-by-step guide.
- Dive into the [Agent Kit Examples Repository](https://github.com/warden-protocol/agent-kit-examples), a community-driven resource filled with practical examples, templates, and use cases to inspire and accelerate your development.

By leveraging these resources, you can quickly familiarize yourself with the Warden Agent Kit's capabilities and start building your own custom AI Agents.

## Prerequisites

- [OpenAI API Key](https://platform.openai.com/docs/quickstart#create-and-export-an-api-key)
- Node.js 18 or higher

## 1. Install Langchain

To install the Warden Agent Kit Extension - Langchain, use the following command:

```bash
npm install @wardenprotocol/warden-langchain @langchain/openai @langchain/langgraph
```

Or, if you're using Yarn:

```bash
yarn add @wardenprotocol/warden-langchain @langchain/openai @langchain/langgraph
```

## 2. Set env variables

Set the following environment variables:

```bash
export PRIVATE_KEY=<your-wallet-private-key>
export OPENAI_API_KEY=<your-openai-api-key>
export FAUCET_TOKEN=<faucet-token>  # Optional: Only required if you are using the faucet tool
```

## 3. Import the packages

```javascript
import { WardenAgentKit } from "@wardenprotocol/warden-agent-kit-core";
import { WardenToolkit } from "@wardenprotocol/warden-langchain";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
```

## 4. Initialize the Agent Kit

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

## 5. Use Langchain Tools in your Agent

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
