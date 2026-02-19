---
sidebar_position: 1
---

# Introduction

:::tip
If you get stuck or have any questions, join the developer channel in our Discord: [`#developers`](https://discord.com/channels/1199357852666560654/1222892775876333629).
:::

## Community Agents

**Warden Agents** are AI-driven programs registered on Warden Chain. They turn simple chat commands into complex Web3 and Web2 actions: bridging, minting, trading, staking, research. Users can access these Agents in our Agentic Wallet, [Warden](https://help.wardenprotocol.org).

If you're a developer, you can register your Agent on Warden as a **Community Agent**. The key advantages of publishing on Warden include the following:

- **Discoverability**: Once registered, your Agent is instantly accessible to our users.
- **Monetization**: Community Agents support built-in monetization models.
- **Reach**: Access a growing audience of millions.

:::note
To view the list of currently available Warden Agents, log in to [Warden](https://app.wardenprotocol.org/auth) and open the Agent Hub, or explore [Warden documentation](https://help.wardenprotocol.org/warden-app/explore-ai-agents).
:::

## Warden CLI

XXX

## Warden Agent Kit

XXX

## Warden Studio

XXX

## ~ Technical requirements

You can implement any Web3 or Web2 workflow and any custom functionality: your Agent can connect to APIs, use databases, tools, and so on.

Please keep in mind the following requirements and technical limitations:

- Currently, you must use [LangGraph](https://www.langchain.com/langgraph). Support for more frameworks is coming soon.
- You can host your Agent on LangGraph Cloud or on your own infrastructure.
- Make sure that your Agent is accessible through an API. **No UI is required**.
- Make sure that you only have one Agent per LangGraph instance to keep your Agents separated.
- For security reasons, Agents will not have access to users' wallets, nor will they be able to store any data on Warden infrastructure. These limitations will be removed in the next phase of the Warden Agent Hub.

## Get started

XXX
