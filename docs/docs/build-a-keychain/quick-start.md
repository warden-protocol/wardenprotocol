---
sidebar_position: 2
---

# Quick start

## Overview

This guide will walk you through the process of building a [Keychain](/learn/glossary#keychain) in Go with the Keychain SDK.

## Prerequisites

You need to install the following:

- [Go](https://golang.org/dl/) 1.22 or later
- `make`

## 1. Prepare the chain

### 1.1. Run a node

You can:

- [Run a local chain](/build-an-oapp/test/run-a-local-chain)
- [Connect to our Buenavista testnet](/operate-a-node/networks/join-buenavista)

For the rest of this guide, we'll assume you have a running Warden Protocol node with a local account that has a few WARD tokens. The local account will be used to fund the Keychain and its Writers and referenced as `<your-key>` in the following commands.

Check the list of available accounts by running this command:

```bash
wardend keys list
```

Check the local account balance:

```bash
wardend query bank balances <your-key>
```

:::tip

In development genesis files, you'll typically find an account named `shulgin` that is ready to be used.

:::

### 1.2. Create a Keychain entity

You need to register your Keychain entity on-chain.

1. Initiate a `MsgNewKeychain` transaction by running this command:
    
    ```bash
    wardend tx warden new-keychain \
      --description 'My Keychain' \
      --keychain-fees \
      '{"key_req": [{"amount": "100", "denom": "uward"}], \
      "sig_req": [{"amount": "0", "denom": "uward"}]}' \
      --from <your-key> \
      --chain-id wardenprotocol
    ```

    Specify the following details:

    - `description` (optional): The Keychain description
    - `keychainFees`(optional):
         - `key_req`: A fee in uWARD for creating a key pair
         - `key_req`: A fee in uWARD for signing a transaction
    - `from`: Your local account
    - `chain-id`: The chain ID – `wardenprotocol`

3. A new Keychain object will be created on-chain with its dedicated [Keychain ID](/learn/glossary#keychain-id). Get the ID:
    
    ```bash
    wardend query warden keychains
    ```
    This ID will be used in the next steps, referenced as `<keychain-id>`.

### 1.3. Add a Keychain Writer

A Keychain Writer is an account that can write Keychain results (public keys and signatures) to the chain. The Keychain Writers list is essentially an allowlist of accounts that can interact on behalf of the Keychain.

To add a Keychain Writer, take these steps:

1. Initiate a `MsgAddKeychainWriter` transaction by running the following command:

    ```bash
    wardend keys add my-keychain-writer
    ```

2. The output will be similar to the following:

    ```bash
    - address: warden18my6wqsrf5ek85znp8x202wwyg8rw4fqhy54k2
      name: my-keychain-writer
      pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A2cECb3ziw5/LzUBUZIChyek3bnGQv/PSXHAH28xd9/Q"}'
      type: local
    
    
    **Important** write this mnemonic phrase in a safe place. It is the only way to recover your account if you ever forget your     password.
    
    virus boat radio apple pilot ask vault exhaust again state doll stereo slide exhibit scissors miss attack boat budget egg     bird mask more trick
    ```

    :::tip
    Only the Keychain Writer address, returned as `address`, will be able to publish signatures and public keys on behalf of the Keychain.
    :::

3. Note down the mnemonic phrase and the address of the new account, it'll be needed to configure the Keychain SDK and interact with the chain using this account.

4. Fund the new account with some tokens (1 WARD in this example):
    
    ```bash
    wardend tx bank send <your-key> \
      $(wardend keys show -a my-keychain-writer) \
      1000000uward \
      --chain-id wardenprotocol
    ```
## 2. Build a Go app

### 2.1. Scaffold a Go app

1. Create a new Go app using the following command:

    ```bash
    mkdir my-keychain
    cd my-keychain
    go mod init my-keychain
    ```

    This will create a new Go module called `my-keychain`.

2. Create a new Go file called `main.go` with the following content:
    
    ```go
    // main.go
    
    package main
    
    func main() {
        // ...
    }
    ```

### 2.2. Import the Keychain SDK

1. Add the Keychain SDK to your Go module by running this:
    
    ```bash
    go get github.com/warden-protocol/wardenprotocol/keychain-sdk
    ```

2. Import and use the SDK in your `main.go` file to create an `App` instance:
    
    ```go
    // main.go
    
    package main
    
    import (
        "context"
    
        "github.com/warden-protocol/wardenprotocol/keychain-sdk"
    )
    
    func main() {
        app := keychain.NewApp(keychain.Config{ })
    }
    ```

### 2.3. Configure the app

Before starting the app, you need to configure it with the necessary information.

You'll find a basic configuration for connecting to a local Warden Protocol node below. Make the following adjustments:

- Replace `<your-keychain-id>` with the ID of the Keychain entity you created earlier
- Replace the mnemonic phrase with the one for the Keychain Writer.

```go
package main

import (
    "context"
    "log/slog"
    "os"
    "time"

    "github.com/warden-protocol/wardenprotocol/keychain-sdk"
)

func main() {
    logger := slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{
        Level: slog.LevelDebug,
    }))

    app := keychain.NewApp(keychain.Config{
        Logger: logger, // not required, but recommended

        // setup the connection to the Warden Protocol node
        ChainID:      "wardenprotocol",
        GRPCURL:      "localhost:9090",
        GRPCInsecure: true,

        // setup the account used to write txs
        KeychainId:     <your-keychain-id>,
        Mnemonic:       "virus boat radio apple pilot ask vault exhaust again state doll stereo slide exhibit scissors miss attack boat budget egg bird mask more trick",
        DerivationPath: "m/44'/118'/0'/0/0",

        // setup throughput for batching responses
        GasLimit:     400000,
        BatchTimeout: 8 * time.Second,
        BatchSize:    10,
    })
}
```

### 2.4. Start the app

Finally, start the app by calling `app.Start`:

```go
func main() {
    // ...

    if err := app.Start(context.TODO()); err != nil {
        panic(err)
    }
}
```

### 2.5. Run the app

You can try running the app using the following command:

```bash
go run main.go
```

If everything is set up correctly, you'll see the app connecting to the Warden Protocol node and starting to process incoming requests.

The output will be similar to the following:

```bash
time=2024-03-26T12:01:38.020+01:00 level=INFO msg="starting keychain" keychain_id=1
time=2024-03-26T12:01:38.020+01:00 level=INFO msg="connecting to the Warden Protocol using gRPC" url=localhost:9090 insecure=true
time=2024-03-26T12:01:38.027+01:00 level=INFO msg="keychain writer identity" address=warden18my6wqsrf5ek85znp8x202wwyg8rw4fqhy54k2
time=2024-03-26T12:01:38.027+01:00 level=INFO msg="starting tx writer"
```

:::tip

You can try to request a new ECDSA Key from SpaceWard of from the CLI.

In the following command, replace `space-id` with the ID of the Space you want to use and `keychain-id` with the ID of the Keychain entity you created earlier:

```bash
wardend tx warden new-key-request \
  --space-id 1 \
  --keychain-id 1 \
  --key-type ecdsa-secp256-k1 \
  --from <your-key> \
  --chain-id wardenprotocol 
```

You haven't implemented a key request handler yet, so you'll get an error:

```bash
time=2024-03-26T12:01:38.047+01:00 level=INFO msg="got key request" id=25579
time=2024-03-26T12:01:38.048+01:00 level=ERROR msg="key request handler not set"
```
:::

## 3. Implement request handlers

### 3.1. Implement KeyRequestHandler

You're only one step away from generating new keys and writing them back to the chain. To do this, you need to implement a `KeyRequestHandler` that will be called when a new key request is received.

In this example, the Keychain will generate ECDSA secp256k1 keys using the `github.com/ethereum/go-ethereum/crypto` package. Private keys will be stored in-memory.

1. Add the following code to your `main.go` file:
    
    ```go
    func main() {
        app := ...
    
        app.SetKeyRequestHandler(func(w keychain.KeyResponseWriter, req *keychain.KeyRequest) {
            // your custom logic goes here
        })
    }
    ```

    :::tip
    
    The `SetKeyRequestHandler()` function receives the following:
    
    - `KeyResponseWriter` that can be used to write the response back to the chain
    - `KeyRequest` with the details of the request, such as the key type (for example, ECDSA secp256k1)
    
    :::

2. Write a simple in-memory storage:
    
    ```go
    import (
        ...
        "crypto/ecdsa"
        "sync"
    )
    
    type Store struct {
        mutex sync.Mutex
        keys  map[uint64]*ecdsa.PrivateKey
    }
    
    func (s *Store) Save(id uint64, key *ecdsa.PrivateKey) {
        s.mutex.Lock()
        defer s.mutex.Unlock()
    
        s.keys[id] = key
    }
    
    func (s *Store) Get(id uint64) *ecdsa.PrivateKey {
        s.mutex.Lock()
        defer s.mutex.Unlock()
    
        return s.keys[id]
    }
    ```

3. Implement a functioning `KeyRequestHandler`:
    
    ```go
    import (
        ...
        "github.com/ethereum/go-ethereum/crypto"
    	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
    )
    
    func main() {
        // ...
    
        store := &Store{
            keys: make(map[uint64]*ecdsa.PrivateKey),
        }
    
        app.SetKeyRequestHandler(func(w keychain.KeyResponseWriter, req *keychain.KeyRequest) {
            if req.KeyType != v1beta2.KeyType_KEY_TYPE_ECDSA_SECP256K1 {
                logger.Error("unsupported key type", "type", req.KeyType)
                w.Reject("unsupported key type")
                return
            }
    
            key, err := crypto.GenerateKey()
            if err != nil {
                logger.Error("failed to generate key", "error", err)
                w.Reject("failed to generate key")
                return
            }
    
            store.Save(req.Id, key)
    
            pubKey := crypto.CompressPubkey(&key.PublicKey)
    
            if err := w.Fulfil(pubKey); err != nil {
                logger.Error("failed to fulfil key request", "error", err)
                return
            }
        })
    
        // ...
    ```

### 3.2. Implement SignRequestHandler

Now you need to implement a `SignRequestHandler`. It functions similarly to the `KeyRequestHandler`, but instead of generating new keys, it signs data using the private key associated with the request.

It's important to be able to recover the private key associated with a specific KeyRequest ID, so you should use the same `Store` you created earlier.

Add the following code to your `main.go` file:

```go
func main() {
    // ...

    app.SetSignRequestHandler(func(w keychain.SignResponseWriter, req *keychain.SignRequest) {
        key := store.Get(req.KeyId)
        if key == nil {
            logger.Error("key not found", "id", req.KeyId)
            w.Reject("key not found")
            return
        }

        sig, err := crypto.Sign(req.DataForSigning, key)
        if err != nil {
            logger.Error("failed to sign", "error", err)
            w.Reject("failed to sign")
            return
        }

        if err := w.Fulfil(sig); err != nil {
            logger.Error("failed to fulfil sign request", "error", err)
            return
        }
    })

    // ...
}
```


## 4. Result

You have now built a simple Keychain in Go using the Keychain SDK. This Keychain stores ECDSA private keys in-memory and uses them to sign data. You can now run the app again and interact with it using the SpaceWard UI or the CLI.

By implementing request handlers, you can plug in any key generation and signing logic you need. Your Keychain can interact with external APIs, hardware security modules, or other key management systems such as MPC networks.

If you have any questions or need help, feel free to ask in the [#keychain-operators channel](https://discord.gg/wardenprotocol) on Discord.

Happy coding! 🚀
