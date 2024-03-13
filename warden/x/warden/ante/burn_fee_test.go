package ante_test

import (
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/ante"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/require"

	"cosmossdk.io/math"

	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	"github.com/cosmos/cosmos-sdk/testutil/testdata"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
)

func TestDeductFees(t *testing.T) {
	s := SetupTestSuite(t, false)
	s.txBuilder = s.clientCtx.TxConfig.NewTxBuilder()

	// keys and addresses
	accs := s.CreateTestAccounts(1)

	// msg and signatures
	msg := testdata.NewTestMsg(accs[0].acc.GetAddress())
	feeAmount := sdk.NewCoins(sdk.NewInt64Coin("atom", 150))
	gasLimit := testdata.NewTestGasLimit()
	require.NoError(t, s.txBuilder.SetMsgs(msg))
	s.txBuilder.SetFeeAmount(feeAmount)
	s.txBuilder.SetGasLimit(gasLimit)

	privs, accNums, accSeqs := []cryptotypes.PrivKey{accs[0].priv}, []uint64{0}, []uint64{0}
	tx, err := s.CreateTestTx(s.ctx, privs, accNums, accSeqs, s.ctx.ChainID(), signing.SignMode_SIGN_MODE_DIRECT)
	require.NoError(t, err)

	bfd := ante.NewBurnFeeDecorator(s.bankKeeper, math.LegacyNewDecWithPrec(3, 1))
	antehandler := sdk.ChainAnteDecorators(bfd)

	burntAmount := sdk.NewCoins(sdk.NewInt64Coin("atom", 45))
	s.bankKeeper.EXPECT().BurnCoins(gomock.Any(), authtypes.FeeCollectorName, burntAmount).Return(nil)
	_, err = antehandler(s.ctx, tx, false)

	require.Nil(t, err, "Tx errored after account has been set with sufficient funds")
}
