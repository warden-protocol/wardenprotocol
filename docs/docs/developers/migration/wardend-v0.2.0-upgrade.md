---
title: Warden Protocol v0.2.0 Upgrade
order: 1
---

# Upgrading Warden Protocol

This guide provides instructions for upgrading Warden Protocol from v0.1.0 to v0.2.0.

This document describes the steps for validators and node operators, to upgrade successfully for the Warden Protocol v0.2.0 release.

For more details on the release, please see the [release notes](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.2.0)

## Release Binary

Please use the correct release binary: `v0.2.0`.

## Instructions

- [Upgrading Warden Protocol](#)
  - [Release Binary](#release-binary)
  - [Instructions](#instructions)
  - [On-chain governance proposal attains consensus](#on-chain-governance-proposal-attains-consensus)
  - [Upgrade date](#upgrade-date)
  - [Preparing for the upgrade](#preparing-for-the-upgrade)
    - [System requirements](#system-requirements)
    - [Backups](#backups)
    - [Testing](#testing)
    - [Current runtime](#current-runtime)
    - [Target runtime](#target-runtime)
  - [Upgrade steps](#upgrade-steps)
    - [Method I: Manual Upgrade](#method-i-manual-upgrade)
    - [Method II: Upgrade using Cosmovisor](#method-ii-upgrade-using-cosmovisor)
      - [Manually preparing the binary](#manually-preparing-the-binary)
        - [Preparation](#preparation)
        - [Expected upgrade result](#expected-upgrade-result)
      - [Auto-Downloading the wardend binary](#auto-downloading-the-wardend-binary)
  - [Upgrade duration](#upgrade-duration)
  - [Rollback plan](#rollback-plan)
  - [Communications](#communications)
  - [Risks](#risks)

## On-chain governance proposal attains consensus

Once a software upgrade governance proposal is submitted to the Warden Protocol, both a reference to this proposal and an `UPGRADE_HEIGHT` are added to the [release notes](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.2.0).
If and when this proposal reaches consensus, the upgrade height will be used to halt the "old" chain binaries. You can check the proposal on one of the block explorers or using the `wardend` CLI tool.

Neither core developers nor core funding entities control the governance.

## Upgrade date

The date/time of the upgrade is subject to change as blocks are not generated at a constant interval. You can stay up-to-date by checking the estimated time until the block is produced at one of the block explorers (e.g. https://warden-explorer.paranorm.pro/warden/block/`UPGRADE_HEIGHT`).

## Preparing for the upgrade

### System requirements

### Backups

Prior to the upgrade, validators are encouraged to take a full data snapshot. Snapshotting depends heavily on infrastructure, but generally this can be done by backing up the `.warden` directory.
If you use Cosmovisor to upgrade, by default, Cosmovisor will backup your data upon upgrade. See below [upgrade using Cosmovisor](#method-ii-upgrade-using-cosmovisor) section.

It is critically important for validator operators to back-up the `.warden/data/priv_validator_state.json` file after stopping the wardend process. This file is updated every block as your validator participates in consensus rounds. It is a critical file needed to prevent double-signing, in case the upgrade fails and the previous chain needs to be restarted.

### Testing

This is a testnet upgrade. Since the Warden Protocol is a new chain, there is no separate testnet to test the upgrade at this time.

### Current runtime

The Alfama testnet, `alfama`, is currently running [wardend v0.1.0](https://github.com/warden-protocol/wardenprotocol/releases/v0.1.0). We anticipate that operators who are running on v0.1.0, will be able to upgrade successfully. Validators are expected to ensure that their systems are up to date and capable of performing the upgrade. This includes running the correct binary and if building from source, building with the appropriate `go` version.

### Target runtime

The Alfama testnet, `alfama`, will run **[wardend v0.2.0](https://github.com/warden-protocol/wardenprotocol/releases/v0.2.0)**. Operators _**MUST**_ use this version post-upgrade to remain connected to the network. The new version requires `go v1.21` to build successfully.

## Upgrade steps

There are 2 major ways to upgrade a node:

- Manual upgrade
- Upgrade using [Cosmovisor](https://pkg.go.dev/cosmossdk.io/tools/cosmovisor)
    - Either by manually preparing the new binary
    - Or by using the auto-download functionality (this is not yet recommended)

If you prefer to use Cosmovisor to upgrade, some preparation work is needed before upgrade.

### Method I: Manual Upgrade

Make sure **wardend v0.1.0** is installed by building from source.

Run Warden Protocol v0.1.0 till upgrade height, the node will panic:

```shell
ERR UPGRADE "v01-to-v02" NEEDED at height: <UPGRADE_HEIGHT>
```

Stop the node, and switch the binary to **wardend v0.2.0** and re-start by `wardend start`.

It may take several minutes to a few hours until validators with a total sum voting power > 2/3 to complete their node upgrades. After that, the chain can continue to produce blocks.

### Method II: Upgrade using Cosmovisor

#### Manually preparing the binary

##### Preparation

- Install the latest version of Cosmovisor (`1.5.0`):

```shell
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
cosmovisor version
# cosmovisor version: v1.5.0
```

- Create a `cosmovisor` folder inside `$WARDEND_HOME` and move wardend `v0.1.0` into `$WARDEND_HOME/cosmovisor/genesis/bin`:

```shell
mkdir -p $WARDEND_HOME/cosmovisor/genesis/bin
cp $(which wardend) $WARDEND_HOME/cosmovisor/genesis/bin
```

- Build Warden Protocol `v0.2.0`, and move wardend `v0.2.0` to `$WARDEND_HOME/cosmovisor/upgrades/v01-to-v02/bin`

```shell
mkdir -p  $WARDEND_HOME/cosmovisor/upgrades/v01-to-v02/bin
cp $(which wardend) $WARDEND_HOME/cosmovisor/upgrades/v01-to-v02/bin
```

At this moment, you should have the following structure:

```shell
.
├── current -> genesis or upgrades/<name>
├── genesis
│   └── bin
│       └── wardend      # old: v0.1.0
└── upgrades
    └── v01-to-v02
        └── bin
            └── wardend  # new: v0.2.0
```

- Export the environmental variables:

```shell
export DAEMON_NAME=wardend
# please change to your own wardend home dir
# please note `DAEMON_HOME` has to be absolute path
export DAEMON_HOME=$WARDEND_HOME
export DAEMON_RESTART_AFTER_UPGRADE=true
```

- Start the node:

```shell
cosmovisor run start --x-crisis-skip-assert-invariants --home $DAEMON_HOME
```

Skipping the invariant checks is strongly encouraged since it decreases the upgrade time significantly and since there are some other improvements coming to the crisis module in the next release of the Cosmos SDK.

##### Expected upgrade result

When the upgrade block height is reached, Warden Protocol will panic and stop:

This may take a few minutes to a few hours.
After upgrade, the chain will continue to produce blocks when validators with a total sum voting power > 2/3 complete their node upgrades.

#### Auto-Downloading the wardend binary

**This method is not recommended!**

## Upgrade duration

The upgrade may take a few minutes to several hours to complete because `alfama` participants operate globally with differing operating hours and it may take some time for operators to upgrade their binaries and connect to the network.

## Rollback plan

During the network upgrade, core Warden Protocol teams will be keeping an ever vigilant eye and communicating with operators on the status of their upgrades. During this time, the core teams will listen to operator needs to determine if the upgrade is experiencing unintended challenges. In the event of unexpected challenges, the core teams, after conferring with operators and attaining social consensus, may choose to declare that the upgrade will be skipped.

Steps to skip this upgrade proposal are simply to resume the `alfama` network with the (downgraded) v0.1.0 binary using the following command:

```shell
wardend start --unsafe-skip-upgrade <UPGRADE_HEIGHT>
```

Note: There is no particular need to restore a state snapshot prior to the upgrade height, unless specifically directed by core teams.

Important: A social consensus decision to skip the upgrade will be based solely on technical merits, thereby respecting and maintaining the decentralized governance process of the upgrade proposal's successful YES vote.

## Communications

Operators are encouraged to join the `#alfama-validators` channel of the Warden Protocol Discord. This channel is the primary communication tool for operators to ask questions, report upgrade status, report technical issues, and to build social consensus should the need arise. This channel is restricted to known operators and requires verification beforehand. Requests to join the `#alfama-validators` channel can be sent to the `#general` channel.

## Risks

As a validator performing the upgrade procedure on your consensus nodes carries a heightened risk of double-signing and being slashed. The most important piece of this procedure is verifying your software version and genesis file hash before starting your validator and signing.

The riskiest thing a validator can do is discover that they made a mistake and repeat the upgrade procedure again during the network startup. If you discover a mistake in the process, the best thing to do is wait for the network to start before correcting it.

