---
sidebar_position: 6
---

# Node commands

## Overview

**Node commands** are commands for interacting with a node through the command line. In this article, you'll find a brief overview of commands for interacting with the Warden node, `wardend`.

These commands allow you to do the following:

- Query the node
- Initiate transactions
- Manage your keys
- Edit the genesis file
- And more

## Prerequisites

To interact with the node, you need to install the [Warden binary](https://github.com/warden-protocol/wardenprotocol/releases), `wardend`.

You can follow installation instructions in [Join Barra](barra-testnet/join-barra).

## Execute `wardend` commands

To execute a node command, just run `wardend`, followed by the command. Specify a node to interact with by including the `--node` flag with a [node endpoint](barra-testnet/barra-overview#endpoints).

For example, to check the node status, run the example below using the preferred endpoint:

```bash
wardend status \
  --node https://rpc.barra.wardenprotocol.org:443
```

:::note
If not specified, `--node` defaults to the localhost.
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
