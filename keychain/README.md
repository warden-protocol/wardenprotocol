# Warden Keychain

Keychain in Warden Protocol describe the concept of an off-chain service that
provides key services to Warden Protocol users. Upon request from the users
through a space, keychains create and store the key material locally and
publish the public key information on Warden Protocol from which the users can
request signatures for various purposes. Once the signature request has been
fulfilled, a relayer, which the user can also run themselves, broadcasts the
transaction to the intended destination.


## Reference implementations

* `wardenkms` - BIP39/BIP44 secure key generator


## Introduction


### Bring your own Keychain

Warden Protocol allows users or outside institutions to onboard their own
keychain specifically for their dApp or their clients which frees the clients
from the burden of managing all of their keys by themselves. Having their own
keychain can be beneficial if they want to be in full control of their key
material while enjoying the benefits of Warden Protocol.

To onboard a new keychain, users can submit a `NewKeychain` transaction with a
certain payload specifying the keychain and keychain settings. There will also be
an onboarding fee for spam protection.


### Keychain parties

Responses to key- and signature requests are being published to Warden Protocol
by a keychain party which represent the keychain system. The keychain parties are
being added through on-chain transactions to the keychain object on Warden
Protocol. Only the keychain parties are able to publish responses to Warden
Protocol.

The current setup envisions a single keychain relayer to publish the responses.
For the future it is aimed that each keychain party publishes their share of the
key or the signature on-chain and assembled there by Warden Protocol itself.
This implementation should increase transparency and enable higher degree of
collaboration for keychains. 

### Keychain economics and intents

Keychain operators can directly charge a fee for key- and signature requests that will be paid in the native currency or possibly other IBC tokens in the future. 
This directly creates a revenue stream for keychain operators to the respective keychain address. Keychain admins can manage these funds.

A keychain object is managed on-chain by keychain admins. Apart from managing the keychain's funds, the admin can define certain intents that need
to be met when managing the keychain. For example, a keychain intent defines how a keychain party is added.

## Keychain Onboarding

This paragraph gives a step-by-step instruction how to onboard a new keychain to Warden Protocol. 

1. Have a funded Warden address for transaction fees.
2. Invoke a `NewKeychain` transaction, prepare the following data: 
    * Description: Properly describe your keychain
    * Admin Intent: Find the intent you want to have applied to the keychain. For default intents, add `0`.
    * Key Request Fee: Indicates how much a key creation should cost the requestor. Indicated in nward.
    * Signature Request Fee: Indicates how much a signature request cost the requestor. Indicated in nward
3. A new keychain object is created on-chain with its own dedicated keychain address.
4. Add a keychain party with `AddKeychainParty` transaction. The Warden Protocol client inside the keychain infrastrucutre has its own Warden address. Only this address will be able to publish the responses. 
5. Now the keychain is set up and users can request signatures with the respective keychain address. 

## Keychain Interface

The keychain needs to listen to key and signature requests for their respective keychain address. 
While key requests directly indicate the keychain address in the request, the signature requests contain the keychain address inside the keys object. 

### Listen to Requests

The keychain needs to listen to the following requests in the treasury module: 

* `NewKeyRequest`: Requests a key with an indicated key type
* `NewSignatureRequest`: Requests a general signature for a certain key
* `NewSignTransactionRequest`: Requests a signature for a transaction for a certain key and indicated destination

### Publish Responses

The keychain publishes the responses via the following transactions:

* `UpdateKeyRequest`: Publish the respective public key information on Warden Protocol
* `FilfillSignatureRequest`: Publish the respective signature for general- and transaction signature request. 

## Out-of-the-box Keychain

We are going to provide off-chain keychain infrastructure that allows for easy deployment of new keychains in the future. 
