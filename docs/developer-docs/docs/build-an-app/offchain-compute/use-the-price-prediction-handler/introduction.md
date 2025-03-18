---
sidebar_position: 1
---

# Introduction

## Overview

Smart contracts are powerful tools for creating trustless, decentralized applications. However, they have traditionally been isolated from the outside world, unable to access external data without trusted oracles.

Warden changes this paradigm by providing a built-in mechanism for smart contracts to make offchain computations. In this particular section we will learn about `http` handler. In subsequent sections, we will learn about other handlers like `price_prediction` handler.

In this this tutorial will guide you through making **HTTP** requests from smart contracts using Warden's `x/async` precompile.

## What you'll learn

- How to make HTTP requests from smart contracts
- How to process asynchronous responses
- How to extract data from CBOR-encoded responses

## Core concepts

### The x/async precompile

In this example we will use a precompiled contract at address `0x0000000000000000000000000000000000000903` that enables asynchronous operations, including **HTTP** requests. This precompile allows smart contracts to:

1. Make requests to external APIs
2. Receive responses asynchronously
3. Process the data within the smart contract

### The request-callback pattern

HTTP requests in Warden follow a request-callback pattern:

- Your contract makes a request and receives a future ID
- The Warden node processes the request off-chain
- When the response is ready, your contract's callback function is called
- Your contract processes the response data

### Understanding Futures

A *future* in Warden represents a pending asynchronous operation. When you make an **HTTP** request, you receive a future ID that you can use to check the status of the request or retrieve the result.

### CBOR encoding

Responses from **HTTP** requests are encoded in **CBOR** (Concise Binary Object Representation), a binary data format similar to **JSON** but more compact. This requires special handling in your contract to extract the data you need.
