---
sidebar_position: 3
---

# Create a validator

This is a simple step-by-step guide for setting up a validator on Buenavista testnet. It's not a guide on validator architecture or security features.

## Prerequisites

The following instructions assume you have already set up a full-node and are synchronized to the latest block height. If you haven’t done so, please follow the [Join Buenavista](networks/join-buenavista) instructions.

## 1. Create/restore a key pair

The first step is creating a new key pair for your validator. Replace `<key-name>` with a key name of your choice and run the following: 

```bash
wardend keys add <key-name>
```

Alternatively, you can restore an existing wallet with a mnemonic seed phrase. Replace `<key-name>` with a key name of your choice and run the following: 

```bash
wardend keys add <key-name> --recover.
```

Then get your public address:

```bash
wardend keys show <key-name> -a
```

**✏️ CAUTION**

After creating a new key, you'll see its information and its seed phrase. It's essential to write down this seed phrase and keep it in a safe place. The seed phrase is the only way to restore your keys. Losing it can result in the irrecoverable loss of WARD tokens.

## 2. Get testnet WARD

In the next steps, you'll register your new validator by submitting a `create-validator` transaction. Transactions consume gas, so you need to fund your newly created address from the first step.

You can obtain testnet tokens from our **WARD faucet**:

```bash
curl -XPOST -d '{"address": "<your-address>"}' https://faucet.buenavista.wardenprotocol.org
```

To verify your balance, use this command:

```bash
wardend query bank balances <key-name>
```

## 3. Create a validator

Once the node is synced and you have the required WARD, you can become a validator.

To create a validator and initialize it with a self-delegation, you need to create a `validator.json` file and submit a create-validator transaction:

1. Obtain your validator public key by running the following command:

    ```bash
    wardend comet show-validator
    ```

    The output will be similar to this (with a different key):
    
    ```bash
    {"@type":"/cosmos.crypto.ed25519.PubKey","key":"lR1d7YBVK5jYijOfWVKRFoWCsS4dg3kagT7LB9GnG8I="}
    ```
    
2. Create a file named `validator.json` with the following content:

    ```json
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

    Here you have the chance to set your validator’s commission rate, maximum rate, and maximum change rate. You can also make the initial self-delegation (`amount`). Remember to replace the `pubkey` field with your own key obtained in the previous step.

3. Finally, you're ready to submit the transaction to create the validator:
    
    ```bash
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


## 4. Check your validator

Check if your validator is in the active set by running this command:

```bash
wardend query comet-validator-set | grep "$(wardend comet show-address)"
```

If the output is empty, your validator isn't in the active set.