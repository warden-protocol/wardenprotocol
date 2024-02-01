package simulation

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/warden-protocol/wardenprotocol/x/treasury/keeper"
	"github.com/warden-protocol/wardenprotocol/x/treasury/types"
)

func SimulateMsgFulfilSignatureRequest(
	types.AccountKeeper,
	types.BankKeeper,
	keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgFulfilSignatureRequest{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the FulfillSignatureRequest simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "FulfilSignatureRequest simulation not implemented"), nil, nil
	}
}
