# Modular Security
## Keychains

A keychain is any type of custodian of private keys. Keychains generate, store keys and sign transactions. Users can use Warden’s Intent Configurator to configure their own application security setting, putting them in control of defining their own spectrum of custody: from holding their own keys, to sharding their keys and splitting them between users and enterprises, to delegating custody to an ISO-compliant, SOC-audited digital asset custodian, through to leveraging the latest in distributed key management protocols. Warden is also exploring a new variant of multisig, composed of different keychains & custodial models collaborating via user-driven intents.

Each OApp has an Intent Configurator. This can be accessed via a GUI or over CLI, and lets a user interface and configure intents with their chosen keychain. Intents are a set of user-supplied conditions under which a keychain signs a transaction with a private key. They are predicates over transactional data and external inputs; an arbitrary on-chain code evaluated at runtime by the settlement layer that enforces the terms of an interaction in a transparent, human-readable form. The OApps modular security stack embeds user intents into the applications security architecture.

Today there is no standard mechanism to express, compose and parse intents, similar to the time before SQL when querying databases was tricky. In order to enable arbitrary use cases from several OApps, we unified the syntax with which users can express their intents and configure their keychain. This embedded, intent specific language (“ISL”) standardises interface-, transmission semantics and execution behaviours. It’s a composable, extensive, declarative, human-readable, English-like language purpose built so users can configure and preview the transaction conditions for their keychains.

Keychains sign transactions only when a user’s intents are satisfied. Warden Protocol has an immutable on-chain, Intent Engine that acts as a gatekeeper. In order to prioritise security, minimise attack surface and focus on first principles, the intent engine is designed as a functional program with a boolean predicate. Its sole purpose is to determine the outcome of an intent verification, returning only either true or false. It is only when a user’s supplied intents are immutably respected that a keychain can modify a user’s state. Each time a transaction arrives in the mempool, a Warden Protocol validator runs the transaction against the set of user-created intents to verify if they are met. It is only when an intent validates the transactions, that the Warden Protocol validators include it in a block on the chain.

Keychains sign transactions only when a user’s intents are satisfied. Warden Protocol has an immutable on-chain, Intent Engine that acts as a gatekeeper. In order to prioritise security, minimise attack surface and focus on first principles, the intent engine is designed as a functional program with a boolean predicate. Its sole purpose is to determine the outcome of an intent verification, returning only either true or false. It is only when a user’s supplied intents are immutably respected that a keychain can modify a user’s state. Each time a transaction arrives in the mempool, a Warden Protocol validator runs the transaction against the set of user-created intents to verify if they are met. It is only when an intent validates the transactions, that the Warden Protocol validators include it in a block on the chain.

  

## Bring Your Own Keychain (BYOK)

Warden Protocol allows users or outside institutions to onboard their own keychain. To onboard a new Keychain, users can submit a Newkeychain transaction with a certain payload specifying the keychain and keychain settings.

  

## Keychain Parties

Responses to key- and signature requests are being published to Warden Protocol by a keychain party which represents the keychain system. The keychain parties are being added through on-chain transactions to the keychain object on Warden Protocol. Only the keychain parties are able to publish responses to Warden Protocol.

  

## Keychain Economics

Keychain operators can directly charge a fee for key- and signature requests that will be paid in WARD. This directly creates a revenue stream for keychain operators to the respective keychain address. keychain admins can manage these funds.