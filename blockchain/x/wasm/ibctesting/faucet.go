package ibctesting

import (
	"github.com/stretchr/testify/require"

	"cosmossdk.io/math"

	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"

	"github.com/CosmWasm/wasmd/app"
)

// Fund an address with the given amount in default denom
func (chain *TestChain) Fund(addr sdk.AccAddress, amount math.Int) {
	require.NoError(chain.t, chain.sendMsgs(&banktypes.MsgSend{
		FromAddress: chain.SenderAccount.GetAddress().String(),
		ToAddress:   addr.String(),
		Amount:      sdk.NewCoins(sdk.NewCoin(sdk.DefaultBondDenom, amount)),
	}))
}

// SendNonDefaultSenderMsgs delivers a transaction through the application. It returns the result and error if one
// occurred.
func (chain *TestChain) SendNonDefaultSenderMsgs(senderPrivKey cryptotypes.PrivKey, msgs ...sdk.Msg) (*sdk.Result, error) {
	require.NotEqual(chain.t, chain.SenderPrivKey, senderPrivKey, "use SendMsgs method")

	// ensure the chain has the latest time
	chain.Coordinator.UpdateTimeForChain(chain)

	addr := sdk.AccAddress(senderPrivKey.PubKey().Address().Bytes())
	account := chain.App.GetAccountKeeper().GetAccount(chain.GetContext(), addr)
	require.NotNil(chain.t, account)
	_, r, err := app.SignAndDeliverWithoutCommit(
		chain.t,
		chain.TxConfig,
		chain.App.GetBaseApp(),
		msgs,
		chain.DefaultMsgFees,
		chain.ChainID,
		[]uint64{account.GetAccountNumber()},
		[]uint64{account.GetSequence()},
		senderPrivKey,
	)

	// SignAndDeliverWithoutCommit calls app.Commit()
	chain.NextBlock()
	chain.Coordinator.IncrementTime()
	if err != nil {
		return r, err
	}
	chain.CaptureIBCEvents(r.Events)
	return r, nil
}
