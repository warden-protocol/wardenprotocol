---
title: Joining Warden Protocol Testnet
nodeName:  warden-guide-1
chainId: warden-testnet-1
---

# Joining Testnet


!!! important
    Before you start, make sure you have installed the [Warden Protocol binary](./node.md).


## Testnet chain ID

The Warden Protocol testnet chain ID is **`{{ chainId }}`**

## Initialize Your Warden Protocol Node

Initialize your node and create the node configurations. Choose a name fo your node. This guide uses `{{ nodeName }}`. 

```shell
wardend init {{ nodeName }} --chain-id={{ chainId }}
```

<!-- 
TODO - DEFINE ACTIVE PEERS LIST

Update the persistent peers list in the `config.toml`:

```shell
sed -i 's/persistent_peers = ""/persistent_peers = "username@ipaddress:port"/g' ~/.warden/config/config.toml
```

The updated peers configuration looks like this:

```shell
# Comma separated list of seed nodes to connect to
seeds = ""

# Comma separated list of nodes to keep persistent connections to
persistent_peers = "username@ipaddress:port"
```
-->



## Set up Cosmovisor

Cosmovisor allows automatic upgrades for the node, and it is the recommended way of running an Warden Protocol node.

Install the Cosmovisor binary:

```shell
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
```

go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0

Create the required folder structure:

```shell
mkdir -p ~/.warden/cosmovisor
mkdir -p ~/.warden/cosmovisor/genesis
mkdir -p ~/.warden/cosmovisor/genesis/bin
mkdir -p ~/.warden/cosmovisor/upgrades
```

Set up the Cosmovisor environment variables:

```shell
echo "# Setup Cosmovisor" >> ~/.profile
echo "export DAEMON_NAME=wardend" >> ~/.profile
echo "export DAEMON_HOME=$HOME/.warden" >> ~/.profile
echo "export DAEMON_ALLOW_DOWNLOAD_BINARIES=false" >> ~/.profile
echo "export DAEMON_LOG_BUFFER_SIZE=512" >> ~/.profile
echo "export DAEMON_RESTART_AFTER_UPGRADE=true" >> ~/.profile
echo "export UNSAFE_SKIP_BACKUP=true" >> ~/.profile
source ~/.profile
```
<!-- TODO: explain UNSAFE_SKIP_BACKUP 
If `UNSAFE_SKIP_BACKUP=true`,  (explain here).
If `UNSAFE_SKIP_BACKUP=false` or omitted, (explain here)
Each backup takes a decent amount of time. Public snapshots of old states are available.

-->


Download and replace the genesis file:

```shell
cd ~/.warden
# TODO: the repo is currently private
curl -L -O <<PATH TO GENESIS FILE>>
tar -xjf genesis.tar.bz2 && rm genesis.tar.bz2
```




Copy the current `wardend` binary into the `cosmovisor/genesis` folder:

```shell
cp ~/go/bin/wardend ~/.warden/cosmovisor/genesis/bin
```

The cosmovisor and wardend versions must be the same. To verify the versions, run these commands:

```shell
cosmovisor version
wardend version
```


Reset private validator file to genesis state:

```
wardend unsafe-reset-all
```

### Allow Background Run and Auto Restart

Set up an Warden Protocol service to allow cosmovisor to run in the background and automatic restarts:

```shell
cd ~
echo "[Unit]
Description=Cosmovisor daemon
After=network-online.target
[Service]
Environment="DAEMON_NAME=wardend"
Environment="DAEMON_HOME=${HOME}/.warden"
Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
Environment="DAEMON_LOG_BUFFER_SIZE=512"
Environment="UNSAFE_SKIP_BACKUP=true"
User=$USER
ExecStart=${HOME}/go/bin/cosmovisor start
Restart=always
RestartSec=3
LimitNOFILE=infinity
LimitNPROC=infinity
[Install]
WantedBy=multi-user.target
" >cosmovisor.service
 
```

Install the service:

```shell
sudo mv cosmovisor.service /lib/systemd/system/cosmovisor.service
sudo systemctl daemon-reload
sudo systemctl restart systemd-journald
```

### Operate the Warden Protocol Service

Start the service:

```shell
sudo systemctl start cosmovisor
```

Check the service status:

```shell
sudo systemctl status cosmovisor
```

Inspect the service logs:

```shell
journalctl -u cosmovisor -f
```


### Sync the Node

After starting the `wardend` daemon, the chain begins to sync to the network. The time to sync to the network varies, depending on your setup, but plan accordingly that the sync process could take a very long time. To query the status of your node:

```shell
# Query via the RPC (default port: 26657)
curl http://localhost:26657/status | jq .result.sync_info.catching_up
```

- If this command returns true, then your node is still catching up. Continue to wait.
- If this command returns `false`, then your node has caught up to the network's current block. You are safe to proceed with upgrading a validator node.

> TODO: state-sync and backups




## Upgrading to validator

??? Important "Keys and Balances" 
    To become a validator, your account must have a positive balance. Follow the [keys management](../How-To/chain_002_key_management.md) to learn how to create an account and the [faucet](./faucet.md) how-to to learn how to get tokens for the testnet. 

To upgrade the node to a be validator node, you must submit a `create-validator` transaction:

```shell
wardend tx staking create-validator \
--chain-id="{{ chainId }}" \
--pubkey=$(wardend tendermint show-validator) \
--amount=[staking_amount_nward] \
--commission-rate="[commission_rate]" \
--commission-max-rate="[maximum_commission_rate]" \
--commission-max-change-rate="[maximum_rate_of_change_of_commission]" \
--min-self-delegation="[min_self_delegation_amount]" \
--moniker="{{ nodeName }}" \
--security-contact="[security contact email/contact method]" \
--website "wesite of your validator" \
--from=[KEY_NAME]
```

??? Example "Example: Create validator for Alice"

    The following example shows a broadcast of the `create-validator` transaction from Alice's wallet:

    ```shell
    wardend tx staking create-validator \
    --chain-id="{{ chainId }}" \
    --pubkey=$(wardend tendermint show-validator) \
    --amount=9000000nward \
    --commission-rate="0.1" \
    --commission-max-rate="0.2" \
    --commission-max-change-rate="0.1" \
    --min-self-delegation="1" \
    --moniker="{{ nodeName }}" \
    --security-contact="security@example-validator.com" \
    --website "https://example-validator.com" \
    --from=alice
    ```


To see an explanation of the parameter values, use help. You can run this command: 

```shell
wardend tx staking create-validator --help
```



### Track Validator Active Set
To see the current validator active set:

```
wardend query staking validators --limit 300 -o json | jq -r '.validators[] |
[.operator_address, .status, (.tokens|tonumber / pow(10; 6)),
.commission.update_time[0:19], .description.moniker] | @csv' | column -t -s","
```

You can search for your specific moniker by adding grep MONIKER at the end:

```
wardend query staking validators --limit 300 -o json | jq -r '.validators[] |
[.operator_address, .status, (.tokens|tonumber / pow(10; 6)),
.commission.update_time[0:19], .description.moniker] | @csv' | column -t -s"," | grep {{ nodeName }}
```

If your bond status is `BOND_STATUS_BONDED`, your validator is part of the active validator set!
