package keeper

import (
	"testing"

	"github.com/cometbft/cometbft/libs/log"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
	"github.com/stretchr/testify/assert"

	"github.com/cosmos/cosmos-sdk/store"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/CosmWasm/wasmd/x/wasm/types"
)

func TestSelectAuthorizationPolicy(t *testing.T) {
	myGovAuthority := RandomAccountAddress(t)
	m := msgServer{keeper: &Keeper{
		propagateGovAuthorization: map[types.AuthorizationPolicyAction]struct{}{
			types.AuthZActionMigrateContract: {},
			types.AuthZActionInstantiate:     {},
		},
		authority: myGovAuthority.String(),
	}}
	ctx := sdk.NewContext(store.NewCommitMultiStore(nil), tmproto.Header{}, false, log.NewNopLogger())

	specs := map[string]struct {
		ctx   sdk.Context
		actor sdk.AccAddress
		exp   types.AuthorizationPolicy
	}{
		"always gov policy for gov authority sender": {
			ctx:   types.WithSubMsgAuthzPolicy(ctx, NewPartialGovAuthorizationPolicy(nil, types.AuthZActionMigrateContract)),
			actor: myGovAuthority,
			exp:   NewGovAuthorizationPolicy(types.AuthZActionMigrateContract, types.AuthZActionInstantiate),
		},
		"pick from context when set": {
			ctx:   types.WithSubMsgAuthzPolicy(ctx, NewPartialGovAuthorizationPolicy(nil, types.AuthZActionMigrateContract)),
			actor: RandomAccountAddress(t),
			exp:   NewPartialGovAuthorizationPolicy(nil, types.AuthZActionMigrateContract),
		},
		"fallback to default policy": {
			ctx:   ctx,
			actor: RandomAccountAddress(t),
			exp:   DefaultAuthorizationPolicy{},
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			got := m.selectAuthorizationPolicy(spec.ctx, spec.actor.String())
			assert.Equal(t, spec.exp, got)
		})
	}
}
