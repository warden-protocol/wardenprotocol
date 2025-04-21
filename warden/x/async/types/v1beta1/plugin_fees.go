package v1beta1

import (
	fmt "fmt"

	cosmossdk_io_math "cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (fees *PluginFee) CalculateDistributedFees() (DeductedFee, error) {
	if !fees.IsValid() {
		return DeductedFee{}, fmt.Errorf("fees are invalid: %s", fees)
	}

	pluginCreatorRewardCoins := sdk.NewCoins()
	taskExecutorRewardCoins := sdk.NewCoins()

	for _, coin := range fees.TaskReq {
		creatorRewardAmt := fees.PluginCreatorRewardInPercents.MulInt(coin.Amount).TruncateInt()
		executorRewardAmt := coin.Amount.Sub(creatorRewardAmt)

		pluginCreatorRewardCoins = pluginCreatorRewardCoins.Add(sdk.NewCoin(coin.Denom, creatorRewardAmt))
		taskExecutorRewardCoins = taskExecutorRewardCoins.Add(sdk.NewCoin(coin.Denom, executorRewardAmt))
	}

	return DeductedFee{
		PluginCreatorReward: pluginCreatorRewardCoins,
		ExecutorReward:      taskExecutorRewardCoins,
	}, nil
}

func (p *PluginFee) EnsureSufficientFees(fees sdk.Coins) error {
	if !p.TaskReq.IsAllLTE(fees) {
		return fmt.Errorf("plugin fees are not sufficient: wanted %s received %s", p.TaskReq, fees)
	}

	return nil
}

func (pf *PluginFees) IsValid() bool {
	for _, v := range pf.Values {
		if !v.IsValid() {
			return false
		}
	}

	return true
}

func (pf *PluginFee) IsValid() bool {
	if pf.PluginCreatorRewardInPercents.IsNegative() {
		return false
	}

	if pf.PluginCreatorRewardInPercents.GT(cosmossdk_io_math.LegacyOneDec()) {
		return false
	}

	if pf.TaskReq.IsZero() {
		return true
	}

	if !pf.TaskReq.IsValid() {
		return false
	}

	return true
}

func NewEmptyDeductedFee() *DeductedFee {
	return &DeductedFee{
		PluginCreatorReward: sdk.NewCoins(),
		ExecutorReward:      sdk.NewCoins(),
	}
}

func (df *DeductedFee) IsEmpty() bool {
	return df.PluginCreatorReward.IsZero() && df.ExecutorReward.IsZero()
}

func (df *DeductedFee) Total() sdk.Coins {
	return df.PluginCreatorReward.Add(df.ExecutorReward...)
}
