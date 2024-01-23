# Fusion Keyring

Keyrings in Fusion describe the concept of an off-chain service that provides key services to Fusionchain users. 
Upon request from the users through a workspace, keyrings create and store the key material locally and publish the public key information
on Fusionchain from which the users can request signatures for various purposes.
Once the signature request has been fulfilled, a relayer, which the user can also run themselves, broadcasts the transaction to the intended destination.

## Existing Keyrings

* `mpc-relayer` - Qredo dMPC compatible client
* `fusionkms` - BIP39/BIP44 secure key generator
* `mpcfusionmodel` - Mock MPC server for testing

## Introduction

### Bring your own Keyring

Fusion allows users or outside institutions to onboard their own keyring specifically for their dApp or their clients 
which frees the clients from the burden of managing all of their keys by themselves.
Having their own keyring can be beneficial if they want to be in full control of their key material while enjoying the benefits of Fusionchain.

To onboard a new keyring, users can submit a `NewKeyring` transaction with a certain payload specifying the keyring and keyring settings.
There will also be an onboarding fee for spam protection.

### Keyring parties

Responses to key- and signature requests are being published to Fusionchain by a keyring party which represent the keyring system. 
The keyring parties are being added through on-chain transactions to the keyring object on Fusionchain. 
Only the keyring parties are able to publish responses to Fusionchain.

The current setup envisions a single keyring relayer to publish the responses. For the future it is aimed that each keyring party
publishes their share of the key or the signature on-chain and assembled there by Fusionchain itself. 
This implementation should increase transparency and enable higher degree of collaboration for keyrings. 

### Keyring economics and policies

Keyring operators can directly charge a fee for key- and signature requests that will be paid in the native currency or possibly other IBC tokens in the future. 
This directly creates a revenue stream for keyring operators to the respective keyring address. Keyring admins can manage these funds.

A keyring object is managed on-chain by keyring admins. Apart from managing the keyring's funds, the admin can define certain policies that need
to be met when managing the keyring. For example, a keyring policy defines how a keyring party is added.

## Keyring Onboarding

This paragraph gives a step-by-step instruction how to onboard a new keyring to Fusionchain. 

1. Have a funded fusion address for transaction fees.
2. Invoke a `NewKeyring` transaction, prepare the following data: 
    * Description: Properly describe your keyring
    * Admin Policy: Find the policy you want to have applied to the keyring. For default policies, add `0`.
    * Key Request Fee: Indicates how much a key creation should cost the requestor. Indicated in nQRDO.
    * Signature Request Fee: Indicates how much a signature request cost the requestor. Indicated in nQRDO
3. A new keyring object is created on-chain with its own dedicated keyring address.
4. Add a keyring party with `AddKeyringParty` transaction. The fusion client inside the keyring infrastrucutre has its own fusion address. Only this address will be able to publish the responses. 
5. Now the keyring is set up and users can request signatures with the respective keyring address. 

## Keyring Interface

The keyring needs to listen to key and signature requests for their respective keyring address. 
While key requests directly indicate the keyring address in the request, the signature requests contain the keyring address inside the keys object. 

### Listen to Requests

The keyring needs to listen to the following requests in the treasury module: 

* `NewKeyRequest`: Requests a key with an indicated key type
* `NewSignatureRequest`: Requests a general signature for a certain key
* `NewSignTransactionRequest`: Requests a signature for a transaction for a certain key and indicated destination

### Publish Responses

The keyring publishes the responses via the following transactions:

* `UpdateKeyRequest`: Publish the respective public key information on Fusionchain
* `FilfillSignatureRequest`: Publish the respective signature for general- and transaction signature request. 

## Out-of-the-box Keyring

We are going to provide off-chain keyring infrastructure that allows for easy deployment of new keyrings in the future. 
