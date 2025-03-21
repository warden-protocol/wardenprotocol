---
sidebar_position: 3
---

# Keychain SDK

## Overview

The **Keychain SDK** offers a robust framework for managing cryptographic operations on Warden Protocol. It simplifies the development of applications that interact with Warden Protocol, handling both key requests and signature requests with efficiency and security.

## Module descriptions

In this section, we will walk you through different modules of the **Keychain SDK.**

### Signature requests (`sign_requests.go`)

**Purpose**: This module handles signature requests, allowing the application to process and respond to cryptographic signing operations.

**Key components:**

- **SignResponseWriter interface**: Provides methods to fulfill or reject signature requests.
  - `Fulfil(signature []byte) error`: Writes a signature to a signature request.
  - `Reject(reason string) error`: Writes a rejection message to a signature request.
- **SignRequestHandler**: A function type that processes individual signature requests.
- **signResponseWriter struct**: Implements the `SignResponseWriter` interface, managing encryption and transaction writing.

**Functions:**

- `handleSignRequest`: Processes a signature request using the provided `SignRequestHandler`.
- `ingestSignRequests`: Continuously fetches and handles new signature requests.

### Keychain (`keychain.go`)

**Purpose**: Central application management, coordinating key and signature request handling.

**Key components:**

- **App struct**: Represents the Keychain application, managing configuration and handlers.
  - Key members include `config`, `query`, `txWriter`, `keyRequestTracker`, and `signRequestTracker`.
- **NewApp function**: Initializes a new `App` instance with the provided configuration.
- **Handlers**: These methods set the functions for processing requests.
  - `SetKeyRequestHandler`: Sets the handler for key requests.
  - `SetSignRequestHandler`: Sets the handler for signature requests.
- **Start method**: Begins the Keychain application's operations, managing request channels and transaction writing.
- `ConnectionState`: Returns the state of the gRPC connection.
- `initConnections`: Establishes connections to Warden Protocol via gRPC.

### Key requests (`key_requests.go`)

**Purpose**: Handles key requests, providing interfaces to fulfill or reject requests for public keys.

**Key components:**

- **KeyResponseWriter Interface**: Contains methods to fulfill or reject key requests.
  - `Fulfil(publicKey []byte) error`: Sends a public key in response.
  - `Reject(reason string) error`: Sends a rejection reason.
- **KeyRequestHandler**: A function type for handling key requests.
- **keyResponseWriter Struct**: Implements the `KeyResponseWriter` interface, processing key requests and writing results.

**Functions:**

- `handleKeyRequest`: Processes a key request using the provided `KeyRequestHandler`.
- `ingestKeyRequests`: Continuously fetches and handles new key requests.

### Configuration (`config.go`)

**Purpose**: Defines the configuration structure for the Keychain SDK, detailing all necessary parameters for application setup.

**Key components:**

- **Config struct**: Specifies settings such as logger, chain ID, gRPC details, and batching options.

```go
type Config struct {
    Logger              *slog.Logger
    ChainID             string
    GRPCURL             string
    GRPCInsecure        bool
    KeychainID          uint64
    DerivationPath      string
    Mnemonic            string
    BatchInterval       time.Duration
    BatchSize           int
    GasLimit            uint64
    AutoEstimateGas     bool
    GasAdjustmentFactor float64
    TxFees              sdk.Coins
    TxTimeout           time.Duration
}
```

### Transaction writer (`writer.go`)

**Purpose**: Manages transaction batching and sending operations.

**Key components:**

- **W struct**: Handles batch management and sending transactions to the blockchain.

**Functions:**

- `Start`: Begins the transaction writing process.
- `Write`: Adds messages to the batch for processing.
- `Flush`: Sends accumulated transactions in a batch.
- `sendWaitTx`: Handles the actual transaction submission and awaits confirmation.

### Request tracker (`tracker.go`)

**Purpose**: Tracks processed request IDs to prevent duplicate processing.

**Key components:**

- **T struct**: Manages an ingested map to track processed requests, ensuring each request is only handled once.

**Functions:**

- `IsNew`: Checks if a request ID is new.
- `Ingested`: Marks a request as ingested.
- `Done`: Removes a request from the ingested map.

### Encryption utilities (`enc.go`)

**Purpose**: Provides encryption utilities for cryptographic operations.

**Key functions:**

- **Encrypt**: Encrypts data using a provided ECDSA public key.
- **ValidateEncryptionKey**: Validates an ECDSA public key.

You can find more details about the Keychain SDK in our GitHub repository:

- [The Keychain SDK](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk)

To learn about the available types and functions, check the reference page:

- [The Keychain SDK reference](https://pkg.go.dev/github.com/warden-protocol/wardenprotocol/keychain-sdk)
