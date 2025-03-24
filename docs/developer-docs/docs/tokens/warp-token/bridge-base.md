---
sidebar_position: 2
---

# Bridge to Base

## Overview

**WARP tokens** are available on the Base chain's decentralized exchanges (DEXes) as [WARP-USDC](https://www.dextools.io/app/en/base/pair-explorer/0xf523d578816e1b537d8d69500d44d0c699b5d9a9?t=1714815531823). 

This section explains how to acquire WARP on Base using Squid Router powered by Axelar.

## Squid Router

Squid, with Axelar's backing, enables the seamless exchange of tokens between different blockchains, facilitating instant access to applications spanning multiple chains with just one click. Utilize Squid to create user-friendly interfaces that leverage crosschain liquidity, expanding your reach to users with crypto wallets on various chains.

In short? Transfer your assets from any EVM or Cosmos chain towards any EVM chain (including Base) or Cosmos chain! It's as simple as a Swap.

- Squid, powered by Axelar, facilitates secure bridging to Base through its decentralized crosschain communication network.
- Axelar enables Squid to connect Base with over 45 other blockchains using a proof-of-stake network with 75 active validators.
- Users who bridge to Base via Squid maintain their original asset position on the connected chain, secured by Axelar network.

## 1. Get ETH

First, you should get some ETH for future transactions on Base. Base fees are very low, so you don't need to bridge a big amount of ETH in the USDC value.

1. Go to [Squid Router](https://app.squidrouter.com/).

2. In **FROM**, select the preferred source chain and token.

   :::note  
   If you're using a Cosmos chain (ATOM, Osmosis), you'll be able to connect a Keplr wallet. If you select an EVM chain (Ethereum, Optimism), you'll be able to connect a MetaMask wallet.
   :::

3. In **TO**, select the **Base** chain and the **ETH** token.

![Get ETH in Squid Router: select the destination chain](https://i.ibb.co/HpY6P3L/unnamed-8.png)

5. Then add your Base chain EVM address as the destination address. Note that CEX addresses are **NOT** supported.

![Get ETH in Squid Router: enter the destination address](https://i.ibb.co/8bkBKx6/unnamed-7.png)

6. Initiate and approve the transaction.

7. Verify the transaction on [Axelarscan](https://axelarscan.io).

8. Once the transaction and verification is complete, you'll receive your assets on Base chain.

9. Add a Base chain RPC to your MetaMask: just click **Connect Wallet** on [ChainList](https://chainlist.org/chain/8453). Alternatively, you can add a Base RPC to any other wallet that that supports EVM chains using ChainList.


## 2. Get USDC

Then you should get some USDC for the WARP-USDC trading pair:

1. Go to [Squid Router](https://app.squidrouter.com/).

2. In **FROM**, select the preferred source chain and token.

   :::note  
   If you're using a Cosmos chain (ATOM, Osmosis), you'll be able to connect a Keplr wallet. If you select an EVM chain (Ethereum, Optimism), you'll be able to connect a MetaMask wallet.
   :::

3. In **TO**, select the **Base** chain and the **USDC** token.

![Get USDC in Squid Router: select the destination chain](https://i.ibb.co/4p48qwp/unnamed-6.png)

5. Then add your Base chain EVM address as the destination address. Note that CEX addresses are **NOT** supported.

![Get USDC in Squid Router: enter the destination address](https://i.ibb.co/8bkBKx6/unnamed-7.png)

6. Initiate and approve the transaction.

7. Verify the transaction on [Axelarscan](https://axelarscan.io).

8. Once the transaction and verification is complete, you'll receive your USDC on Base chain.

## 3. Get WARP

You're now all set! You can acquire and accumulate WARP on the Base chain's DEXes—see the [WARP-USDC pair](https://www.dextools.io/app/en/base/pair-explorer/0xf523d578816e1b537d8d69500d44d0c699b5d9a9?t=1714815531823).
