---
sidebar_position: 2
---

# Create a Keychain

## Overview

To become a **Keychain operator**, you need to create and configure a Keychain entity on-chain, as shown in this guide.

:::tip
In the steps below, you'll interact with a [local chain](/operate-a-node/run-a-local-chain). To become an actual Keychain operator, you need to [join Buenavista](/operate-a-node/buenavista-testnet/join-buenavista) instead. However, we recommend running a local chain first to test your configuration.
:::

:::tip
You can skip this guide and test a preconfigured Keychain. Just run a local node using a [`just` script](/operate-a-node/run-a-local-chain#option-1-run-a-just-script) or a [devnet snapshot](/operate-a-node/run-a-local-chain#option-2-use-a-devnet-snapshot) and [start fulfilling requests](fulfill-requests-from-cli).
:::

## 1. Run a node

1. Run a local chain as explained here: [Run a local chain](/operate-a-node/run-a-local-chain).
   
   For the rest of this guide, we'll assume you have a running Warden Protocol node with a local account (key) that has a few [WARD tokens](/tokens/ward-token/ward). You'll use these tokens to fund the Keychain and its Writers.
   
2. The next steps require your local account name, or key name. It's referenced as `my-key-name` in the provided command-line examples.

   You can check the list of available keys by executing this command:

   ```bash
   wardend keys list
   ```
   
   To check the local account balance, run this:
   
   ```bash
   wardend query bank balances my-key-name
   ```
   
   :::tip
   If you used a `just` script or a devnet snapshot to run your node, the local account name is `shulgin`.
   :::

3. In some of the commands, you'll also need to specify your chain ID. The actual value depends on the configuration you used when running your node.

   To check your chain ID, run this:

   ```
   wardend status
   ```

   See the `network` field in the output.

   :::tip
   If you used a `just` script or a devnet snapshot to run your node, the chain ID is `warden_1337-1`.
   :::

## 2. Register a Keychain

The following steps show how to register a new Keychain entity on-chain.

1. Run this command to create a new Keychain:

   ```bash
   wardend tx warden new-keychain \
     --name 'my-keychain-name' \
     --from my-key-name \
     --chain-id chain_123-1 \
   ```

   Specify the required details:

   - `name`: The Keychain name
   - `from`: Your local account name (key name)
   - `chain-id`: The ID of the chain you're running

   Optionally, you can also set the following:

   - `description`: The Keychain description
   - `keychain-fees`: Keychain fees in aWARD (0.000000000000000001 WARD)
        - `key_req`: A fee for creating a key pair
        - `sig_req`: A fee for signing a transaction
   - For more settings, see `wardend tx warden new-keychain --help`.

2. Confirm the transaction. A new Keychain object will be created on-chain.

3. Every Keychain is created with a **Keychain ID** that identifies it in key and signature requests and collects fees from users. You'll need this ID to operate your Keychain. Run the following command and check the `id` field in the output:

   ```bash
   wardend query warden keychains
   ```
   ```bash
   keychains:
   - admins:
     - warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
     creator: warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
     description: my-keychain-description
     fees:
       key_req:
      - amount: "100"
        denom: award
    sig_req:
      - amount: "1"
        denom: award
     id: "1"
     name: my-keychain-name
   pagination:
     total: "1"
   ```

## 3. Add a Keychain Writer

A Keychain Writer is an account that can write Keychain results (public keys and signatures) to the chain. The Keychain Writers list is essentially an allowlist of accounts that can interact on behalf of the Keychain.

To add a Keychain Writer, take these steps:

1. Create a new key (account) with a preferred name:

   ```bash
   wardend keys add my-keychain-writer-name
   ```
   The output should look like this:

   ```bash
   - address: warden18my6wqsrf5ek85znp8x202wwyg8rw4fqhy54k2
     name: my-keychain-writer-name
     pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A2cECb3ziw5/LzUBUZIChyek3bnGQv/PSXHAH28xd9/Q"}'
     type: local
   
   
   **Important** write this mnemonic phrase in a safe place. It is the only way to recover your account if you ever forget your password.
   
   virus boat radio apple pilot ask vault exhaust again state doll stereo slide exhibit scissors miss attack boat budget egg bird mask more trick
   ```

2. Write down the **mnemonic phrase** and the **address** of the new account. You'll need this information to interact with the chain and restore the account. Note that only this address will be able to publish signatures and public keys on behalf of the Keychain.

3. Fund the account with some tokens. Specify your key name, the Keychain Writer name, and chain ID:

   ```bash
   wardend tx bank send my-key-name $(wardend keys show -a my-keychain-writer-name) \
     1000000000000000000award \
     --chain-id chain_123-1
   ```

   To check the Keychain Writer balance, run this:
   
   ```bash
   wardend query bank balances my-keychain-writer-name
   ```

   :::tip
   In this example, we used `$(wardend keys show -a my-keychain-writer-name)` to get the Keychain Writer address by its name. Alternatively, you can just specify the address obtained in the previous step.
   :::

4. Finally, add the Writer account to your Keychain. Specify the Keychain ID from [Step 2.3](#2-register-a-keychain) and other details:
   
   ```
   wardend tx warden add-keychain-writer --from my-key-name \
   --keychain-id 1 --writer $(wardend keys show -a my-keychain-writer-name) \
   --chain-id chain_123-1
   ```

   To check the result, get the list of Keychains:

   ```
   wardend query warden keychains
   ```

   In the output, find your Keychain and check the `writers` list:

   ```
   keychains:
   - admins:
     - warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
     creator: warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
     description: my-keychain-description
     fees:
       key_req:
      - amount: "100"
        denom: award
    sig_req:
      - amount: "1"
        denom: award
     id: "1"
     name: my-keychain-name
     writers:
       - warden18my6wqsrf5ek85znp8x202wwyg8rw4fqhy54k2
   pagination:
     total: "1"
   ```

## Next steps

The next steps depend on your goals:

- To become an actual Keychain operator, [join Buenavista](/operate-a-node/buenavista-testnet/join-buenavista) and create a Keychain there.
- To start fulfilling key and signature requests, follow this guide: [Fulfill requests from CLI](fulfill-requests-from-cli).
- To start building a Keychain service, follow [Build a Keychain app](../build-a-keychain-app).