---
sidebar_position: 1
---

# Introduction

**Warden Protocol modules** are [Cosmos SDK](https://docs.cosmos.network/) modules containing most of the Warden Protocol's logic. Users can interact with them by sending transactions or querying [nodes](/learn/glossary#warden-protocol-node).

Articles in this section describe the following modules:

- [`x/act`](x-act): It executes arbitrary messages ([Actions](/learn/glossary#action)) under certain conditions ([Rules](/learn/glossary#approval-rule)).
- [`x/warden`](x-warden): It allows users to create and manage their [Spaces](/learn/glossary#space) and request [Keychains](/learn/glossary#keychain) to sign payloads.
- [External modules](external-modules): `x/gmp`, `x/wasm`, etc.