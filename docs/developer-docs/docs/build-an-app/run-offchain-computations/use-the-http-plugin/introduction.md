---
sidebar_position: 1
---

# Introduction

## The `http` AVR Plugin

You can make **HTTP requests** to **any external API** from your smart contract, receive responses asynchronously, and process the data within the contract.

To achieve this, call the [`x/async` precompile](../../precompiles/x-async) and use the `http` [AVR Plugin](/learn/warden-protocol-modules/x-async#avr-plugins). The `http` Plugin supports multiple APIs, so in this sense it includes multiple AVRs.

Follow tutorials in this section to learn how to do the following:

- Implement HTTP requests and process asynchronous responses
- Extract data from JSON responses using the JSON precompile
- Make multiple requests to an API

## JSON parsing

Responses from HTTP requests are returned as JSON data. To extract specific values from these responses, you can use the [JSON precompile](../../precompiles/json), which provides a convenient way to parse JSON data within your smart contract.

Parsing data requires using the [`read()` function](../../precompiles/json#get-multiple-values) of the precompile, as shown in [Extract data](extract-data).

## Get started

To get started, [set up your environment](set-up-the-environment).
