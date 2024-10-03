// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/evmos/blob/main/LICENSE)

package keeper_test

import (
	"errors"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/evmos/evmos/v20/testutil"
	"github.com/evmos/evmos/v20/testutil/integration/evmos/network"
	"github.com/evmos/evmos/v20/x/vesting/types"
)

// setupClawbackVestingAccount sets up a clawback vesting account
// using the TestVestingSchedule. If exceeded balance is provided,
// will fund the vesting account with it.
func setupClawbackVestingAccount(ctx sdk.Context, nw *network.UnitTestNetwork, vestingAcc, funderAcc sdk.AccAddress, balances sdk.Coins) error {
	totalVestingCoins := testutil.TestVestingSchedule.TotalVestingCoins
	if totalVestingCoins.IsAllGT(balances) {
		return errors.New("should provide enough balance for the vesting schedule")
	}
	// fund the vesting account to set the account and then
	// send funds over to the funder account so free balance remains
	err := testutil.FundAccount(ctx, nw.App.BankKeeper, vestingAcc, balances)
	if err != nil {
		return err
	}
	err = nw.App.BankKeeper.SendCoins(ctx, vestingAcc, funderAcc, totalVestingCoins)
	if err != nil {
		return err
	}

	// create a clawback vesting account
	msgCreate := types.NewMsgCreateClawbackVestingAccount(funderAcc, vestingAcc, false)
	if _, err = nw.App.VestingKeeper.CreateClawbackVestingAccount(ctx, msgCreate); err != nil {
		return err
	}

	// fund vesting account
	msgFund := types.NewMsgFundVestingAccount(funderAcc, vestingAcc, time.Now(), testutil.TestVestingSchedule.LockupPeriods, testutil.TestVestingSchedule.VestingPeriods)
	if _, err = nw.App.VestingKeeper.FundVestingAccount(ctx, msgFund); err != nil {
		return err
	}

	return nil
}
