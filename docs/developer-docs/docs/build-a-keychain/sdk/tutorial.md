---
sidebar_position: 2
---

# Building a Keychain service with Warden Protocol

## Understanding the Keychain Service

The Keychain Service is a crucial component in the Warden Protocol ecosystem. It's responsible for managing cryptographic keys and signing operations. Here's a breakdown of its main functions:

1. Key Management:
   - The service can generate new keys when requested.
   - It stores and manages these keys securely.
   - It can provide public keys to other parts of the system that need them.

2. Signing Operations:
   - When a signing request comes in, the service uses the appropriate private key to sign the provided data.
   - This allows for secure transactions and operations within the Warden Protocol.

3. Integration with Blockchain:
   - The service is configured to interact with a specific blockchain (identified by the ChainID).
   - It uses gRPC to communicate with the blockchain node.

4. Batching and Gas Management:
   - The service batches operations and manages gas usage to optimize transaction costs and efficiency.

In a production environment, you would need to implement actual key generation and signing logic, integrate with a secure key storage solution, and add more robust error handling and security measures.

## Prerequisites

`Go` (version 1.23 or later) installed on your system

## Setting Up the Project

1. Create a new directory for your project:

    ```bash
    mkdir warden-keychain-service && cd warden-keychain-service
    ```

2. Initialize a new Go module:

   ```go
   go mod init warden-keychain-service
   ```

3. Install the required dependencies:

   ```go
   go get github.com/warden-protocol/wardenprotocol/keychain-sdk
   go get github.com/stretchr/testify
   ```

## Creating the Main Application

1. Create a new file named `main.go` in your project directory and open it in your preferred text editor.

2. Add the following code to `main.go` with the skeleton:

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
// Set up a logger for debugging

// Create a new keychain application

})

// Set up handlers for key requests and sign requests
app.SetKeyRequestHandler(handleKeyRequest)
app.SetSignRequestHandler(handleSignRequest)


// Start the application


// handleKeyRequest processes incoming key requests
func handleKeyRequest(w keychain.KeyResponseWriter, req *keychain.KeyRequest) {
}

// handleSignRequest processes incoming sign requests
func handleSignRequest(w keychain.SignResponseWriter, req *keychain.SignRequest) {
}
```

Let us first define `handleKeyRequest` function. This function takes in a `KeyResponseWriter` and a `KeyRequest` as parameters.Inside the function, let us create a logger using `slog.Default()` and log informational messages with the request ID and key type.

**Note:** This function will create a dummy public key as a byte slice.

Finally, let us call the `Fulfil` method on the `KeyResponseWriter` with the dummy public key. If there is an error, it logs an error message and calls the Reject method on the `KeyResponseWriter` with an error message.

```go
// handleKeyRequest processes incoming key requests
func handleKeyRequest(w keychain.KeyResponseWriter, req *keychain.KeyRequest) {
logger := slog.Default()
logger.Info("received key request", "id", req.Id, "key_type", req.KeyType)

// In a real application, you would generate a public key here
// For this example, we'll use a dummy public key
publicKey := []byte("dummy_public_key")

if err := w.Fulfil(publicKey); err != nil {
  logger.Error("failed to fulfill key request", "error", err)
if err := w.Reject("Internal error"); err != nil {
  logger.Error("failed to reject key request", "error", err)
  }
}
}
```

Next, let us define `Go` function called `handleSignRequest` that takes in a `SignResponseWriter` and a `SignRequest` as parameters. It logs the received sign request and then generates a dummy signature. If the `Fulfil` method of the `SignResponseWriter` returns an error, it logs the error and attempts to reject the sign request.

```go
func handleSignRequest(w keychain.SignResponseWriter, req *keychain.SignRequest) {
logger := slog.Default()
logger.Info("received sign request", "id", req.Id, "key_id", req.KeyId)

// In a real application, you would sign the data here
// For this example, we'll use a dummy signature
signature := []byte("dummy_signature")

if err := w.Fulfil(signature); err != nil {
  logger.Error("failed to fulfill sign request", "error", err)
if err := w.Reject("Internal error"); err != nil {
  logger.Error("failed to reject sign request", "error", err)
  }
}
}
```

OK! Now since our main logic is implemented, let us write the complete `main.go`

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
    Logger:         logger,
    ChainID:        "warden",
    GRPCURL:        "localhost:9090",
    GRPCInsecure:   true,
    KeychainID:     1,
    Mnemonic:       "zebra future seed foil jungle eyebrow rubber spatial measure auction unveil blue toy good lift audit truth obvious voyage inspire gold rule year canyon",
    DerivationPath: "m/44'/118'/0'/0/0",
    GasLimit:       400000,
    BatchInterval:  8 * time.Second,
    BatchSize:      10,
})

app.SetKeyRequestHandler(handleKeyRequest)
app.SetSignRequestHandler(handleSignRequest)

if err := app.Start(context.Background()); err != nil {
    logger.Error("application error", "error", err)
    os.Exit(1)
}
}

func handleKeyRequest(w keychain.KeyResponseWriter, req *keychain.KeyRequest) {
logger := slog.Default()
logger.Info("received key request", "id", req.Id, "key_type", req.KeyType)

// In a real application, you would generate a public key here
// For this example, we'll use a dummy public key
publicKey := []byte("dummy_public_key")

if err := w.Fulfil(publicKey); err != nil {
    logger.Error("failed to fulfill key request", "error", err)
    if err := w.Reject("Internal error"); err != nil {
        logger.Error("failed to reject key request", "error", err)
    }
}
}

func handleSignRequest(w keychain.SignResponseWriter, req *keychain.SignRequest) {
logger := slog.Default()
logger.Info("received sign request", "id", req.Id, "key_id", req.KeyId)

// In a real application, you would sign the data here
// For this example, we'll use a dummy signature
signature := []byte("dummy_signature")

if err := w.Fulfil(signature); err != nil {
    logger.Error("failed to fulfill sign request", "error", err)
    if err := w.Reject("Internal error"); err != nil {
        logger.Error("failed to reject sign request", "error", err)
    }
}
}
```

