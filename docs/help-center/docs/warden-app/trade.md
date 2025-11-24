---
sidebar_position: 7
---

# Trade

## Overview

**perpetual trading**...

...Use perps (perpetual contracts) to trade on an asset's future price movements...

:::tip
Want to trade just for fun? Try [Betflix](play-betflix).
:::

:::warning
Perpetual Trading involves significant risk, including potential loss of all funds due to leverage and volatility, and may not suit all users. Market data is provided by Hyperliquid.
:::

## Perpetual trading

A **trade perp** (**perpetusl contract**) is an tool that allows trading on crypto price movements without owning the actual tokens.

These contracts never expire, meaning you can keep them open as long as you meet the required **margin**.

:::note
Margin is a security deposit you must keep in your account so your trade can stay open. If your margin gets too low because your position is losing money, Warden will automatically close the position.
:::

Perps also let you use **leverage**, which means you can control a larger position than the amount of money you put in. In practice, this multiplies both your potential gains and your potential losses. For example, with 5× leverage, a 1% price move feels like a 5% move on your position. The contract doesn't give you extra money — it just magnifies the impact of price changes on your margin.

To keep perp prices aligned with the real token price, the system uses **funding rates**. These are small, automatic payments exchanged between traders who are long and those who are short. When the perp price drifts above the real market price, longs pay shorts; when it drifts below, shorts pay longs. You don't need to take any action yourself—Warden handles these transfers to pull the perp price back toward the spot price.

:::warning
Trading with leverage amplifies gains and losses, and exposes your perps account balance to the risk of liquidation.
:::

:::note
Liquidation: If a drop in price in your leveraged positions puts you in danger of losses that exceed your perps account balance, Warden protects you by selling your assets automatically to cover losses.
:::

## Start trading

To start trading, follow these steps:

1. Log in: 👉 [Warden](https://app.wardenprotocol.org)
2. In the left menu, open the **Trade** tab.
3. In the lower-right corner of the screen, click **Start Trading** and confirm.
4. Select a perp from the drop-down menu at the top left.
5. In the right panel, click **Open Order** and configure your order:
   - Select **Long** or **Short**.
   - Under **Your margin**, enter the perp amount. 
   - To adjust the leverage, use the **Leverage** slider.
   - To enable auto-closing, toggle **Auto-Close** and set your conditions.
6. Click **Long**/**Short** at the bottom.
7. Review the order details and click **Open Long**/**Open short**.

:::tip
Each trade incurs [trade fees](fees#trade-fees).
:::

**USDC on Arbitrum**...

- Fund your account  
  Your perps account balance is kept in another wallet. This protects assets that you don't specifically allocate to perps trading from being liquidated. You can easily transfer funds to your perps account from your main Warden wallet.

- Make a trade  
  Using funds in your perps account, you can take a long or short position on any supported token. You can leverage your position for greater exposure. This amplifies gains and losses.

- Manage your positions  
  - Track your open trades in real time. Adjust leverage or close your position at any time.
  - The price of a perp follows the token’s spot price. If it drifts too far, a small funding payment helps bring it back. When the perp price is higher than spot, longs pay shorts. When it's lower, shorts pay longs.
  - Your positions each display a liquidation price (a value at which your positions are closed to cover losses). Avoid liquidation with trading tools like TP and SL prices.

## View your trades & history

You can view your trades at the bottom of the screen, in the **Positions** tab.

Your history is visible in the **History** tab.

## View the live chart

Live charts: Japanese Candlestick / Line
