package keeper

import (
	"context"
	storetypes "cosmossdk.io/store/types"
	"fmt"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	ibctransferkeeper "github.com/cosmos/ibc-go/v8/modules/apps/transfer/keeper"
	"github.com/cosmos/ibc-go/v8/modules/apps/transfer/types"
	porttypes "github.com/cosmos/ibc-go/v8/modules/core/05-port/types"
	"github.com/cosmos/ibc-go/v8/modules/core/exported"
	gmptypes "github.com/warden-protocol/wardenprotocol/warden/x/gmp/types"
	types2 "github.com/warden-protocol/wardenprotocol/warden/x/ibctransfer/types"
)

type Keeper struct {
	ibctransferkeeper.Keeper

	storeKey   storetypes.StoreKey
	cdc        codec.BinaryCodec
	paramSpace paramtypes.Subspace

	ics4Wrapper   porttypes.ICS4Wrapper
	channelKeeper types.ChannelKeeper
	portKeeper    types.PortKeeper
	authKeeper    types.AccountKeeper
	bankKeeper    types.BankKeeper
	scopedKeeper  exported.ScopedKeeper

	GmpKeeper *types2.GmpKeeper
}

// Transfer defines a wrapper function for the ICS20 Transfer method.
// If the receiver for the tx is axelar's GMP address,
// Then it expects a payload of the gmptypes.MsgBridge msg.
// If it does not have this format, it will error out.
// If it does, it will build a MsgTransfer with the payload.
func (k Keeper) Transfer(goCtx context.Context, msg *types.MsgTransfer) (*types.MsgTransferResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if k.GmpKeeper == nil {
		return nil, fmt.Errorf("GmpKeeper is not initialized")
	}

	gmpKeeper := *k.GmpKeeper
	gmpParams := gmpKeeper.GetParams(ctx)

	if msg.Receiver == gmpParams.GmpAddress {
		bridgeMsg := &gmptypes.MsgBridge{}
		// safe byte conversion for invalid UTF-8
		bz := make([]byte, len(msg.Memo))
		copy(bz, msg.Memo)
		err := bridgeMsg.Unmarshal(bz)
		if err != nil {
			// If the payload is not a bridgeMsg type, then a user is trying to perform GMP
			// without the proper payload. This transaction be considered to be by a bad actor.
			k.Logger(ctx).Error("unexpected object while trying to relay data to GMP", "error", err)
			return nil, err
		}

		gmpTransferMsg, err := gmpKeeper.BuildGmpRequest(goCtx, bridgeMsg)
		if err != nil {
			return nil, err
		}
		return k.Keeper.Transfer(goCtx, gmpTransferMsg)
	}
	return k.Keeper.Transfer(goCtx, msg)
}

// NewKeeper creates a new IBC transfer Keeper instance
func NewKeeper(
	cdc codec.BinaryCodec, key storetypes.StoreKey, paramSpace paramtypes.Subspace,
	ics4Wrapper porttypes.ICS4Wrapper, channelKeeper types.ChannelKeeper, portKeeper types.PortKeeper,
	authKeeper types.AccountKeeper, bankKeeper types.BankKeeper, scopedKeeper exported.ScopedKeeper,
	gmpKeeper types2.GmpKeeper,
) Keeper {
	// ensure ibc transfer module account is set
	if addr := authKeeper.GetModuleAddress(types.ModuleName); addr == nil {
		panic("the IBC transfer module account has not been set")
	}

	// set KeyTable if it has not already been set
	if !paramSpace.HasKeyTable() {
		paramSpace = paramSpace.WithKeyTable(types.ParamKeyTable())
	}

	return Keeper{
		cdc:           cdc,
		storeKey:      key,
		paramSpace:    paramSpace,
		ics4Wrapper:   ics4Wrapper,
		channelKeeper: channelKeeper,
		portKeeper:    portKeeper,
		authKeeper:    authKeeper,
		bankKeeper:    bankKeeper,
		scopedKeeper:  scopedKeeper,
		GmpKeeper:     &gmpKeeper,
	}
}
