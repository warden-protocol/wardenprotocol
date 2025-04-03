---
sidebar_position: 1
---

# Introduction

## The HTTP Plugin

The [`x/async` precompile](../../precompiles/x-async) allows you to make **HTTP requests** from your smart contract by using the **HTTP** [Plugin](/learn/warden-protocol-modules/x-async#plugin). You can make requests to any external API, receive responses asynchronously, and process the data within the smart contract.

Follow tutorials in this section to learn how to do the following:

- Implement HTTP requests and process asynchronous responses
- Extract data from CBOR-encoded responses
- Make multiple requests to an API

## The request-callback pattern

HTTP requests in Warden follow a request-callback pattern:

1. A smart contract makes a request and receives a Task ID.  
   (The [Task](/learn/warden-protocol-modules/x-async#task) represents a pending asynchronous operation.)
2. The Warden node processes the request offchain.
3. When the response is ready, the contract's callback function is called.
4. The contract processes the response data.

## CBOR encoding

Responses from HTTP requests are encoded in **CBOR** (Concise Binary Object Representation): a binary data format similar to JSON but more compact.

Extracting data from such response requires special handling in your contract, as shown in [Extract data](extract-data).

## Get started

To get started, [Set up your environment](set-up-the-environment).
