---
sidebar_position: 1
id: home-doc
slug: /
---

# Introduction to Warden

---EDIT---

Contents:

- Start building with Warden Protocol
- Why should I build with Warden Protocol?
- What omnichain contracts can do
- Learn more: an overview of the section and docs in general
- Contribute: a link to GitHub
	- We should migrate the info on how to contribute from the existing docs to GitHub
	- We can also link it from developer guides

**Note 1:** We may need more articles in the Learn section for in-depth explanation of concepts.  
**Note 2:** Probably theoretical info for Validators could also go under Learn. (Check how it's handled in other docs.)

---

Welcome to the Documentation Site for the Warden Protocol!

The Warden Protocol is a modular L1 blockchain for omnichain applications, "OApps". Our mission is to empower developers to simply launch secure OApps by giving them modular infrastructure for security, interoperability and chain abstraction.

While our documentation site is a work in progress, it will become a comprehensive resource for navigating and building with ease on Warden.

Within these docs, we have simple ELI5s, FAQs, complete with step-by-step tutorials for users, developers, and network participants (such as validators and keychain operators). Regardless of if you're a developer aiming to incorporate the Warden Protocol into your projects, or a user eager to delve into the capabilities of Warden, our documentation will equip you with the necessary tools and information.

---

## Chain Abstraction

Imagine you have different online accounts for email, social media, and e-commerce, each with its own username and password. It can be tough to remember all of them!

Now, think of a password manager like a special notebook where you can store all your usernames and passwords securely in one place. Instead of trying to remember each one, you just need to remember the password for your password manager.

Chain abstraction in Warden Protocol works similarly. Instead of managing multiple wallets or accounts for different blockchains separately, you can bring them all together into one "space" within Warden Protocol. Just like a password manager keeps your login information organized and secure, account aggregation in Warden Protocol helps you manage all your wallets conveniently and securely in one place.

---

**Q: How does Warden offer chain abstraction?** A: Spaces are users' gateways to the mesh network of OApps and any other blockchain. They are identity-abstracted, privacy-preserved, and account-aggregated Warden addresses with which users can interact with OApps or entirely separate web3 applications. By using key ids, each OApp user can receive an infinite number of remote addresses on every ECDSA-/EDDSA-based blockchain. Traditional smart contract applications only target users of a single chain. Thanks to Spaces, OApps can sign transactions and general messages targeted at any destination chain. OApps can sign transactions executed on other blockchains (e.g., writing to other chains), and thanks to a direct network integration, listeners can query data and events from other chains (e.g., reading from other chains).

---

Spaces are users’ gateways to the mesh network of OApps and any other blockchain. They are identity-abstracted, privacy-preserved, account-aggregated Warden addresses with which users can interact with OApps or entirely separate web3 applications. By using key identifiers, each OApp user can receive an infinite number of remote addresses on every ECDSA-/EDDSA based blockchain. This research and development effort introduces a novel programming primitive, where users could use their space to log into applications from every chain as a full alternative to most existing wallet options.

Traditional smart contract applications only target users of a single chain. Thanks to spaces, OApps can sign transactions and general messages targeted for any destination chain. They can sign transactions executed on other blockchains (e.g. writing to other chains), and thanks to a direct network integration of listeners can query data and events from other chains (e.g. reading from other chains). For example, a particular application chain may need to know the current price of the token of a second chain. These cross-chain queries create a multitude of novel OApp use cases in bridging, multichain DEXs, enabling non-smart contract enabled chains and many others.

For instance, traditionally web3 users defaulted to CEXs for multichain experiences because of the complexity of bridging, the difficulty of handling separate wallets and managing gas. An OApp developer could use a space with a deposit address on all chains, thereby eliminating the need to bridge assets to a single chain to swap, or to bridge to where assets have most liquidity.

Bridging assets is another potential use case. In some instances - for example when an underlying asset is too expensive to slow - like in the case of Ethereum or Bitcoin, there can be value to wrapping an asset. An OApp developer could build a token bridge using account aggregation, that keeps an account of deposits of a given token on an address and issues the respective token balance on another chain. Additionally, Warden will leverage a modular implementation of Axelar’s cross-chain communication protocol, to enable rapid, programmable bridging of assets.

Spaces also enable non-smart contract chains. An OApp can control externally owned accounts on non-smart contract-enabled chains, like Bitcoin, Dogecoin or Ripple. An OApp developer could build a DEX for Bitcoin Ordinals that handles deposits and executes swaps when two users agree to trade BTC for the Ordinal or any other BRC20 token.
