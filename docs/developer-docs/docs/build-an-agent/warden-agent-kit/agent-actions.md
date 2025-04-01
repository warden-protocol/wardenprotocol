---
sidebar_position: 3
---

# Agent Actions

## Actions on Warden

An [Action](/learn/glossary#action) is any transaction on Warden Protocol. To perform an Action, one can use the [SpaceWard](https://help.wardenprotocol.org) application, run [node commands](/operate-a-node/node-commands), or prompt a Warden Agent.

Each new user needs to perform the following Actions: get test [WARD tokens](/learn/glossary#ward-token), create a [Space](/learn/glossary#space), and request a [key](/learn/glossary#space) from a [Keychain](/learn/glossary#space). After doing it, the user will be able to send tokens, create [Orders](/learn/glossary#order), and initiate other Actions.

:::note
A Space is a hub allowing its owner to manage multiple cryptographic keys that identify users and secure the ownership of wallets. To create a key, a user requests it from a Keychain—a custodian that generates and stores keys and signs transactions with them.
:::

## Supported Agent Actions

By default, the Warden Agent Kit supports the following Actions and queries:

- `get_spaces`: Retrieve all your Spaces.
- `create_space`: Create a new Space.
- `get_keys`: Get all keys for a given Space.
- `create_key`: Create a new key for a specified Space and Keychain.
- `get_keychains`: Retrieve all available Keychains.
- `get_balance`: Check the balance of Sepolia ETH for a specific key.
- `request_funds`: Request WARD tokens from the faucet.
- `get_price`: Get the current price of a token using its symbol.
- `send_tokens`: Send tokens to another address from your key.
- `create_order`: Create a new Order.

As the Warden Agent Kit continues to evolve, more tools and features will be added to enhance its functionality.

In the meantime, you can expand your Agent's capabilities by integrating existing tools from the LangChain community or developing your own custom tools. For detailed instructions, follow our guide: [Add Agent capabilities](add-agent-capabilities).

