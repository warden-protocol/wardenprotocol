---
sidebar_position: 1
id: home-doc
slug: /
---

# Introduction to Warden

## The Warden Protocol

The Warden Protocol is a modular L1 blockchain enabling developers to deploy [Omnichain Applications](#omnichain-applications) (OApps) with [CosmWasm.](https://cosmwasm.com) You can also participate by operating a [Keychain](/learn/glossary#keychain) or running a [node](/learn/glossary#warden-protocol-node) and becoming a [validator](/learn/glossary#validator).

The main advantage of Warden is [modular architecture](#modular-architecture). The protocol distinguishes between the application- and protocol-level security, taking the best from monolithic and isolated security systems and reducing the risks of both.

We're currently implementing a breaking update to the protocol – [Agentic AI](#agentic-ai). OApp developers will be able to build and integrate Agents – autonomous trainable programs independently managing complex processes.

## Agentic AI

With Agentic AI, developers will have the ability to build trainable agents that can carry out various complex actions. These Agents will initiate actions or enforce immutable conditions on transactions. Agent economies can be combined with OApps to build a Agentic Applications, for example:

- Smart order-routing of the best price venue, alongside other user-defined criteria (e.g. risk rating, gas costs, etc)
- A new type of trading marketplace, where instructions placed by users are not passive (e.g. a limit order), but are active, based on complex criteria they set
- Auto-Yield rebalancing via a product which rebalances a basket of yield products based
- Smart gas abstraction, automated gas refills and routing when chain fees are low


## Modular architecture

![The Warden Protocol security stack](https://i.ibb.co/ZYKzx64/Untitled.png)
  
 *Figure 1: The Warden Protocol's modular approach unbundles the application layer for greater security*

Web3 will not onboard billions of users unless we rethink and unbundle the security stack.

Shared protocol security entails applications on a given infrastructure adhering to the infrastructure’s security requirements, like L2 solutions. These monolithic systems impose equal security on their applications. A vulnerability on a monolithic protocol suddenly doesn’t affect a single application, but depending on the type of bug, it can impact several, leaving developers and users with no means of recourse or correctional mechanism.

In contrast, isolated security allows each application to define its own security. This is sometimes seen on apps built on messaging protocols, like LayerZero. Each application developer defines its own relayer, oracle and validation libraries alongside a set of other security configurations. Each user has to separately validate the risk inclined with every application they want to use. It also assumes developers are trusted, reliable and honest third-parties.

The Warden Protocol distinguishes between application, and protocol-level security. Each OApp inherits protocol security from the Warden Protocol. The protocol acts as a security aggregator and stabilizing force for the OApp ecosystem. Security guarantees include its replicated, permissionless proof-of-stake consensus mechanism, the fault-tolerant and liveness properties of consensus, the validator set and node authentication, its secure channel communication, fork detection and handling, as well as its finality and censorship resistance. OApp developers retain network effects, and they don’t have to bootstrap new validators for nascent applications. They don’t incur the overhead of having to operate their own infrastructure, they have a lower security budget and are less susceptible to sybil-, long-range, eclipse or 51% attacks which will all contribute to lowering the barriers to new deployment. Each OApp is collectively secured by all the WARD staked on the Warden Protocol.

Additionally, OApps inherit application-level security from keychains, and their Intent Engines. This is critical, because the application layer is closest to users, and represents the largest attack vector. With keychains and the Intent Engine, OApp users can configure distributed key creation, signatures, threshold signature schemes, role-based access controls and administrate signing authorization. This creates resilience against private key exploits, theft, spoofing and sweeping.

Thanks to this modularity, OApps can support the same application deployed with different security models, achieving homogeneous protocol security with heterogeneous, isolated application security. Users can choose their trust assumption, while application developers retain the network effects of being able to use the same shared protocol security without incurring security fragmentation when scaling the number of applications. In addition, they stay responsive when new security technologies emerge.

## Omnichain Applications

OApps are a powerful evolution to traditional smart contracts. They consist of three parts: application & contracting logic, a stack of keychains, and a user-supplied, parametrizable intent configurator. Owing to this OApps can achieve remarkable features: they are modularly secure, omnichain interoperable and chain-abstracted.

OApps are modularly secure. OApps can support the same applications deployed with different security models, thereby decoupling protocol-layer from application-layer security. The result is homogeneous protocol security, with a heterogeneous application security that minimizes security fragmentation, and captures a user’s true intents when interacting with an application. Users can choose their trust assumptions, while application developers retain the network effects of being able to use a shared protocol security. Any TVL intensive DeFi application, that necessitates substantial deposits, such as Liquid Staking Protocols, AMMs, Money Markets or DEXes, could experience significant advantages from deploying as an OApp.

OApps are omnichain interoperable. Collectively, many OApps form an application mesh topology. This mesh is resiliently designed for cross-interoperability, overcoming isolated and fragmented ecosystems. Their connections are persistent and universal - whether it's letting users seamlessly swap across supported chains, interact with applications from other chains or exchange native assets for wrapped ones.

OApps are chain-abstracted. Whereas traditional smart contract applications only target users of a single chain, OApps can sign transactions and messages targeted for any other foreign chain. They can read and write to other chains which enables a host of completely new use cases enabled by OApps.

OApps are remarkably lightweight and straightforward to build. Developers can write in the language they love, use the tooling, frontend libraries, node & RPC providers, and wallet providers that they are most accustomed to.

## Key features

### Chain Abstraction

One of the key Warden's characteristics is **Chain Abstraction**.

Instead of managing multiple wallets or accounts for different blockchains, you can aggregate them in one [Space](#space) within the Warden Protocol. Omnichain Applications allow signing transactions and messages at any destination chain.

### Modular Security

The Warden Protocol offers **Modular security**.

Thanks to Warden's [modular architecture](#modular-architecture), the same Omnichain Application can combine different security models:

- **Application-level security:** OApp users can set and manage their own application security settings with the help of [Intents](#intent) and [Keychains](#keychain).
- **Protocol-level security:** Each OApp is collectively secured by all the tokens [staked](#staking) on the protocol.

### Omnichain Interoperability

Another key feature of the Warden Protocol is **Omnichain Interoperability**. It refers to the possibility of communication between different blockchain networks.

While most interoperability providers focus on particular ecosystems, Warden's goal is connecting different ecosystems. Omnichain Applications not only provide cross-chain swapping and [bridging](#bridging) but also are able to exchange information with each other. This allows overcoming the fragmentation of the blockchain landscape.

## Documentation overview

Welcome to the Warden Protocol documentation!

Use the top menu to navigate across the main sections of the docs and learn how to join Warden:

- **Learn:** The basic information about the protocol
- [Build an OApp](/build-an-oapp/introduction): Guides for OApp developers
- [Build a Keychain](/build-a-keychain/introduction): Guides for Keychain operators
- [Operate a Node](/operate-a-node/introduction): Guides for node operators
- **Tools:** API and function references
- [Help Center](http://localhost:3000/help-center/introduction): User guides for [SpaceWard](/learn/glossary#spaceward) – our front-end OApp

## Contribute

- Links to GitHub (coming soon)