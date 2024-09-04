---
sidebar_position: 7
---

# Node commands

## Overview

**Node commands** are commands for interacting with a node through the command line. In this article, you'll find a brief overview of commands for interacting with the Warden node, `wardend`.

These commands allow you to do the following:

- Query the node
- Initiate transactions
- Manage your key
- Edit the genesis file
- and much more

## Execute `wardend` commands

To execute a node command, just run `wardend`, followed by the command. Add the `--node` flag with the RPC endpoint of your node.

For example, to check the `wardend` version and status, run this:

```bash
wardend version --node https://rpc.buenavista.wardenprotocol.org:443
```
```bash
wardend status --node https://rpc.buenavista.wardenprotocol.org:443
```

:::tip
Here and the following examples, replace the URL following the `--node` flag by your node URL.

If you're running a local chain, you can skip the `--node` flag and just execute the commands while the node is running.
:::

## Get a list of commands

To get a full list of available `wardend` commands and flags, run `wardend` with the `--help` flag:

```bash
wardend --help --node https://rpc.buenavista.wardenprotocol.org:443
```

## Get details of a command

To learn more about a command, run `wardend`, followed by the command name and the `--help` flag.

For example, you can execute this to learn more about querying the node with the `query` command:

```bash
wardend query --help --node https://rpc.buenavista.wardenprotocol.org:443
```

In the output, you'll see a list of available subcommands and flags. You can query subcommands the same way.

## Examples

This section contains useful examples of `wardend` commands. You'll learn how to query the node, manage keys, and initiate transactions. However, note that there are many more commands available.

### `query`: Query the node

To get a full list of commands for querying a node, run this:

```bash
wardend query --help --node https://rpc.buenavista.wardenprotocol.org:443
```

For example, the `warden` command allows you to query the [Warden](/learn/warden-protocol-modules/x-warden) module.

Here are some of the available `wardend query warden` subcommands with examples:

- `keychains`: This command returns a list of your [Keychain](/learn/glossary#keychain).

   ```bash
   wardend query warden keychains --node https://rpc.buenavista.wardenprotocol.org:443
   ```

- `spaces`: This command a list of your [Spaces](/learn/glossary#space).
   
   ```bash
   wardend query warden spaces --node https://rpc.buenavista.wardenprotocol.org:443
   ```

### `keys`: Manage keys

To get a full list of commands for managing your keys, run this:

```bash
wardend keys --help --node https://rpc.buenavista.wardenprotocol.org:443
```

Here are some examples of `wardend keys` commands:

- `list`: This command returns a list of your keys.
   
   ```bash
   wardend keys list
   ```

- `add`: This command adds a key – you executed it when setting up your node. It requires specifying an arbitrary key name.
      
   ```bash
   wardend keys add my-key-name --node https://rpc.buenavista.wardenprotocol.org:443
   ```

- `delete`: This command deletes a key, identified by its name.
      
   ```bash
   wardend keys delete my-key-name --node https://rpc.buenavista.wardenprotocol.org:443

   ```

- `add-keychain-writer`: This command adds a new [Keychain Writer](/learn/glossary#keychain-writer). It requires specifying an arbitrary Keychain Writer name.
   
   ```bash
   wardend keys add my-keychain-writer-name --node https://rpc.buenavista.wardenprotocol.org:443
   ```

### `tx`: Initiate transactions

To get a full list of commands for initiating transactions, run this:

```bash
wardend tx --help --node https://rpc.buenavista.wardenprotocol.org:443
```

For example, the `warden` command allows you to initiate [Warden](/learn/warden-protocol-modules/x-warden) transactions. Here are some of the available `wardend tx warden` subcommands with examples:

- `new-keychain`: This command creates a new [Keychain](/learn/glossary#keychain). It requires specifying an arbitrary Keychain description, your key name, and the chain ID.
   
   ```bash
   wardend tx warden new-keychain \
     --description 'my-description' \
     --from my-key-name \
     --chain-id my-chain-id \
     --node https://rpc.buenavista.wardenprotocol.org:443
   ```

- `new-space`: This command creates a new [Space](/learn/glossary#space). It requires specifying your key name and the chain ID.
   
   ```bash
   wardend tx warden new-space \
     --from my-key-name \
     --chain-id my-chain-id \
     --node https://rpc.buenavista.wardenprotocol.org:443
   ```