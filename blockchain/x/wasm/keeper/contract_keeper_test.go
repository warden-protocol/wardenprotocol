package keeper

import (
	"encoding/json"
	"fmt"
	"math"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"gitlab.qredo.com/qrdochain/fusionchain/x/wasm/keeper/wasmtesting"
	"gitlab.qredo.com/qrdochain/fusionchain/x/wasm/types"
)

func TestInstantiate2(t *testing.T) {
	parentCtx, keepers := CreateTestInput(t, false, AvailableCapabilities)
	parentCtx = parentCtx.WithGasMeter(sdk.NewInfiniteGasMeter())

	example := StoreHackatomExampleContract(t, parentCtx, keepers)
	otherExample := StoreReflectContract(t, parentCtx, keepers)
	mock := &wasmtesting.MockWasmer{}
	wasmtesting.MakeInstantiable(mock)
	keepers.WasmKeeper.wasmVM = mock // set mock to not fail on contract init message

	verifierAddr := RandomAccountAddress(t)
	beneficiaryAddr := RandomAccountAddress(t)
	initMsg := mustMarshal(t, HackatomExampleInitMsg{Verifier: verifierAddr, Beneficiary: beneficiaryAddr})
	otherAddr := keepers.Faucet.NewFundedRandomAccount(parentCtx, sdk.NewInt64Coin("denom", 1_000_000_000))

	const (
		mySalt  = "my salt"
		myLabel = "my label"
	)
	// create instances for duplicate checks
	exampleContract := func(t *testing.T, ctx sdk.Context, fixMsg bool) {
		t.Helper()
		_, _, err := keepers.ContractKeeper.Instantiate2(
			ctx,
			example.CodeID,
			example.CreatorAddr,
			nil,
			initMsg,
			myLabel,
			sdk.NewCoins(sdk.NewInt64Coin("denom", 1)),
			[]byte(mySalt),
			fixMsg,
		)
		require.NoError(t, err)
	}
	exampleWithFixMsg := func(t *testing.T, ctx sdk.Context) {
		t.Helper()
		exampleContract(t, ctx, true)
	}
	exampleWithoutFixMsg := func(t *testing.T, ctx sdk.Context) {
		t.Helper()
		exampleContract(t, ctx, false)
	}
	specs := map[string]struct {
		setup   func(t *testing.T, ctx sdk.Context)
		codeID  uint64
		sender  sdk.AccAddress
		salt    []byte
		initMsg json.RawMessage
		fixMsg  bool
		expErr  error
	}{
		"fix msg - generates different address than without fixMsg": {
			setup:   exampleWithoutFixMsg,
			codeID:  example.CodeID,
			sender:  example.CreatorAddr,
			salt:    []byte(mySalt),
			initMsg: initMsg,
			fixMsg:  true,
		},
		"fix msg - different sender": {
			setup:   exampleWithFixMsg,
			codeID:  example.CodeID,
			sender:  otherAddr,
			salt:    []byte(mySalt),
			initMsg: initMsg,
			fixMsg:  true,
		},
		"fix msg - different code": {
			setup:   exampleWithFixMsg,
			codeID:  otherExample.CodeID,
			sender:  example.CreatorAddr,
			salt:    []byte(mySalt),
			initMsg: []byte(`{}`),
			fixMsg:  true,
		},
		"fix msg - different salt": {
			setup:   exampleWithFixMsg,
			codeID:  example.CodeID,
			sender:  example.CreatorAddr,
			salt:    []byte("other salt"),
			initMsg: initMsg,
			fixMsg:  true,
		},
		"fix msg - different init msg": {
			setup:   exampleWithFixMsg,
			codeID:  example.CodeID,
			sender:  example.CreatorAddr,
			salt:    []byte(mySalt),
			initMsg: mustMarshal(t, HackatomExampleInitMsg{Verifier: otherAddr, Beneficiary: beneficiaryAddr}),
			fixMsg:  true,
		},
		"different sender": {
			setup:   exampleWithoutFixMsg,
			codeID:  example.CodeID,
			sender:  otherAddr,
			salt:    []byte(mySalt),
			initMsg: initMsg,
		},
		"different code": {
			setup:   exampleWithoutFixMsg,
			codeID:  otherExample.CodeID,
			sender:  example.CreatorAddr,
			salt:    []byte(mySalt),
			initMsg: []byte(`{}`),
		},
		"different salt": {
			setup:   exampleWithoutFixMsg,
			codeID:  example.CodeID,
			sender:  example.CreatorAddr,
			salt:    []byte(`other salt`),
			initMsg: initMsg,
		},
		"different init msg - reject same address": {
			setup:   exampleWithoutFixMsg,
			codeID:  example.CodeID,
			sender:  example.CreatorAddr,
			salt:    []byte(mySalt),
			initMsg: mustMarshal(t, HackatomExampleInitMsg{Verifier: otherAddr, Beneficiary: beneficiaryAddr}),
			expErr:  types.ErrDuplicate,
		},
		"fix msg - long msg": {
			setup:   exampleWithFixMsg,
			codeID:  example.CodeID,
			sender:  otherAddr,
			salt:    []byte(mySalt),
			initMsg: []byte(fmt.Sprintf(`{"foo":%q}`, strings.Repeat("b", math.MaxInt16+1))), // too long kills CI
			fixMsg:  true,
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			ctx, _ := parentCtx.CacheContext()
			spec.setup(t, ctx)
			gotAddr, _, gotErr := keepers.ContractKeeper.Instantiate2(
				ctx,
				spec.codeID,
				spec.sender,
				nil,
				spec.initMsg,
				myLabel,
				sdk.NewCoins(sdk.NewInt64Coin("denom", 2)),
				spec.salt,
				spec.fixMsg,
			)
			if spec.expErr != nil {
				assert.ErrorIs(t, gotErr, spec.expErr)
				return
			}
			require.NoError(t, gotErr)
			assert.NotEmpty(t, gotAddr)
		})
	}
}
