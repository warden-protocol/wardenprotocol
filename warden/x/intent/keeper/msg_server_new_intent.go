package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

func (k msgServer) NewIntent(goCtx context.Context, msg *types.MsgNewIntent) (*types.MsgNewIntentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	metadata, err := shield.Validate(msg.Definition)
	if err != nil {
		return nil, err
	}

	addresses := extractAddresses(metadata.Identifiers)

	intentPb := types.Intent{
		Creator:    msg.Creator,
		Name:       msg.Name,
		Definition: msg.Definition,
		Addresses:  addresses,
	}
	id, err := k.intents.Append(ctx, &intentPb)
	if err != nil {
		return nil, err
	}

	return &types.MsgNewIntentResponse{
		Id: id,
	}, nil
}

// extractAddresses filters a list of string by returning only the ones that are valid bech32 addresses.
func extractAddresses(identifiers []string) []string {
	addresses := make([]string, 0, len(identifiers))
	for _, identifier := range identifiers {
		_, err := sdk.AccAddressFromBech32(identifier)
		if err != nil {
			continue
		}
		addresses = append(addresses, identifier)
	}
	return addresses
}
