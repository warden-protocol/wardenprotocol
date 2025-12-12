---
sidebar_position: 1
---

# Introduction

:::important
To quickly get started with publishing an Agent on Warden, explore the examples and documentation in our GitHub repository: [`community-agents`](https://github.com/warden-protocol/community-agents).
:::

## Community Agents

**Warden Agents** are AI-driven programs registered on Warden Chain. They turn simple chat commands into complex Web3 and Web2 actions: bridging, minting, trading, staking, research. Users can access these Agents in our application, [Warden](https://help.wardenprotocol.org).

If you're a developer, you can register your Agent on Warden as a **Community Agent**. The key advantages of publishing on Warden include the following:

- **Discoverability**: Once registered, your Agent is instantly accessible to our users.
- **Monetization**: Community Agents support built-in monetization models.
- **Reach**: Access a growing audience of millions.

:::note
To view the list of currently available Warden Agents, log in to [Warden](https://app.wardenprotocol.org/auth) and open the Agent Hub, or explore [Warden documentation](https://help.wardenprotocol.org/warden-app/explore-ai-agents).
:::

## Builder Incentives

We encourage Agent developers to participate in the **Agent Builder Incentive Programme**:

- [Register for the programme](https://docs.google.com/forms/d/e/1FAIpQLSdwTR0BL8-T3LLbJt6aIyjuEYjMAmJPMdwffwHcyW6gskDQsg/viewform).
- To learn more, see [Agent Builder Incentive Programme](https://wardenprotocol.org/blog/agent-builder-incentive-programme) and [FAQ](https://wardenprotocol.notion.site/agent-builder-incentive-faq).

You can build almost any Agent: research, trading, DeFi, productivity, and more. Just use [LangGraph](https://www.langchain.com/langgraph) and meet other [requirements](#requirements).

:::tip
To earn extra rewards, ship clean code and great docs. Innovative or under-served categories will get additional recognition and funding.
:::

## Start building

To begin building a Community Agent, follow these steps:

1. Clone/fork our GitHub repository with examples and documentation: [`community-agents`](https://github.com/warden-protocol/community-agents).
2. Extend and adapt any example to build your own LangGraph Agent.
3. Deploy your Agent on LangGraph Cloud or on your infrastructure.
4. Submit a pull request to the repository, listing your Agent in [`README.md`](https://github.com/warden-protocol/community-agents/blob/main/README.md). 

To learn more about these steps, explore the [official LangGraph documentation](https://docs.langchain.com/oss/javascript/langchain/overview) and check [LangGraph beginner guides](https://github.com/warden-protocol/community-agents/tree/main/docs) in our repository. In addition, each example we provide has its own README explaining how we built the Agent—you can start with the [Weather Agent](https://github.com/warden-protocol/community-agents/tree/main/agents/weather-agent).

:::tip
If you get stuck or have any questions, join the developer channel in our Discord: [`#developers`](https://discord.com/channels/1199357852666560654/1222892775876333629).
:::

## Requirements

You can implement any Web3 or Web2 workflow and any custom functionality: your Agent can connect to APIs, use databases, tools, and so on.

**To qualify for rewards**, please keep in mind the following requirements and technical limitations:

- Currently, you must use [LangGraph](https://www.langchain.com/langgraph). Support for more frameworks is coming soon.
- You can host your Agent on LangGraph Cloud or on your own infrastructure.
- Make sure that your Agent is accessible through an API. **No UI is required**.
- Make sure that you only have one Agent per LangGraph instance to keep your Agents separated.
- For security reasons, Agents will not have access to users' wallets, nor will they be able to store any data on Warden infrastructure. These limitations will be removed in the next phase of Warden Agent Hub in the beginning of 2026.

We'll soon launch [Warden Studio](/learn/glossary#warden-studio)—a platform where you can register and monetize your Agent. Once it's available, you'll be able to add your Agent directly there, providing just the following:

- Your agent's API URL and API key
- The name, description, and skills
- The avatar

![Registering an Agent in Warden Studio](../../static/img/community-agents-1.png)

## Coming soon

Stay tuned for upcoming features and releases:

- [Warden Studio](/learn/glossary#warden-studio)
- [Proof of Inference](/learn/glossary#proof-of-inference)
- Support for more frameworks
- More tutorials and examples
