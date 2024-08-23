---
sidebar_position: 2
---

# Run a Keychain from CLI

Goal: fulfill key requests and signature requests locally, from the command line.

Prerequisites:

-   The chain is running
-   You can request a new key (e.g. from SpaceWard)

## 1. Create a Keychain

If running locally, you can skip this step and assume an initial Keychain was set up at genesis:

```
KEYCHAIN_ID:           1
KEYCHAIN_WRITER_NAME:  shulgin
KEYCHAIN_WRITER:       warden10kmgv5gzygnecf46x092ecfe5xcvvv9r870rq4
```

Otherwise, you can create a new Keychain with the following command:

```bash
wardend tx warden new-keychain --description 'Local Clichain' --from shulgin --chain-id wardenprotocol
```

Then, you can query the Keychain ID and note it as `KEYCHAIN_ID`:

```bash
wardend query warden keychains
  description: "Local Clichain!"
  id: "2"
  ...

export KEYCHAIN_ID=2  # replace with the actual keychain ID
```

Create a new key to be used as your Keychain Writer:

```bash
export KEYCHAIN_WRITER_NAME=my-keychain-writer
wardend keys add $KEYCHAIN_WRITER_NAME

export KEYCHAIN_WRITER=$(wardend keys show -a $KEYCHAIN_WRITER_NAME)
```

And fund it with some tokens:

```bash
wardend tx bank send shulgin $KEYCHAIN_WRITER 10000uward --chain-id wardenprotocol
```

Finally, let's add the address as a Keychain Writer:

```bash
wardend tx warden add-keychain-writer --keychain-id $KEYCHAIN_ID --writer $KEYCHAIN_WRITER --from shulgin --chain-id wardenprotocol
```

You Keychain is ready to be used.

## 2. Install `clichain`

`clichain` is a tool to generate keys and sign messages from the CLI.

You can install it with:

```bash
go install ./cmd/clichain
```

## 3. Fulfill a key request

Use SpaceWard or the CLI to create a new Space and request a new key for your Keychain.

You'll be able to see the key request from the CLI:

```bash
wardend q warden key-requests --keychain-id $KEYCHAIN_ID
  id: 1
  ...

export KEY_REQUEST_ID=1  # replace with the actual key request ID
```

The Keychain job is to generate a new private key, store it securely, and submit the public key to the chain.

We can use a tool called `clichain` to generate the key.

```bash
clichain generate -o private_$KEY_REQUEST_ID.key

export PUBLIC_KEY=$(go run ./cmd/clichain public-key -k private_$KEY_REQUEST_ID.key -o base64 )
```

Then, we can fulfill the Key request by submitting a transaction from our Keychain Writer account:

```bash
wardend tx warden fulfill-key-request $KEY_REQUEST_ID $PUBLIC_KEY --from $KEYCHAIN_WRITER_NAME --chain-id wardenprotocol
```

The Key request is now fulfilled.

## 4. Fulfill a signature request

Use SpaceWard or the CLI to create a new signature request.

You'll be able to see the signature request from the CLI:

```bash
wardend q warden signature-requests --keychain-id $KEYCHAIN_ID
  id: 1
  data_for_signing: rx3uiUeGwwRgSgObBBRjyauN77OTQD6gPPLIWx64y/0=
  ...

# note the data_for_signing and the id of the request
export DATA=rx3uiUeGwwRgSgObBBRjyauN77OTQD6gPPLIWx64y/0=
export SIGN_REQUEST_ID=1  # replace with the actual signature request ID
```

The Keychain job is to sign a message with the private key and submit the signature to the chain.

We can use `clichain` again to sign the message with the key we generated in the previous step.

```bash
export SIGNATURE=$(echo -n $DATA | base64 -d | clichain sign -k /tmp/key -o base64)
```

Then, we can fulfill the signature request by submitting a transaction from our Keychain Writer account:

```bash
wardend tx warden fulfill-sign-request $SIGNATURE_REQUEST_ID $SIGNATURE --from $KEYCHAIN_WRITER_NAME --chain-id wardenprotocol
```

The signature request is now fulfilled.
