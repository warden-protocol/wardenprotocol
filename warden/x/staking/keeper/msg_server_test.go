// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/evmos/blob/main/LICENSE)

package keeper_test

import (
	"testing"
	"time"

	"cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/staking/types"

	"github.com/evmos/evmos/v20/testutil"
	"github.com/evmos/evmos/v20/testutil/integration/evmos/network"
	utiltx "github.com/evmos/evmos/v20/testutil/tx"
	"github.com/evmos/evmos/v20/utils"
	"github.com/evmos/evmos/v20/x/staking/keeper"
	vestingtypes "github.com/evmos/evmos/v20/x/vesting/types"
	"github.com/stretchr/testify/require"
)

func TestMsgDelegate(t *testing.T) {
	var (
		ctx              sdk.Context
		nw               *network.UnitTestNetwork
		defaultDelCoin   = sdk.NewCoin(utils.BaseDenom, math.NewInt(1e18))
		delegatorAddr, _ = utiltx.NewAccAddressAndKey()
		funderAddr, _    = utiltx.NewAccAddressAndKey()
	)

	testCases := []struct { //nolint:dupl
		name   string
		setup  func() sdk.Coin
		expErr bool
		errMsg string
	}{
		{
			name: "can delegate from a common EthAccount",
			setup: func() sdk.Coin {
				// Send some funds to delegator account
				err := testutil.FundAccountWithBaseDenom(ctx, nw.App.BankKeeper, delegatorAddr, defaultDelCoin.Amount.Int64())
				require.NoError(t, err)
				return defaultDelCoin
			},
			expErr: false,
		},
		{
			name: "can delegate free coins from a ClawbackVestingAccount",
			setup: func() sdk.Coin {
				err := setupClawbackVestingAccount(ctx, nw, delegatorAddr, funderAddr, testutil.TestVestingSchedule.TotalVestingCoins.Add(defaultDelCoin))
				require.NoError(t, err)
				return defaultDelCoin
			},
			expErr: false,
		},
		{
			name: "cannot delegate unvested coins from a ClawbackVestingAccount",
			setup: func() sdk.Coin {
				err := setupClawbackVestingAccount(ctx, nw, delegatorAddr, funderAddr, testutil.TestVestingSchedule.TotalVestingCoins)
				require.NoError(t, err)
				return defaultDelCoin
			},
			expErr: true,
			errMsg: "cannot delegate unvested coins",
		},
		{
			name: "can delegate locked vested coins from a ClawbackVestingAccount",
			setup: func() sdk.Coin {
				err := setupClawbackVestingAccount(ctx, nw, delegatorAddr, funderAddr, testutil.TestVestingSchedule.TotalVestingCoins)
				require.NoError(t, err)

				// after first vesting period and before lockup
				// some vested tokens, but still all locked
				cliffDuration := time.Duration(testutil.TestVestingSchedule.CliffPeriodLength)
				ctx = ctx.WithBlockTime(ctx.BlockTime().Add(cliffDuration * time.Second))

				acc := nw.App.AccountKeeper.GetAccount(ctx, delegatorAddr)
				vestAcc, ok := acc.(*vestingtypes.ClawbackVestingAccount)
				require.True(t, ok)

				// check that locked vested is > 0
				lockedVested := vestAcc.GetLockedUpVestedCoins(ctx.BlockTime())
				require.True(t, lockedVested.IsAllGT(sdk.NewCoins()))

				// returned delegation coins are the locked vested coins
				return lockedVested[0]
			},
			expErr: false,
		},
		{
			name: "can delegate unlocked vested coins from a ClawbackVestingAccount",
			setup: func() sdk.Coin {
				err := setupClawbackVestingAccount(ctx, nw, delegatorAddr, funderAddr, testutil.TestVestingSchedule.TotalVestingCoins)
				require.NoError(t, err)

				// Between first and second lockup periods
				// vested coins are unlocked
				lockDuration := time.Duration(testutil.TestVestingSchedule.LockupPeriodLength)
				ctx = ctx.WithBlockTime(ctx.BlockTime().Add(lockDuration * time.Second))

				acc := nw.App.AccountKeeper.GetAccount(ctx, delegatorAddr)
				vestAcc, ok := acc.(*vestingtypes.ClawbackVestingAccount)
				require.True(t, ok)

				unlockedVested := vestAcc.GetUnlockedVestedCoins(ctx.BlockTime())
				require.True(t, unlockedVested.IsAllGT(sdk.NewCoins()))

				// returned delegation coins are the locked vested coins
				return unlockedVested[0]
			},
			expErr: false,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			nw = network.NewUnitTestNetwork()
			ctx = nw.GetContext()
			delCoin := tc.setup()

			srv := keeper.NewMsgServerImpl(&nw.App.StakingKeeper)
			res, err := srv.Delegate(ctx, &types.MsgDelegate{
				DelegatorAddress: delegatorAddr.String(),
				ValidatorAddress: nw.GetValidators()[0].OperatorAddress,
				Amount:           delCoin,
			})

			if tc.expErr {
				require.Error(t, err)
				require.Contains(t, err.Error(), tc.errMsg)
			} else {
				require.NoError(t, err)
				require.NotNil(t, res)
			}
		})
	}
}

