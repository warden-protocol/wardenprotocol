<!--
order: 0
title: Feemarket Overview
parent:
  title: "feemarket"
-->

# Feemarket

## Abstract

This document specifies the feemarket module which allows to define a global transaction fee for the network.

This module has been designed to support EIP1559 in cosmos-sdk.

The `MempoolFeeDecorator` in `x/auth` module needs to be overrided to check the `baseFee` along with the `minimal-gas-prices` allowing to implement a global fee mechanism which vary depending on the network activity.

For more reference to EIP1559:

<https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md>

## Contents

1. **[Concepts](01_concepts.md)**
2. **[State](02_state.md)**
3. **[Begin Block](03_begin_block.md)**
4. **[End Block](04_end_block.md)**
5. **[Keeper](05_keeper.md)**
6. **[Events](06_events.md)**
7. **[Params](07_params.md)**
8. **[Client](08_client.md)**
9. **[Future Improvements](09_future_improvements.md)**
