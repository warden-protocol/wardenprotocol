---
sidebar_position: 1
---

# Introduction

## The `http` AVR Plugin

You can make **HTTP requests** to **any external API** from your smart contract, receive responses asynchronously, and process the data within the contract.

To achieve this, call the [`x/async` precompile](../../precompiles/x-async) and use the `http` [AVR Plugin](/learn/warden-protocol-modules/x-async#avr-plugin).

Follow tutorials in this section to learn how to do the following:

- Implement HTTP requests and process asynchronous responses
- Extract data from CBOR-encoded responses
- Make multiple requests to an API

## CBOR encoding

Responses from HTTP requests are encoded in **CBOR** (Concise Binary Object Representation): a binary data format similar to JSON but more compact.

Extracting data from such response requires special handling in your contract, as shown in [Extract data](extract-data).

## Get started

To get started, [set up your environment](set-up-the-environment).
