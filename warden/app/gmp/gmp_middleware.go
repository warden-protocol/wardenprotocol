package gmpmiddleware

import (
	"encoding/json"
	"fmt"

	"cosmossdk.io/errors"
	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	capabilitytypes "github.com/cosmos/ibc-go/modules/capability/types"
	"github.com/cosmos/ibc-go/v8/modules/apps/transfer/types"
	channeltypes "github.com/cosmos/ibc-go/v8/modules/core/04-channel/types"
	porttypes "github.com/cosmos/ibc-go/v8/modules/core/05-port/types"
	ibcexported "github.com/cosmos/ibc-go/v8/modules/core/exported"
	gmptypes "github.com/warden-protocol/wardenprotocol/warden/x/gmp/types"
)

type IBCMiddleware struct {
	app     porttypes.IBCModule
	handler GeneralMessageHandler
}

func NewIBCMiddleware(app porttypes.IBCModule, handler GeneralMessageHandler) IBCMiddleware {
	return IBCMiddleware{
		app:     app,
		handler: handler,
	}
}

// OnChanOpenInit implements the IBCModule interface
func (im IBCMiddleware) OnChanOpenInit(
	ctx sdk.Context,
	order channeltypes.Order,
	connectionHops []string,
	portID string,
	channelID string,
	chanCap *capabilitytypes.Capability,
	counterparty channeltypes.Counterparty,
	version string,
) (string, error) {
	// call underlying callback
	return im.app.OnChanOpenInit(
		ctx,
		order,
		connectionHops,
		portID,
		channelID,
		chanCap,
		counterparty,
		version,
	)
}

// OnChanOpenTry implements the IBCMiddleware interface
func (im IBCMiddleware) OnChanOpenTry(
	ctx sdk.Context,
	order channeltypes.Order,
	connectionHops []string,
	portID,
	channelID string,
	channelCap *capabilitytypes.Capability,
	counterparty channeltypes.Counterparty,
	counterpartyVersion string,
) (string, error) {
	return im.app.OnChanOpenTry(
		ctx,
		order,
		connectionHops,
		portID,
		channelID,
		channelCap,
		counterparty,
		counterpartyVersion,
	)
}

// OnChanOpenAck implements the IBCMiddleware interface
func (im IBCMiddleware) OnChanOpenAck(
	ctx sdk.Context,
	portID,
	channelID string,
	counterpartyChannelID string,
	counterpartyVersion string,
) error {
	return im.app.OnChanOpenAck(
		ctx,
		portID,
		channelID,
		counterpartyChannelID,
		counterpartyVersion,
	)
}

// OnChanOpenConfirm implements the IBCMiddleware interface
func (im IBCMiddleware) OnChanOpenConfirm(
	ctx sdk.Context,
	portID,
	channelID string,
) error {
	return im.app.OnChanOpenConfirm(ctx, portID, channelID)
}

// OnChanCloseInit implements the IBCMiddleware interface
func (im IBCMiddleware) OnChanCloseInit(
	ctx sdk.Context,
	portID,
	channelID string,
) error {
	return im.app.OnChanCloseInit(ctx, portID, channelID)
}

// OnChanCloseConfirm implements the IBCMiddleware interface
func (im IBCMiddleware) OnChanCloseConfirm(
	ctx sdk.Context,
	portID,
	channelID string,
) error {
	return im.app.OnChanCloseConfirm(ctx, portID, channelID)
}

// OnRecvPacket implements the IBCMiddleware interface
func (im IBCMiddleware) OnRecvPacket(
	ctx sdk.Context,
	packet channeltypes.Packet,
	relayer sdk.AccAddress,
) ibcexported.Acknowledgement {
	ack := im.app.OnRecvPacket(ctx, packet, relayer)
	if !ack.Success() {
		return ack
	}

	var data types.FungibleTokenPacketData
	if err := types.ModuleCdc.UnmarshalJSON(packet.GetData(), &data); err != nil {
		ctx.Logger().Error("cannot unmarshal ICS-20 transfer packet data")
		return ack
	}

	var msg Message
	var err error

	if err = json.Unmarshal([]byte(data.GetMemo()), &msg); err != nil {
		ctx.Logger().Error("cannot unmarshal memo", "error", err)
		return ack
	}

	switch msg.Type {
	case gmptypes.TypeGeneralMessage:
		err = im.handler.HandleGeneralMessage(
			ctx,
			msg.SourceChain,   // e.g. "Ethereum"
			msg.SourceAddress, // e.g. "0x1234..."
			data.Receiver,     // e.g. "warden1..."
			msg.Payload,
			data.Sender, // e.g. "warden1..."
			packet.DestinationChannel,
		)
	case gmptypes.TypeGeneralMessageWithToken:
		// parse the transfer amount
		amt, ok := math.NewIntFromString(data.Amount)
		if !ok {
			return channeltypes.NewErrorAcknowledgement(
				errors.Wrapf(
					types.ErrInvalidAmount,
					"unable to parse transfer amount (%s) into sdk.Int",
					data.Amount,
				),
			)
		}
		denom := parseDenom(packet, data.Denom)

		err = im.handler.HandleGeneralMessageWithToken(
			ctx,
			msg.SourceChain,
			msg.SourceAddress,
			data.Receiver,
			msg.Payload,
			data.Sender,
			packet.DestinationChannel,
			sdk.NewCoin(denom, amt),
		)
	default:
		ctx.Logger().With(
			fmt.Errorf("unrecognized message type: %d", msg.Type)).
			Error("unrecognized gmp message")
		return ack
	}

	if err != nil {
		return channeltypes.NewErrorAcknowledgement(err)
	}

	return ack
}

// OnAcknowledgementPacket implements the IBCMiddleware interface
func (im IBCMiddleware) OnAcknowledgementPacket(
	ctx sdk.Context,
	packet channeltypes.Packet,
	acknowledgement []byte,
	relayer sdk.AccAddress,
) error {
	return im.app.OnAcknowledgementPacket(ctx, packet, acknowledgement, relayer)
}

// OnTimeoutPacket implements the IBCMiddleware interface
func (im IBCMiddleware) OnTimeoutPacket(
	ctx sdk.Context,
	packet channeltypes.Packet,
	relayer sdk.AccAddress,
) error {
	return im.app.OnTimeoutPacket(ctx, packet, relayer)
}
