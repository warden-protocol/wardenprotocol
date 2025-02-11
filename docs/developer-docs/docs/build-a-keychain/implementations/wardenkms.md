---
sidebar_position: 1
---

# WardenKMS

## Overview

The following document provides a detailed breakdown of the [`wardenkms.go` file](../../../../../cmd/wardenkms/wardenkms.go), which plays a central role in setting up a key management system using the Warden Protocol.

This file configures and runs **WardenKMS**, a Keychain application in Go. WardenKMS uses various libraries to provide a secure and efficient key management system compatible with blockchain environments built on the Cosmos SDK. The application is designed for handling key derivation, signature generation, and HTTP-based health checks.

WardenKMS employs a combination of advanced security techniques:

1. **Hierarchical Deterministic (HD) wallets**: WardenKMS uses HD wallets to generate and manage encryption keys. HD wallets allow for the creation of multiple keys from a single master seed, making key management more efficient.
2. **Threshold-based access control**: WardenKMS uses threshold-based access control to ensure that sensitive operations, such as key creation and deletion, require multiple approvals.
3. **Homomorphic encryption**: WardenKMS uses homomorphic encryption to enable computations on encrypted data without decrypting it first.

## Dependencies

WardenKMS makes use of several packages, each fulfilling a specific role:

| Dependency | Purpose |
|------------|---------|
| `context` | Manages context throughout the application lifecycle. |
| `net/http` | Provides HTTP server functionalities. |
| `slog` | Implements structured logging. |
| `cosmossdk.io/math` | Includes mathematical utilities. |
| `github.com/cosmos/cosmos-sdk/types` | Offers types used in Cosmos SDK. |
| `github.com/sethvargo/go-envconfig` | Parses environment variables into Go structs. |
| `google.golang.org/grpc/connectivity` | Manages gRPC connection states. |
| `github.com/warden-protocol/wardenprotocol/keychain-sdk` | The Keychain SDK for Warden Protocol. |
| `github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3` | Types specific to the Warden Protocol. |

## Configuration

The `Config` struct holds the environment variable configurations required by the application:

```go
type Config struct {
  ChainID          string        `env:"CHAIN_ID, default=warden"`
  GRPCURL          string        `env:"GRPC_URL, default=localhost:9090"`
  GRPCInsecure     bool          `env:"GRPC_INSECURE, default=true"`
  DerivationPath   string        `env:"DERIVATION_PATH, default=m/44'/118'/0'/0/0"`
  Mnemonic         string        `env:"MNEMONIC, default=exclude try nephew main..."`
  KeychainId       uint64        `env:"KEYCHAIN_ID, default=1"`
  KeyringMnemonic  string        `env:"KEYRING_MNEMONIC, required"`
  KeyringPassword  string        `env:"KEYRING_PASSWORD, required"`
  BatchInterval    time.Duration `env:"BATCH_INTERVAL, default=8s"`
  BatchSize        int           `env:"BATCH_SIZE, default=7"`
  GasLimit         uint64        `env:"GAS_LIMIT, default=400000"`
  TxTimeout        time.Duration `env:"TX_TIMEOUT, default=120s"`
  TxFee            int64         `env:"TX_FEE, default=400000"`
  HttpAddr         string        `env:"HTTP_ADDR, default=:8080"`
  LogLevel         slog.Level    `env:"LOG_LEVEL, default=debug"`
}
```

Here are the key configuration parameters:

- **ChainID**: Identifies the blockchain network.
- **GRPCURL**: Specifies the URL of the gRPC server.
- **Mnemonic**: Provides a default mnemonic for key derivation.
- **HttpAddr**: Determines the address for the HTTP server.
- **LogLevel**: Sets the logging level (e.g., debug, info).

## The `main()` function

The `main()` function orchestrates the initialization and execution of the application:

1. **Environment configuration**: Parses environment variables into the `Config` struct.
2. **Logger initialization**: Sets up structured logging.
3. **Keychain initialization**: Uses a mnemonic phrase and a password to generate a BIP44 Keychain.
4. **Application setup**: Configures the Keychain application with details from the `Config`.
5. **HTTPRequest handlers**: Sets up handlers to process key and signature requests.
6. **HTTP server**: Optionally starts an HTTP server for health checks.
7. **Application start**: Initiates the Keychain application.

## Handlers

### Key request handler

The `SetKeyRequestHandler` processes key requests, specifically for the `ECDSA_SECP256K1` key type. Here's how it works:

1. It first checks if the requested key type is supported (currently only ECDSA_SECP256K1).
2. The request ID is converted to a big-endian byte array.
3. The handler derives the public key for the given ID by using the BIP44 Keychain. This derivation follows the path specified in the configuration (`m/44'/118'/0'/0/0` by default), with the last number incrementing based on the request ID.
4. The derived public key is then returned as the response.

This process ensures that each key request generates a unique public key derived from the master seed, following BIP44 standards.

### Signature request handler

The `SetSignRequestHandler` manages signature requests by converting key IDs, signing data, and returning the signature.

## HTTP server

WardenKMS can be configured to start an HTTP server for performing health checks. If the application connection to gRPC is ready, it responds with `HTTP 200 OK`. Otherwise, it returns `HTTP 503 Service Unavailable`.

```go
http.HandleFunc("/healthcheck", func(w http.ResponseWriter, r *http.Request) {
  if app.ConnectionState() == connectivity.Ready {
    w.WriteHeader(http.StatusOK)
  } else {
    w.WriteHeader(http.StatusServiceUnavailable)
  }
})
```

## Utility functions

### `bigEndianBytesFromUint32`

This helper function converts a `uint64` number into a 4-byte big-endian byte array. It's used to convert key IDs for processing:

```go
func bigEndianBytesFromUint32(n uint64) ([4]byte, error) {
  if n > 0xffffffff {
    return [4]byte{}, fmt.Errorf("number is too large to fit in 4 bytes")
  }
  b := make([]byte, 4)
  binary.BigEndian.PutUint32(b, uint32(n))
  return [4]byte(b), nil
}
```
