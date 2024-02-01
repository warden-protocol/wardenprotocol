---
title:  Install a Warden Protocol Node
---


## Minimum Requirements
The minimum recommended specs for running the Warden Protocol node (`wardend`) is as follows:

- 4-core (2 physical core), x86_64 architecture processor
- 16 GB RAM (or equivalent swap file set up)
- 200 GB of storage space


## Manual installation 

!!! hint
    The example commands in this guide are for Ubuntu Linux. To run these commands on a different operating system, modify the commands as appropriate for your environment.

### Install prerequisites

```shell
# update the local package list and install any available upgrades
sudo apt update && sudo apt upgrade -y

# install toolchain and ensure accurate time synchronization
sudo apt install make build-essential git jq ufw curl snapd -y
```

### Install Golang

```shell
# use snap to install the latest stable version of go
sudo snap install go --classic
```

Update your execution path to be able to launch the go binaries:

```shell
 echo 'PATH="$HOME/go/bin:$PATH"' >> ~/.profile && source ~/.profile
```

### Fetch the code from GitHub

```shell
cd ~
git clone https://github.com/warden-protocol/wardenprotocol
cd warden
git checkout <<branch with stable testnet version>>
```

### Build and install the Warden Protocol binary

```shell
make install
```

The `wardend` binary is installed in `~/go/bin/wardend`.

### Enable the host firewall [OPTIONAL]

For servers that are directly exposed to the internet, it is recommended to install a firewall.

```shell
## allow ssh connection to the server
sudo ufw allow ssh

## allow port to submit transactions
sudo ufw allow 27656/tcp

## change port later

## start the firewall
sudo ufw enable
```


## Network configuration 

To configure the node to join the **Testnet** network follow [this link](./testnet.md).
