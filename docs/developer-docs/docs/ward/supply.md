---
sidebar_position: 6
---

# Supply

## $WARD supply details

| Property             | Details            |
| -------------------- | ------------------ |
| Token                | WARD               |
| Initial total supply | 1,000,000,000 WARD |
| Decimals             | 6                  |


## $WARD emissions

On mainnet launch, which will operate under a Proof-of-Authority framework, there will be zero token emissions. 

Upon evolution to the Proof-of-Stake framework, an **emission** of WARD tokens commences, with a programmatic emission based on the proportion of $WARD tokens staked relative to the total supply. This will operate based on preset parameters:

| Parameter                | Value  |
| ------------------------ | ------ |
| Initial issuance         | 8%     |
| Maximum annual issuance  | 10%    |
| Minimum annual issuance  | 1%     |
| Target $WARD staked      | 65%    |
| Inflation rate of change | 100%   |

## Issuance rate
As above, Warden Protocol adjusts the $WARD **issuance rate** based on the actual staking ratio relative to the target:

- **Below target staking**: If the percentage of staked $WARD is less than the target of 65%, the issuance rate will incrementally increase. This adjustment continues until it reaches the maximum rate of 10% or until the staking target is met.

- **At target staking**: When the staking ratio aligns with the 65% target, the current issuance rate remains unchanged.

- **Above target staking**: If the percentage of staked $WARD is greater than the target of 65%, the issuance rate will incrementally decrease. This adjustment continues until it reaches the minimum rate of 1% or until the staking target is met.

## Rate of change

The **rate of change** is the rate at which the $WARD issuance adapts over the year is quantified by the following formula: 

- `[1 - (current staked ratio/staking target)] x inflation rate of change`

## Burns

$WARD tokens are burned programmatically from a 3% community tax taken from protocol fees to reduce supply along the growth of the protocol. 
