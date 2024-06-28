package gmpmiddleware

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/gmp/types"
)

type GmpKeeper interface {
	Bridge(
		goCtx context.Context,
		msg *types.MsgBridge,
	) (*types.MsgBridgeResponse, error)
	GetParams(ctx sdk.Context) (params types.Params)
}

type GmpHandler struct {
	gmp     GmpKeeper
	relayer string
}

func NewGmpHandler(k GmpKeeper, relayer string) *GmpHandler {
	return &GmpHandler{
		gmp:     k,
		relayer: relayer,
	}
}

// HandleGeneralMessage takes the receiving message from axelar,
// and sends it along to the GMP module.
func (h GmpHandler) HandleGeneralMessage(
	ctx sdk.Context,
	srcChain,
	srcAddress string,
	receiver string,
	payload []byte,
	sender string,
	channel string,
) error {
	ctx.Logger().Info("HandleGeneralMessage called",
		"srcChain", srcChain,
		"srcAddress", srcAddress,
		"receiver", receiver,
		"payload", payload,
		"module", "x/gmp-middleware",
	)

	err := verifyParams(h.gmp.GetParams(ctx), sender, channel)
	if err != nil {
		return err
	}
	msg, err := types.NewGmpDecoder(payload)
	if err != nil {
		return err
	}
	ctx.Logger().Info("HandleGeneralMessage GMP Decoder", "msg", msg)
	tx := &types.MsgBridge{
		Relayer:                     h.relayer,
		DestinationChain:            srcChain,
		WardenContractAddress:       srcAddress,
		DestinationContractAddress:  msg.DestinationContractAddress.Hex(),
		DestinationContractCalldata: msg.DestinationContractCalldata,
	}
	err = tx.ValidateBasic()
	if err != nil {
		return err
	}
	ctx.Logger().Info("HandleGeneralMessage GMP Decoder", "tx", tx)

	// TODO: add custom logic to handle GMP
	//_, err = h.gmp.Bridge(ctx, tx)
	return err
}

// HandleGeneralMessage takes the receiving message from axelar,
// and sends it along to the GMP module.
func (h GmpHandler) HandleGeneralMessageWithToken(
	ctx sdk.Context,
	srcChain,
	srcAddress string,
	receiver string,
	payload []byte,
	sender string,
	channel string,
	coin sdk.Coin,
) error {
	ctx.Logger().Info("HandleGeneralMessageWithToken called",
		"srcChain", srcChain,
		"srcAddress", srcAddress, // this is the Warden contract address
		"receiver", receiver,
		"payload", payload,
		"coin", coin,
	)

	err := verifyParams(h.gmp.GetParams(ctx), sender, channel)
	if err != nil {
		return err
	}
	msg, err := types.NewGmpDecoder(payload)
	if err != nil {
		return err
	}
	ctx.Logger().Info("HandleGeneralMessageWithToken GMP Decoder", "msg", msg)
	tx := &types.MsgBridge{
		Relayer:                     h.relayer,
		DestinationChain:            srcChain,
		WardenContractAddress:       srcAddress,
		DestinationContractAddress:  msg.DestinationContractAddress.Hex(),
		DestinationContractCalldata: msg.DestinationContractCalldata,
		Token:                       coin,
	}
	err = tx.ValidateBasic()
	if err != nil {
		return err
	}
	ctx.Logger().Info("HandleGeneralMessage GMP Decoder", "tx", tx)

	// TODO: add custom logic to handle GMP
	//_, err = h.gmp.Bridge(ctx, tx)
	return err
}
