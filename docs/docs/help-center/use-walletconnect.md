---
sidebar_position: 7
---

# Use WalletConnect

To use EVM dApps through SpaceWard, you must connect using WalletConnect.

First, go to the "connect wallet" section in the app or dApp you're using and select the WalletConnect option.

Then, copy the pairing code as shown in the provided image.
![WalletConnect Copy](https://i.ibb.co/pf957KY/wc-copy.png)

Next, enter this pairing code into the WalletConnect tool on SpaceWard, as depicted in another image, and click on "connect."

![WalletConnect Paste Pairing Code](https://i.ibb.co/9wyKgYn/wc-paste.png)

Following this, select the Space or Address you wish to use for dApp interactions and click "Approve connection."

![Choose Space approve connection](https://i.ibb.co/DMBF2z4/wc-choose-space.png)

With the connection established, you're now ready to perform transactions within the dApp. Initiating a transaction will prompt an approval request in the WalletConnect section. 

![enter image description here](https://i.ibb.co/nR6sdNL/wc-approve.png)

By clicking "approve," the transaction is sent to the intents engine of the Warden Protocol. This may lead to a signature request in your Cosmos wallet or initiate a different process based on the used intent. Once approved, the transaction will be pushed into the Keychain for signature and broadcasted into the destination blockchain. The transaction will be executed. 
