---
sidebar_position: 4
---

# Register on ERC-8004

## Overview

After [hosting your Agent](host-your-agent), you can register it in the [ERC-8004 Identity Registry](warden-code/erc-8004-registration).

This mints an **Agent NFT** on your chosen chain and sets the **Agent URI** pointing to your Agent's metadata.

Warden Code supports [30 EVM chains](warden-code/erc-8004-registration#networks), and allows registration across multiple networks.

## 1. Prepare a wallet

1. Make sure you have a Web3 wallet, such as MetaMask.

   :::important
   For security reasons, we recommend creating a separate account for your Agent.
   :::
   
2. Fund your wallet on one of the [available networks](warden-code/erc-8004-registration#networks).

   :::tip
   When registering your Agent, you'll need to pay a fee. To avoid spending real funds, you can start with a testnet and use faucets to get free assets.
   :::

3.  Copy the private key for the account you are going to use. You'll need it later.

## 2. Prepare the metadata 

**ERC-8004 metadata** is a JSON document describing the Agent's identity, capabilities, and other details. Once you register your Agent, its metadata will be publicly available and linked to your Agent's NFT.

Before starting, prepare the correct data:

- Make sure you [added the production URL](host-your-agent#5-update-the-agent-card) to the Agent Card.
- Optionally, [add an avatar](host-your-agent#6-add-an-avatar).

:::note
During registration, Warden Code will automatically update the ERC-8004 metadata using data from your Agent Card. You can find both in your project:

- `src/public/.well-known/agent-registration.json`
- `src/public/.well-known/agent-card.json`
:::

## 3. Register   

1. Navigate to your project and run Warden Code:

   ```bash
   warden
   ```

2. Run this command to start registering your Agent:
   
   ```bash
   /register
   ```

3. Select a network.
   
4. Add your wallet's private key.

   :::warning
   This key grants full control of your account. Anyone with access to it can transfer funds or take ownership of your Agent. Never share it or expose it publicly.
   :::

5. Confirm the Agent URL and proceed with registration.

6. If registration is successful, Warden Code will display status updates and registration details.

   For example, here is a log for an Agent registered on Ethereum Sepolia:

   ```text
   √ Step 1/3  Agent minted (agentId: 2302)
   √ Step 2/3  Registration files updated
   √ Step 3/3  Agent URI set on-chain

   ✓ Agent registered on ERC-8004

     Agent ID:       2302
     Agent Registry: eip155:11155111:0x8004A818BFB912233c491871b3d84c89A494BD9e
     Agent URI:      https://general-test.onrender.com/.well-known/agent-registration.json
     TX 1:           https://sepolia.etherscan.io/tx/0xa5462f7575407d59c0701facb3acba4844c698a2973ff8ed2f484a770204cd1c
     TX 2:           https://sepolia.etherscan.io/tx/0x4e468a2aea003a776ef92403aafbc0e37ccbea3958d772c4813bfb0ad568dacf
   ```

   Warden Code will also add these details to the ERC-8004 metadata file.

7. Push local changes to your repository.

## 4. Verify the Agent URI

Check the **Agent URI** returned in the previous step:

```text
PUBLIC_URL/.well-known/agent-registration.json
```

You'll see the Agent metadata: its public URL (endpoint), image and Agent Card URLs, registration details, and other information:

```json
{
  "type": "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
  "name": "general-test",
  "description": "A helpful AI agent named general-test",
  "image": "https://general-test.onrender.com/icon.png",
  "services": [
    {
      "name": "A2A",
      "endpoint": "https://general-test.onrender.com/.well-known/agent-card.json",
      "version": "0.3.0"
    },
    {
      "name": "Web",
      "endpoint": "https://general-test.onrender.com/"
    }
  ],
  "x402Support": false,
  "x402Networks": [],
  "active": true,
  "registrations": [
    {
      "agentId": 2302,
      "agentRegistry": "eip155:11155111:0x8004A818BFB912233c491871b3d84c89A494BD9e"
    }
  ],
  "supportedTrust": [
    "reputation"
  ]
}
```

:::note
You can update the metadata even after registration—for example, add an avatar or change the Agent name.
:::

## 5. Verify the NFT creation

To verify the NFT creation, take these steps:

1. Note down the registry contract address. Warden Code returns it as **Agent Registry**: 

   ```text
   Agent Registry: eip155:11155111:0x8004A818BFB912233c491871b3d84c89A494BD9e
   ```

   You need only the last part: `0x8004A818BFB912233c491871b3d84c89A494BD9e`.

2. Note down the Agent ID. Warden Code returns it as **Agent ID**:

   ```text
   Agent ID:       2302
   ```
3. Open your network's block explorer and find the registry contract.

   For example, here is the [Ethereum Sepolia contract](https://sepolia.etherscan.io/address/0x8004A818BFB912233c491871b3d84c89A494BD9e).

4. Now find a section where you can query the contract. 

   On Sepolia Etherscan, navigate to [Contract > Read as Proxy](https://sepolia.etherscan.io/address/0x8004A818BFB912233c491871b3d84c89A494BD9e#readProxyContract).

5. Click a function for getting the Agent URI.

   For example, to query the Sepolia registry contract, click `tokenURI`.

6. Paste the Agent ID in the input field. You can try our test Agent: `2302`.

7. Click **Query**. You'll see your Agent URI.

## 6. Deactivate

After registration, you can deactivate your Agent:

1. Run Warden Code

```bash
warden
```

2. Deactivate the Agent:

```bash
/deactivate
```

3. To activate it back, run this:

```bash
/deactivate
```

These commands toggle the Agent's `active` flag in `agent-registration.json` and push the update to all registered chains.

## Next steps

Try the [Agent reputation feature](warden-code/erc-8004-registration#reputation).
