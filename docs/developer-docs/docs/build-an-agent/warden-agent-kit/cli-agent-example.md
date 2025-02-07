---
sidebar_position: 5
---

# Run the CLI Agent example

## Overview

The following guide explains how to run our **Typescript example** built with the Warden Agent Kit.

This example implements a **CLI Agent** that is able to do the following:

-   Process user prompts in natural language using the [`langchain`](https://github.com/warden-protocol/agent-kit/blob/main/langchain/warden/README.md) extension.
-   Interact with the Warden Protocol using the [`agent-kit-core`](https://github.com/warden-protocol/agent-kit/tree/main/agent-kit-core) component.

You can prompt the Agent to perform any supported [Action](/build-an-agent/warden-agent-kit/agent-actions): create and retrieve Spaces and keys, fund your wallet, get its balance, and so on.

:::note Code
The example code is available on GitHub—see [`cli-agent`](https://github.com/warden-protocol/agent-kit/blob/main/examples/typescript/cli-agent/README.md).
:::

## Prerequisites

Before you start, meet the following prerequisites:

- [Install Node.js](https://nodejs.org/en/download) 18+ or later.
- [Create an OpenAI API key](https://platform.openai.com/docs/quickstart#create-and-export-an-api-key) and make sure your account is funded.
- Make sure you have a wallet and access to its private key.

## 1. Install packagess

Clone the [`agent-kit`](https://github.com/warden-protocol/agent-kit) repository:

```
git clone https://github.com/warden-protocol/agent-kit.git
```

Navigate to the directory with the CLI Agent example and install npm packages:

```
cd agent-kit/examples/typescript/cli-agent
npm install
```

## 2. Set environment variables

Set the following environment variables:

```
export OPENAI_API_KEY=your-openai-api-key
export PRIVATE_KEY=your-wallet-private-key
```

To use the [`request_funds`](agent-actions) tool in [Step 4.1](#41-get-ward), you'll need to get a Warden faucet API token: just reach out to us in [Discord](https://discord.com/invite/wardenprotocol). After obtaining the token, set it as an environment variable:

```
export FAUCET_TOKEN=your-faucet-token
```

This is optional: you can alternatively request tokens from our [online faucet](https://faucet.devnet.wardenprotocol.org/).

## 3. Run the Agent

Finally, you can run the Agent in the command line:

```
npm start
```

You'll see the following output:

```
Starting Agent...
Starting chat mode... Type 'exit' to end.

Prompt:
```

## 4. Prompt the Agent

### 4.1. Get WARD

If you have a faucet token, you can prompt the Agent to fund your wallet with [WARD](/tokens/ward-token/ward). Otherwise, skip this step and request tokens from our [online faucet](https://faucet.devnet.wardenprotocol.org/).

Type your prompt in the command line:

```
Prompt: get some ward
```

The Agent will automatically send you some WARD from the faucet, using the [`request_funds`](agent-actions) tool. You'll see an output like this:

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

```
Prompt: create a space
```

The Agent will create a Space, using the [`create_space`](agent-actions) tool:

```
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

## Next steps

You can take the following next steps:

- [Add Agent capabilities](/build-an-agent/warden-agent-kit/add-agent-capabilities)
- Explore or update the [Agent Kit examples repository](https://github.com/warden-protocol/agent-kit-examples)