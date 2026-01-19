---
sidebar_position: 3
---

# Create a validator

:::important
Barra is our new EVM testnet, currently available only to selected validators.
:::

This is a simple step-by-step guide for setting up a validator on the Barra testnet. It's not a guide on validator architecture or security features.

## Prerequisites

The following instructions assume you have already set up a full node and are synchronized to the latest block height. If you haven't done so, please follow the [Join Barra](join-barra) instructions.

## 1. Create/restore a key pair

The first step is to create a new key pair for your validator. Replace `KEY_NAME` with a key name of your choice and run the following:

```bash
wardend keys add KEY_NAME
```

:::warning
After creating a new key, you'll see its information and its seed phrase. It's essential to write down this seed phrase and keep it in a safe place. The seed phrase is the only way to restore your keys. Losing it can result in the irrecoverable loss of WARD tokens.
:::

Alternatively, you can restore an existing wallet with a mnemonic seed phrase. Replace `KEY_NAME` with a key name of your choice and run the following:

```bash
wardend keys add KEY_NAME --recover
```

Then get your public address:

```bash
wardend keys show KEY_NAME --address
```

## 2. Get testnet WARD

In the next steps, you'll register your new validator by submitting a `create-validator` transaction. Transactions consume gas, so you need to fund your newly created address from the first step.

You can obtain testnet **WARD** from our faucet:

- [Barra faucet](https://faucet.wardenprotocol.org)

To verify your balance, use this command:

```bash
wardend query bank balances KEY_NAME
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

2. Create a file named `validator.json` with the following contents:

   ```json
   {
     "pubkey": {
       "@type": "/cosmos.crypto.ed25519.PubKey",
       "key": "lR1d7YBVK5jYijOfWVKRFoWCsS4dg3kagT7LB9GnG8I="
     },
     "amount": "1000000000000000000award",
     "moniker": "your validator human-readable name (moniker)",
     "identity": "your validator identity signature",
     "website": "(optional) your validator website",
     "security": "(optional) your validator security contact",
     "details": "(optional) your validator details",
     "commission-rate": "0.1",
     "commission-max-rate": "0.2",
     "commission-max-change-rate": "0.01",
     "min-self-delegation": "1"
   }
   ```

   Here you have the chance to set the commission rate, maximum rate, and maximum change rate for your validator. You can also make the initial self-delegation (`amount`). Remember to replace the `pubkey` field with your own key obtained in the previous step.

   :::warning
   When you specify commission parameters, the `commission-max-change-rate` is measured as a percentage point change of the `commission-rate`. For example, a change from 1% to 2% is a 100% rate increase, but the `commission-max-change-rate` is measured as 1%.
   :::

3. Finally, you're ready to submit a transaction for creating the validator. Specify your key (account) name and other parameters:

   ```bash
   wardend tx staking create-validator \
     --from KEY_NAME \
     --chain-id barra_9191-1 \
     --amount 1000000000000000000award \
     --commission-rate 0.05 \
     --commission-max-rate 0.1 \
     --commission-max-change-rate 0.1 \
     --pubkey "$(wardend comet show-validator)" \
     --gas auto \
     --gas-adjustment 1.3 \
     --fees 250000000000000award
   ```

   :::tip
   This transaction is just an example. For explanations of parameter values and all available flags to customize your validator, run this [command](../node-commands):

   ```bash
   wardend tx staking create-validator --help
   ```
   :::

## 4. Back up critical files

There are certain files you need to back up to be able to restore your validator if, for some reason, it's damaged or lost. Please make a secure, encrypted backup of the following files:

- `priv_validator_key.json`
- `node_key.json`

## 5. Check your validator

Check if your validator is in the active set by running this command:

```bash
wardend query comet-validator-set | grep "$(wardend comet show-address)"
```

If the output is empty, your validator isn't in the active set.

## Next steps

You're now all set to start validating! You can take these next steps:

- To learn how to operate an oracle service, see [Operate Skip:Connect](../operate-skip-connect).
- To learn more about `wardend` commands for interacting with the node, see [Node commands](../node-commands).
- Don't forget to join our community in [Discord](https://discord.com/invite/wardenprotocol).
