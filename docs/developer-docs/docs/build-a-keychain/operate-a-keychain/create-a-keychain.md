---
sidebar_position: 2
---

# Create a Keychain

## Overview

To become a **Keychain operator**, you need to create and configure a Keychain entity on-chain, as shown in this guide.

## 1. Run a node

1. Run a local chain as explained here: [Run a local chain](/operate-a-node/run-a-local-chain).

    To become an actual Keychain operator, you need to [join Buenavista](/operate-a-node/buenavista-testnet/join-buenavista) instead. However, we recommend running a local chain first to test your configuration.

    For the rest of this guide, we'll assume you have a running Warden Protocol node with a local account (key) that has a few [WARD tokens](/tokens/ward-token/ward). You'll use these tokens to fund the Keychain and its Writers.

2. The next steps require your local account name, or **key name**. It's referenced as `my-key-name` in the provided command-line examples.

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

3. In some of the commands, you'll also need to specify your **chain ID**, referenced as `my-chain-id`. The actual value depends on the configuration you used when running your node.

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
      --description 'my-keychain-description' \
      --keychain-fees "{\"key_req\":[{\"amount\":\"100\",\"denom\":\"award\"}],\"sig_req\":[{\"amount\":\"1\",\"denom\":\"award\"}]}" \
      --from my-key-name \
      --chain-id chain_123-1
    ```

    Specify the following details:

    - `description` (optional): The Keychain description
    - `keychainFees`(optional):
         - `key_req`: A fee in aWARD for creating a key pair
         - `key_req`: A fee in aWARD for signing a transaction
    - `from`: Your local account name (key name)
    - `chain-id`: The ID of the chain you're running

    **Note**: aWARD equals 0.000000000000000001 WARD.

2. Enter your passphrase if needed and confirm the transaction. A new Keychain object will be created on-chain.

3. Every Keychain is created with a **Keychain ID** that identifies it in key and signature requests and collects fees from users. You'll need this ID to operate your Keychain. Run the following command and check the `id` field in the output:

    ```bash
    wardend query warden keychains
    ```
    ```bash
    keychains:
    - admins:
      - warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
      creator: warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
      description: my-description
      id: "1"
    pagination:
      total: "1"
    ```

## 3. Add a Keychain Writer

A Keychain Writer is an account that can write Keychain results (public keys and signatures) to the chain. The Keychain Writers list is essentially an allowlist of accounts that can interact on behalf of the Keychain.

To add a Keychain Writer, take these steps:

1. Initiate a `MsgAddKeychainWriter` transaction. Specify your Keychain Writer name:

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

2. Note down the **mnemonic phrase** and the **address** of the new account. You'll need this information to interact with the chain.

   :::tip
   Only the Keychain Writer address will be able to publish signatures and public keys on behalf of the Keychain.
   :::


3. Fund the new account with some tokens. Specify your key name, the Keychain Writer address, and chain ID:

    ```bash
    wardend tx bank send my-key-name \
      $(wardend keys show -a my-keychain-writer-name) \
      1000000000000000000award \
      --chain-id my-chain-id
    ```

    To check the Keychain Writer balance, run this:
    
    ```bash
    wardend query bank balances my-keychain-writer-name
    ```

## Next steps

The next steps depend on your goals:

- To become an actual Keychain operator, [join Buenavista](/operate-a-node/buenavista-testnet/join-buenavista) and create a Keychain there.
- To start fulfilling key and signature requests, follow this guide: [Fulfill requests from CLI](fulfill-requests-from-cli).
- To start building a Keychain service, follow [Build a Keychain app](../build-a-keychain-app).