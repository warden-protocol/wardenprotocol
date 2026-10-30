---
sidebar_position: 2
title: WARD migration
description: Official guide to the $WARD migration from Warden Chain to a LayerZero OFT on Base, BNB Chain and Robinhood Chain.
---

# WARD migration

This is the official guide to the $WARD migration for holders, exchanges, trackers and partners. If another source contradicts this page, this page is correct.

:::info Last updated
Version 4, 30 October 2026. The migration is 100% complete. Exchange networks and deposit and withdrawal status are published.
:::

:::tip Migration 100% complete
The $WARD migration is 100% complete. New $WARD has been distributed to all eligible holders: exchanges, individual accounts, stakers and liquidity providers. New $WARD is live on Base, BNB Chain and Robinhood Chain, and only the [new contract addresses](#new-ward-contract-addresses) are official $WARD. For deposits and withdrawals on exchanges, see [Centralized Exchange Support](#centralized-exchange-support).
:::

## Overview

- $WARD is moving from Warden Chain to a [LayerZero OFT](https://docs.layerzero.network/v2/developers/evm/oft/quickstart) on **Base**, **BNB Chain** and **Robinhood Chain**. The migration was approved by governance in [proposal #6](https://staking.wardenprotocol.org/governance/6).
- The ticker stays **$WARD**. Balances migrate **1:1** and **automatically**. There is nothing to claim.
- Only addresses holding **at least 1 $WARD** at the snapshot receive the airdrop.
- The max supply, previously unlimited, is now capped at **2,000,000,000 $WARD**. Total supply and circulating supply stay the same, and the release schedule doesn't change.

## Key times

All times are on **Thursday 29 October 2026, UTC**.

| Time                    | What happens                                                                                    |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| 07:00                   | Exchanges suspend $WARD deposits and withdrawals, unless your exchange announces a different time. Liquidity providers should have removed liquidity. |
| 08:00                   | Snapshot on Warden Chain, BNB Chain and Base.                                                   |
| 12:00                   | The airdrop of new $WARD starts.                                                                |
| After completion notice | Exchanges reopen deposits and withdrawals on the new contracts.                                 |

## New WARD contract addresses

These are the **only** official $WARD contracts after the migration.

| Chain           | Contract address                                                                                                                       | Decimals |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Base (main)     | [0x174a0de0FA1c4771cA980A42553C0041016E5A67](https://basescan.org/token/0x174a0de0FA1c4771cA980A42553C0041016E5A67)                    | 18       |
| BNB Chain       | [0xf5cB7cc90040aa717a16887C8b7D7c10a7c60984](https://bscscan.com/token/0xf5cB7cc90040aa717a16887C8b7D7c10a7c60984)                     | 18       |
| Robinhood Chain | [0x425343244492A0D6f6D9676A7d627045656eaB80](https://robin.etherscan.io/token/0x425343244492A0D6f6D9676A7d627045656eaB80)              | 18       |

Use the symbol **WARD** and **18** decimals when you add the token to a wallet.

## Where you receive new WARD

| You hold $WARD on               | You receive new $WARD on                                                 |
| ------------------------------- | ------------------------------------------------------------------------ |
| Warden Chain                    | Base, at the same `0x` address                                           |
| Base                            | Base                                                                     |
| BNB Chain                       | BNB Chain                                                                |

## If you use a self-custody wallet

A self-custody wallet is a wallet where you control the seed phrase or private key, not an exchange. Examples include browser and mobile wallets such as MetaMask, Rabby, Trust Wallet, Rainbow and Keplr, and hardware wallets such as Ledger and Trezor.

1. **Do nothing to claim.** Keep your $WARD in your wallet through 08:00 UTC on 29 October.
2. **Warden Chain holders:** your new $WARD arrives on Base at the same `0x` address you used on Warden Chain. To see your balance, switch the network to Base in the same wallet.
3. **Add the new contract** to your wallet after 12:00 UTC, using the [contract addresses](#new-ward-contract-addresses) above.
4. **Staked $WARD:** your staked $WARD and any staking rewards you haven't claimed are included in the airdrop. They're sent to your staker address, the wallet that is staking. You don't need to unstake or claim rewards before the snapshot.
5. **Don't move $WARD** to a bridge or a new wallet around the snapshot.

## If you hold WARD on an exchange

1. **Nothing to do.** Your exchange credits you 1:1.
2. **Expect a pause.** Deposits and withdrawals are suspended from 07:00 UTC on 29 October, or from the time your exchange announces, until your exchange reopens on the new contracts.
3. **Check your exchange's announcement** for more details. See [Centralized Exchange Support](#centralized-exchange-support) below.

:::warning
Don't withdraw to a wallet during the pause. Don't deposit old $WARD after 08:00 UTC on 29 October: it won't be credited.
:::

### Centralized Exchange Support

This table lists the exchanges that support the migration, the network each one uses for new $WARD, and whether deposits and withdrawals have reopened. It will be updated as exchanges publish their announcements.

| Exchange      | Network   | Migration support | Announcement                                                                                                                | Deposits and withdrawals                                                                                                   |
| ------------- | --------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Kraken        | BNB Chain | Confirmed         | [Kraken announcement](https://support.kraken.com/articles/ward-migration)                                                   | Reopened. See the [Kraken announcement](https://support.kraken.com/articles/ward-migration)                                |
| Bitget        | Base      | Confirmed         | [Bitget announcement](https://www.bitget.com/support/articles/12560603898692)                                               | Reopened. See the [Bitget announcement](https://www.bitget.com/support/articles/12560603899215)                            |
| HTX           | Base      | Confirmed         | [HTX announcement](https://www.htx.com/support/65047305474609/)                                                             | Reopened. See the [HTX announcement](https://www.htx.com/en-us/support/75047677424570/)                                    |
| KuCoin        | Base      | Confirmed         | Pending                                                                                                                     | Not announced yet                                                                                                          |
| Gate          | Base      | Confirmed         | [Gate announcement](https://www.gate.com/announcements/article/102414)                                                      | Not announced yet                                                                                                          |
| MEXC          | Base      | Confirmed         | [MEXC announcement](https://www.mexc.com/announcements/article/mexc-to-support-the-warden-ward-contract-swap-17827791539302) | Not announced yet                                                                                                          |
| Binance Alpha | BNB Chain | Confirmed         | Check [Alpha](https://www.binance.com/alpha/bsc/0x6dc200b21894af4660b549b678ea8df22bf7cfac) for more information            | Not announced yet                                                                                                          |

## If you provide liquidity on a DEX

:::danger
Remove your $WARD liquidity from every DEX pool **before 07:00 UTC on Thursday 29 October**.
:::

After the snapshot, old $WARD has no value, but old pools still hold real USDT, BNB or ETH. Anyone can sell old $WARD into these pools and drain the paired asset.

- **Liquidity left in pools:** the $WARD side of your position is credited to you at the snapshot. The paired asset (USDT, BNB, ETH or other) is **not** protected.
- **Farms and gauges:** unstake your LP tokens first, then remove liquidity.
- **Official new pools:** only provide liquidity to the pools listed in [Official new pools](#official-new-pools). More pools will be added as they go live.

### Official new pools

| Chain     | DEX         | Pair      | Pool                                                                                                                            |
| --------- | ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| BNB Chain | PancakeSwap | WARD/USDT | [PancakeSwap pool](https://pancakeswap.finance/liquidity/pool/bsc/0x63e05695e17b36283d56932dd6553f9558a6cd49c7a27fe5b6fc94f9d6328bb1) |

## After the snapshot

- Old $WARD is deprecated on every chain, including the previous bridged contracts on Base and BNB Chain. Don't buy, sell or deposit it.
- Warden Chain halted at the snapshot block, **12139915**. No new blocks or transactions are processed. All legacy bridge routes for $WARD have stopped working too.
- The list of excluded addresses (bridges, pools, module accounts and the zero address) will be published here.

### Snapshot block heights

| Chain           | Snapshot block    |
| --------------- | ----------------- |
| Warden Chain    | 12139915          |
| Base            | 53235727          |
| BNB Chain       | 130437410         |

## Safety

- The only official contracts are listed in [New WARD contract addresses](#new-ward-contract-addresses).
- Warden will **never** ask you to send tokens, connect to a claim site or share your seed phrase. There is no claim: the airdrop is automatic.
- Follow official announcements on [X](https://x.com/wardenprotocol) and [Discord](https://discord.gg/nEww9WsAUa).

## FAQ

### Will my balance change?

No. Balances migrate 1:1.

### Is there a minimum balance?

Yes. Only addresses holding at least 1 $WARD at the snapshot receive the airdrop.

### Does the ticker change?

No. The ticker stays $WARD.

### Do I need to claim my new WARD?

No. The airdrop is automatic. Any site asking you to claim or connect your wallet is a scam.

### What happens to my staked WARD?

Your staked $WARD and unclaimed staking rewards are airdropped to your staker address, the wallet that is staking. For Warden Chain stakers, that's the same `0x` address on Base.

### What is the max supply?

The max supply was previously unlimited. It's now capped at 2,000,000,000 $WARD.

### Do the total supply, circulating supply or release schedule change?

No. Total supply and circulating supply stay the same, and the release schedule doesn't change.

### Where are the snapshot details?

See [After the snapshot](#after-the-snapshot).
