# ELI5

The  **Warden Protocol**  is an *intent-centric protocol*, *built on the Cosmos SDK*, that enables *various execution layers for interoperability*, *modular key management* and *account aggregation*.

Let's break this down and explain it in a very simple way:

## An intent-centric protocol

In a blockchain context, intents are sets of rules that govern how transactions are validated and executed within the network. Intents, in this case, refer to the predefined conditions or criteria within the protocol that determine whether a transaction can proceed.

Imagine you're playing a game with specific rules. Before you can take a certain action, like moving your game piece, you need to ensure you follow the rules of the game. If you do, you can make your move. If not, you're not allowed to proceed.

Similarly, in a blockchain protocol, intents act as the rules of the game. They are the conditions that the network checks before allowing a transaction to be processed. These conditions might include factors like the sender's identity, the transaction amount, or the current state of the blockchain.

If the transaction meets all the conditions specified by the intents in the protocol, it's approved and added to the blockchain. However, if it fails to meet any of the conditions, the protocol will reject the transaction, ensuring that only valid transactions are processed. 

This is why Warden Protocol is considered an intent-centric protocol, as every transaction will be routed through intents.


## Built on Cosmos SDK

Think of constructing a custom computer. Instead of designing and manufacturing every component from scratch, you start with a high-quality motherboard that supports a wide range of processors, memory, and peripherals. This motherboard acts as a foundation, simplifying the assembly process and ensuring compatibility and performance.

Similarly, building on the Cosmos SDK is like starting with that high-quality motherboard when developing a blockchain application. The Cosmos SDK provides a foundational framework and set of tools that we can use to create Warden Protocol more efficiently. It offers essential features out of the box, allowing our team to focus on the unique aspects of our project rather than the underlying infrastructure. Essentially, using the Cosmos SDK accelerates development and enhances the capabilities of Warden.

## Various execution layers for interoperability

Imagine the global internet as a vast network of different websites and online services, each using different formats and protocols. Sending information or conducting transactions directly between these services can be tricky because of their differing standards.

In the context of blockchain, "various execution layers for interoperability" are akin to multiple universal adapters or translators designed to connect these diverse online services seamlessly. Each layer specializes in translating and facilitating the exchange of information or transactions between different blockchain networks, much like how internet protocols allow for the smooth exchange of data across different web platforms.

This means assets, data, or transactions can move freely across various blockchain systems, thanks to these execution layers acting collectively. They ensure that despite the unique characteristics of each blockchain, there's a common ground for interoperability, enhancing the connectivity and functionality of the blockchain ecosystem as a whole.

## Modular key management

Rather than depending on a single provider for managing your wallet keys, modular key management allows you to select from a variety of options (keychains). These keychains allow you to request wallet addresses (public keys) and they will sign upon request with the private key. Looking ahead, it will be possible to distribute the responsibility of a single key's management across several different keychains with dMultisig.

## Account Aggregation

Imagine you have different online accounts for email, social media, and e-commerce, each with its own username and password. It can be tough to remember all of them!

Now, think of a password manager like a special notebook where you can store all your usernames and passwords securely in one place. Instead of trying to remember each one, you just need to remember the password for your password manager.

Account aggregation in Warden Protocol works similarly. Instead of managing multiple wallets or accounts for different blockchains separately, you can bring them all together into one "space" within Warden Protocol. Just like a password manager keeps your login information organized and secure, account aggregation in Warden Protocol helps you manage all your wallets conveniently and securely in one place.

****

Now that we have learned about the technical complex matters, let's focus on how do you interact with Warden?

**For users**  Use the most secure multi-chain multi-sig wallet. Create Spaces, protect your wallets with intents and interact with the web3 space through *SpaceWard*.

**SpaceWard**  is the front-end for the Warden Protocol, enabling multi-chain wallet management.

**For builders**  Build on Warden or any compatible blockchain, protected by intents and modular key management operators.
