---
sidebar_position: 1
id: home-doc
slug: /
---

# Introduction to Warden

---!EDIT---

## Warden Protocol

Welcome to the Warden Protocol documentation!

The Warden Protocol is a modular L1 blockchain for [Omnichain Applications](/learn/glossary#omnichain-application) (OApps). Our mission is to empower developers to easily launch secure OApps by giving them infrastructure for [Modular Security](/learn/glossary#modular-security), [Omnichain Interoperability](/learn/glossary#omnichain-interoperability), and [Chain Abstraction](/learn/glossary#chain-abstraction).

You can also participate by operating a [Keychain](/learn/glossary#keychain), running a [node](/learn/glossary#warden-protocol-node), or becoming a [validator](/learn/glossary#validator).

Here is a brief overview of the documentation:

- Learn: The basics: the glossary of terms, protocol modules, whitepaper, etc.
- [Build an OApp](/build-an-oapp/introduction): Guides for OApp developers
- [Build a Keychain](/build-a-keychain/introduction): Guides for Keychain operators
- [Operate a Node](/operate-a-node/introduction): Guides for node operators

Tools:

- ...

## Start building with Warden

The Warden Protocol is composed by different components...

Omnichain Applications are a powerful evolution of traditional smart contracts. They allow signing transactions at any chain, while traditional smart contract applications only target users of a single chain. Each OApp consists of three parts:

- An [Omnichain Contract](/learn/glossary#omnichain-contract)
- A [Keychain](/learn/glossary#keychain) or multiple Keychains
- An [Intent Configurator](/learn/glossary#intent-configurator)

To start building an OApp, you need to build a custom Omnichain Contract using CosmWasm. After that, you can build the frontend part with WardenJS.

...

## Why should I build with Warden?

The Warden Protocol is open to third-party contributions: core protocol development or building [Omnichin Applications](/learn/glossary#omnichain-application) in the Warden ecosystem. We'll reward both types of contributions with builder incentives in [WARD](/learn/glossary#ward-token). More details will be announced soon.

## What Omnichain Contracts can do?

---

## ~ Modularity

![The Warden Protocol security stack](https://i.ibb.co/ZYKzx64/Untitled.png)
  
 *Figure 1: The Warden Protocol's modular approach unbundles the application layer for greater security*
***

Web3 will not onboard billions of users unless we rethink and unbundle the security stack.

Shared protocol security entails applications on a given infrastructure adhering to the infrastructure’s security requirements, like L2 solutions. These monolithic systems impose equal security on their applications. A vulnerability on a monolithic protocol suddenly doesn’t affect a single application, but depending on the type of bug, it can impact several, leaving developers and users with no means of recourse or correctional mechanism.

In contrast, isolated security allows each application to define its own security. This is sometimes seen on apps built on messaging protocols, like LayerZero. Each application developer defines its own relayer, oracle and validation libraries alongside a set of other security configurations. Each user has to separately validate the risk inclined with every application they want to use. It also assumes developers are trusted, reliable and honest third-parties.

The Warden Protocol distinguishes between application, and protocol-level security. Each OApp inherits protocol security from the Warden Protocol. The protocol acts as a security aggregator and stabilizing force for the OApp ecosystem. Security guarantees include its replicated, permissionless proof-of-stake consensus mechanism, the fault-tolerant and liveness properties of consensus, the validator set and node authentication, its secure channel communication, fork detection and handling, as well as its finality and censorship resistance. OApp developers retain network effects, and they don’t have to bootstrap new validators for nascent applications. They don’t incur the overhead of having to operate their own infrastructure, they have a lower security budget and are less susceptible to sybil-, long-range, eclipse or 51% attacks which will all contribute to lowering the barriers to new deployment. Each OApp is collectively secured by all the WARD staked on the Warden Protocol.

Additionally, OApps inherit application-level security from keychains, and their Intent Engines. This is critical, because the application layer is closest to users, and represents the largest attack vector. With keychains and the Intent Engine, OApp users can configure distributed key creation, signatures, threshold signature schemes, role-based access controls and administrate signing authorization. This creates resilience against private key exploits, theft, spoofing and sweeping.

Thanks to this modularity, OApps can support the same application deployed with different security models, achieving homogeneous protocol security with heterogeneous, isolated application security. Users can choose their trust assumption, while application developers retain the network effects of being able to use the same shared protocol security without incurring security fragmentation when scaling the number of applications. In addition, they stay responsive when new security technologies emerge.

## ~ OApps

OApps are a powerful evolution to traditional smart contracts. They consist of three parts: application & contracting logic, a stack of keychains, and a user-supplied, parametrizable intent configurator. Owing to this OApps can achieve remarkable features: they are modularly secure, omnichain interoperable and chain-abstracted.

OApps are modularly secure. OApps can support the same applications deployed with different security models, thereby decoupling protocol-layer from application-layer security. The result is homogeneous protocol security, with a heterogeneous application security that minimizes security fragmentation, and captures a user’s true intents when interacting with an application. Users can choose their trust assumptions, while application developers retain the network effects of being able to use a shared protocol security. Any TVL intensive DeFi application, that necessitates substantial deposits, such as Liquid Staking Protocols, AMMs, Money Markets or DEXes, could experience significant advantages from deploying as an OApp.

OApps are omnichain interoperable. Collectively, many OApps form an application mesh topology. This mesh is resiliently designed for cross-interoperability, overcoming isolated and fragmented ecosystems. Their connections are persistent and universal - whether it's letting users seamlessly swap across supported chains, interact with applications from other chains or exchange native assets for wrapped ones.

OApps are chain-abstracted. Whereas traditional smart contract applications only target users of a single chain, OApps can sign transactions and messages targeted for any other foreign chain. They can read and write to other chains which enables a host of completely new use cases enabled by OApps.

OApps are remarkably lightweight and straightforward to build. Developers can write in the language they love, use the tooling, frontend libraries, node & RPC providers, and wallet providers that they are most accustomed to.

## ~ How does the Warden Protocol work?

The Warden Protocol is a high-throughput, low-latency, instant-finality blockchain platform for OApps developers. In monolithic blockchain architectures, all security components of an application are tightly integrated into a single, centralized unit. Due to this component bundling, a vulnerability in the system can compromise any and all applications. Contrary to monolithic end-to-end blockchain architectures, we have modularized the Warden Protocol for security, interoperability, and chain abstraction.

Application developers can assemble and disassemble a set of composable modules and use standardized, chain-agnostic syntax to create a new type of user experience - OApps. Each OApp component is developed, tested, documented, and benchmarked distinctly and can be used individually or in combination with other components. All components are configurable by OApp developers. Any application developer can add the Warden Protocol's custom modules to their existing base app to turn their application into an OApp.

Utilizing Warden Protocol as a shared platform, OApp developers can tap into established infrastructure and pool resources, granting them a competitive advantage that’s lacking in standard applications. They can sidestep establishing and maintaining a validator set and relayer network, and can leverage built-in support for keychains, intents, block explorers, wallets, oracles, bridge, data indices and security monitors. This reduces development costs, accelerates deployment timelines, and permits OApp developers to concentrate on creating application specific moats, rather than duplicating tools, resources and infrastructure.