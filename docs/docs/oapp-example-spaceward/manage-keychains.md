---
sidebar_position: 3
---

# Manage keychains

---EDIT---

## Overview

A keychain is any type of custodian of private keys. Keychains generate and store keys and sign transactions. In Warden you can also configure your own [intents](manage-intents) – sets of user-defined conditions under which a keychain signs a transaction with a private key. Note that you can add your own keychains.

In this section you will find all available [protocol transactions](protocol-transactions) (actions) you can apply to keychains with corresponding **WardenJS functions** and **wardend commands**.

## Protocol transactions

### Create a keychain

*(?) What is genesis keychain? See the wardend command `add-genesis-keychain`.*

You can create a custom keychain. By default, you'll be its first admin.

**wardend command**: `XXX`

```
XXX
```

**WardenJS function**: `newKeychain()` *(?)*

```
XXX
```

### Add a keychain party

You can add a new party to a keychain. Transactions coming from this party will be considered trusted by the keychain.

**wardend command**: `XXX`

```
XXX
```

**WardenJS function**: `addKeychainParty()` *(?)*

```
XXX
```

### Update a keychain

You can update a keychain – change its status or descriptions.

**wardend command**: `XXX`

```
XXX
```

**WardenJS function**: `addKeychainParty()` *(?)*

```
XXX
```

### Query keychains

To query a list of keychains, use the following:

**wardend command**: `XXX`

```
XXX
```

**WardenJS function**: `keychains()` *(?)*

```
XXX
```

### Query a keychain by ID

To query a keychain by ID, use the following:

**wardend command**: `XXX`

```
XXX
```

**WardenJS function**: `keychainByID()` *(?)*

```
XXX
```

### (?)

**WardenJS:**

- `createBaseKeychainFees()`