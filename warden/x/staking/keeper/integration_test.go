package keeper_test

import (
	"testing"
	"time"

	"cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/authz"
	"github.com/cosmos/cosmos-sdk/x/staking/types"

	"github.com/evmos/evmos/v20/testutil"
	"github.com/evmos/evmos/v20/testutil/integration/common/factory"
	evmosfactory "github.com/evmos/evmos/v20/testutil/integration/evmos/factory"
	"github.com/evmos/evmos/v20/testutil/integration/evmos/grpc"
	"github.com/evmos/evmos/v20/testutil/integration/evmos/keyring"
	"github.com/evmos/evmos/v20/testutil/integration/evmos/network"
	vestingtypes "github.com/evmos/evmos/v20/x/vesting/types"

	//nolint:revive // dot imports are fine for Ginkgo
	. "github.com/onsi/ginkgo/v2"
	//nolint:revive // dot imports are fine for Ginkgo
	. "github.com/onsi/gomega"
)

func TestKeeperIntegrationTestSuite(t *testing.T) {
	// Run Ginkgo integration tests
	RegisterFailHandler(Fail)
	RunSpecs(t, "Keeper Suite")
}

var _ = Describe("Staking module tests", func() {
	var (
		nw   *network.UnitTestNetwork
		gh   grpc.Handler
		keys keyring.Keyring
		tf   evmosfactory.TxFactory
	)

	Context("using a vesting account", func() {
		var (
			clawbackAccount       *vestingtypes.ClawbackVestingAccount
			funder                keyring.Key
			vestingAccount        keyring.Key
			otherAccount          keyring.Key
			vestAccInitialBalance *sdk.Coin
			// initialized vars
			gasPrice = math.NewInt(700_000_000)
			gas      = uint64(500_000)
		)

		BeforeEach(func() {
			// setup network
			// create 3 prefunded accounts:
			keys = keyring.New(3)
			funder = keys.GetKey(0)
			vestingAccount = keys.GetKey(1)
			otherAccount = keys.GetKey(2)

			nw = network.NewUnitTestNetwork(
				network.WithPreFundedAccounts(keys.GetAllAccAddrs()...),
			)
			gh = grpc.NewIntegrationHandler(nw)
			tf = evmosfactory.New(nw, gh)

			Expect(nw.NextBlock()).To(BeNil())

			// setup vesting account
			createAccMsg := vestingtypes.NewMsgCreateClawbackVestingAccount(funder.AccAddr, vestingAccount.AccAddr, false)
			res, err := tf.ExecuteCosmosTx(vestingAccount.Priv, factory.CosmosTxArgs{Msgs: []sdk.Msg{createAccMsg}})
			Expect(err).To(BeNil())
			Expect(res.IsOK()).To(BeTrue())
			Expect(nw.NextBlock()).To(BeNil())

			// get vesting account initial balance (free tokens)
			balRes, err := gh.GetBalance(vestingAccount.AccAddr, nw.GetDenom())
			Expect(err).To(BeNil())
			vestAccInitialBalance = balRes.Balance

			// Fund the clawback vesting accounts
			vestingStart := nw.GetContext().BlockTime()
			fundMsg := vestingtypes.NewMsgFundVestingAccount(funder.AccAddr, vestingAccount.AccAddr, vestingStart, testutil.TestVestingSchedule.LockupPeriods, testutil.TestVestingSchedule.VestingPeriods)
			res, err = tf.ExecuteCosmosTx(funder.Priv, factory.CosmosTxArgs{Msgs: []sdk.Msg{fundMsg}})
			Expect(err).To(BeNil())
			Expect(res.IsOK()).To(BeTrue())
			Expect(nw.NextBlock()).To(BeNil())

			// check vesting account was created successfully
			var ok bool
			acc, err := gh.GetAccount(vestingAccount.AccAddr.String())
			Expect(err).To(BeNil())
			clawbackAccount, ok = acc.(*vestingtypes.ClawbackVestingAccount)
			Expect(ok).To(BeTrue())
		})

		Context("delegate", func() {
			var delMsg *types.MsgDelegate

			Context("using MsgDelegate", func() {
				BeforeEach(func() {
					// create a MsgDelegate to delegate the free tokens (balance previous to be converted to clawback account) + vested coins per period
					delMsg = types.NewMsgDelegate(vestingAccount.AccAddr.String(), nw.GetValidators()[0].GetOperator(), testutil.TestVestingSchedule.VestedCoinsPerPeriod.Add(*vestAccInitialBalance)[0])
				})

				It("should not allow to delegate unvested tokens", func() {
					// all coins in vesting schedule should be unvested
					unvestedCoins := clawbackAccount.GetVestingCoins(nw.GetContext().BlockTime())
					Expect(unvestedCoins).To(Equal(testutil.TestVestingSchedule.TotalVestingCoins))

					balRes, err := gh.GetBalance(vestingAccount.AccAddr, nw.GetDenom())
					Expect(err).To(BeNil())
					delegatableBalance := balRes.Balance.Sub(unvestedCoins[0])
					Expect(delegatableBalance.Amount.LT(delMsg.Amount.Amount)).To(BeTrue())

					_, err = tf.ExecuteCosmosTx(vestingAccount.Priv, factory.CosmosTxArgs{Msgs: []sdk.Msg{delMsg}})
					Expect(err).To(HaveOccurred())
					Expect(err.Error()).To(ContainSubstring("cannot delegate unvested coins"))
				})

				It("should allow to delegate free tokens when all tokens in vesting schedule are unvested", func() {
					// calculate fees to deduct from free balance
					// to get the proper delegation amount
					fees := sdk.NewCoin(nw.GetDenom(), gasPrice.Mul(math.NewIntFromUint64(gas)))
					delMsg.Amount = vestAccInitialBalance.Sub(fees)

					res, err := tf.ExecuteCosmosTx(vestingAccount.Priv, factory.CosmosTxArgs{Msgs: []sdk.Msg{delMsg}, Gas: &gas, GasPrice: &gasPrice})
					Expect(err).To(BeNil())
					Expect(res.IsOK()).To(BeTrue())
					Expect(nw.NextBlock()).To(BeNil())

					// check delegation was created successfully
					delRes, err := gh.GetDelegation(vestingAccount.AccAddr.String(), nw.GetValidators()[0].OperatorAddress)
					Expect(err).To(BeNil())
					Expect(delRes.DelegationResponse).NotTo(BeNil())
					Expect(delRes.DelegationResponse.Balance).To(Equal(delMsg.Amount))
				})

				It("should allow to delegate locked vested tokens", func() {
					// cliff period passes - some tokens vested, but still all locked
					vestingPeriod := time.Duration(testutil.TestVestingSchedule.CliffPeriodLength)
					Expect(nw.NextBlockAfter(vestingPeriod * time.Second)).To(BeNil())

					// check there're some vested coins
					denom := nw.GetDenom()
					expCoins := sdk.NewCoins(sdk.NewCoin(denom, testutil.TestVestingSchedule.VestedCoinsPerPeriod.AmountOf(denom).MulRaw(testutil.TestVestingSchedule.CliffMonths)))
					lockedVestedCoins := clawbackAccount.GetLockedUpVestedCoins(nw.GetContext().BlockTime())
					Expect(lockedVestedCoins).To(Equal(expCoins))

					// deduct fees from delegation amount to pay the tx
					fees := sdk.NewCoin(nw.GetDenom(), gasPrice.Mul(math.NewIntFromUint64(gas)))
					delMsg.Amount = vestAccInitialBalance.Add(lockedVestedCoins[0]).Sub(fees)

					res, err := tf.ExecuteCosmosTx(vestingAccount.Priv, factory.CosmosTxArgs{Msgs: []sdk.Msg{delMsg}, Gas: &gas, GasPrice: &gasPrice})
					Expect(err).To(BeNil())
					Expect(res.IsOK()).To(BeTrue())
					Expect(nw.NextBlock()).To(BeNil())

					// check delegation was created successfully
					delRes, err := gh.GetDelegation(vestingAccount.AccAddr.String(), nw.GetValidators()[0].OperatorAddress)
					Expect(err).To(BeNil())
					Expect(delRes.DelegationResponse).NotTo(BeNil())
					Expect(delRes.DelegationResponse.Balance).To(Equal(delMsg.Amount))
				})

				It("should allow to delegate unlocked vested tokens", func() {
					// first lockup period passes
					lockupPeriod := time.Duration(testutil.TestVestingSchedule.LockupPeriodLength)
					Expect(nw.NextBlockAfter(lockupPeriod * time.Second)).To(BeNil())

					// check there're some vested coins
					denom := nw.GetDenom()
					expVested := sdk.NewCoins(sdk.NewCoin(denom, testutil.TestVestingSchedule.VestedCoinsPerPeriod.AmountOf(denom).Mul(math.NewInt(testutil.TestVestingSchedule.LockupMonths))))
					vestedCoins := clawbackAccount.GetVestedCoins(nw.GetContext().BlockTime())
					Expect(vestedCoins).To(Equal(expVested))

					// all vested coins should be unlocked
					unlockedVestedCoins := clawbackAccount.GetUnlockedVestedCoins(nw.GetContext().BlockTime())
					Expect(unlockedVestedCoins).To(Equal(vestedCoins))

					// delegation amount is all free coins + unlocked vested - fee to pay tx
					fees := sdk.NewCoin(nw.GetDenom(), gasPrice.Mul(math.NewIntFromUint64(gas)))
					delMsg.Amount = vestAccInitialBalance.Add(unlockedVestedCoins[0]).Sub(fees)

					res, err := tf.ExecuteCosmosTx(vestingAccount.Priv, factory.CosmosTxArgs{Msgs: []sdk.Msg{delMsg}, Gas: &gas, GasPrice: &gasPrice})
					Expect(err).To(BeNil())
					Expect(res.IsOK()).To(BeTrue())
					Expect(nw.NextBlock()).To(BeNil())

					// check delegation was created successfully
					delRes, err := gh.GetDelegation(vestingAccount.AccAddr.String(), nw.GetValidators()[0].OperatorAddress)
					Expect(err).To(BeNil())
					Expect(delRes.DelegationResponse).NotTo(BeNil())
					Expect(delRes.DelegationResponse.Balance).To(Equal(delMsg.Amount))
				})
			})

			Context("MsgDelegate nested in MsgExec", func() {
				BeforeEach(func() {
					expiration := time.Now().Add(time.Hour * 24 * 365 * 2) // 2years
					// create a grant for other account
					// to send a MsgDelegate
					grantMsg, err := authz.NewMsgGrant(vestingAccount.AccAddr, otherAccount.AccAddr, authz.NewGenericAuthorization("/cosmos.staking.v1beta1.MsgDelegate"), &expiration)
					Expect(err).To(BeNil())
					res, err := tf.ExecuteCosmosTx(vestingAccount.Priv, factory.CosmosTxArgs{Msgs: []sdk.Msg{grantMsg}})
					Expect(err).To(BeNil())
					Expect(res.IsOK()).To(BeTrue())
					Expect(nw.NextBlock()).To(BeNil())

					// create a MsgDelegate to delegate vested coins per period
					delMsg = types.NewMsgDelegate(vestingAccount.AccAddr.String(), nw.GetValidators()[0].GetOperator(), testutil.TestVestingSchedule.VestedCoinsPerPeriod.Add(*vestAccInitialBalance)[0])
				})

				It("should not allow to delegate unvested tokens", func() {
					// all coins in vesting schedule should be unvested
					unvestedCoins := clawbackAccount.GetVestingCoins(nw.GetContext().BlockTime())
					Expect(unvestedCoins).To(Equal(testutil.TestVestingSchedule.TotalVestingCoins))

					balRes, err := gh.GetBalance(vestingAccount.AccAddr, nw.GetDenom())
					Expect(err).To(BeNil())
					delegatableBalance := balRes.Balance.Sub(unvestedCoins[0])
					Expect(delegatableBalance.Amount.LT(delMsg.Amount.Amount)).To(BeTrue())

					execMsg := authz.NewMsgExec(otherAccount.AccAddr, []sdk.Msg{delMsg})
					_, err = tf.ExecuteCosmosTx(otherAccount.Priv, factory.CosmosTxArgs{Msgs: []sdk.Msg{&execMsg}})
					Expect(err).To(HaveOccurred())
					Expect(err.Error()).To(ContainSubstring("cannot delegate unvested coins."))
				})

				It("should allow to delegate locked vested tokens", func() {
					// cliff period passes - some tokens vested, but still all locked
					vestingPeriod := time.Duration(testutil.TestVestingSchedule.CliffPeriodLength)
					Expect(nw.NextBlockAfter(vestingPeriod * time.Second)).To(BeNil())

					// check there're some vested coins
					denom := nw.GetDenom()
					expCoins := sdk.NewCoins(sdk.NewCoin(denom, testutil.TestVestingSchedule.VestedCoinsPerPeriod.AmountOf(denom).MulRaw(testutil.TestVestingSchedule.CliffMonths)))
					lockedVestedCoins := clawbackAccount.GetLockedUpVestedCoins(nw.GetContext().BlockTime())
					Expect(lockedVestedCoins).To(Equal(expCoins))

					// update delegation amount to be the free balance + locked vested coins - fees
					fees := sdk.NewCoin(nw.GetDenom(), gasPrice.Mul(math.NewIntFromUint64(gas)))
					delMsg.Amount = vestAccInitialBalance.Add(lockedVestedCoins[0]).Sub(fees)

					execMsg := authz.NewMsgExec(otherAccount.AccAddr, []sdk.Msg{delMsg})
					res, err := tf.ExecuteCosmosTx(otherAccount.Priv, factory.CosmosTxArgs{Msgs: []sdk.Msg{&execMsg}, Gas: &gas, GasPrice: &gasPrice})
					Expect(err).To(BeNil())
					Expect(res.IsOK()).To(BeTrue())
					Expect(nw.NextBlock()).To(BeNil())

					// check delegation was created successfully
					delRes, err := gh.GetDelegation(vestingAccount.AccAddr.String(), nw.GetValidators()[0].OperatorAddress)
					Expect(err).To(BeNil())
					Expect(delRes.DelegationResponse).NotTo(BeNil())
					Expect(delRes.DelegationResponse.Balance).To(Equal(delMsg.Amount))
				})

				It("after first lockup period - should allow to delegate unlocked vested tokens", func() {
					// first lockup period passes
					lockupPeriod := time.Duration(testutil.TestVestingSchedule.LockupPeriodLength)
					Expect(nw.NextBlockAfter(lockupPeriod * time.Second)).To(BeNil())

					// check there're some vested coins
					denom := nw.GetDenom()
					expVested := sdk.NewCoins(sdk.NewCoin(denom, testutil.TestVestingSchedule.VestedCoinsPerPeriod.AmountOf(denom).Mul(math.NewInt(testutil.TestVestingSchedule.LockupMonths))))
					vestedCoins := clawbackAccount.GetVestedCoins(nw.GetContext().BlockTime())
					Expect(vestedCoins).To(Equal(expVested))

					execMsg := authz.NewMsgExec(otherAccount.AccAddr, []sdk.Msg{delMsg})
					res, err := tf.ExecuteCosmosTx(otherAccount.Priv, factory.CosmosTxArgs{Msgs: []sdk.Msg{&execMsg}, Gas: &gas})
					Expect(err).To(BeNil())
					Expect(res.IsOK()).To(BeTrue())
					Expect(nw.NextBlock()).To(BeNil())

					// check delegation was created successfully
					delRes, err := gh.GetDelegation(vestingAccount.AccAddr.String(), nw.GetValidators()[0].OperatorAddress)
					Expect(err).To(BeNil())
					Expect(delRes.DelegationResponse).NotTo(BeNil())
					Expect(delRes.DelegationResponse.Balance).To(Equal(delMsg.Amount))
				})
			})
		})

		Context("create validator with self delegation", func() {
			var createValMsg *types.MsgCreateValidator

			BeforeEach(func() {
				// create a MsgCreateValidator to create a validator.
				// Self delegate coins in the vesting schedule
				var err error
				pubKey := ed25519.GenPrivKey().PubKey()
				commissions := types.NewCommissionRates(
					math.LegacyNewDecWithPrec(5, 2),
					math.LegacyNewDecWithPrec(2, 1),
					math.LegacyNewDecWithPrec(5, 2),
				)
				createValMsg, err = types.NewMsgCreateValidator(
					sdk.ValAddress(vestingAccount.AccAddr).String(),
					pubKey,
					testutil.TestVestingSchedule.VestedCoinsPerPeriod.Add(*vestAccInitialBalance)[0],
					types.NewDescription("T", "E", "S", "T", "Z"),
					commissions,
					math.OneInt(),
				)
				Expect(err).To(BeNil())
			})

			It("should not allow to create validator with unvested tokens in self delegation", func() {
				// all coins in vesting schedule should be unvested
				unvestedCoins := clawbackAccount.GetVestingCoins(nw.GetContext().BlockTime())
				Expect(unvestedCoins).To(Equal(testutil.TestVestingSchedule.TotalVestingCoins))

				balRes, err := gh.GetBalance(vestingAccount.AccAddr, nw.GetDenom())
				Expect(err).To(BeNil())
				delegatableBalance := balRes.Balance.Sub(unvestedCoins[0])
				Expect(delegatableBalance.Amount.LT(createValMsg.Value.Amount)).To(BeTrue())

				_, err = tf.ExecuteCosmosTx(vestingAccount.Priv, factory.CosmosTxArgs{Msgs: []sdk.Msg{createValMsg}})
				Expect(err).To(HaveOccurred())
				Expect(err.Error()).To(ContainSubstring("cannot delegate unvested coins."))
			})

			It("should allow to create validator with locked vested tokens", func() {
				// cliff period passes - some tokens vested, but still all locked
				vestingPeriod := time.Duration(testutil.TestVestingSchedule.CliffPeriodLength)
				Expect(nw.NextBlockAfter(vestingPeriod * time.Second)).To(BeNil())

				// check there're some vested coins
				denom := nw.GetDenom()
				expCoins := sdk.NewCoins(sdk.NewCoin(denom, testutil.TestVestingSchedule.VestedCoinsPerPeriod.AmountOf(denom).MulRaw(testutil.TestVestingSchedule.CliffMonths)))
				lockedVestedCoins := clawbackAccount.GetLockedUpVestedCoins(nw.GetContext().BlockTime())
				Expect(lockedVestedCoins).To(Equal(expCoins))

				// update delegation amount to be the free balance + locked vested coins - fees
				fees := sdk.NewCoin(nw.GetDenom(), gasPrice.Mul(math.NewIntFromUint64(gas)))
				createValMsg.Value = vestAccInitialBalance.Add(lockedVestedCoins[0]).Sub(fees)

				res, err := tf.ExecuteCosmosTx(vestingAccount.Priv, factory.CosmosTxArgs{Msgs: []sdk.Msg{createValMsg}, Gas: &gas, GasPrice: &gasPrice})
				Expect(err).To(BeNil())
				Expect(res.IsOK()).To(BeTrue())
				Expect(nw.NextBlock()).To(BeNil())

				// check validator was created successfully
				qc := nw.GetStakingClient()
				valRes, err := qc.Validator(nw.GetContext(), &types.QueryValidatorRequest{ValidatorAddr: sdk.ValAddress(vestingAccount.AccAddr).String()})
				Expect(err).To(BeNil())
				Expect(valRes.Validator.Status).To(Equal(types.Bonded))
			})

			It("after first lockup period - should allow to create validator with a delegation of vested tokens", func() {
				// first lockup period passes
				lockupPeriod := time.Duration(testutil.TestVestingSchedule.LockupPeriodLength)
				Expect(nw.NextBlockAfter(lockupPeriod * time.Second)).To(BeNil())

				// check there're some vested coins
				denom := nw.GetDenom()
				expVested := sdk.NewCoins(sdk.NewCoin(denom, testutil.TestVestingSchedule.VestedCoinsPerPeriod.AmountOf(denom).Mul(math.NewInt(testutil.TestVestingSchedule.LockupMonths))))
				vestedCoins := clawbackAccount.GetVestedCoins(nw.GetContext().BlockTime())
				Expect(vestedCoins).To(Equal(expVested))

				res, err := tf.ExecuteCosmosTx(vestingAccount.Priv, factory.CosmosTxArgs{Msgs: []sdk.Msg{createValMsg}, Gas: &gas})
				Expect(err).To(BeNil())
				Expect(res.IsOK()).To(BeTrue())
				Expect(nw.NextBlock()).To(BeNil())

				// check validator was created successfully
				qc := nw.GetStakingClient()
				valRes, err := qc.Validator(nw.GetContext(), &types.QueryValidatorRequest{ValidatorAddr: sdk.ValAddress(vestingAccount.AccAddr).String()})
				Expect(err).To(BeNil())
				Expect(valRes.Validator.Status).To(Equal(types.Bonded))
			})
		})
	})
})
