---
sidebar_position: 5
---

# Run the CLI Agent example

## Overview

To start building your own Agent, follow [Quick start](quick-start). If you'd like to explore the capabilities of Warden Agent Kit first, check out this guide: it demonstrates how to run our **Typescript example** built with the kit. You can also try to expand or modify this example.

This example implements a **CLI Agent** that is able to do the following:

- Process user prompts in natural language using the [LangChain](add-agent-capabilities#incorporate-langchain-tools) extension.
- Interact with Warden Protocol using the supported [Agent Actions](agent-actions).

:::note Code
The example code is available on GitHub: [`cli-agent`](https://github.com/warden-protocol/agent-kit/blob/main/examples/typescript/cli-agent/README.md)
:::

## Prerequisites

Before you start, meet the following prerequisites:

- [Install Node.js](https://nodejs.org/en/download) 18+ or later.
- [Create an OpenAI API key](https://platform.openai.com/docs/quickstart#create-and-export-an-api-key) and make sure your account is funded.
- Make sure you have a wallet and access to its private key.

## 1. Install packages

Clone the [`agent-kit` repository](https://github.com/warden-protocol/agent-kit):

```bash
git clone https://github.com/warden-protocol/agent-kit.git
```

Navigate to the directory with the CLI Agent example and install npm packages:

```bash
cd agent-kit/examples/typescript/cli-agent
npm install
```

## 2. Set environment variables

Set the following environment variables:

```bash
export OPENAI_API_KEY=your-openai-api-key
export PRIVATE_KEY=your-wallet-private-key
```

To use the [`request_funds` tool](agent-actions) in [Step 4.1](#41-get-ward), you'll need to get a Warden faucet API token: just reach out to us in [Discord](https://discord.com/invite/wardenprotocol). After obtaining the token, set it as an environment variable:

```bash
export FAUCET_TOKEN=your-faucet-token
```

This is optional: you can alternatively connect your wallet to [SpaceWard](https://spaceward.chiado.wardenprotocol.org) and request tokens from our [online faucet](https://faucet.chiado.wardenprotocol.org/).

## 3. Run the Agent

Finally, you can run the Agent in the command line:

```bash
npm start
```

You'll see the following output:

```bash
Starting Agent...
Starting chat mode... Type 'exit' to end.

Prompt:
```

## 4. Prompt the Agent

### 4.1. Get WARD

If you have a faucet token, you can prompt the Agent to fund your wallet with [WARD](/tokens/ward-token/ward). Otherwise, skip this step. You can connect your wallet to [SpaceWard](https://spaceward.chiado.wardenprotocol.org) and request tokens from our [online faucet](https://faucet.chiado.wardenprotocol.org/).

Type your prompt in the command line:

```bash
Prompt: get some ward
```

The Agent will automatically send you some WARD from the faucet, using the [`request_funds` tool](agent-actions). You'll see an output like this:

```
-------------------
Faucet request completed: 5F0332879A6426FF6396C5BCA411FFD14426CF4E7757B757A3BAF5BEF1ACD0EC
-------------------
Your request for funds has been successfully completed. You have received the tokens. If you need anything else, feel free to ask!
-------------------
```

### 4.2. Create a Space

To access most of the Warden features, you need to create a [Space](/learn/glossary#space) first.

Type your prompt in the command line:

```bash
Prompt: create a space
```

The Agent will create a Space, using the [`create_space` tool](agent-actions):

```bash
-------------------
Successfully created space
-------------------
A new space has been successfully created! If you need any further assistance, just let me know.
-------------------
```

### 4.3. Use other tools

After running the CLI Agent example and creating a Space, you can ask the Agent to return your Space ID, create a key, and so on.

A comprehensive list of all the available tools can be found in [Agent Actions](/build-an-agent/warden-agent-kit/agent-actions). Alternatively, you can just ask the Agent about it: `what capabilities do you have?`

To stop the Agent, just type `exit`.

:::tip
You can add more Agent capabilities and even incorporate a custom tool, as shown in [Add Agent capabilities](/build-an-agent/warden-agent-kit/add-agent-capabilities).
:::

## Next steps

After running the CLI Agent example, you can take the following steps:

- Try to modify or expand this example.
- Find more examples in the [Agent Kit examples repository](https://github.com/warden-protocol/agent-kit-examples).
- [Start building your own Agent](quick-start).