func TestMsgCreateValidator(t *testing.T) {
	var (
		ctx              sdk.Context
		nw               *network.UnitTestNetwork
		defaultDelCoin   = sdk.NewCoin(utils.BaseDenom, math.NewInt(1e18))
		validatorAddr, _ = utiltx.NewAccAddressAndKey()
		funderAddr, _    = utiltx.NewAccAddressAndKey()
	)

	testCases := []struct { //nolint:dupl
		name   string
		setup  func() sdk.Coin
		expErr bool
		errMsg string
	}{
		{
			name: "can create a validator using a common EthAccount",
			setup: func() sdk.Coin {
				// Send some funds to delegator account
				err := testutil.FundAccountWithBaseDenom(ctx, nw.App.BankKeeper, validatorAddr, defaultDelCoin.Amount.Int64())
				require.NoError(t, err)
				return defaultDelCoin
			},
			expErr: false,
		},
		{
			name: "can create a validator using a ClawbackVestingAccount and free tokens in self delegation",
			setup: func() sdk.Coin {
				err := setupClawbackVestingAccount(ctx, nw, validatorAddr, funderAddr, testutil.TestVestingSchedule.TotalVestingCoins.Add(defaultDelCoin))
				require.NoError(t, err)
				return defaultDelCoin
			},
			expErr: false,
		},
		{
			name: "cannot create a validator using a ClawbackVestingAccount and unvested tokens in self delegation",
			setup: func() sdk.Coin {
				err := setupClawbackVestingAccount(ctx, nw, validatorAddr, funderAddr, testutil.TestVestingSchedule.TotalVestingCoins)
				require.NoError(t, err)
				return defaultDelCoin
			},
			expErr: true,
			errMsg: "cannot delegate unvested coins",
		},
		{
			name: "can create a validator using a ClawbackVestingAccount and locked vested coins in self delegation",
			setup: func() sdk.Coin {
				err := setupClawbackVestingAccount(ctx, nw, validatorAddr, funderAddr, testutil.TestVestingSchedule.TotalVestingCoins)
				require.NoError(t, err)

				// after first vesting period and before lockup
				// some vested tokens, but still all locked
				cliffDuration := time.Duration(testutil.TestVestingSchedule.CliffPeriodLength)
				ctx = ctx.WithBlockTime(ctx.BlockTime().Add(cliffDuration * time.Second))

				acc := nw.App.AccountKeeper.GetAccount(ctx, validatorAddr)
				vestAcc, ok := acc.(*vestingtypes.ClawbackVestingAccount)
				require.True(t, ok)

				// check that locked vested is > 0
				lockedVested := vestAcc.GetLockedUpVestedCoins(ctx.BlockTime())
				require.True(t, lockedVested.IsAllGT(sdk.NewCoins()))

				// returned delegation coins are the locked vested coins
				return lockedVested[0]
			},
			expErr: false,
		},
		{
			name: "can create a validator using a ClawbackVestingAccount and unlocked vested coins in self delegation",
			setup: func() sdk.Coin {
				err := setupClawbackVestingAccount(ctx, nw, validatorAddr, funderAddr, testutil.TestVestingSchedule.TotalVestingCoins)
				require.NoError(t, err)

				// Between first and second lockup periods
				// vested coins are unlocked
				lockDuration := time.Duration(testutil.TestVestingSchedule.LockupPeriodLength)
				ctx = ctx.WithBlockTime(ctx.BlockTime().Add(lockDuration * time.Second))

				acc := nw.App.AccountKeeper.GetAccount(ctx, validatorAddr)
				vestAcc, ok := acc.(*vestingtypes.ClawbackVestingAccount)
				require.True(t, ok)

				unlockedVested := vestAcc.GetUnlockedVestedCoins(ctx.BlockTime())
				require.True(t, unlockedVested.IsAllGT(sdk.NewCoins()))

				// returned delegation coins are the locked vested coins
				return unlockedVested[0]
			},
			expErr: false,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			nw = network.NewUnitTestNetwork()
			ctx = nw.GetContext()
			coinToSelfBond := tc.setup()

			pubKey := ed25519.GenPrivKey().PubKey()
			commissions := types.NewCommissionRates(
				math.LegacyNewDecWithPrec(5, 2),
				math.LegacyNewDecWithPrec(2, 1),
				math.LegacyNewDecWithPrec(5, 2),
			)
			msg, err := types.NewMsgCreateValidator(
				sdk.ValAddress(validatorAddr).String(),
				pubKey,
				coinToSelfBond,
				types.NewDescription("T", "E", "S", "T", "Z"),
				commissions,
				math.OneInt(),
			)
			require.NoError(t, err)
			srv := keeper.NewMsgServerImpl(&nw.App.StakingKeeper)
			res, err := srv.CreateValidator(ctx, msg)

			if tc.expErr {
				require.Error(t, err)
				require.Contains(t, err.Error(), tc.errMsg)
			} else {
				require.NoError(t, err)
				require.NotNil(t, res)
			}
		})
	}
}
