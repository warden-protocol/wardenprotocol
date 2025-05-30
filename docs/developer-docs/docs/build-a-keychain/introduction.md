﻿---
sidebar_position: 1
---

# Introduction

## Keychains

Every [Intelligent Application](/learn/glossary#intelligent-application) has at least one **Keychain**—a custodian that generates and stores [keys](/learn/glossary#key) and signs transactions.

Warden Protocol allows users or external organizations to become **Keychain operators**. They can onboard their own Keychains and charge fees for [key requests](/learn/glossary#key-request) and [signature requests](/learn/glossary#signature-request). Note that Keychain operators typically use MPC networks to generate keys and signatures.

Keychains are implemented in the [`x/warden` module](/learn/warden-protocol-modules/x-warden).

## Section overview

This section contains three main parts, each covering different aspects of Keychain usage and implementation: 

- [Operate a Keychain](/category/operate-a-keychain)  
Get started as a Keychain operator: create and configure a Keychain entity onchain and then run a Keychain from CLI.

- [Build a Keychain app](build-a-keychain-app)  
Build a basic Keychain application in Go.

- [Implementations](/category/implementations)  
Here you'll find reference docs explaining how Keychains are implemented in Warden. See the detailed breakdown of three main Keychain components: [WardenKMS](implementations/wardenkms) , [CLIchain](implementations/clichain), and [Keychain SDK](implementations/keychain-sdk).

## Get started

You can get started with Keychains by following this guide:

- [Create a Keychain](operate-a-keychain/create-a-keychain)