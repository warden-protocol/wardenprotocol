// Copyright (c) 2025 Warden Labs. All Rights Reserved.
//
// ** RESTRICTED LICENSE **
//
// This file is part of the 'async' module. It is NOT licensed
// under the Apache 2.0 license governing the rest of the project.
// Refer to the LICENSE file in this module's directory for full terms.
// Use, modification, and distribution are strictly limited.
// Do NOT use this file unless you agree to the terms stated in that license.
//
// SPDX-FileCopyrightText: 2025 Warden Labs
// SPDX-License-Identifier: LicenseRef-Proprietary-RestrictedModule

package v1beta1_test

import (
	"testing"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func TestPluginFees_DistributedFeesSuccess(t *testing.T) {
	cases := []struct {
		name     string
		fee      v1beta1.PluginFee
		expected v1beta1.DeductedFee
	}{
		{
			name: "even fee",
			fee: v1beta1.PluginFee{
				PluginCreatorRewardInPercent: math.LegacyNewDecWithPrec(1, 2),
				Fee:                          sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(100))),
			},
			expected: v1beta1.DeductedFee{
				PluginCreatorReward: sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(1))),
				ExecutorReward:      sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(99))),
			},
		},
		{
			name: "odd fee",
			fee: v1beta1.PluginFee{
				PluginCreatorRewardInPercent: math.LegacyNewDecWithPrec(1, 2),
				Fee:                          sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(101))),
			},
			expected: v1beta1.DeductedFee{
				PluginCreatorReward: sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(1))),
				ExecutorReward:      sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(100))),
			},
		},
		{
			name: "zero fee",
			fee: v1beta1.PluginFee{
				PluginCreatorRewardInPercent: math.LegacyNewDecWithPrec(0, 2),
				Fee:                          sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(100))),
			},
			expected: v1beta1.DeductedFee{
				PluginCreatorReward: sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(0))),
				ExecutorReward:      sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(100))),
			},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			distributedFee := tc.fee.CalculateDistributedFees()
			require.Equal(t, tc.expected.PluginCreatorReward, distributedFee.PluginCreatorReward)
			require.Equal(t, tc.expected.ExecutorReward, distributedFee.ExecutorReward)
		})
	}
}

func TestPluginFees_DistributedFeesFail(t *testing.T) {
	cases := []struct {
		name     string
		fee      v1beta1.PluginFee
		expected string
	}{
		{
			name: "negative percentage",
			fee: v1beta1.PluginFee{
				PluginCreatorRewardInPercent: math.LegacyNewDecWithPrec(-1, 2),
				Fee:                          sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(100))),
			},
			expected: "fees are invalid",
		},
		{
			name: "too big percentage",
			fee: v1beta1.PluginFee{
				PluginCreatorRewardInPercent: math.LegacyNewDecWithPrec(101, 2),
				Fee:                          sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(101))),
			},
			expected: "fees are invalid",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			require.Panics(t, func() {
				_ = tc.fee.CalculateDistributedFees()
			})
		})
	}
}

func TestPluginFees_EnsureSufficientSuccess(t *testing.T) {
	cases := []struct {
		name           string
		fee            v1beta1.PluginFee
		expectedByUser sdk.Coins
	}{
		{
			name: "equals to required",
			fee: v1beta1.PluginFee{
				PluginCreatorRewardInPercent: math.LegacyNewDecWithPrec(1, 2),
				Fee:                          sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(100))),
			},
			expectedByUser: sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(100))),
		},
		{
			name: "more than required",
			fee: v1beta1.PluginFee{
				PluginCreatorRewardInPercent: math.LegacyNewDecWithPrec(1, 2),
				Fee:                          sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(100))),
			},
			expectedByUser: sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(101))),
		},
		{
			name: "zero fee",
			fee: v1beta1.PluginFee{
				PluginCreatorRewardInPercent: math.LegacyNewDecWithPrec(0, 2),
				Fee:                          sdk.NewCoins(),
			},
			expectedByUser: sdk.NewCoins(),
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			err := tc.fee.EnsureSufficientFees(tc.expectedByUser)
			require.NoError(t, err)
		})
	}
}

func TestDeductedFees_Total(t *testing.T) {
	cases := []struct {
		name string
		fee  v1beta1.PluginFee
	}{
		{
			name: "0%",
			fee: v1beta1.PluginFee{
				PluginCreatorRewardInPercent: math.LegacyNewDecWithPrec(0, 2),
				Fee:                          sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(123))),
			},
		},
		{
			name: "1%",
			fee: v1beta1.PluginFee{
				PluginCreatorRewardInPercent: math.LegacyNewDecWithPrec(1, 2),
				Fee:                          sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(123))),
			},
		},
		{
			name: "2%",
			fee: v1beta1.PluginFee{
				PluginCreatorRewardInPercent: math.LegacyNewDecWithPrec(2, 2),
				Fee:                          sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(123))),
			},
		},
		{
			name: "50%",
			fee: v1beta1.PluginFee{
				PluginCreatorRewardInPercent: math.LegacyNewDecWithPrec(50, 2),
				Fee:                          sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(123))),
			},
		},
		{
			name: "100%",
			fee: v1beta1.PluginFee{
				PluginCreatorRewardInPercent: math.LegacyNewDecWithPrec(100, 2),
				Fee:                          sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(123))),
			},
		},
		{
			name: "zero fee",
			fee: v1beta1.PluginFee{
				PluginCreatorRewardInPercent: math.LegacyNewDecWithPrec(0, 2),
				Fee:                          sdk.NewCoins(sdk.NewCoin("stake", math.NewInt(0))),
			},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			distributedFee := tc.fee.CalculateDistributedFees()
			total := distributedFee.Total()
			require.True(t, total.Equal(tc.fee.Fee))
		})
	}
}
