package simulation

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/qredo/fusionchain/x/policy/keeper"
	"github.com/qredo/fusionchain/x/policy/types"
)

func SimulateMsgRevokeAction(
	_ types.AccountKeeper,
	_ types.BankKeeper,
	_ keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgRevokeAction{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the RevokeAction simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "RevokeAction simulation not implemented"), nil, nil
	}
}
