---
sidebar_position: 4
---

# Keychain SDK

## Overview

The **Keychain SDK** is a Go SDK that abstracts the communication with [Warden Protocol nodes](/learn/glossary#warden-protocol-node), facilitating the development of [Keychains](/learn/glossary#keychain).

To find the available functions, check the Keychain SDK in our GitHub repository:

- [Keychain SDK](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk)

You can also use the function list below for reference.

## Functions

*The following is just a list of Keychain SDK functions with links to the respective Keychain SDK files on GitHub. Descriptions are coming soon.*

### General

The following functions allow you to set up and run a Keychain:

- [NewApp()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/keychain.go)
- [logger()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/keychain.go)
- [SetKeyRequestHandler()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/keychain.go)
- [SetSignRequestHandler()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/keychain.go)
- [Start()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/keychain.go)
- [ConnectionState()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/keychain.go)
- [initConnections()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/keychain.go)

### Key requests

The following functions allow the Keychain to manage [key requests](/learn/request-flow#key-request-flow):

- [Fulfil()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/key_requests.go)
- [Reject()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/key_requests.go)
- [ingestKeyRequests()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/key_requests.go)
- [handleKeyRequest()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/key_requests.go)
- [keyRequests()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/key_requests.go)

### Signature requests

The following functions allow the Keychain to manage [signature requests](/learn/request-flow#signature-request-flow):

- [Fulfil()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/sign_requests.go)
- [Reject()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/sign_requests.go)
- [ingestSignRequests()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/sign_requests.go)
- [handleSignRequest()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/sign_requests.go)
- [signRequests()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/sign_requests.go)

### Request trackers

The following functions allow the Keychain to create and manage request trackers:

- [NewRequestTracker()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/requests_tracker.go)
- [IsNew()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/requests_tracker.go)
- [Ingested()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/requests_tracker.go)
- [Done()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/requests_tracker.go)

### Keychain Writers

The following functions allow the Keychain to create and manage [Keychain Writers](/learn/glossary#keychain-writer): 

- [NewTxWriter()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/writer.go)
- [Start()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/writer.go)
- [Write()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/writer.go)
- [gasLimit()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/writer.go)
- [fees()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/writer.go)
- [Flush()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/writer.go)
- [sendWaitTx()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/writer.go)
- [Append()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/writer.go)
- [Len()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/writer.go)
- [Clear()](https://github.com/warden-protocol/wardenprotocol/tree/main/keychain-sdk/writer.go)