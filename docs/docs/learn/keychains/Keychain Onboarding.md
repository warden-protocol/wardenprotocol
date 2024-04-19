### Register a keychain

This paragraph gives a step-by-step instruction on how to onboard a new keychain to Warden Protocol.

1.  Have a funded warden address for transaction fees.
    
2.  Invoke a NewKeychain transaction, prepare the following data:
    
	-   Description: Properly describe your keychain
    
	-  	Admin intent: Find the intent you want to have applied to the keychain. For default policies, add 0.
    
	-  	Key Request Fee: Indicates how much a key creation should cost the requester. Indicated in uward.
    
	-  	Signature Request Fee: Indicates how much a signature request cost the requester. Indicated in uWARD
    

4.  A new keychain object is created on-chain with its own dedicated keychain address.
    
5.  Add a keychain party with AddKeychainParty transaction. The warden client inside the keychain infrastructure has its own warden address. Only this address will be able to publish the responses.
    
6.  Now the keychain is set up and users can request signatures with the respective keychain address.
   
 ***
&nbsp;
### Keychain Interface

The keychain needs to listen to key and signature requests for their respective keychain address. While key requests directly indicate the keychain address in the request, the signature requests contain the keychain address inside the keys object.
&nbsp;

The keychain needs to listen to the following requests in the treasury module:

-   NewKeyRequest: Requests a key with an indicated key type
    
-   NewSignatureRequest: Requests a general signature for a certain key
    
-   NewSignTransactionRequest: Requests a signature for a transaction for a certain key and indicated destination
    
&nbsp;
The keychain publishes the responses via the following transactions:

-   UpdateKeyRequest: Publish the respective public key information on Warden Protocol
    
-   FulfilSignatureRequest: Publish the respective signature for general- and transaction signature request.

&nbsp;
We are going to provide off-chain keychain infrastructure that allows for easy deployment of new keychains in the future.
