---
sidebar_position: 10
title: Stake $WARD
description: Stake WARD in the Staked WARD vault on Base and earn rewards, from Base, BNB Chain or Robinhood Chain.
---

# Stake $WARD

Stake WARD in the Staked WARD vault on Base and earn rewards. You receive **sWARD**, a token that represents your stake. Rewards are added to your stake automatically: there is nothing to claim and nothing to restake. You collect them when you unstake.

You can stake WARD held on **Base**, **BNB Chain** or **Robinhood Chain**. WARD on BNB Chain or Robinhood Chain is bridged to Base for you first, then staked.

## At a glance

| | |
|---|---|
| Network | Base (chain ID 8453) |
| Reward rate | 5.00% APR (set by governance, see [Parameters](#parameters)) |
| Cooldown to unstake | 7 days |
| You receive | sWARD (Staked WARD), 18 decimals |
| Rewards | Added to your stake automatically |
| Stake from | Base, BNB Chain, Robinhood Chain |

## Before you start

You need:

- **A wallet.** Sign in with email or a social account (an embedded wallet is created for you), or connect an external wallet such as MetaMask or Rabby.
- **WARD** on Base, BNB Chain or Robinhood Chain.
- **A little ETH on Base** to pay network fees for approving and staking. Fees on Base are usually a fraction of a cent.
- **If you stake from BNB Chain or Robinhood Chain:** a little of that chain's native coin (BNB, or ETH on Robinhood Chain) to pay the bridge fee. The fee is shown before you confirm, typically around 0.0017 BNB from BNB Chain or 0.0005 ETH from Robinhood Chain.

## Stake WARD

1. Open the [staking portal](https://staking.wardenprotocol.org) and click **Connect wallet**.
2. Under **From**, choose the chain your WARD is on. Each button shows how much WARD you hold there.
3. Enter an amount, or click **Max**.
4. Click **Stake** (or **Bridge & stake** when staking from another chain) and confirm each transaction in your wallet. Your wallet switches network for you when needed.

The steps run in order and the portal shows each one as it completes:

| Step | Chain | What happens |
|---|---|---|
| Bridge to Base | BNB Chain or Robinhood Chain | Sends your WARD to Base over LayerZero. Only when staking from another chain. |
| Arrive on Base | — | Waits for the WARD to land on Base, usually a few minutes. A LayerZero Scan link lets you follow it. |
| Approve WARD | Base | Lets the vault take the amount you're staking. Skipped if you've already approved enough. |
| Stake | Base | Deposits your WARD and sends you sWARD. |

When it's done you'll see **Staked. Your sWARD is in your wallet on Base.**

:::note Bridging and dust
Bridging carries WARD to 6 decimal places. Anything finer stays on the source chain, and the amount is trimmed for you. If you close the page while the WARD is bridging, it still arrives on Base and you can stake it from Base later.
:::

## Your position

The portal shows:

- **Your stake**: what you'd get back if you unstaked now, rewards included.
- **Staked**: the WARD you put in that is still staked.
- **Rewards**: what your stake has earned (Your stake minus Staked).
- **Available**: WARD in your wallet that you can stake, summed across the three chains.

Figures show two decimals. Hover over one to see the exact amount.

## How rewards work

sWARD is an ERC-4626 vault share. Rewards are paid into the vault, so each sWARD is worth a little more WARD over time. Your number of sWARD stays the same while its value grows.

- **No claiming.** Rewards are part of your stake from the moment they're paid in.
- **Automatic compounding.** Rewards earn rewards, because they're part of the stake.
- **Paid out when you unstake.** The WARD you get back includes everything earned.

Rewards accrue continuously at the current APR and are paid from the Warden treasury into the vault whenever someone stakes, starts a cooldown or calls `settle()`.

## Unstake

Unstaking takes two steps, with a cooldown in between.

1. **Start the cooldown.** Open the **Unstake** tab, enter an amount (or **Max**) and click **Start cooldown**. Your sWARD for that amount is burned and the WARD is set aside.
2. **Withdraw.** After 7 days, click **Withdraw** to receive the WARD in your wallet on Base.

Things to know:

- **WARD in cooldown stops earning rewards.**
- **Starting another cooldown restarts the timer** for everything already cooling down. Example: 3 WARD with 2 days left, plus 1 more WARD, means 4 WARD with a fresh 7 days.
- **Withdrawing takes everything that has finished cooling down** in one transaction.
- **Unstaking pays out on Base.** To move WARD to another chain afterwards, bridge it.

## Legacy staking on Warden Chain

Staking with validators on Warden Chain has moved to the vault on Base. Your old delegations still appear under **Legacy staking** on the staking portal, read-only: you can no longer stake, unstake or switch validators there, but you can still click **Claim rewards**.

Your staked $WARD and unclaimed rewards on Warden Chain are included in the migration airdrop. See [What happens to my staked WARD?](https://docs.wardenprotocol.org/ward/migration#what-happens-to-my-staked-ward).

## sWARD

| | |
|---|---|
| Name | Staked WARD |
| Symbol | sWARD |
| Decimals | 18 |
| Contract | [`0xac030348309b6bFedf1b42e1cbc93f4077bF0da4`](https://basescan.org/address/0xac030348309b6bFedf1b42e1cbc93f4077bF0da4) (Base) |
| Standard | ERC-20, ERC-4626 vault, ERC-2612 permit |
| Transferable | Yes |
| Source | Verified on Sourcify |

sWARD can be sent like any token. Its WARD value goes with it, so the recipient can unstake it. To add it to a wallet manually, use the contract address above on Base, symbol `sWARD`, 18 decimals.

## Contracts

### Base (chain ID 8453)

| Contract | Address |
|---|---|
| Staked WARD vault (sWARD) | [`0xac030348309b6bFedf1b42e1cbc93f4077bF0da4`](https://basescan.org/address/0xac030348309b6bFedf1b42e1cbc93f4077bF0da4) |
| WARD (LayerZero OFT) | [`0x174a0de0FA1c4771cA980A42553C0041016E5A67`](https://basescan.org/address/0x174a0de0FA1c4771cA980A42553C0041016E5A67) |
| Cooldown silo (holds WARD during cooldown) | [`0xeAC8CFA92D98936B0E5F8FE1ED31D25A49AEEBcB`](https://basescan.org/address/0xeAC8CFA92D98936B0E5F8FE1ED31D25A49AEEBcB) |
| Rewards treasury | [`0xEBED9d065E14F2Ee000e985b8B2ABa80deC7767E`](https://basescan.org/address/0xEBED9d065E14F2Ee000e985b8B2ABa80deC7767E) |
| Vault governance | [`0x374F352d755947855A7a547A610d6FE7B63FEf97`](https://basescan.org/address/0x374F352d755947855A7a547A610d6FE7B63FEf97) |
| LayerZero EndpointV2 | `0x1a44076050125825900e736c501f859c50fe728c` |

### WARD on other chains

WARD is a LayerZero OFT. Each chain's contract *is* the token (no adapter, no approval needed to bridge), and all three are connected to each other.

| Chain | Chain ID | LayerZero EID | WARD | EndpointV2 |
|---|---|---|---|---|
| Base | 8453 | 30184 | `0x174a0de0FA1c4771cA980A42553C0041016E5A67` | `0x1a44076050125825900e736c501f859c50fe728c` |
| BNB Chain | 56 | 30102 | [`0xf5cB7cc90040aa717a16887C8b7D7c10a7c60984`](https://bscscan.com/address/0xf5cB7cc90040aa717a16887C8b7D7c10a7c60984) | `0x1a44076050125825900e736c501f859c50fe728c` |
| Robinhood Chain | 4663 | 30416 | [`0x425343244492A0D6f6D9676A7d627045656eaB80`](https://robinhoodchain.blockscout.com/address/0x425343244492A0D6f6D9676A7d627045656eaB80) | `0x6f475642a6e85809b1c36fa62763669b1b48dd5b` |

All WARD contracts use 18 decimals. Amounts are bridged with 6 shared decimals.

## Parameters

Current values, and how they can change:

| Parameter | Current | Rules |
|---|---|---|
| APR | 5.00% (`aprBps` = 500) | Governance proposes a change; it applies after a 48-hour delay. Maximum 1,000%. |
| Cooldown | 7 days | Governance proposes a change; it applies after a 48-hour delay. Between 1 and 30 days. |
| Vault cap | 2,000,000,000 WARD | Raising it takes a proposal and a 48-hour delay; lowering it is immediate. `maxDeposit` shows the room left. |
| Pause | Not paused | Governance can pause the vault. While paused, staking, cooldowns and withdrawals are all blocked. |

## For developers

### Contract interface

```solidity
// Staked WARD vault (sWARD), Base
function deposit(uint256 assets, address receiver) returns (uint256 shares); // needs a WARD approval first
function cooldownAssets(uint256 assets) returns (uint256 shares);           // start a cooldown by WARD amount
function cooldownShares(uint256 shares) returns (uint256 assets);           // start a cooldown by sWARD amount
function unstake(address receiver) returns (uint256 assets);                // withdraw a matured cooldown
function cooldowns(address account) view returns (uint256 assets, uint64 end);
function convertToAssets(uint256 shares) view returns (uint256);            // sWARD → WARD
function previewDeposit(uint256 assets) view returns (uint256);
function maxDeposit(address) view returns (uint256);                        // room left under the cap
function totalAssets() view returns (uint256);
function aprBps() view returns (uint32);
function cooldownDuration() view returns (uint64);
function pendingYield() view returns (uint256);                             // rewards owed, not yet paid in
function settle();                                                          // pull owed rewards from the treasury

event Deposit(address indexed sender, address indexed owner, uint256 assets, uint256 shares);
event CooldownStarted(address indexed account, uint256 assets, uint256 shares, uint64 end);
event Unstaked(address indexed account, address indexed receiver, uint256 assets);
```

The standard ERC-4626 `withdraw` and `redeem` always revert with `CooldownRequired()`; exits go through the cooldown. `maxWithdraw` and `maxRedeem` return 0.

### Stake (viem)

```ts
import { createWalletClient, custom, parseAbi, parseUnits } from "viem";
import { base } from "viem/chains";

const VAULT = "0xac030348309b6bFedf1b42e1cbc93f4077bF0da4";
const WARD = "0x174a0de0FA1c4771cA980A42553C0041016E5A67";
const abi = parseAbi([
  "function approve(address spender, uint256 amount) returns (bool)",
  "function deposit(uint256 assets, address receiver) returns (uint256 shares)",
]);

const wallet = createWalletClient({ chain: base, transport: custom(window.ethereum) });
const [account] = await wallet.getAddresses();
const amount = parseUnits("100", 18);

await wallet.writeContract({ account, address: WARD, abi, functionName: "approve", args: [VAULT, amount] });
await wallet.writeContract({ account, address: VAULT, abi, functionName: "deposit", args: [amount, account] });
```

Wait for the approval to be mined before sending the deposit.

### Unstake (viem)

```ts
const vaultAbi = parseAbi([
  "function cooldownAssets(uint256 assets) returns (uint256 shares)",
  "function cooldowns(address account) view returns (uint256 assets, uint64 end)",
  "function unstake(address receiver) returns (uint256 assets)",
]);

await wallet.writeContract({ account, address: VAULT, abi: vaultAbi, functionName: "cooldownAssets", args: [parseUnits("50", 18)] });

// after `end` (unix seconds) from cooldowns(account):
await wallet.writeContract({ account, address: VAULT, abi: vaultAbi, functionName: "unstake", args: [account] });
```

To unstake everything, use `cooldownShares(balanceOf(account))` instead of `cooldownAssets`, so no sWARD dust is left behind.

### Bridge to Base, then stake

From BNB Chain or Robinhood Chain, call the WARD OFT's `send` to the same address on Base (EID 30184), paying the quoted fee in the native coin. No approval is needed, and empty `extraOptions` work because the OFTs enforce their own gas options.

```ts
import { pad } from "viem";

const oftAbi = parseAbi([
  "struct SendParam { uint32 dstEid; bytes32 to; uint256 amountLD; uint256 minAmountLD; bytes extraOptions; bytes composeMsg; bytes oftCmd; }",
  "struct MessagingFee { uint256 nativeFee; uint256 lzTokenFee; }",
  "function quoteSend(SendParam sendParam, bool payInLzToken) view returns (MessagingFee fee)",
  "function send(SendParam sendParam, MessagingFee fee, address refundAddress) payable",
]);

const amount = (parseUnits("100", 18) / 10n ** 12n) * 10n ** 12n; // drop what 6 shared decimals can't carry
const param = { dstEid: 30184, to: pad(account), amountLD: amount, minAmountLD: amount, extraOptions: "0x", composeMsg: "0x", oftCmd: "0x" } as const;

const fee = await publicClient.readContract({ address: SOURCE_WARD, abi: oftAbi, functionName: "quoteSend", args: [param, false] });
await wallet.writeContract({ account, address: SOURCE_WARD, abi: oftAbi, functionName: "send", args: [param, fee, account], value: fee.nativeFee });
```

The OFT requires `msg.value` to equal the quoted `nativeFee` exactly, so quote right before sending. Then wait until the WARD balance on Base has gone up by `amount` (track delivery on [LayerZero Scan](https://layerzeroscan.com)), and stake it on Base as above.

### Reading a position

- **Your stake:** `convertToAssets(balanceOf(account))`, plus your share of rewards owed but not yet paid in (`pendingYield() × balanceOf(account) / totalSupply()`, capped at what the treasury can fund).
- **Cooling down:** `cooldowns(account)` returns the WARD amount and the unix time it can be withdrawn.
- **Staked (what was put in):** the vault doesn't store this per wallet. Rebuild it from the account's `Deposit`, `CooldownStarted` and sWARD `Transfer` events since the vault's deployment block (52,983,934, 23 Oct 2026). Deposits and incoming transfers add to it; cooldowns and outgoing transfers remove a proportional share.

### Errors you may see

| Error | Meaning |
|---|---|
| `CooldownRequired()` | `withdraw` or `redeem` was called; use a cooldown instead. |
| `CooldownNotMatured()` | `unstake` before the cooldown's end time. |
| `NoCooldown()` | `unstake` with nothing cooling down. |
| `PrincipalCapExceeded()` | The deposit is bigger than the room left under the cap. |
| `ZeroAmount()` / `ZeroShares()` | The amount is zero, or too small to mint any sWARD. |
| `Paused()` | The vault is paused. |
| `ERC20InsufficientAllowance` (`0xfb8f41b2`) | The vault isn't approved for the amount. Approve first; right after approving, some RPCs need a block to catch up. |
| `ERC20InsufficientBalance` (`0xe450d38c`) | Not enough WARD on Base. After a bridge, wait for delivery. |
