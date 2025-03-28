---
sidebar_position: 3
---

# Build a Keychain app

## Overview

This guide explains how to build a basic Keychain application using the [Keychain SDK](implementations/keychain-sdk).

## Prerequisites

- [Go](https://golang.org/dl/) 1.23 or later
- `make`

Before starting, you should also take the steps from this guide: [Create a Keychain](operate-a-keychain/create-a-keychain).

## 1. Scaffold a Go app

1. Create a new Go app using the following command:

    ```bash
    mkdir my-keychain
    cd my-keychain
    go mod init my-keychain
    ```

    This will create a new Go module called `my-keychain`.

2. Create a new Go file called `main.go` with the following contents:

    ```go
    // main.go
    
    package main
    
    func main() {
        // ...
    }
    ```

## 2. Import the Keychain SDK

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

### 2.1. Configure the app

Before starting the app, you need to configure it. You'll find a basic configuration for connecting to a local Warden Protocol node below.

Make the following adjustments in the code:

- Replace `chain_123-1` with the chain ID you used when [running a node](operate-a-keychain/create-a-keychain#option-1-run-a-local-chain).
- Replace `my-keychain-id` with your Keychain ID obtained when [registering a Keychain](operate-a-keychain/create-a-keychain#2-register-a-keychain).
- Replace `my-mnemonic-phrase` with the mnemonic phrase obtained when [adding a Keychain Writer](operate-a-keychain/create-a-keychain#3-add-a-keychain-writer).

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
        ChainID:      "chain_123-1",
        GRPCURL:      "localhost:9090",
        GRPCInsecure: true,

        // setup the account used to write txs
        KeychainId:     "my-keychain-id",
        Mnemonic:       "my-mnemonic-phrase",
        DerivationPath: "m/44'/118'/0'/0/0",

        // setup throughput for batching responses
        GasLimit:     400000,
        BatchTimeout: 8 * time.Second,
        BatchSize:    10,
    })
}
```

### 2.2. Start the app

Finally, start the app by calling `app.Start`:

```go
func main() {
    // ...

    if err := app.Start(context.TODO()); err != nil {
        panic(err)
    }
}
```

### 2.3. Run the app

You can try running the app using the following command:

```bash
go run main.go
```

If everything is set up correctly, you'll see the app connecting to the Warden Protocol node and starting to process incoming requests. The output will be similar to the following:

```bash
time=2024-03-26T12:01:38.020+01:00 level=INFO msg="starting keychain" keychain_id=1
time=2024-03-26T12:01:38.020+01:00 level=INFO msg="connecting to the Warden Protocol using gRPC" url=localhost:9090 insecure=true
time=2024-03-26T12:01:38.027+01:00 level=INFO msg="keychain writer identity" address=warden18my6wqsrf5ek85znp8x202wwyg8rw4fqhy54k2
time=2024-03-26T12:01:38.027+01:00 level=INFO msg="starting tx writer"
```

:::tip

You can try to request a new ECDSA Key from SpaceWard of from the CLI. In the following command, specify your Space ID, Keychain ID, and key name:

```bash
wardend tx warden new-key-request \
  --from my-key-name \
  --space-id my-space-id \
  --keychain-id my-keychain-id \
  --key-type ecdsa-secp256-k1 \
  --chain-id warden
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
    
        app.SetKeyRequestHandler(func(ctx context.Context, w keychain.Writer, req *keychain.KeyRequest) {
            // your custom logic goes here
        })
    }
    ```

    The `SetKeyRequestHandler()` function receives the following:

    - `Writer` that can be used to write the response back to the chain
    - `KeyRequest` with the details of the request, such as the key type (for example, ECDSA secp256k1)

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
    "github.com/ethereum/go-ethereum/crypto"
    "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
    )
    
    func main() {
        // ...
    
        store := &Store{
            keys: make(map[uint64]*ecdsa.PrivateKey),
        }
    
        app.SetKeyRequestHandler(func(ctx context.Context, w keychain.Writer, req *keychain.KeyRequest) {
            if req.KeyType != v1beta2.KeyType_KEY_TYPE_ECDSA_SECP256K1 {
                logger.Error("unsupported key type", "type", req.KeyType)
                w.Reject(ctx, "unsupported key type")
                return
            }
    
            key, err := crypto.GenerateKey()
            if err != nil {
                logger.Error("failed to generate key", "error", err)
                w.Reject(ctx, "failed to generate key")
                return
            }
    
            store.Save(req.Id, key)
    
            pubKey := crypto.CompressPubkey(&key.PublicKey)
    
            if err := w.Fulfil(ctx, pubKey); err != nil {
                logger.Error("failed to fulfil key request", "error", err)
                return
            }
        })
    
        // ...
    ```

### 3.2. Implement SignRequestHandler

Now you need to implement a `SignRequestHandler`. It functions similarly to the `KeyRequestHandler`, but instead of generating new keys, it signs data using the private key associated with the request.

It's important to be able to recover the private key associated with a specific `KeyRequest` ID, so you should use the same `Store` you created earlier.

Add the following code to your `main.go` file:

```go
func main() {
    // ...

    app.SetSignRequestHandler(func(ctx context.Context, w keychain.Writer, req *keychain.SignRequest) {
        key := store.Get(req.KeyId)
        if key == nil {
            logger.Error("key not found", "id", req.KeyId)
            w.Reject(ctx, "key not found")
            return
        }

        sig, err := crypto.Sign(req.DataForSigning, key)
        if err != nil {
            logger.Error("failed to sign", "error", err)
            w.Reject(ctx, "failed to sign")
            return
        }

        if err := w.Fulfil(ctx, sig); err != nil {
            logger.Error("failed to fulfil sign request", "error", err)
            return
        }
    })

    // ...
}
```

## Result

You've built a basic Keychain in Go using the Keychain SDK. This Keychain stores ECDSA private keys in-memory and uses them to sign data. You can now run the app again and interact with it using the SpaceWard UI or the CLI.

By implementing request handlers, you can plug in any key generation and signing logic you need. Your Keychain can interact with external APIs, hardware security modules, or other key management systems such as MPC networks.

If you have any questions or need help, feel free to ask on [Discord](https://discord.com/invite/wardenprotocol).

Happy coding! 🚀
