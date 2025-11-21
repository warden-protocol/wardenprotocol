---
sidebar_position: 1
---

# Introduction

## Warden Agents

An **AI Agent** is an AI-driven program capable of executing both offchain and onchain operations. Agents turn simple chat commands into complex actions—such as bridging, minting, trading, staking, or performing in-depth research.

Warden Protocol manages the entire life cycle of Agents. Once registered onchain, they become instantly accessible to users through a single interface in our application, [Warden](https://help.wardenprotocol.org).

Users discover **Warden Agents** in the **Agent Hub**—Warden's built-in marketplace designed to solve one of the hardest problems in technology: distribution.

:::tip
To view the list of currently available Agents, log in to [Warden](https://app.wardenprotocol.org/auth) and open the Agent Hub, or explore [Warden documentation](https://help.wardenprotocol.org/warden-app/explore-ai-agents).
:::

## Community Agents

If you're a developer, you can register your Agent on Warden as a **Community Agent**.

The key advantages of publishing on Warden include the following:

- **Discoverability**: Users can easily find and install your Agent.
- **Monetization**: Community Agents support built-in monetization models.
- **Reach**: Access a growing audience of millions.

## Builder Incentives

We encourage developers to participate in the **Agent Builder Incentive Programme**:

- [Register for the programme](https://docs.google.com/forms/d/e/1FAIpQLSdwTR0BL8-T3LLbJt6aIyjuEYjMAmJPMdwffwHcyW6gskDQsg/viewform).
- To learn more, see [Agent Builder Incentive Programme](https://wardenprotocol.org/blog/agent-builder-incentive-programme) and [FAQ](https://wardenprotocol.notion.site/agent-builder-incentive-faq).

You can build almost any Agents: research, trading, DeFi, productivity, and more. The only requirement is that you must use [LangGraph](https://www.langchain.com/langgraph).

## Start building

To begin building Community Agents, follow these steps:

1. Clone/fork the GitHub repository containing examples and documentation: [`community-agents`](https://github.com/warden-protocol/community-agents).
2. Join the developer channel in our Discord for support: [`#developers`](https://discord.com/channels/1199357852666560654/1222892775876333629).
3. Extend and adapt any example to build your own [LangGraph](https://www.langchain.com/langgraph) Agent.
4. Deploy your Agent on [LangGraph Cloud](https://docs.langchain.com/langsmith/deployment-quickstart) or on your own infrastructure.
5. Submit a pull request to the repository, listing your Agent in [`README.md`](http://README.md). 

:::tip
We'll soon launch our developer toolkit, [Warden Studio](/learn/glossary#warden-studio). Once it's available, you'll be able to register your Agent directly through the Studio.
:::

You can build almost any Agents (research, trading, DeFi, productivity) and implement any custom functionality. Your Agent can connect to APIs, use databases, tools, and so on. To earn extra [rewards](#builder-incentives), ship clean code and great docs. Innovative or under-served categories will get additional recognition and funding.


## Technical limitations

Please keep in mind the following technical limitations:
- At the moment, you can use only [LangGraph](https://www.langchain.com/langgraph). However, support for more Agent frameworks is coming soon.
- Make sure that you only have one Agent per LangGraph instance to keep your Agents separated.
- For security reasons, Agents will not have access to users' wallets in the beginning, nor will they be able to store any data on Warden infrastructure.

## Coming soon

Stay tuned for upcoming features and releases:

- [Warden Studio](/learn/glossary#warden-studio)
- [Proof of Inference](/learn/glossary#proof-of-inference)
- Support for more frameworks
- More tutorials and examples
