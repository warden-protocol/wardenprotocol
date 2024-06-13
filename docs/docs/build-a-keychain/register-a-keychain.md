---
sidebar_position: 2
---

# Register a Keychain

## Overview

This is a short guide explaining how to register a new Keychain in the Warden Protocol.

For a complete sequence of steps required for building a Keychain from scratch, see our [Quick start](quick-start) guide.

## Prerequisites

You need to have a funded Warden address for transaction fees.

## 1. Add a Keychain

Invoke a `NewKeychain` transaction, prepare the following data: 

- Description: Properly describe your Keychain.    
- Admin Intent: Find the [Intent](/learn/glossary#intent) you wish to apply to the Keychain. For default policies, add 0.    
- Key request fee: Indicates how much a key creation should cost the requester. It's set in uWard.    
- Signature request fee: Indicates how much a signature request cost the requester. It's set in uWARD.   

A new Keychain object will be created on-chain with its own dedicated [Keychain ID](/learn/glossary#keychain-id).

## 2. Add a Keychain Party

Invoke an `AddKeychainParty` transaction to add a [Keychain Party](/learn/glossary#keychain-party).

The Warden client inside the Keychain infrastructure has its own Warden address. Only this address will be able to publish the responses.  

## 3. Result

Now the Keychain is set up and users can request signatures with the respective Keychain address.