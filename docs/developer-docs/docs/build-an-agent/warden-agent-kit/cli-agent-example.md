---
sidebar_position: 5
---

# Run the CLI Agent example

## Overview

This guide explains how to run our **Typescript example** built with the Warden Agent Kit.

Our example implements a **CLI Agent** that is able to do the following:

-   Process user prompts in natural language using the [`langchain`](https://github.com/warden-protocol/agent-kit/blob/main/langchain/warden/README.md) extension.
-   Interact with the Warden Protocol using the [`agent-kit-core`](https://github.com/warden-protocol/agent-kit/tree/main/agent-kit-core) component.

You can prompt the Agent to create and retrieve Spaces and keys, fund your wallet, get its balance, and so on.

The example code is available on GitHub – see [`cli-agent`](https://github.com/warden-protocol/agent-kit/blob/main/examples/typescript/cli-agent/README.md).

## Prerequisites

Before you start, meet the following prerequisites:

-   [Install Node.js](https://nodejs.org/en/download) 18+ or later.
-   [create an API key](https://platform.openai.com/docs/quickstart#create-and-export-an-api-key) and make sure your account is funded.
-   A wallet private key.

## 1. Installation

Clone the [`agent-kit`](https://github.com/warden-protocol/agent-kit) repository:

```
git clone https://github.com/warden-protocol/agent-kit.git
```

Navigate to the directory with the CLI Agent example and install:

```
cd agent-kit/examples/typescript/cli-agent
npm install
```

## 2. Set env variables

```
export OPENAI_API_KEY=your-openai-api-key
export PRIVATE_KEY=your-wallet-private-key
```

To use the `request_funds` tool you'll need to get a Warden faucet API token: just reach out to us in [Discord](https://discord.com/invite/wardenprotocol). This is optional and you can alternatively request tokens from our [online faucet](https://faucet.devnet.wardenprotocol.org/).

```
export FAUCET_TOKEN=your-faucet-token
```

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

Type your prompt in the command line, as shown below.

```
Prompt: get some ward
```

The Agent will automatically send you some WARD from the faucet. You'll see an output like this:

```
-------------------
Faucet request completed: 5F0332879A6426FF6396C5BCA411FFD14426CF4E7757B757A3BAF5BEF1ACD0EC
-------------------
Your request for funds has been successfully completed. You have received the tokens. If you need anything else, feel free to ask!
-------------------
```

### 4.2. Create a Space

To access most of the Warden features, you need to create a [Space](/learn/glossary#space) first.

Type your prompt in the command line, as shown below.

```
Prompt: create a space
```

The Agent will create a Space:

```
-------------------
Successfully created space
-------------------
A new space has been successfully created! If you need any further assistance, just let me know.
-------------------
```

:::tip A comprehensive list of all the available tools can be found [here](/build-an-agent/warden-agent-kit/agent-actions) or just ask your agent `what capabilities do you have?`. You can also [add more capabilities](/build-an-agent/warden-agent-kit/add-agent-capabilities) to your agent using exisiting Langchain tools or by adding your own custom tool. :::

## Next steps

After running the CLI Agent example and creating a Space, you can do the following:

-   Ask the Agent to return your Space ID, create a [key](/learn/glossary#key), and so on.  
    **Note**: To stop the Agent, just type `exit`.
-   Start creating your own Agents with the Warden Agent Kit.
