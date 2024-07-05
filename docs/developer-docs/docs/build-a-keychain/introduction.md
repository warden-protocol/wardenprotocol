---
sidebar_position: 1
---

# Introduction

## Keychains

Every [Omnichain Application](/learn/glossary#omnichain-application) has at least one Keychain – a custodian that generates and stores [keys](/learn/glossary#key) and signs transactions. Keychains contribute to Warden's [Modular Key Management](/learn/glossary#modular-key-management) and [Modular Security](/learn/glossary#modular-security).

The Warden Protocol allows users or external organizations become Keychain operators. They can onboard their own Keychains and charge fees for [key requests](/learn/glossary#key-request) and [signature requests](/learn/glossary#signature-request). Note that Keychain operators typically use MPC networks to generate keys and signatures. To learn more, see [Request flow](/learn/request-flow).

This section explains how to build a Keychain and operate it.

## Get started

To get started, follow the steps in the [Quick start](quick-start) guide. You can build a Keychain with our [Keychain SDK](keychain-sdk).

In the future, we're going to provide off-chain infrastructure to facilitate Keychain deployment.

:::tip
If you're [building an Omnichain Application](/build-an-oapp/introduction) and wish to run a Keychain for testing purposes, check this guide: [Run a Keychain from CLI](/build-an-oapp/test/run-a-keychain-from-cli).
:::
