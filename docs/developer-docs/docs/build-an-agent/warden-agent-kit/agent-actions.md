---
sidebar_position: 3
---

# Agent Actions

By default, the Warden Agent Kit supports the following [Actions](/learn/glossary#action):

- `get_spaces`: Retrieve all your [Spaces](/learn/glossary#space).
- `create_space`: Create a new Space.
- `get_keys`: Get all [keys](/learn/glossary#key) for a given Space.
- `create_key`: Create a new key for a specified Space and [Keychain](/learn/glossary#keychain).
- `get_keychains`: Retrieve all available Keychains.
- `get_balance`: Check the balance of Sepolia ETH for a specific key.
- `request_funds`: Request [WARD tokens](/learn/glossary#ward-token) from the faucet.
- `get_price`: Get the current price of a token using its symbol.
- `send_tokens`: Send tokens to another address from your key.
- `create_order`: Create a new [Order](/learn/glossary#order).

As the Warden Agent Kit continues to evolve, more tools and features will be added to enhance its functionality.

In the meantime, you can expand your Agent's capabilities by integrating existing tools from the LangChain community or developing your own custom tools. For detailed instructions, follow our guide: [Add Agent capabilities](add-agent-capabilities).
