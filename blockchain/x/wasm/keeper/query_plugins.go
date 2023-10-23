package keeper

import (
	"encoding/json"
	"fmt"

	"github.com/CosmWasm/wasmd/x/wasm/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"

	policykeeper "github.com/qredo/fusionchain/x/policy/keeper"
	policy "github.com/qredo/fusionchain/x/policy/types"
)

func DefaultQueryPlugins(
	queryPlugins keeper.QueryPlugins,
	policyKeeper policykeeper.Keeper,
) keeper.QueryPlugins {
	queryPlugins.Custom = PolicyQuerier(policyKeeper)
	return queryPlugins
}

/*func DecorateQueryPlugins(
	queryPlugins Keeper.QueryPlugins,
	policyKeeper policykeeper.Keeper,
) Keeper.QueryPlugins {
	queryPlugins.Custom = PolicyQuerier(policyKeeper)
	return queryPlugins
}*/

type policyQuery struct {
	Verify     *policy.QueryVerifyRequest     `json:"verify,omitempty"`
	PolicyByID *policy.QueryPolicyByIdRequest `json:"policy_by_id,omitempty"`
}

type InvalidRequest struct {
	Kind string `json:"kind,omitempty"`
}

func (e InvalidRequest) Error() string {
	return fmt.Sprintf("invalid request: %s", e.Kind)
}

func PolicyQuerier(k policykeeper.Keeper) func(ctx sdk.Context, request json.RawMessage) ([]byte, error) {
	return func(ctx sdk.Context, request json.RawMessage) ([]byte, error) {
		var query policyQuery
		if err := json.Unmarshal(request, &query); err != nil {
			return nil, InvalidRequest{Kind: "could not deserialise JSON-encoded policy query"}
		}
		switch {
		case query.Verify != nil:
			if query.Verify.Policy == "" || query.Verify.Payload == "" {
				return nil, InvalidRequest{Kind: "policy and/or payload fields cannot be empty"}
			}
			res, err := k.Verify(ctx, &policy.QueryVerifyRequest{Policy: query.Verify.Policy, Payload: query.Verify.Payload})
			if err != nil {
				return nil, err
			}
			return json.Marshal(policy.QueryVerifyResponse{Result: res.Result})
		case query.PolicyByID != nil:
			p, err := k.PolicyById(ctx, &policy.QueryPolicyByIdRequest{Id: query.PolicyByID.Id})
			if err != nil {
				return nil, err
			}
			return json.Marshal(policy.QueryPolicyByIdResponse{Policy: p.Policy})
		default:
			return nil, InvalidRequest{Kind: "unknown policy query variant"}
		}
	}
}
