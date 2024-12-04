---
sidebar_position: 2
---

# CLIChain

## Overview

This document provides a detailed overview of [CLIChain](../../../../../cmd/clichain/main.go), a powerful and user-friendly command-line tool for managing cryptographic keys and operations. It simplifies operations commonly used in blockchain technologies:

- **Generating ECDSA secp256k1 private keys**
- **Deriving public keys from private keys**
- **Signing messages using private keys**

CLIChain is implemented in `Go`, leveraging the Cobra library for a robust command-line interface and the Ethereum library for secure cryptographic operations. These integrations make CLIChain a reliable choice for developers working with blockchain and cryptographic applications.

The main use cases include the following:

- **Blockchain development**: Generate keys and sign transactions for blockchain applications.
- **Secure communication**: Create key pairs for encrypted communication systems.
- **Digital signatures**: Sign important documents or messages to ensure authenticity.

## Commands

### Generate a private key

- **Command:** `generate`
- **Description:** Generates a new ECDSA secp256k1 private key.
- **Usage:**  
  ```bash
  clichain generate --output <filename>
  ```
- **Example:**  
  ```bash
  clichain generate --output mykey.pem
   ```
  - Generates a new private key and saves it to `mykey.pem`.
  - If no output file is specified, the key is printed to `stdout`.

### Derive a public key

- **Command:** `public-key`

- **Description:** Derives the public key from a provided private key.

- **Usage:**

  ```bash
  clichain public-key --key <private-key-file> --output <format>
  ```
  - Supported output formats: `binary`, `hex`, `base64`.

- **Example:**

  ```bash
  clichain public-key --key mykey.pem --output hex
  ```
  - Reads the private key from `mykey.pem`.
  - Derives and outputs the public key in the hexadecimal format.
  - Default input file is `private.key` if not specified.

### Sign a message

- **Command:** `sign`

- **Description:** Signs a message using a specified private key.

- **Usage:**

  ```bash
  clichain sign --key <private-key-file> --message <message-file> --output <format>
  ```
  - Supported output formats: `binary`, `hex`, `base64`.

- **Example:**

  ```bash
  clichain sign --key mykey.pem --message message.txt --output base64
  ```
  - Signs the contents of `message.txt` using the private key in `mykey.pem`.
  - Outputs the signature in the base64 format.
  - If no message file is specified, the message is read from `stdin`.

## Dependencies

**CLIChain** relies on the following Go packages:

- [`go-ethereum/crypto`](https://github.com/ethereum/go-ethereum/tree/master/crypto) for cryptographic functions
- [`spf13/cobra`](https://github.com/spf13/cobra) for building the command-line interface
- [`encoding/base64`](https://pkg.go.dev/encoding/base64) and [`encoding/hex`](https://pkg.go.dev/encoding/hex) for encoding

## Error handling

**CLIChain** provides comprehensive error handling with detailed messages. Errors are wrapped using `fmt.Errorf()` and include descriptive messages to help users quickly identify and resolve issues.
