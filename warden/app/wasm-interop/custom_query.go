package wasm_interop

import (
	"encoding/json"
	"errors"

	sdk "github.com/cosmos/cosmos-sdk/types"

	wardenkeeper "github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

type WardenProtocolQuery struct {
	Warden WardenQuery `json:"warden,omitempty"`
}

type WardenQuery struct {
	AllKeys         *types.QueryAllKeysRequest         `json:"all_keys,omitempty"`
	KeysBySpaceId   *types.QueryKeysBySpaceIdRequest   `json:"keys_by_space_id,omitempty"`
	KeyById         *types.QueryKeyByIdRequest         `json:"key_by_id,omitempty"`
	SignRequests    *types.QuerySignRequestsRequest    `json:"sign_requests,omitempty"`
	SignRequestById *types.QuerySignRequestByIdRequest `json:"sign_request_by_id,omitempty"`
}

func CustomQuerier(wardenKeeper wardenkeeper.Keeper) func(ctx sdk.Context, rawRequest json.RawMessage) ([]byte, error) {
	return func(ctx sdk.Context, rawRequest json.RawMessage) ([]byte, error) {
		var query WardenProtocolQuery

		err := json.Unmarshal(rawRequest, &query)
		if err != nil {
			return nil, err
		}

		switch {
		case query.Warden.AllKeys != nil:
			response, err := wardenKeeper.AllKeys(ctx, query.Warden.AllKeys)
			if err != nil {
				return nil, err
			}

			return json.Marshal(response)
		case query.Warden.KeysBySpaceId != nil:
			response, err := wardenKeeper.KeysBySpaceId(ctx, query.Warden.KeysBySpaceId)
			if err != nil {
				return nil, err
			}

			return json.Marshal(response)
		case query.Warden.KeyById != nil:
			response, err := wardenKeeper.KeyById(ctx, query.Warden.KeyById)
			if err != nil {
				return nil, err
			}

			return json.Marshal(response)
		case query.Warden.SignRequests != nil:
			response, err := wardenKeeper.SignRequests(ctx, query.Warden.SignRequests)
			if err != nil {
				return nil, err
			}

			return json.Marshal(response)
		case query.Warden.SignRequestById != nil:
			response, err := wardenKeeper.SignRequestById(ctx, query.Warden.SignRequestById)
			if err != nil {
				return nil, err
			}

			return json.Marshal(response)
		default:
			return nil, errors.New("unknown variant of WardenProtocolQuery")
		}
	}
}
