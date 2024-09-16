---
sidebar_position: 2
---

# Fulfill requests from CLI

## Overview

This is a step-by-step guide explaining how to fulfill key and signature requests with your Keychain from the command line.

For generating keys and signing messages, you'll use the **CLIChain** (`clichain`) tool.

Learn more:

- For a list of CLIChain commands, see [Implementation: CLIChain](../implementations/clichain).
- To learn more about key and signature requests, see [Request flow](/learn/request-flow).

## Prerequisites

Before you start, complete the following prerequisites:

- [Run a local chain](/operate-a-node/run-a-local-chain) or [Join Buenavista](/operate-a-node/buenavista-testnet/join-buenavista). Make sure the node is running.
- Make sure you can request a new key – for example, from [SpaceWard](https://help.wardenprotocol.org/spaceward/manage-keys#request-a-key).
- [Create a Keychain](create-a-keychain).

## 1. Install CLIChain

To install CLIChain, run this:

```bash
go install ./cmd/clichain
```

## 2. Export variables

In the next steps, you'll use the following values:

- Your Keychain ID obtained when [registering a Keychain](create-a-keychain#2-register-a-keychain).
- Your Keychain Writer name you specified when [adding a Keychain Writer](create-a-keychain#3-add-a-keychain-writer).  

Export them as environment variables:

```bash
export KEYCHAIN_ID=my-keychain-id
export KEYCHAIN_WRITER_NAME=my-keychain-writer-name  
```

## 3. Fulfill a key request

When a user requests a new key, the Keychain generates a new private key, stores it securely, and submits the public key to the chain.

1. Use SpaceWard or the command line to create a new Space and request a new key.

2. Get all key requests: 

   ```bash
   wardend q warden key-requests --keychain-id $KEYCHAIN_ID
   ```

   Your key request ID will be returned in the `id` field of the output:

   ```json
   id=1
   ```

3. Export the request ID:
   
   ```bash
   export KEY_REQUEST_ID=1  # replace with the actual key request ID
   ```

4. Use the CLIChain [`generate`](../implementations/clichain#generate-a-private-key) command to generate the key:
   
   ```bash
   clichain generate -o private_$KEY_REQUEST_ID.key
   ```

5. Export the public key, derived with the CLIChain [`public-key`](../implementations/clichain#derive-a-public-key) command:
   
   ```
   export PUBLIC_KEY=$(go run ./cmd/clichain public-key -k private_$KEY_REQUEST_ID.key -o base64)
   ```

3. Fulfill the key request by submitting a transaction from the Keychain Writer account:
   
   ```bash
   wardend tx warden fulfill-key-request $KEY_REQUEST_ID $PUBLIC_KEY /
     --from $KEYCHAIN_WRITER_NAME --chain-id wardenprotocol
   ```

## 4. Fulfill a signature request

When a user requests a new key, the Keychain signs a message with the private key and submits the signature to the chain.

1. Use SpaceWard or the command line to create a new signature request.

2. Get all signature requests:

   ```bash
   wardend q warden signature-requests --keychain-id $KEYCHAIN_ID
   ```
   
   Your signature request ID and data for signing will be returned in the `id`  and `data_for_signing` fields of the output:
   
   ```bash
   id: 1
   data_for_signing: rx3uiUeGwwRgSgObBBRjyauN77OTQD6gPPLIWx64y/0=
   ```

3. Export your signature request data:

   ```bash
   export DATA=rx3uiUeGwwRgSgObBBRjyauN77OTQD6gPPLIWx64y/0= # replace with the actual data
   export SIGN_REQUEST_ID=1  # replace with the actual signature request ID
   ``` 

2. Use the CLIChain [`sign`](../implementations/clichain#sign-a-message) command to sign the message with the key generated in Step 3 and export the signature:
   
   ```bash
   export SIGNATURE=$(echo -n $DATA | base64 -d | clichain sign -k /tmp/key -o base64)
   ```
   
3. Fulfill the signature request by submitting a transaction from the Keychain Writer account:
   
   ```bash
   wardend tx warden fulfill-sign-request $SIGNATURE_REQUEST_ID $SIGNATURE \
     --from $KEYCHAIN_WRITER_NAME --chain-id wardenprotocol
   ```
