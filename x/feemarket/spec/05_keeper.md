<!--
order: 5
-->

# Keeper

The feemarket module provides this exported keeper that can be passed to other modules that need to get access to the base fee value

```go

type Keeper interface {
    GetBaseFee(ctx sdk.Context) *big.Int
}

```
