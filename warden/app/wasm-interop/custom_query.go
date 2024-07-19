package wasm_interop

import (
	"encoding/json"
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	wardenkeeper "github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

type WardenProtocolQuery struct {
	Warden WardenQuery `json:"warden,omitempty"`
}

type WardenQuery struct {
	AllKeys *types.QueryAllKeysRequest `json:"all_keys,omitempty"`
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
		default:
			return nil, fmt.Errorf("unknown variant of WardenProtocolQuery")
		}
	}
}
