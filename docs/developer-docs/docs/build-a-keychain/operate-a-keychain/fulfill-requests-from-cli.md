---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fulfill requests from CLI

## Overview

This is a step-by-step guide explaining how to fulfill key and signature requests with your Keychain from the command line.

You'll interact with the node through [node commands](/operate-a-node/node-commands). For generating keys and signing messages, you'll use **CLIChain**—a command-line tool for managing cryptographic keys and operations.

You can either run a [local chain](/operate-a-node/run-a-local-chain) to test your configuration or interact with [Chiado testnet](/operate-a-node/chiado-testnet/join-chiado). In the provided code snippets, you'll find tabs with different versions of node commands.

Learn more:

- For a list of CLIChain commands, see [Implementation: CLIChain](../implementations/clichain).
- To learn more about key and signature requests, see [Request flow](/learn/request-flow).

## Prerequisites

If you wish to operate a Keychain locally, complete the following prerequisites:

- [Run a local chain](/operate-a-node/run-a-local-chain). If you used [manual configuration](/operate-a-node/run-a-local-chain#option-2-configure-manually), make sure you [created a Space](/operate-a-node/run-a-local-chain#5-add-more-settings).

- [Create a Keychain](create-a-keychain). You can skip it if you used our [`just` script](/operate-a-node/run-a-local-chain#option-1-run-a-just-script) to run the node with default settings.

To operate a Keychain on Chiado, complete these prerequisites:

- [Create a Keychain](create-a-keychain). These steps involve creating an account (key) on Chiado.

- Use your key to create a Space:

  ```
  wardend tx warden new-space \
    --from my-key-name \
    --fees 400000000award \
    --chain-id chiado_1001-1 \
    --node https://rpc.chiado.wardenprotocol.org:443
  ```

- Query Spaces. The list will contain Space IDs and account addresses. You should note down the Space ID associated with your address.

  ```
  wardend query warden spaces \
  --node https://rpc.chiado.wardenprotocol.org:443
  ```

## 1. Install CLIChain

To install CLIChain, navigate to the `wardenprotocol` directory and run this:

```bash
go install ./cmd/clichain
```

## 2. Set environment variables

The next steps require that you set your node and Keychain settings as environment variables. If you ran the node with our `just` script, you can use the predefined settings. Otherwise, use custom values.

   <Tabs>
   <TabItem value="local-default" label="Local node: default settings">
   ```bash
   export CHAIN_ID=warden_1337-1 
   export KEY_NAME=shulgin
   export SPACE_ID=1
   export KEYCHAIN_ID=1
   export KEYCHAIN_WRITER_NAME=shulgin
   ```
   </TabItem>
   <TabItem value="local-custom" label="Local node: custom settings">
   ```bash
   export CHAIN_ID=chain_123-1 
   export KEY_NAME=my-key-name
   export SPACE_ID=1
   export KEYCHAIN_ID=1
   export KEYCHAIN_WRITER_NAME=my-keychain-writer-name
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   export CHAIN_ID=chiado_10010-1
   export KEY_NAME=my-key-name
   export SPACE_ID=1
   export KEYCHAIN_ID=1
   export KEYCHAIN_WRITER_NAME=my-keychain-writer-name
   export RPC_URL=https://rpc.chiado.wardenprotocol.org:443
   ```
   </TabItem>
   </Tabs>

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
- `RPC_URL`: The RPC URL for interacting with Chiado.

## 3. Fulfill a key request

When a user requests a new key, the Keychain generates a new private key, stores it securely, and submits the public key to the chain. To test this flow, take the steps below.

1. Request a new key:


   <Tabs>
   <TabItem value="local" label="Local node">
   ```bash
   wardend tx warden new-action new-key-request \
     --from $KEY_NAME \
     --space-id $SPACE_ID \
     --keychain-id $KEYCHAIN_ID \
     --key-type KEY_TYPE_ECDSA_SECP256K1 \
     -y \
     --chain-id $CHAIN_ID \
   | wardend query wait-tx
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   wardend tx warden new-action new-key-request \
     --from $KEY_NAME \
     --space-id $SPACE_ID \
     --keychain-id $KEYCHAIN_ID \
     --key-type KEY_TYPE_ECDSA_SECP256K1 \
     --fees 400000000award \
     -y \
     --chain-id $CHAIN_ID \
     --node $RPC_URL
   ```
   </TabItem>
   </Tabs>

2. Get all key requests: 

   <Tabs>
   <TabItem value="local" label="Local node">
   ```bash
   wardend query warden key-requests --keychain-id $KEYCHAIN_ID
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   wardend query warden key-requests --keychain-id $KEYCHAIN_ID --node $RPC_URL
   ```
   </TabItem>
   </Tabs>

   Your request ID will be returned in the `id` field of the output:

   ```bash
   key_requests:
   - creator: warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
     deducted_keychain_fees: []
     # highlight-next-line
     id: "1"
     key_type: KEY_TYPE_ECDSA_SECP256K1
     keychain_id: "1"
     space_id: "1"
     status: KEY_REQUEST_STATUS_PENDING
   pagination:
     total: "1"
   ```

3. Set the request ID as an environment variable, as shown in the command below. Replace `1` with the actual ID you obtained.
   
   ```bash
   export KEY_REQUEST_ID=1
   ```

4. Use the CLIChain [`generate` command](../implementations/clichain#generate-a-private-key) to generate the key:
   
   ```bash
   clichain generate -o private_$KEY_REQUEST_ID.key
   ```

5. Set the public key, derived with the CLIChain [`public-key` command](../implementations/clichain#derive-a-public-key), as an environmental variable:
   
   ```
   export PUBLIC_KEY=$(go run ./cmd/clichain public-key -k private_$KEY_REQUEST_ID.key -o base64)
   ```

6. Fulfill the request by submitting a transaction from the Keychain Writer account:
   
   <Tabs>
   <TabItem value="local" label="Local node">
   ```bash
   wardend tx warden fulfill-key-request $KEY_REQUEST_ID $PUBLIC_KEY \
     --from $KEYCHAIN_WRITER_NAME \
     --chain-id $CHAIN_ID
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   wardend tx warden fulfill-key-request $KEY_REQUEST_ID $PUBLIC_KEY \
     --from $KEYCHAIN_WRITER_NAME \
     --fees 400000000award \
     --chain-id $CHAIN_ID \
     --node $RPC_URL
   ```
   </TabItem>
   </Tabs>

7. Check the request status to make sure it was fulfilled:

   <Tabs>
   <TabItem value="local" label="Local node">
   ```bash
   wardend query warden key-request-by-id --id=$KEY_REQUEST_ID
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   wardend query warden key-request-by-id --id=$KEY_REQUEST_ID --node $RPC_URL
   ```
   </TabItem>
   </Tabs>

   Your request status will be returned in the `status` field of the output: 

   ```bash
   key_request:
     creator: warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
     deducted_keychain_fees: []
     id: "1"
     key_type: KEY_TYPE_ECDSA_SECP256K1
     keychain_id: "1"
     space_id: "1"
     # highlight-next-line
     status: KEY_REQUEST_STATUS_FULFILLED
   ```

## 4. Fulfill a signature request

When a user requests a signature, the Keychain signs a message with the private key and submits the signature to the chain. To test this flow, take the steps below. We'll create a signature using the key generated in the previous step.

1. Create a signature request:

   <Tabs>
   <TabItem value="local" label="Local node">
   ```bash
   wardend tx warden new-action new-sign-request \
     --from $KEY_NAME \
     --input "MrT1dvxgez7QoVFudyVn5S8xCTJjxUi5xxZyWHcji5Q=" \
     --key-id $KEY_REQUEST_ID \
     -y \
     --chain-id $CHAIN_ID \
   | wardend query wait-tx
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   wardend tx warden new-action new-sign-request \
     --from $KEY_NAME \
     --input "MrT1dvxgez7QoVFudyVn5S8xCTJjxUi5xxZyWHcji5Q=" \
     --key-id $KEY_REQUEST_ID \
     --fees 400000000award \
     -y \
     --chain-id $CHAIN_ID \
     --node $RPC_URL
   ```
   </TabItem>
   </Tabs>

   :::tip
   In the `--input` flag, you should provide a Base64-encoded hash. For testing purposes, you can use the hash from the example above. Alternatively, you can create one yourself—run the following command, replacing `00112233` with arbitrary raw data:

   ```bash
   RAW_DATA="00112233"
   HASH=$(echo -n $RAW_DATA | sha256sum | awk '{print $1}')
   BASE64_HASH=$(echo -n $HASH | xxd -r -p | base64)
   ```

   Then create a signature request. In the `--input` flag, specify `$BASE64_HASH`.
   :::

2. Get all signature requests:

   <Tabs>
   <TabItem value="local" label="Local node">
   ```bash
   wardend query warden sign-requests --keychain-id $KEYCHAIN_ID
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   wardend query warden sign-requests --keychain-id $KEYCHAIN_ID --node $RPC_URL
   ```
   </TabItem>
   </Tabs>
   
   Your request ID and data for signing will be returned in the `id` and `data_for_signing` fields of the output:

   ```bash
   pagination:
     total: "1"
   - Result: null
     creator: warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
     # highlight-next-line
     data_for_signing: MrT1dvxgez7QoVFudyVn5S8xCTJjxUi5xxZyWHcji5Q=
     deducted_keychain_fees: []
     # highlight-next-line
     id: "1"
     key_id: "1"
     status: SIGN_REQUEST_STATUS_PENDING
   ```

3. Set the request details as environment variables, as shown below. Specify the actual request ID and data you obtained.

   ```bash
   export DATA=MrT1dvxgez7QoVFudyVn5S8xCTJjxUi5xxZyWHcji5Q=
   export SIGN_REQUEST_ID=1
   ``` 

4. Use the CLIChain [`sign` command](../implementations/clichain#sign-a-message) to sign the message with the key generated in the previous step. Set the signature as an environment variable.
   
   ```bash
   export SIGNATURE=$(echo -n $DATA | base64 -d | clichain sign -k private_$KEY_REQUEST_ID.key -o base64)
   ```
   
5. Fulfill the signature request by submitting a transaction from the Keychain Writer account:

   <Tabs>
   <TabItem value="local" label="Local node">
   ```bash
   wardend tx warden fulfill-sign-request $SIGN_REQUEST_ID $SIGNATURE \
     --from $KEYCHAIN_WRITER_NAME \
     --chain-id $CHAIN_ID
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   wardend tx warden fulfill-sign-request $SIGN_REQUEST_ID $SIGNATURE \
     --from $KEYCHAIN_WRITER_NAME \
     --fees 400000000award \
     --chain-id $CHAIN_ID \
     --node $RPC_URL
   ```
   </TabItem>
   </Tabs>

6. Check the request status to make sure it was fulfilled:

   <Tabs>
   <TabItem value="local" label="Local node">
   ```bash
   wardend query warden sign-request-by-id --id=$SIGN_REQUEST_ID
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   wardend query warden sign-request-by-id --id=$SIGN_REQUEST_ID --node $RPC_URL
   ```
   </TabItem>
   </Tabs>

   Your request status will be returned in the `status` field of the output: 

   ```bash
   sign_request:
   Result:
     type: SignedData
     value:
       signed_data: a0OHXtOgLHHP6qXxehlkImIjefA9fWZyuaD8hwzj4aMPiDkjvPLstu2I0+Ntcjz6wa1bh3+NGpqNKmWpqOlyiQE=
   creator: warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
   data_for_signing: MrT1dvxgez7QoVFudyVn5S8xCTJjxUi5xxZyWHcji5Q=
   deducted_keychain_fees: []
   id: "1"
   key_id: "1"
   # highlight-next-line
   status: SIGN_REQUEST_STATUS_FULFILLED
   ```

## Next steps

To start building a Keychain service, follow [Build a Keychain app](../build-a-keychain-app).
