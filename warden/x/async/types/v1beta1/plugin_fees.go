package v1beta1

import (
	fmt "fmt"

	cosmossdk_io_math "cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (fees *PluginFee) CalculateDistributedFees() DeductedFee {
	pluginCreatorRewardCoins := sdk.NewCoins()
	taskExecutorRewardCoins := sdk.NewCoins()

	for _, coin := range fees.Fee {
		creatorRewardAmt := fees.PluginCreatorRewardInPercent.MulInt(coin.Amount).TruncateInt()
		executorRewardAmt := coin.Amount.Sub(creatorRewardAmt)

		pluginCreatorRewardCoins = pluginCreatorRewardCoins.Add(sdk.NewCoin(coin.Denom, creatorRewardAmt))
		taskExecutorRewardCoins = taskExecutorRewardCoins.Add(sdk.NewCoin(coin.Denom, executorRewardAmt))
	}

	return DeductedFee{
		PluginCreatorReward: pluginCreatorRewardCoins,
		ExecutorReward:      taskExecutorRewardCoins,
	}
}

func (p *PluginFee) EnsureSufficientFees(fees sdk.Coins) error {
	if !p.Fee.IsAllLTE(fees) {
		return fmt.Errorf("plugin fees are not sufficient: wanted %s received %s", p.Fee, fees)
	}

	return nil
}

func (pf *PluginFee) IsValid() bool {
	if pf.PluginCreatorRewardInPercent.IsNegative() {
		return false
	}

	if pf.PluginCreatorRewardInPercent.GT(cosmossdk_io_math.LegacyOneDec()) {
		return false
	}

	if !pf.Fee.IsValid() {
		return false
	}

	return true
}

func (df *DeductedFee) IsEmpty() bool {
	return df.PluginCreatorReward.IsZero() && df.ExecutorReward.IsZero()
}

func (df *DeductedFee) Total() sdk.Coins {
	return df.PluginCreatorReward.Add(df.ExecutorReward...)
}
