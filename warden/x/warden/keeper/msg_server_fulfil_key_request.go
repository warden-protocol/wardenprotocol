package keeper

import (
	"context"
	"cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k msgServer) FulfilKeyRequest(goCtx context.Context, msg *types.MsgFulfilKeyRequest) (*types.MsgFulfilKeyRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	req, err := k.keyRequests.Get(ctx, msg.RequestId)
	if err != nil {
		return nil, err
	}

	kr, err := k.keychains.Get(ctx, req.KeychainId)
	if err != nil {
		return nil, err
	}

	if !kr.IsWriter(msg.Creator) {
		return nil, types.ErrNotKeychainWriter
	}

	if req.Status != types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING {
		return nil, types.ErrRequestNotPending
	}

	switch msg.Status {
	case types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED:
		key, err := k.fulfillKeyRequest(msg, req, ctx)
		if err != nil {
			return nil, err
		}

		if err := k.ReleaseFeesToKeychain(ctx, kr, req.DeductedKeychainFees); err != nil {
			return nil, err
		}

		err = ctx.EventManager().EmitTypedEvent(&types.EventNewKey{
			Id:         key.Id,
			KeyType:    key.Type,
			SpaceId:    key.SpaceId,
			KeychainId: key.KeychainId,
			RuleId:     key.RuleId,
		})
		if err != nil {
			return nil, err
		}

	case types.KeyRequestStatus_KEY_REQUEST_STATUS_REJECTED:
		if err := k.rejectKeyRequest(msg, req, ctx); err != nil {
			return nil, err
		}

		err := k.RefundFeesToCreator(ctx, sdk.MustAccAddressFromBech32(req.Creator), req.DeductedKeychainFees)
		if err != nil {
			return nil, err
		}

		err = ctx.EventManager().EmitTypedEvent(&types.EventRejectKeyRequest{
			Id: req.Id,
		})
		if err != nil {
			return nil, err
		}

	default:
		return nil, errors.Wrapf(types.ErrInvalidRequestStatusUpdate, "invalid status field, should be either fulfilled/rejected, got %s", req.Status.String())
	}

	return &types.MsgFulfilKeyRequestResponse{}, nil
}
