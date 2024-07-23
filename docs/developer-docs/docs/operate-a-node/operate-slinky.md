---
sidebar_position: 4
---

# Operate Slinky

XXX

1. Download the Connect binary

    The best way to get the Connect binary is in the GitHub releases page for Connect.

    https://github.com/skip-mev/slinky/releases/tag/v1.0.3

    The initial version required for Neutron is v1.0.3+

    We also provide a container image at ghcr.io/skip-mev/slinky-sidecar

    This will include the Connect binary, slinky

2. Integrate the Connect sidecar into your setup.

    To run connect with stable defaults defined by the skip team
    
    ```
    slinky
    ```

    Notice, some default values may need to change depending on how you’ve setup your node + connect-sidecar. See the marketmap-provider section of the flags-guide

3. Point your chain binary at your Connect instance

    The chain binary has been altered to accept new options which are used to configure your application. The following options in **app.toml** are relevant to Connect operation.

    ```
    ###############################################################################
    ###                                  Oracle                                 ###
    ###############################################################################
    [oracle]
    # Enabled indicates whether the oracle is enabled.
    enabled = "true"
    
    # Oracle Address is the URL of the out of process oracle sidecar. This is used to
    # connect to the oracle sidecar when the application boots up. Note that the address
    # can be modified at any point, but will only take effect after the application is
    # restarted. This can be the address of an oracle container running on the same
    # machine or a remote machine.
    oracle_address = "localhost:8080"
    
    # Client Timeout is the time that the client is willing to wait for responses from
    # the oracle before timing out.
    client_timeout = "2s"
    
    # MetricsEnabled determines whether oracle metrics are enabled. Specifically
    # this enables intsrumentation of the oracle client and the interaction between
    # the oracle and the app.
    metrics_enabled = "true"
    ```