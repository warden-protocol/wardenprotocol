---
sidebar_position: 8
---

# Manage your wallets

## Overview

This guide explains how to manage your Warden wallets:

- [The main account](#the-main-account): The main wallet holding your assets on the supported chains.
- [Dedicated wallets](#dedicated-wallets): Special wallets used for Agent and trading fees.

## Access your wallets

You can access your wallets from any Warden tab:

1. Log in: 👉 [Warden](https://app.wardenprotocol.org)
2. Click the wallet icon in the top-right corner.
3. This will open the wallet panel at the right.
4. Use the menu at the top of the wallet to switch between your accounts:
   - **Main account**: [Your main account](#the-main-account)
   - **Agents Credits**: [The Agents Credits wallet](#agents-credits)
   - **Trading**: [The trading wallet](#trading)
   - **Bets**: [The Betflix wallet](#betflix)

![Access your wallet in Warden](../../static/img/warden-app/manage-your-wallets-1.png)
![View your wallet in Warden](../../static/img/warden-app/manage-your-wallets-2.png)

## The main account

The **main account** is the main Warden wallet holding your funds on all the supported chains. Here you can view your balances and activity, initiate transactions, whitelist addresses, and manage other settings.

### Deposit

To start transacting on a chain, you need to fund your main account with its native coin—for example, **SOL on Solana**. Then you'll be able to receive other tokens available on the network.

To deposit an asset, take the following steps:

1. Log in: 👉 [Warden](https://app.wardenprotocol.org)
2. Click the wallet icon in the top-right corner.
3. Make sure that **Main Account** is selected.
4. Click **Deposit**.
5. Select one of the [supported networks](/#supported-networks).
6. Select one of these options:
   - **Pay with card**: Pay through MoonPay.
   - **Transfer from wallet**: Link a Web3 wallet and deposit funds from it. 
   - **Receive funds**: Copy your wallet address or scan the QR code.
7. Follow the instructions.

:::tip
To view and unlink your linked wallets, see the [account settings](#configure).
:::

![Access your wallets in Warden](../../static/img/warden-app/manage-your-wallets-1.png)
![Select the main account in Warden](../../static/img/warden-app/manage-your-wallets-main-1.png)

### Send or swap

You can send or swap assets in your main account using simple **chat commands**:

1. Log in: 👉 [Warden](https://app.wardenprotocol.org)
2. Make sure your [main account is funded](#deposit).
3. Initiate a transaction. There are two ways to do it:
   - In the main account, click **Swap**/**Send**. This will start a chat.
   - In the **Chats** tab, ask the [Warden Agent](explore-ai-agents#warden-agent) to send or swap an asset.
4. Provide the required details and confirm the transaction in the chat.
5. The Agent will share the transaction details with you.

Alternatively, you can use any other [AI Agent](explore-ai-agents) that supports sending or swapping assets. For bridging, use the [deBridge Agent](explore-ai-agents#debridge).

:::note
Transactions are subject to [transfer](fees#transfer-fee) and [swap fees](fees#swap-fees).
:::

:::tip Tips
- When specifying the recipient, you can refer to your [favorite addresses](#configure) by name.
- You can check your history in the wallet's **Activity** tab.
:::

![Send or swap assets using the Warden Agent](../../static/img/warden-app/quick-start-1.png)

### View your assets

To view your balances and activity, do this:

1. [Open the main account](#access-your-wallets).
2. See the **Assets** and **Activity** tabs.

Alternatively, you can go to the **Chats** tab and ask the default [Warden Agent](explore-ai-agents#warden-agent) about your balances.

![View your balance and activity in Warden](../../static/img/warden-app/manage-your-wallets-main-2.png)

### Configure

To access your Warden account settings, [open any wallet](#access-your-wallets) and click the gear icon at the top:

![Access your account settings in Warden](../../static/img/warden-app/manage-your-wallets-main-3.png)

The following settings are available:

- **Favorite Addresses**: Whitelist addresses to reference them by name in the [AI chat](use-the-chat).
- **Security**: Manage your private keys and passkeys.
- **Login**:
  - Link and unlink Web3 wallets (for [depositing assets](#deposit)).
  - Add an authentication method.
- **Integrations**: Connect third-party services required by certain Agents, such as [Google Assistant](explore-ai-agents#google-assistant).

![The available wallet settings in Warden](../../static/img/warden-app/manage-your-wallets-main-4.png)

### Get the private key

To get your private key, take these steps:

1. [Open any wallet](#access-your-wallets).
2. Click the gear icon at the top to access your account settings.
3. In the **Security** section, click your private key on the desired network.
4. Click **Copy key**.

:::warning
Never share your private key with anyone. It grants full access to your assets.
:::

:::note
You can use your private key to export the wallet. To learn more, see [Privy docs](https://privy-io.notion.site/Transferring-your-account-9dab9e16c6034a7ab1ff7fa479b02828).
:::

![Access your account settings in Warden](../../static/img/warden-app/manage-your-wallets-main-3.png)
![Copy your private key in Warden](../../static/img/warden-app/manage-your-wallets-main-5.png)

### Get the address

To copy your wallet address (the public key), take these steps:

1. [Open the main wallet](#access-your-wallets).
2. Click **Addresses**.
3. Select an address associated with the desired network.

![Access your addresses in Warden](../../static/img/warden-app/manage-your-wallets-main-6.png)

## Dedicated wallets

**Dedicated wallets** are special wallets where Warden stores funds for some of the AI Agents and trading.

:::tip
You can fund your dedicated wallets only from the [main account](#the-main-account).
:::

### Agents Credits

The **Agents Credits wallet** is a dedicated place where Warden stores your **Agents Credits**, which are used to pay certain [AI Agents](explore-ai-agents). The balance is held as **USDC on Base**.

This is how you can fund this wallet from the [main account](#the-main-account):

1. Log in: 👉 [Warden](https://app.wardenprotocol.org)
2. Click the wallet icon in the top-right corner.
3. Select **Agents Credits**.
4. Click **Deposit**.
5. Enter the amount and confirm.

Once you interact with an Agent using Agent Credits, you'll see your activity right in the wallet.

:::tip
To deposit and pay for gas, make sure your main account has **USDC and ETH** on **Base**.
:::

:::warning
Currently, withdrawals aren't allowed.
:::

![Deposit to the Agents Credits wallet in Warden](../../static/img/warden-app/manage-your-wallets-credits-1.png)

### Trading

The **trading wallet** is a dedicated place where Warden stores your perpetual trading balance to protect assets in the [main account](#the-main-account).

Learn more: [Perpetual trading](trade#manage-the-trading-wallet).

### Betflix

The **Betflix wallet** is a dedicated place where Warden stores your Betflix balance to protect assets in the [main account](#the-main-account).

Learn more: [Play Betflix](play-betflix#manage-the-betflix-wallet).
