---
sidebar_position: 2
---

# Get started with Agent Kit

## Using an example

TODO: explainer and link to cli-agent example

## Starting from sratch

### Prerequisites

-   [OpenAI API Key](https://platform.openai.com/docs/quickstart#create-and-export-an-api-key)
-   Node.js 18 or higher

## Installation

To install the Warden Agent Kit Extension - Langchain, use the following command:

```bash
npm install @wardenprotocol/warden-langchain @langchain/openai @langchain/langgraph
```

Or, if you're using Yarn:

```bash
yarn add @wardenprotocol/warden-langchain @langchain/openai @langchain/langgraph
```

### Environment Setup

Set the following environment variables:

```bash
export PRIVATE_KEY=<your-wallet-private-key>
export OPENAI_API_KEY=<your-openai-api-key>
export FAUCET_TOKEN=<faucet-token>  # Optional: Only required if you are using the faucet tool
```

---

### 1. Import the Packages

```javascript
import { WardenAgentKit } from "@wardenprotocol/warden-agent-kit-core";
import { WardenToolkit } from "@wardenprotocol/warden-langchain";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
```

### 2. Initialize the Agent Kit

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

### 3. Use Langchain Tools in Your Agent

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
