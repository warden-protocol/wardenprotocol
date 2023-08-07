package keeper

import (
	"reflect"
	"testing"

	wasmvm "github.com/CosmWasm/wasmvm"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	vestingtypes "github.com/cosmos/cosmos-sdk/x/auth/vesting/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"

	"github.com/CosmWasm/wasmd/x/wasm/keeper/wasmtesting"
	"github.com/CosmWasm/wasmd/x/wasm/types"
)

func TestConstructorOptions(t *testing.T) {
	specs := map[string]struct {
		srcOpt    Option
		verify    func(*testing.T, Keeper)
		isPostOpt bool
	}{
		"wasm engine": {
			srcOpt: WithWasmEngine(&wasmtesting.MockWasmer{}),
			verify: func(t *testing.T, k Keeper) {
				t.Helper()
				assert.IsType(t, &wasmtesting.MockWasmer{}, k.wasmVM)
			},
		},
		"decorate wasmvm": {
			srcOpt: WithWasmEngineDecorator(func(old types.WasmerEngine) types.WasmerEngine {
				require.IsType(t, &wasmvm.VM{}, old)
				return &wasmtesting.MockWasmer{}
			}),
			verify: func(t *testing.T, k Keeper) {
				t.Helper()
				assert.IsType(t, &wasmtesting.MockWasmer{}, k.wasmVM)
			},
			isPostOpt: true,
		},
		"message handler": {
			srcOpt: WithMessageHandler(&wasmtesting.MockMessageHandler{}),
			verify: func(t *testing.T, k Keeper) {
				t.Helper()
				assert.IsType(t, &wasmtesting.MockMessageHandler{}, k.messenger)
			},
		},
		"query plugins": {
			srcOpt: WithQueryHandler(&wasmtesting.MockQueryHandler{}),
			verify: func(t *testing.T, k Keeper) {
				t.Helper()
				assert.IsType(t, &wasmtesting.MockQueryHandler{}, k.wasmVMQueryHandler)
			},
		},
		"message handler decorator": {
			srcOpt: WithMessageHandlerDecorator(func(old Messenger) Messenger {
				require.IsType(t, &MessageHandlerChain{}, old)
				return &wasmtesting.MockMessageHandler{}
			}),
			verify: func(t *testing.T, k Keeper) {
				t.Helper()
				assert.IsType(t, &wasmtesting.MockMessageHandler{}, k.messenger)
			},
			isPostOpt: true,
		},
		"query plugins decorator": {
			srcOpt: WithQueryHandlerDecorator(func(old WasmVMQueryHandler) WasmVMQueryHandler {
				require.IsType(t, QueryPlugins{}, old)
				return &wasmtesting.MockQueryHandler{}
			}),
			verify: func(t *testing.T, k Keeper) {
				t.Helper()
				assert.IsType(t, &wasmtesting.MockQueryHandler{}, k.wasmVMQueryHandler)
			},
			isPostOpt: true,
		},
		"coin transferrer": {
			srcOpt: WithCoinTransferrer(&wasmtesting.MockCoinTransferrer{}),
			verify: func(t *testing.T, k Keeper) {
				t.Helper()
				assert.IsType(t, &wasmtesting.MockCoinTransferrer{}, k.bank)
			},
		},
		"costs": {
			srcOpt: WithGasRegister(&wasmtesting.MockGasRegister{}),
			verify: func(t *testing.T, k Keeper) {
				t.Helper()
				assert.IsType(t, &wasmtesting.MockGasRegister{}, k.gasRegister)
			},
		},
		"api costs": {
			srcOpt: WithAPICosts(1, 2),
			verify: func(t *testing.T, k Keeper) {
				t.Helper()
				t.Cleanup(setAPIDefaults)
				assert.Equal(t, uint64(1), costHumanize)
				assert.Equal(t, uint64(2), costCanonical)
			},
		},
		"max recursion query limit": {
			srcOpt: WithMaxQueryStackSize(1),
			verify: func(t *testing.T, k Keeper) {
				t.Helper()
				assert.IsType(t, uint32(1), k.maxQueryStackSize)
			},
		},
		"accepted account types": {
			srcOpt: WithAcceptedAccountTypesOnContractInstantiation(&authtypes.BaseAccount{}, &vestingtypes.ContinuousVestingAccount{}),
			verify: func(t *testing.T, k Keeper) {
				t.Helper()
				exp := map[reflect.Type]struct{}{
					reflect.TypeOf(&authtypes.BaseAccount{}):                 {},
					reflect.TypeOf(&vestingtypes.ContinuousVestingAccount{}): {},
				}
				assert.Equal(t, exp, k.acceptedAccountTypes)
			},
		},
		"account pruner": {
			srcOpt: WithAccountPruner(VestingCoinBurner{}),
			verify: func(t *testing.T, k Keeper) {
				t.Helper()
				assert.Equal(t, VestingCoinBurner{}, k.accountPruner)
			},
		},
		"gov propagation": {
			srcOpt: WitGovSubMsgAuthZPropagated(types.AuthZActionInstantiate, types.AuthZActionMigrateContract),
			verify: func(t *testing.T, k Keeper) {
				t.Helper()
				exp := map[types.AuthorizationPolicyAction]struct{}{
					types.AuthZActionInstantiate:     {},
					types.AuthZActionMigrateContract: {},
				}
				assert.Equal(t, exp, k.propagateGovAuthorization)
			},
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			opt := spec.srcOpt
			_, gotPostOptMarker := opt.(postOptsFn)
			require.Equal(t, spec.isPostOpt, gotPostOptMarker)
			k := NewKeeper(nil, nil, authkeeper.AccountKeeper{}, &bankkeeper.BaseKeeper{}, stakingkeeper.Keeper{}, nil, nil, nil, nil, nil, nil, nil, nil, "tempDir", types.DefaultWasmConfig(), AvailableCapabilities, "", opt)
			spec.verify(t, k)
		})
	}
}

func setAPIDefaults() {
	costHumanize = DefaultGasCostHumanAddress * DefaultGasMultiplier
	costCanonical = DefaultGasCostCanonicalAddress * DefaultGasMultiplier
}

func TestSplitOpts(t *testing.T) {
	a := optsFn(nil)
	b := optsFn(nil)
	c := postOptsFn(nil)
	d := postOptsFn(nil)
	specs := map[string]struct {
		src             []Option
		expPre, expPost []Option
	}{
		"by type": {
			src:     []Option{a, c},
			expPre:  []Option{a},
			expPost: []Option{c},
		},
		"ordered": {
			src:     []Option{a, b, c, d},
			expPre:  []Option{a, b},
			expPost: []Option{c, d},
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			gotPre, gotPost := splitOpts(spec.src)
			assert.Equal(t, spec.expPre, gotPre)
			assert.Equal(t, spec.expPost, gotPost)
		})
	}
}
