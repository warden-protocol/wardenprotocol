package keeper

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"cosmossdk.io/log"
	"github.com/ethereum/go-ethereum/common"

	storetypes "cosmossdk.io/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	ibctransfertypes "github.com/cosmos/ibc-go/v8/modules/apps/transfer/types"
	clienttypes "github.com/cosmos/ibc-go/v8/modules/core/02-client/types" //nolint:all

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/warden-protocol/wardenprotocol/warden/x/gmp/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/ibctransfer/keeper"
)

type Keeper struct {
	cdc       codec.BinaryCodec
	storeKey  storetypes.StoreKey
	IBCKeeper *keeper.Keeper

	// the address capable of executing a MsgSetParams message. Typically, this
	// should be the x/gov module account.
	authority string
}

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey storetypes.StoreKey,
	authority string,
	ibcKeeper keeper.Keeper,
) Keeper {
	return Keeper{
		cdc:       cdc,
		storeKey:  storeKey,
		authority: authority,
		IBCKeeper: &ibcKeeper,
	}
}

// Logger returns a module-specific logger.
func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

// Bridge submits an IBC transfer with a MsgBridge payload.
// This is so the IBC Transfer module can then use BuildGmpRequest
// and perform the GMP request.
func (k Keeper) Bridge(
	goCtx context.Context,
	msg *types.MsgBridge,
) (*types.MsgBridgeResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	params := k.GetParams(ctx)

	bz, err := msg.Marshal()
	if err != nil {
		return nil, err
	}

	transferMsg := ibctransfertypes.NewMsgTransfer(
		ibctransfertypes.PortID,
		params.GmpChannel,
		msg.Token,
		msg.Relayer,
		params.GmpAddress,
		clienttypes.ZeroHeight(),
		uint64(ctx.BlockTime().Add(time.Duration(params.GmpTimeout)*time.Hour).UnixNano()),
		string(bz),
	)
	_, err = k.IBCKeeper.Transfer(ctx, transferMsg)
	if err != nil {
		return &types.MsgBridgeResponse{}, err
	}

	return nil, err
}

func (k Keeper) BuildGmpRequest(
	goCtx context.Context,
	msg *types.MsgBridge,
) (*ibctransfertypes.MsgTransfer, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	params := k.GetParams(ctx)

	encoder := types.NewGMPEncoder(
		common.HexToAddress(msg.DestinationContractAddress),
		msg.DestinationContractCalldata,
	)
	payload, err := encoder.GMPEncode()
	if err != nil {
		return nil, err
	}

	// package GMP
	message := types.GmpMessage{
		DestinationChain:   msg.DestinationChain,
		DestinationAddress: msg.WardenContractAddress,
		Payload:            payload,
		Type:               types.TypeGeneralMessage,
		Fee: &types.GmpFee{
			Amount:    msg.Token.Amount.String(),
			Recipient: params.FeeRecipient,
		},
	}
	bz, err := json.Marshal(&message)
	if err != nil {
		k.Logger(ctx).With(err).Error("error marshaling GMP message")
		return nil, fmt.Errorf("failed to marshal GMP message: %w", err)
	}

	// submit IBC transfer
	transferMsg := ibctransfertypes.NewMsgTransfer(
		ibctransfertypes.PortID,
		params.GmpChannel,
		msg.Token,
		msg.Relayer,
		params.GmpAddress,
		clienttypes.ZeroHeight(),
		uint64(ctx.BlockTime().Add(time.Duration(params.GmpTimeout)*time.Hour).UnixNano()),
		string(bz),
	)
	return transferMsg, nil
}
