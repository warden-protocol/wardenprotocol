---
sidebar_position: 2
---

# Core Concepts

Before we dive into code, let's understand the key concepts behind Warden's HTTP capabilities.

## x/async Precompile

Warden introduces a precompiled contract at address `0x0000000000000000000000000000000000000903` that enables asynchronous operations.

This precompile allows smart contracts to:

- Make requests to external services (like HTTP APIs)
- Receive responses asynchronously
- Process the data within the smart contract

## Request-Callback Pattern

HTTP requests in Warden follow a request-callback pattern:

- Your contract makes a request and receives a future ID
- The Warden node processes the request off-chain
- When the response is ready, your contract's callback function is called
- Your contract processes the response data

## Understanding Futures

A *future* in Warden represents a pending asynchronous operation. When you make an **HTTP** request, you receive a future ID that you can use to check the status of the request or retrieve the result.

## CBOR Encoding

Responses from **HTTP** requests are encoded in **CBOR** (Concise Binary Object Representation), a binary data format similar to **JSON** but more compact. This requires special handling in your contract to extract the data you need.
