---
sidebar_position: 3
---

# Create a validator

This is a simple step-by-step guide for setting up a validator on Buenavista testnet. It is not a guide on validator architecture or security features.

## Prerequisites

- The following instructions assume you have already set up a full-node and are synchronized to the latest block height. If you haven’t done so, please follow the [Join Buenavista](networks/join-buenavista) instructions.

## 1. Create or restore a local wallet key pair

First, either create a new key pair, or restore an existing wallet for your validator. Replace `<key-name>` with a key name of your choice.

```
# Create a new keypair
wardend keys add <key-name>

# Alternatively, restore an existing wallet with a mnemonic seed phrase.
# wardend keys add <key-name> --recover.

# Query the keystore for your public address
wardend keys show <key-name> -a
```

📒 After creating a new key, you will see it’s information and its seed phrase. It's essential to write down this seed phrase and keep it in a safe place. The seed phrase is the only way to restore your keys. Losing it can result in the irrecoverable loss of WARD tokens.

## 2. Get testnet WARD

In the next steps, you register your new validator by submitting a create-validator transaction.

Because submitting a transaction consumes gas, you need to fund your newly created address from the first step beforehand.

You can obtain testnet tokens to fund your address from our WARD faucet:

```
curl -XPOST -d '{"address": "<your-address>"}' https://faucet.buenavista.wardenprotocol.org
```

You can verify your balance with this command:

```
wardend query bank balances <key-name>
```

## 3. Create a new validator

Once the node is synced and you have the required WARD, you can become a validator.

To create a validator and initialize it with a self-delegation, you need to create a `validator.json` file and submit a create-validator transaction.

Obtain your validator public key by running the following command:

```
wardend comet show-validator
```

The output will be similar to this (with a different key):

```
{"@type":"/cosmos.crypto.ed25519.PubKey","key":"lR1d7YBVK5jYijOfWVKRFoWCsS4dg3kagT7LB9GnG8I="}
```

Then, create a file named `validator.json` with the following content:
```
{    
    "pubkey": {"@type":"/cosmos.crypto.ed25519.PubKey","key":"lR1d7YBVK5jYijOfWVKRFoWCsS4dg3kagT7LB9GnG8I="},
    "amount": "1000000uward",
    "moniker": "your-node-moniker",
    "identity": "eqlab testnet validator",
    "website": "optional website for your validator",
    "security": "optional security contact for your validator",
    "details": "optional details for your validator",
    "commission-rate": "0.1",
    "commission-max-rate": "0.2",
    "commission-max-change-rate": "0.01",
    "min-self-delegation": "1"
}
```

Here you have the chance to set your validator’s commission rate, maximum rate, and maximum change rate. But also the initial self delegation (amount). Remember to replace the `pubkey` field with your own key obtained in the previous step.

Finally, we're ready to submit the transaction to create the validator:

```
wardend tx staking create-validator validator.json \
    --from=<key-name> \
    --chain-id=buenavista-1 \
    --fees=500uward
```

**✏️ CAUTION**

When you specify commission parameters, the commission-max-change-rate is measured as a percentage point change of the commission-rate. For example a change from 1% to 2% is a 100% rate increase, but the commission-max-change-rate is measured as 1%.

The above transaction is just an example. If you want to see an explanation of the parameters values or see all the available flags that can be set to customize your validators you can enter this command: `wardend tx staking create-validator --help`


## 3. Backup critical files

There are certain files you need to backup to be able to restore your validator if, for some reason, it’s damaged or lost. Please make a secure, encrypted backup of the following files:

- `priv_validator_key.json`
- `node_key.json`


## 4. Confirm your validator is in the active set

Check if your validator is in the active set by running this command:

```
wardend query comet-validator-set | grep "$(wardend comet show-address)"
```

If the output is empty, your validator is not in the active set.
