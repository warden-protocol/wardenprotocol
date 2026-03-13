---
sidebar_position: 3
---

# Configure the Agent

## Overview

After [creating a Warden Agent](create-a-new-agent), you can update the initial configuration at any moment, including the A2A Agent Card metadata and x402 payments.

This guide explains how to do it.

## Update Agent settings

To update your Agent's settings, take these steps:

1. Navigate to your project's root directory and initiate Warden Code:

   ```bash
   warden
   ```

2. Enter the configuration mode:
   
   ```bash
   /config
   ```

3. Select one of the available groups of settings and make the necessary updates:

   - **Identity**: Name, description, URL, version (shown in the Agent Card)
   - **Server**: Port, host, Agent URL, API key, model
   - **Skills**: Agent capabilities advertised in the Agent Card
   - **Payments**: x402 wallets, pricing, networks

:::tip
To learn more about x402 settings, see [x402 parameters](../developer-tools/warden-code#parameters).
:::

## Update the A2A Agent Card

[A2A Agent Card](https://agent2agent.info/docs/concepts/agentcard/) is a JSON file describing your Agent's capabilities. It enables clients or other Agents to discover and understand what functionalities the Agent offers.

Warden Code generates all Agents with Agent Cards, based on the information provided on Agent creation. If you need to change the Agent Card data later, use one of these methods:

- **Manual update**  
  You can find the Agent Card in `src/public/.well-known/agent-card.json`.

- **`/config`**  
  Run `warden` and type the `/config` command. If you edit **Identity** and **Skills**, these updates will be reflected in the card.

- **`/build`**
  Run `warden` and type the `/build` command to enter the AI-powered build mode. Here you can ask the AI assistant to update the agent card for you.

  :::tip
  To use the AI assistant, you may need to run `/mode` and configure one of the supported LLM providers: **OpenAI** or **Anthropic**. If you created an OpenAI Agent and specified a correct API key, no action is required.
  :::

## Next steps

Now you can do the following:

- [Implement custom logic](implement-custom-logic)
- [Test the Agent locally](test-the-agent-locally)
