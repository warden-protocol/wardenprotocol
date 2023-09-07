package simulation

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/qredo/fusionchain/x/blackbird/keeper"
	"github.com/qredo/fusionchain/x/blackbird/types"
)

func SimulateMsgNewPolicy(
	_ types.AccountKeeper,
	_ types.BankKeeper,
	_ keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgNewPolicy{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the NewPolicy simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "NewPolicy simulation not implemented"), nil, nil
	}
}
