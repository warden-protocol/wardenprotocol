---
sidebar_position: 7
---

# Trade

## Overview

In Warden, you can use **perpetual contracts** (**trade perps**) powered by [Hyperliquid](https://hyperfoundation.org). This tool allows you to trade on future price movements of a token without actually owning it.

This guide explains how to do the following:

- Open and manage your positions
- Manage the trading wallet
- Check live token metrics

To learn more about perps and the related concepts, see [Perpetual trading](#perpetual-trading).

:::warning
Perpetual Trading involves significant risk, including potential loss of all funds due to leverage and volatility, and may not suit all users.
:::

:::tip
Want to trade just for fun? Try [Betflix](play-betflix).
:::

## Manage positions

### 1. Prepare funds

To start trading, you need **USDC** on **Ethereum**, **Arbitrum**, **Base**, or **BSC** (**$5** or more):

1. Log in: 👉 [Warden](https://app.wardenprotocol.org)
2. If you don't have USDC, [deposit it to your main wallet](manage-assets#deposit-assets).
3. In the left menu, open the **Trade** tab.
4. Click the wallet icon at the top right to open the [trading wallet](#manage-the-trading-wallet).
5. In the trading wallet, click **Deposit** and add USDC from your main wallet.

![Prepare funds for perpetual trading in Warden](../../static/img/warden-app/trade-1.png)

### 2. Open a position

Once you have funds in your trading wallet, you can open a position:

1. If it's your first trade, click **Start Trading** and confirm your consent.
2. Select a token pair from the drop-down menu at the top left.
3. In the configuration panel at the right, set your [order parameters](#order-parameters).
4. Click **Long**/**Short** at the bottom of the configuration panel.
5. Review your order details and confirm opening a position.

:::note Notes
- Tokens are always paired with **USDC**.
- Before selecting a token, you can [check its metrics](#check-token-metrics).
- Opening a position is subject to [trade fees](fees#trade-fees).
- Warden currently supports only **market orders**: they are executed immediately at the best available prices.
:::

![Open a perp position in Warden](../../static/img/warden-app/trade-2.png)

### 3. Manage your position

This is how you can track and manage your positions:

1. Track your positions at the bottom of the screen, in the **Positions** tab.
2. Click the **Manage** button next to any position.
3. Manage the position:
   - View its details.
   - Enable or disable **Auto-Close**. You can set **Take Profit** and **Stop Loss**. 
   - To close your position, click **Close** and confirm.
4. Check your closed positions in the **History** tab.

:::note
Next to each position, you can see its [liquidation price](#liquidation). You can avoid liquidation by enabling [Auto-Close](#order-parameters).
:::

![Track and manage your perp positions in Warden](../../static/img/warden-app/trade-3.png)

### Order parameters

When [opening a position](#2-open-a-position), you can set the following order parameters in the configuration panel:

- **Long**/**Short**: A setting indicating whether your position will benefit when the [spot price](#spot-price) moves up (long) or down (short).
- **Amount**: The token amount to trade, set in USDC. This will become your security deposit, or [margin](#margin).
- **Leverage**: Your [leverage](#leverage)—a multiplier defining how strongly the token's price movements affect your gains and losses. It can be **2–40x** depending on the token.
- **Auto-Close**: Automatically close your position when the market price reaches the thresholds you set:
    - **Take Profit**: The upper price where your position closes to secure profit.
    - **Stop Loss**: The lower price where your position closes to cut losses. This helps prevent [liquidation](#liquidation).

:::note
You can adjust **Auto-Close** even after opening the position. See [Manage your position](#3-manage-your-position).
:::

There are also additional parameters that are automatically calculated based on your settings:

- **Entry**: The estimated price at which your position will open if executed now, based on the current market conditions.
- **Liquidation price**: The price at which your position will automatically close to prevent further losses.
- **Size**: The total value of your position, determined by your margin and leverage.
- **Est. fee**: The total fee charged for opening a position. See [trade fees](fees#trade-fees).

## Manage the trading wallet

Your perpetual trading balance is kept in a separate **trading wallet**. This protects assets in the [main Warden wallet](manage-your-wallet) from being liquidated.

:::tip
Trading wallet supports **USDC** on the following networks:

- **Ethereum**
- **Arbitrum**
- **Base**
- **BNB Smart Chain (BSC**)
:::

To switch between the main and trading wallets at any time, click the wallet icon at the top right and select **Main Account** or **Trading**. When you're in the **Trade** tab, the trading wallet is selected automatically.

You can move funds between your wallets:

- To deposit USDC from the main wallet (starting from **$5**), click **Deposit**.
- To withdraw USDC to the main wallet, click **Withdraw**.

![Access the trading wallet in Warden](../../static/img/warden-app/trade-4.png)
![Switch between the main and trading wallets in Warden](../../static/img/warden-app/trade-5.png)

## Check token metrics

In the **Trade** tab, you can access tools for analyzing tokens' market metrics:

- **Live chart**: Switch chart types and use analysis tools such as markers, brushes, and more.
- **Order Book**: A live list of current buy and sell prices. It shows these parameters:
  - **Price**: The proposed buy or sell price.
  - **Amount**: The number of units available at that price.
  - **Total**: The accumulated volume.
  - **Spread**: The difference between the highest bid and lowest ask.
- **Messari Signals**: A brief report on the token. For deeper insights, use [Messari Deep Research](explore-ai-agents#messari-deep-research).

:::note
The market data is provided by [Hyperliquid](https://hyperfoundation.org).
:::

![Check token metrics in Warden (before opening a perp position)](../../static/img/warden-app/trade-6.png)

## Perpetual trading

#### Trade perp

A **trade perp** (**perpetual contract**) is a tool that allows you to trade on crypto price movements without owning the actual tokens. These contracts never expire, meaning you can keep them open as long as you meet the required [margin](#margin).

#### Margin

**Margin** is the security deposit that keeps your position open. If your margin drops too low because the position is losing money, a [liquidation](#liquidation) will happen: Warden will automatically close the position.

#### Leverage

**Leverage** is a tool that lets you control a larger position than the amount of money you commit as [margin](#margin). This magnifies the impact of price changes on your margin. For example, with a 5x leverage, a 1% price move feels like a 5% move on your position.

:::warning
Trading with leverage amplifies gains and losses, increasing the risk of [liquidation](#liquidation).
:::

#### Spot price

**Spot price** is the current market price at which an asset can be immediately bought or sold.

#### Long and short positions

**Long positions** are perps that benefit when the [spot price](#spot-price) moves up. **Short positions** benefit when it moves down.

#### Funding rates

**Funding rates** are small payments that keep the perp price close to the token's [spot price](#spot-price). When the perp price drifts away from the spot price, [long and short](#long-and-short-positions) traders pay each other:

- When the perp price is above the spot price, longs pay shorts.
- When the perp price is below the spot price, shorts pay longs.

:::note
No action is needed: Warden handles these payments automatically.
:::

#### Liquidation

**Liquidation** happens when losses on your [leveraged](#leverage) position reduce your [margin](#margin) to the point where it can no longer cover the risk. To prevent your balance from going negative, Warden automatically closes your position and finalizes the loss.
