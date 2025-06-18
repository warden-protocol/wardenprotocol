---
sidebar_position: 9
---

# Node commands

## Overview

**Node commands** are commands for interacting with a node through the command line. In this article, you'll find a brief overview of commands for interacting with the Warden node, `wardend`.

These commands allow you to do the following:

- Query the node
- Initiate transactions
- Manage your keys
- Edit the genesis file
- and much more

To learn more on key management and chain setup with node commands, see: [Set up a Warden account](/build-an-app/set-up-a-warden-account#useful-node-commands).

## Prerequisites

To interact with the node, you need to install the [Warden binary](https://github.com/warden-protocol/wardenprotocol/releases), `wardend`.

You can follow installation instructions in one of these guides (depending on your goal):

- [Run a local chain](run-a-local-chain)
- [Join Chiado](chiado-testnet/join-chiado#1-install)

## Execute `wardend` commands

To execute a node command, just run `wardend`, followed by the command. If you need to specify a node to interact with, include the `--node` flag with a [node endpoint](chiado-testnet/chiado-overview).

For example, to check the node status, run the example below using the preferred endpoint:

```bash
wardend status \
  --node https://rpc.chiado.wardenprotocol.org:443
```

:::tip
You can exclude the `--node` flag if you're running a chain on the same machine at moment when you're executing `wardend` commands. If not specified, `--node` defaults to the localhost.
:::

## Get a list of commands

To get a full list of available `wardend` commands and flags, run `wardend` with the `--help` flag:

```bash
wardend --help
```

## Get details of a command

To learn more about a command, run `wardend`, followed by the command name and the `--help` flag.

For example, you can execute this to learn more about querying the node with the `query` command:

```bash
wardend query --help
```

In the output, you'll see a list of available subcommands and flags. You can query subcommands the same way.

## Examples

This section contains useful examples of `wardend` commands. You'll learn how to query the node, manage keys, and initiate transactions. However, note that there are many more commands available.

### `query`: Query the node

To get a full list of commands for querying a node, run this:

```bash
wardend query --help
```

For example, the `warden` command allows you to query the [`x-warden` module](/learn/warden-protocol-modules/x-warden).

Here are some of the available `wardend query warden` subcommands with examples:

- `keychains`: This command returns a list of your [Keychains](/learn/glossary#keychain).

   ```bash
   wardend query warden keychains \
     --node https://rpc.chiado.wardenprotocol.org:443
   ```

- `spaces`: This command returns a list of your [Spaces](/learn/glossary#space).
   
   ```bash
   wardend query warden spaces \
     --node https://rpc.chiado.wardenprotocol.org:443
   ```

### `keys`: Manage keys

To get a full list of commands for managing your keys, run this:

```bash
wardend keys --help
```

Here are some examples of `wardend keys` commands:

- `list`: This command returns a list of your keys.
   
   ```bash
   wardend keys list
   ```

- `add`: This command adds a key, either newly generated or recovered.

   To create a new key, you need to specify its name:
      
   ```bash
   wardend keys add my-key-name
   ```
   
   To restore a key from its seed phrase, add the `--recover` flag:

   ```bash
   wardend keys add my-key-name --recover
   ```

- `delete`: This command deletes a key, identified by its name.
      
   ```bash
   wardend keys delete my-key-name
   ```

- `show`: This command returns key information. For example, you can get the key address by its name:

   ```bash
   wardend keys show my-key-name --address
   ```

### `tx`: Initiate transactions

To get a full list of commands for initiating transactions, run this:

```bash
wardend tx --help
```

For example, the `warden` command allows you to initiate [Warden](/learn/warden-protocol-modules/x-warden) transactions. Here are some of the available `wardend tx warden` subcommands with examples:

- `new-keychain`: This command creates a new [Keychain](/learn/glossary#keychain). It requires specifying an arbitrary Keychain description, your key name, and the chain ID.
   
   ```bash
   wardend tx warden new-keychain \
   --from my-key-name \
     --name 'my-keychain-name' \
     --chain-id chiado_10010-1 \
     --node https://rpc.chiado.wardenprotocol.org:443
   ```

- `new-space`: This command creates a new [Space](/learn/glossary#space). It requires specifying your key name and the chain ID.
   
   ```bash
   wardend tx warden new-space \
     --from my-key-name \
     --chain-id chiado_10010-1 \
     --node https://rpc.chiado.wardenprotocol.org:443
   ```
