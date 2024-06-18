---
sidebar_position: 3
---

# Keychain interface

## Overview

This article describes the Keychain interface for listening and fulfilling requests.

To know how the Warden Protocol processes requests, check this article: [Request flow](/learn/request-flow).

## Requests

Any Keychain listens to [key requests](/learn/glossary#key-request) and [signature requests](/learn/glossary#signature-request) for its respective [Keychain ID](/learn/glossary#keychain-id):

- `NewKeyRequest`: Requests a [key pair](/learn/glossary#key) with a given key type.    
- `NewSignatureRequest`: Requests a general signature for a given key.
- `NewSignTransactionRequest`: Requests a transaction signature for a given key and destination.

**Note:** While key requests directly indicate the [Keychain ID](/learn/glossary#keychain-id) in the request, signature requests contain the Keychain ID inside the `keys` object.

## Responses 

Keychains publishes responses to requests using the following transactions:

- `UpdateKeyRequest`: Publishes a public key on the Warden Protocol, responding to `NewKeyRequest`.    
- `FulfilSignatureRequest`: Publishes a signature, respnding to `NewSignatureRequest` or `NewSignTransactionRequest`.