## Creating Test

Now, let us write a test to test our previously written function.

1. Create a new file named `keychain_test.go` in your project directory and open it in your text editor.

2. Add the following code to `keychain_test.go`:

```go
package main

import (
"context"
"testing"
"time"

"github.com/stretchr/testify/assert"
"github.com/warden-protocol/wardenprotocol/keychain-sdk"
wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

// Mock implementation of KeyResponseWriter
type mockKeyResponseWriter struct {
fulfilled bool
rejected  bool
publicKey []byte
reason    string
}

func (m *mockKeyResponseWriter) Fulfil(publicKey []byte) error {
m.fulfilled = true
m.publicKey = publicKey
return nil
}

func (m *mockKeyResponseWriter) Reject(reason string) error {
m.rejected = true
m.reason = reason
return nil
}

// Mock implementation of SignResponseWriter
type mockSignResponseWriter struct {
fulfilled bool
rejected  bool
signature []byte
reason    string
}

func (m *mockSignResponseWriter) Fulfil(signature []byte) error {
m.fulfilled = true
m.signature = signature
return nil
}

func (m *mockSignResponseWriter) Reject(reason string) error {
m.rejected = true
m.reason = reason
return nil
}

// TestKeychain is the main test function
func TestKeychain(t *testing.T) {
// Set up the Keychain app
app := setupKeychainApp(t)

// Start the app in a goroutine
ctx, cancel := context.WithCancel(context.Background())
defer cancel()

errChan := make(chan error, 1)
go func() {
    if err := app.Start(ctx); err != nil {
        errChan <- err
    }
}()

// Give the app some time to start
select {
case err := <-errChan:
    t.Fatalf("Keychain app error: %v", err)
case <-time.After(10 * time.Second):
    t.Log("Keychain app started successfully")
}

t.Run("TestKeyRequest", func(t *testing.T) {
    testKeyRequest(t)
})

t.Run("TestSignRequest", func(t *testing.T) {
    testSignRequest(t)
})
}

// setupKeychainApp creates and configures a new keychain app for testing
func setupKeychainApp(t *testing.T) *keychain.App {
mnemonic := "zebra future seed foil jungle eyebrow rubber spatial measure auction unveil blue toy good lift audit truth obvious voyage inspire gold rule year canyon"

app := keychain.NewApp(keychain.Config{
    ChainID:        "warden",
    GRPCURL:        "localhost:9090",
    GRPCInsecure:   true,
    KeychainID:     1,
    Mnemonic:       mnemonic,
    DerivationPath: "m/44'/118'/0'/0/0",
    GasLimit:       400000,
    BatchInterval:  8 * time.Second,
    BatchSize:      10,
})

t.Logf("Setting up Keychain app with mnemonic: %s", mnemonic)

return app
}

// testKeyRequest tests the key request handling
func testKeyRequest(t *testing.T) {
// Create a new key request
keyRequest := &keychain.KeyRequest{
    Id:         1,
    SpaceId:    1,
    KeychainId: 1,
    KeyType:    wardentypes.KeyType_KEY_TYPE_ECDSA_SECP256K1,
    RuleId:     1,
}

writer := &mockKeyResponseWriter{}
handleKeyRequest(writer, keyRequest)

assert.True(t, writer.fulfilled)
assert.NotEmpty(t, writer.publicKey)
}

// testSignRequest tests the sign request handling
func testSignRequest(t *testing.T) {
// Create a new sign request
signRequest := &keychain.SignRequest{
    Id:             1,
    KeyId:          1,
    DataForSigning: []byte("test data to sign"),
    EncryptionKey:  []byte("test encryption key"),
}

writer := &mockSignResponseWriter{}
handleSignRequest(writer, signRequest)

assert.True(t, writer.fulfilled)
assert.NotEmpty(t, writer.signature)
}
```

### Explanation of `keychain_test.go`

- We define mock implementations of `KeyResponseWriter` and `SignResponseWriter` for testing purposes.
- The `TestKeychain` function is the main test function. It sets up the keychain app, starts it in a goroutine, and runs two subtests.
- `setupKeychainApp` creates a new keychain app with the same configuration as in `main.go`.
- `testKeyRequest` creates a mock key request, calls the `handleKeyRequest` function, and asserts that the response is as expected.
- `testSignRequest` does the same for sign requests.

## Running Tests

To run the tests:

1. Open a terminal and navigate to your project directory.
2. Run the following command:

   ```bash
   go test -v
   ```

3. You should see output indicating that the tests have run and passed.

```bash
RUN   TestKeychain
RUN   TestKeychain/TestKeyRequest

2024/08/21 18:11:14 INFO received key request id=1 key_type=KEY_TYPE_ECDSA_SECP256K1

RUN   TestKeychain/TestSignRequest

2024/08/21 18:11:14 INFO received sign request id=1 key_id=1

    PASS: TestKeychain (2.00s)
        PASS: TestKeychain/TestKeyRequest (0.00s)
        PASS: TestKeychain/TestSignRequest (0.00s)
        
PASS
ok      keychain-sdk    2.990s
```

## Conclusion

This tutorial has walked you through creating a basic Keychain Service using the Warden Protocol. You've set up the main application, implemented placeholder handlers for key and sign requests, and created tests to verify the basic functionality.

Happy Coding! 🚀
