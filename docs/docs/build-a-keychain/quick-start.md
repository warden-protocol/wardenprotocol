---
sidebar_position: 2
---

# Quick start

---EDIT---

This guide will walk you through the process of building a [Keychain](/learn/glossary#keychain) in Go, using the Keychain SDK.

## Prerequisites

- [Go](https://golang.org/dl/) 1.22 or later
- `make`

## Prepare the chain

### Run a Warden Protocol node

You can:

- [Run a local chain](/build-an-oapp/test/run-a-local-chain)
- [Connect to our Buenavista testnet](/operate-a-node/networks/join-buenavista)

For the rest of this guide, we will assume you have a running Warden Protocol node with a local account that has a few WARD tokens.

The local account will be used to fund the Keychain entity and parties, and will be referenced as `<your-key>` in the following commands.

Check the list of available accounts by running:

```bash
wardend keys list
```

Check the local account balance by running:

```bash
wardend query bank balances <your-key>
```

:::tip

In development genesis files, you will typically find an account named `shulgin` that is ready to be used.

:::

### Create a Keychain entity on-chain

We need to register your Keychain entity on-chain. You can do this by running:

```bash
wardend tx warden new-keychain \
  --description 'My Keychain' \
  --from <your-key> \
  --chain-id wardenprotocol
```

Find the ID of your newly created Keychain by running:

```bash
wardend query warden keychains
```

Note the ID of your Keychain entity, which will be referenced as `<keychain-id>`.


### Add a Keychain party

A Keychain party is an account that can write Keychain results (public keys and signatures) to the chain. The Keychain parties list is essentially an allowlist of accounts that can interact on behalf of the Keychain.

Create a new account to be used as a Keychain party:

```bash
wardend keys add my-keychain-party
```

The output will be similar to:

```bash
- address: warden18my6wqsrf5ek85znp8x202wwyg8rw4fqhy54k2
  name: my-keychain-party
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A2cECb3ziw5/LzUBUZIChyek3bnGQv/PSXHAH28xd9/Q"}'
  type: local


**Important** write this mnemonic phrase in a safe place. It is the only way to recover your account if you ever forget your password.

virus boat radio apple pilot ask vault exhaust again state doll stereo slide exhibit scissors miss attack boat budget egg bird mask more trick
```

Note down the mnemonic phrase and the address of the new account, it will be needed to configure the Keychain SDK and interact with the chain using this account.

Fund the new account with some tokens (1 WARD in this example):

```bash
wardend tx bank send <your-key> \
  $(wardend keys show -a my-keychain-party) \
  1000000uward \
  --chain-id wardenprotocol
```


## Build the Go app

### Scaffold a new Go app

Create a new Go app using the following command:

```bash
mkdir my-keychain
cd my-keychain
go mod init my-keychain
```

This will create a new Go module called `my-keychain`.

Next, create a new Go file called `main.go` with the following content:

```go
// main.go

package main

func main() {
    // ...
}
```

In a second, we will import the Keychain SDK and start building our Keychain.


### Import the Keychain SDK

Add the Keychain SDK to your Go module by running:

```bash
go get github.com/warden-protocol/wardenprotocol/keychain-sdk
```

Then, import and use the SDK in your `main.go` file to create an `App` instance:

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


### Configure the App

Before starting the app, you need to configure it with the necessary information.

A basic configuration for connecting to a local Warden Protocol node is:

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

Replace `<your-keychain-id>` with the ID of the Keychain entity you created earlier, and the mnemonic with the one for the keychain's party.


### Start the App

Finally, start the app by calling `app.Start`:

```go
func main() {
    // ...

    if err := app.Start(context.TODO()); err != nil {
        panic(err)
    }
}
```


### Run the App

You can try running the app by running:

```bash
go run main.go
```

If everything is set up correctly, you should see the app connecting to the Warden Protocol node and starting to process incoming requests.

The output will be similar to:

```bash
time=2024-03-26T12:01:38.020+01:00 level=INFO msg="starting keychain" keychain_id=1
time=2024-03-26T12:01:38.020+01:00 level=INFO msg="connecting to Warden Protocol using gRPC" url=localhost:9090 insecure=true
time=2024-03-26T12:01:38.027+01:00 level=INFO msg="keychain party identity" address=warden18my6wqsrf5ek85znp8x202wwyg8rw4fqhy54k2
time=2024-03-26T12:01:38.027+01:00 level=INFO msg="starting tx writer"
```

And, if you try to request a new key, you would get this error:

```bash
time=2024-03-26T12:01:38.047+01:00 level=INFO msg="got key request" id=25579
time=2024-03-26T12:01:38.048+01:00 level=ERROR msg="key request handler not set"
```

:::tip

You can request a new ECDSA Key from SpaceWard of from the CLI, using this command:

```bash
wardend tx warden new-key-request \
  --space-id 1 \
  --keychain-id 1 \
  --key-type ecdsa-secp256-k1 \
  --from <your-key> \
  --chain-id wardenprotocol 
```

Replace the Space ID with the ID of the Space you want to use, and the Keychain ID with the ID of the Keychain entity you created earlier.

The error is expected, as we haven't implemented the key request handler yet.

:::


### Implementing the KeyRequestHandler

We are only one step away from generating new Keys and writing them back to the chain.

To do this, we need to implement a `KeyRequestHandler` that will be called when a new key request is received.

Add the following code to your `main.go` file:

```go
func main() {
    app := ...

    app.SetKeyRequestHandler(func(w keychain.KeyResponseWriter, req *keychain.KeyRequest) {
        // your custom logic goes here
    })
}
```

The `KeyRequestHandler` function receives a `KeyResponseWriter` that can be used to write the response back to the chain, and the `KeyRequest` that contains the details of the request, such as the type of the Key to be generated (e.g. ECDSA secp256k1).

For this example, we will generate a new ECDSA secp256k1 key using the `github.com/ethereum/go-ethereum/crypto` package and store the private keys in-memory.

Let's start by writing our simple in-memory storage:

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

And then, we can implement a functioning `KeyRequestHandler`:

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


### Implementing the SignRequestHandler

Now that we can generate new keys, let's implement the `SignRequestHandler`.

It acts similarly to the `KeyRequestHandler`, but instead of generating new keys, it signs the provided data using the private key associated with the request.

It's important to be able to recover the private key associated with a specific KeyRequest ID, so we will use the same `Store` we created earlier.

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


### Conclusion

You have now built a simple Keychain in Go using the Keychain SDK, that stores ECDSA private keys in-memory and uses them to sign data.

By implementing the `KeyRequestHandler` and `SignRequestHandler` functions, you can plug in any key generation and signing logic you need, e.g. interacting with external APIs, hardware security modules, or other key management systems such as MPC networks.

You can now run the app again and interact with it using the SpaceWard UI or the CLI.

If you have any questions or need help, feel free to ask in the [#keychain-operators channel](https://discord.gg/wardenprotocol) on Discord.

Happy coding! 🚀
