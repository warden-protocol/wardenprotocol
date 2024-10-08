---
sidebar_position: 2
---

# Fulfill requests from CLI

## Overview

This is a step-by-step guide explaining how to fulfill key and signature requests with your Keychain from the command line. For generating keys and signing messages, you'll use the **CLIChain** (`clichain`) tool.

Learn more:

- For a list of CLIChain commands, see [Implementation: CLIChain](../implementations/clichain).
- To learn more about key and signature requests, see [Request flow](/learn/request-flow).

:::tip
In this guide, you'll interact with a [local chain](/operate-a-node/run-a-local-chain) and create key and signature requests using [node commands](/operate-a-node/node-commands). Alternatively, you can [Join Buenavista](/operate-a-node/buenavista-testnet/join-buenavista) and take the same steps but create requests using [SpaceWard](https://help.wardenprotocol.org).
:::

## Prerequisites

Before you start, complete the following prerequisites:

- [Run a local chain](/operate-a-node/run-a-local-chain). If you used [manual configuration](/operate-a-node/run-a-local-chain#option-2-configure-manually), make sure you [created a Space](/operate-a-node/run-a-local-chain#5-add-more-settings).
- [Create a Keychain](create-a-keychain). You can skip it if you used our [`just` script](/operate-a-node/run-a-local-chain#option-1-run-a-just-script) to run the node.


## 1. Install CLIChain

To install CLIChain, navigate to the `wardenprotocol` directory and run this:

```bash
go install ./cmd/clichain
```

## 2. Export variables

The next steps require that you export your node and Keychain settings as environment variables.

If you used our `just` script to run the node, you can export the predefined settings:

```bash
export CHAIN_ID=warden_1337-1 
export KEY_NAME=shulgin
export SPACE_ID=1
export KEYCHAIN_ID=1
export KEYCHAIN_WRITER_NAME=shulgin
```

Otherwise, use custom values:

```bash
export CHAIN_ID=chain_123-1 
export KEY_NAME=my-key-name
export SPACE_ID=1
export KEYCHAIN_ID=1
export KEYCHAIN_WRITER_NAME=my-keychain-writer-name
```

- `CHAIN_ID`: The chain ID you used when running a node.  
  Returned by `wardend status` in the `network` field.
- `KEY_NAME`: Your local account name, or key name.  
  Returned by `wardend keys list`.
- `SPACE_ID`: Your Space ID.  
  Returned by `wardend query warden spaces`.
- `KEYCHAIN_ID`: Your Keychain ID obtained when [registering a Keychain](create-a-keychain#2-register-a-keychain).  
  Returned by `wardend query warden keychains` in the `id` field.
- `KEYCHAIN_WRITER_NAME`: Your Keychain Writer name specified when [adding a Keychain Writer](create-a-keychain#3-add-a-keychain-writer).  
  Returned by `wardend keys list`.

## 3. Fulfill a key request

When a user requests a new key, the Keychain generates a new private key, stores it securely, and submits the public key to the chain. To test this flow, take the steps below.

1. Request a new key:
   
   ```
   wardend tx warden new-action new-key-request \
     --space-id $SPACE_ID --keychain-id $KEYCHAIN_ID --key-type KEY_TYPE_ECDSA_SECP256K1 \
     --from $KEY_NAME -y --chain-id $CHAIN_ID | wardend q wait-tx
   ```

2. Get all key requests: 

   ```bash
   wardend query warden key-requests --keychain-id $KEYCHAIN_ID
   ```

   Your request ID will be returned in the `id` field of the output:

   ```json
   id: "1"
   ```

3. Export the request ID using the command below. Replace `1` with the actual ID you obtained.
   
   ```bash
   export KEY_REQUEST_ID=1
   ```

4. Use the CLIChain [`generate`](../implementations/clichain#generate-a-private-key) command to generate the key:
   
   ```bash
   clichain generate -o private_$KEY_REQUEST_ID.key
   ```

5. Export the public key, derived with the CLIChain [`public-key`](../implementations/clichain#derive-a-public-key) command:
   
   ```
   export PUBLIC_KEY=$(go run ./cmd/clichain public-key -k private_$KEY_REQUEST_ID.key -o base64)
   ```

6. Fulfill the request by submitting a transaction from the Keychain Writer account:
   
   ```bash
   wardend tx warden fulfill-key-request $KEY_REQUEST_ID $PUBLIC_KEY \
     --from $KEYCHAIN_WRITER_NAME --chain-id $CHAIN_ID
   ```

7. Check the request status to make sure it was fulfilled:

   ```
   wardend query warden key-request-by-id --id=$KEY_REQUEST_ID
   ```

   Your request status will be returned in the `status` field of the output: 

   ```
   status: KEY_REQUEST_STATUS_FULFILLED
   ```

## 4. Fulfill a signature request

When a user requests a new key, the Keychain signs a message with the private key and submits the signature to the chain. To test this flow, take the steps below.

1. Create a signature request:

   ```
   wardend tx warden new-action new-sign-request --from $KEY_NAME \
     --input "MrT1dvxgez7QoVFudyVn5S8xCTJjxUi5xxZyWHcji5Q=" \
     --key-id 1 -y --chain-id $CHAIN_ID | wardend q wait-tx
   ```

   :::tip
   In the `--input` flag, you should provide a Base64-encoded hash. For testing purposes, you can use the hash from the example above. Alternatively, you can create one yourself – run the following command, replacing `00112233` with arbitrary raw data:

   ```
   RAW_DATA="00112233"
   HASH=$(echo -n $RAW_DATA | sha256sum | awk '{print $1}')
   BASE64_HASH=$(echo -n $HASH | xxd -r -p | base64)
   ```

   Then run a signature request with the `$BASE64_HASH` variable in the `--input` flag:

   ```
   wardend tx warden new-action new-sign-request --from $KEY_NAME \
    --input $BASE64_HASH \
    --key-id 1 -y --chain-id $CHAIN_ID | wardend q wait-tx
   ```
   :::

2. Get all signature requests:

   ```bash
   wardend query warden sign-requests --keychain-id $KEYCHAIN_ID
   ```
   
   Your request ID and data for signing will be returned in the `id` and `data_for_signing` fields of the output:
   
   ```bash
   id: "1"
   data_for_signing: MrT1dvxgez7QoVFudyVn5S8xCTJjxUi5xxZyWHcji5Q=
   ```

3. Export the request details using the command below. Specify the actual request ID and data you obtained.

   ```bash
   export DATA=MrT1dvxgez7QoVFudyVn5S8xCTJjxUi5xxZyWHcji5Q=
   export SIGN_REQUEST_ID=1
   ``` 

4. Use the CLIChain [`sign`](../implementations/clichain#sign-a-message) command to sign the message with the key generated in [Step 3](#3-fulfill-a-key-request). Export the signature.
   
   ```bash
   export SIGNATURE=$(echo -n $DATA | base64 -d | clichain sign -k private_$KEY_REQUEST_ID.key -o base64)
   ```
   
5. Fulfill the signature request by submitting a transaction from the Keychain Writer account:
   
   ```bash
   wardend tx warden fulfill-sign-request $SIGN_REQUEST_ID $SIGNATURE \
     --from $KEYCHAIN_WRITER_NAME --chain-id $CHAIN_ID
   ```

6. Check the request status to make sure it was fulfilled:

   ```
   wardend query warden sign-request-by-id --id=$KEY_REQUEST_ID
   ```

   Your request status will be returned in the `status` field of the output: 

   ```
   status: SIGN_REQUEST_STATUS_FULFILLED
   ```
