---
sidebar_position: 3
---

# Operate Connect

## Overview

Warden integrates with **Connect** (formerly known as **Slinky**) – an [oracle service](/learn/oracle-services) from **Skip Protocol**. The data provided by Connect is validated by Warden's network and written on-chain.

This article is a guide for validators explaining how to run Connect.

See also: [Connect documentation](https://docs.skip.build/connect/introduction)

## 1. Download

Download the Connect binary from the [Connect releases](https://github.com/skip-mev/slinky/releases) page on GitHub. The initial version required for Warden is [v1.0.3](https://github.com/skip-mev/slinky/releases/tag/v1.0.3) or higher.

You can also use a container image including the binary at [slinky-sidecar](https://github.com/skip-mev/slinky/pkgs/container/slinky-sidecar).

## 2. Run Connect sidecar

:::tip
If you're running Connect as a container, skip this step.
:::

Then you need to integrate the Connect sidecar into your setup. To run Connect with stable defaults defined by the Skip team, use this command:

```
slinky
```

Note that some default values may need to change depending on how you’ve setup your node and the sidecar.

## 3. Configure wardend

The chain binary (`wardend`) has been altered to accept new options related to Connect.

In order to point your chain binary to Connect, add the following under the `[oracle]` heading in your **app.toml** file:

```toml
[oracle]
# This option indicates whether the oracle is enabled.
enabled = "true"

# This is the URL of the out-of-process oracle sidecar used to connect
# to the oracle sidecar when the application boots up. Note that the address
# can be modified at any point, but will only take effect after the application is
# restarted. This can be the address of an oracle container running on the same
# machine or a remote machine.
oracle_address = "localhost:8080"

# This is the time that the client is willing to wait for responses from
# the oracle before timing out.
client_timeout = "2s"

# This option determines whether oracle metrics are enabled. Specifically
# this enables instrumentation of the oracle client and the interaction between
# the oracle and the app.
metrics_enabled = "true"
```

## 4. What's next?

You'r all set! Connect will be available on [Warden version v0.4.0](/operate-a-node/upgrade-to-v0.4.0).