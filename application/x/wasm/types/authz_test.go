package types

import (
	"math"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	errorsmod "cosmossdk.io/errors"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	authztypes "github.com/cosmos/cosmos-sdk/x/authz"
)

func TestContractAuthzFilterValidate(t *testing.T) {
	specs := map[string]struct {
		src    ContractAuthzFilterX
		expErr bool
	}{
		"allow all": {
			src: &AllowAllMessagesFilter{},
		},
		"allow keys - single": {
			src: NewAcceptedMessageKeysFilter("foo"),
		},
		"allow keys - multi": {
			src: NewAcceptedMessageKeysFilter("foo", "bar"),
		},
		"allow keys - empty": {
			src:    NewAcceptedMessageKeysFilter(),
			expErr: true,
		},
		"allow keys - duplicates": {
			src:    NewAcceptedMessageKeysFilter("foo", "foo"),
			expErr: true,
		},
		"allow keys - whitespaces": {
			src:    NewAcceptedMessageKeysFilter(" foo"),
			expErr: true,
		},
		"allow keys - empty key": {
			src:    NewAcceptedMessageKeysFilter("", "bar"),
			expErr: true,
		},
		"allow keys - whitespace key": {
			src:    NewAcceptedMessageKeysFilter(" ", "bar"),
			expErr: true,
		},
		"allow message - single": {
			src: NewAcceptedMessagesFilter([]byte(`{}`)),
		},
		"allow message - multiple": {
			src: NewAcceptedMessagesFilter([]byte(`{}`), []byte(`{"foo":"bar"}`)),
		},
		"allow message - multiple with empty": {
			src:    NewAcceptedMessagesFilter([]byte(`{}`), nil),
			expErr: true,
		},
		"allow message - duplicate": {
			src:    NewAcceptedMessagesFilter([]byte(`{}`), []byte(`{}`)),
			expErr: true,
		},
		"allow message - non json": {
			src:    NewAcceptedMessagesFilter([]byte("non-json")),
			expErr: true,
		},
		"allow message - empty": {
			src:    NewAcceptedMessagesFilter(),
			expErr: true,
		},
		"allow all message - always valid": {
			src: NewAllowAllMessagesFilter(),
		},
		"undefined - always invalid": {
			src:    &UndefinedFilter{},
			expErr: true,
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			gotErr := spec.src.ValidateBasic()
			if spec.expErr {
				require.Error(t, gotErr)
				return
			}
			require.NoError(t, gotErr)
		})
	}
}

func TestContractAuthzFilterAccept(t *testing.T) {
	specs := map[string]struct {
		filter         ContractAuthzFilterX
		src            RawContractMessage
		exp            bool
		expGasConsumed sdk.Gas
		expErr         bool
	}{
		"allow all - accepts json obj": {
			filter: &AllowAllMessagesFilter{},
			src:    []byte(`{}`),
			exp:    true,
		},
		"allow all - accepts json array": {
			filter: &AllowAllMessagesFilter{},
			src:    []byte(`[{},{}]`),
			exp:    true,
		},
		"allow all - rejects non json msg": {
			filter: &AllowAllMessagesFilter{},
			src:    []byte(``),
			expErr: true,
		},
		"allowed key - single": {
			filter:         NewAcceptedMessageKeysFilter("foo"),
			src:            []byte(`{"foo": "bar"}`),
			exp:            true,
			expGasConsumed: sdk.Gas(len(`{"foo": "bar"}`)),
		},
		"allowed key - multiple": {
			filter:         NewAcceptedMessageKeysFilter("foo", "other"),
			src:            []byte(`{"other": "value"}`),
			exp:            true,
			expGasConsumed: sdk.Gas(len(`{"other": "value"}`)),
		},
		"allowed key - non accepted key": {
			filter:         NewAcceptedMessageKeysFilter("foo"),
			src:            []byte(`{"bar": "value"}`),
			exp:            false,
			expGasConsumed: sdk.Gas(len(`{"bar": "value"}`)),
		},
		"allowed key - unsupported array msg": {
			filter:         NewAcceptedMessageKeysFilter("foo", "other"),
			src:            []byte(`[{"foo":"bar"}]`),
			expErr:         false,
			expGasConsumed: sdk.Gas(len(`[{"foo":"bar"}]`)),
		},
		"allowed key - invalid msg": {
			filter: NewAcceptedMessageKeysFilter("foo", "other"),
			src:    []byte(`not a json msg`),
			expErr: true,
		},
		"allow message - single": {
			filter: NewAcceptedMessagesFilter([]byte(`{}`)),
			src:    []byte(`{}`),
			exp:    true,
		},
		"allow message - multiple": {
			filter: NewAcceptedMessagesFilter([]byte(`[{"foo":"bar"}]`), []byte(`{"other":"value"}`)),
			src:    []byte(`[{"foo":"bar"}]`),
			exp:    true,
		},
		"allow message - no match": {
			filter: NewAcceptedMessagesFilter([]byte(`{"foo":"bar"}`)),
			src:    []byte(`{"other":"value"}`),
			exp:    false,
		},
		"allow all message - always accept valid": {
			filter: NewAllowAllMessagesFilter(),
			src:    []byte(`{"other":"value"}`),
			exp:    true,
		},
		"allow all message - always reject invalid json": {
			filter: NewAllowAllMessagesFilter(),
			src:    []byte(`not json`),
			expErr: true,
		},
		"undefined - always errors": {
			filter: &UndefinedFilter{},
			src:    []byte(`{"foo":"bar"}`),
			expErr: true,
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			gm := sdk.NewGasMeter(1_000_000)
			allowed, gotErr := spec.filter.Accept(sdk.Context{}.WithGasMeter(gm), spec.src)

			// then
			if spec.expErr {
				require.Error(t, gotErr)
				return
			}
			require.NoError(t, gotErr)
			assert.Equal(t, spec.exp, allowed)
			assert.Equal(t, spec.expGasConsumed, gm.GasConsumed())
		})
	}
}

func TestContractAuthzLimitValidate(t *testing.T) {
	oneToken := sdk.NewCoin(sdk.DefaultBondDenom, sdk.OneInt())
	specs := map[string]struct {
		src    ContractAuthzLimitX
		expErr bool
	}{
		"max calls": {
			src: NewMaxCallsLimit(1),
		},
		"max calls - max uint64": {
			src: NewMaxCallsLimit(math.MaxUint64),
		},
		"max calls - empty": {
			src:    NewMaxCallsLimit(0),
			expErr: true,
		},
		"max funds": {
			src: NewMaxFundsLimit(oneToken),
		},
		"max funds - empty coins": {
			src:    NewMaxFundsLimit(),
			expErr: true,
		},
		"max funds - duplicates": {
			src:    &MaxFundsLimit{Amounts: sdk.Coins{oneToken, oneToken}},
			expErr: true,
		},
		"max funds - contains empty value": {
			src:    &MaxFundsLimit{Amounts: sdk.Coins{oneToken, sdk.NewCoin("other", sdk.ZeroInt())}.Sort()},
			expErr: true,
		},
		"max funds - unsorted": {
			src:    &MaxFundsLimit{Amounts: sdk.Coins{oneToken, sdk.NewCoin("other", sdk.OneInt())}},
			expErr: true,
		},
		"combined": {
			src: NewCombinedLimit(1, oneToken),
		},
		"combined - empty calls": {
			src:    NewCombinedLimit(0, oneToken),
			expErr: true,
		},
		"combined - empty amounts": {
			src:    NewCombinedLimit(1),
			expErr: true,
		},
		"combined - invalid amounts": {
			src:    &CombinedLimit{CallsRemaining: 1, Amounts: sdk.Coins{oneToken, oneToken}},
			expErr: true,
		},
		"undefined": {
			src:    &UndefinedLimit{},
			expErr: true,
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			gotErr := spec.src.ValidateBasic()
			if spec.expErr {
				require.Error(t, gotErr)
				return
			}
			require.NoError(t, gotErr)
		})
	}
}

func TestContractAuthzLimitAccept(t *testing.T) {
	oneToken := sdk.NewCoin(sdk.DefaultBondDenom, sdk.OneInt())
	otherToken := sdk.NewCoin("other", sdk.OneInt())
	specs := map[string]struct {
		limit  ContractAuthzLimitX
		src    AuthzableWasmMsg
		exp    *ContractAuthzLimitAcceptResult
		expErr bool
	}{
		"max calls - updated": {
			limit: NewMaxCallsLimit(2),
			src:   &MsgExecuteContract{},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: true, UpdateLimit: NewMaxCallsLimit(1)},
		},
		"max calls - removed": {
			limit: NewMaxCallsLimit(1),
			src:   &MsgExecuteContract{},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: true, DeleteLimit: true},
		},
		"max calls - accepted with zero fund set": {
			limit: NewMaxCallsLimit(1),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(sdk.NewCoin(sdk.DefaultBondDenom, sdk.ZeroInt()))},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: true, DeleteLimit: true},
		},
		"max calls - rejected with some fund transfer": {
			limit: NewMaxCallsLimit(1),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(oneToken)},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: false},
		},
		"max calls - invalid": {
			limit:  &MaxCallsLimit{},
			src:    &MsgExecuteContract{},
			expErr: true,
		},
		"max funds - single updated": {
			limit: NewMaxFundsLimit(oneToken.Add(oneToken)),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(oneToken)},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: true, UpdateLimit: NewMaxFundsLimit(oneToken)},
		},
		"max funds - single removed": {
			limit: NewMaxFundsLimit(oneToken),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(oneToken)},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: true, DeleteLimit: true},
		},
		"max funds - single with unknown token": {
			limit: NewMaxFundsLimit(oneToken),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(otherToken)},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: false},
		},
		"max funds - single exceeds limit": {
			limit: NewMaxFundsLimit(oneToken),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(oneToken.Add(oneToken))},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: false},
		},
		"max funds - single with additional token send": {
			limit: NewMaxFundsLimit(oneToken),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(oneToken, otherToken)},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: false},
		},
		"max funds - multi with other left": {
			limit: NewMaxFundsLimit(oneToken, otherToken),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(oneToken)},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: true, UpdateLimit: NewMaxFundsLimit(otherToken)},
		},
		"max funds - multi with all used": {
			limit: NewMaxFundsLimit(oneToken, otherToken),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(oneToken, otherToken)},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: true, DeleteLimit: true},
		},
		"max funds - multi with no tokens sent": {
			limit: NewMaxFundsLimit(oneToken, otherToken),
			src:   &MsgExecuteContract{},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: true},
		},
		"max funds - multi with other exceeds limit": {
			limit: NewMaxFundsLimit(oneToken, otherToken),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(oneToken, otherToken.Add(otherToken))},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: false},
		},
		"max combined - multi amounts one consumed": {
			limit: NewCombinedLimit(2, oneToken, otherToken),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(oneToken)},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: true, UpdateLimit: NewCombinedLimit(1, otherToken)},
		},
		"max combined - multi amounts none consumed": {
			limit: NewCombinedLimit(2, oneToken, otherToken),
			src:   &MsgExecuteContract{},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: true, UpdateLimit: NewCombinedLimit(1, oneToken, otherToken)},
		},
		"max combined - removed on last execution": {
			limit: NewCombinedLimit(1, oneToken, otherToken),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(oneToken)},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: true, DeleteLimit: true},
		},
		"max combined - removed on last token": {
			limit: NewCombinedLimit(2, oneToken),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(oneToken)},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: true, DeleteLimit: true},
		},
		"max combined - update with token and calls remaining": {
			limit: NewCombinedLimit(2, oneToken, otherToken),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(oneToken)},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: true, UpdateLimit: NewCombinedLimit(1, otherToken)},
		},
		"max combined - multi with other exceeds limit": {
			limit: NewCombinedLimit(2, oneToken, otherToken),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(oneToken, otherToken.Add(otherToken))},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: false},
		},
		"max combined - with unknown token": {
			limit: NewCombinedLimit(2, oneToken),
			src:   &MsgExecuteContract{Funds: sdk.NewCoins(otherToken)},
			exp:   &ContractAuthzLimitAcceptResult{Accepted: false},
		},
		"undefined": {
			limit:  &UndefinedLimit{},
			expErr: true,
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			gotResult, gotErr := spec.limit.Accept(sdk.Context{}, spec.src)
			// then
			if spec.expErr {
				require.Error(t, gotErr)
				return
			}
			require.NoError(t, gotErr)
			assert.Equal(t, spec.exp, gotResult)
		})
	}
}

func TestValidateContractGrant(t *testing.T) {
	specs := map[string]struct {
		setup  func(t *testing.T) ContractGrant
		expErr bool
	}{
		"all good": {
			setup: func(t *testing.T) ContractGrant {
				t.Helper()
				return mustGrant(randBytes(ContractAddrLen), NewMaxCallsLimit(1), NewAllowAllMessagesFilter())
			},
		},
		"invalid address": {
			setup: func(t *testing.T) ContractGrant {
				t.Helper()
				return mustGrant([]byte{}, NewMaxCallsLimit(1), NewAllowAllMessagesFilter())
			},
			expErr: true,
		},
		"invalid limit": {
			setup: func(t *testing.T) ContractGrant {
				t.Helper()
				return mustGrant(randBytes(ContractAddrLen), NewMaxCallsLimit(0), NewAllowAllMessagesFilter())
			},
			expErr: true,
		},

		"invalid filter ": {
			setup: func(t *testing.T) ContractGrant {
				t.Helper()
				return mustGrant(randBytes(ContractAddrLen), NewMaxCallsLimit(1), NewAcceptedMessageKeysFilter())
			},
			expErr: true,
		},
		"empty limit": {
			setup: func(t *testing.T) ContractGrant {
				t.Helper()
				r := mustGrant(randBytes(ContractAddrLen), NewMaxCallsLimit(0), NewAllowAllMessagesFilter())
				r.Limit = nil
				return r
			},
			expErr: true,
		},

		"empty filter ": {
			setup: func(t *testing.T) ContractGrant {
				t.Helper()
				r := mustGrant(randBytes(ContractAddrLen), NewMaxCallsLimit(1), NewAcceptedMessageKeysFilter())
				r.Filter = nil
				return r
			},
			expErr: true,
		},
		"wrong limit type": {
			setup: func(t *testing.T) ContractGrant {
				t.Helper()
				r := mustGrant(randBytes(ContractAddrLen), NewMaxCallsLimit(0), NewAllowAllMessagesFilter())
				r.Limit = r.Filter
				return r
			},
			expErr: true,
		},

		"wrong filter type": {
			setup: func(t *testing.T) ContractGrant {
				t.Helper()
				r := mustGrant(randBytes(ContractAddrLen), NewMaxCallsLimit(1), NewAcceptedMessageKeysFilter())
				r.Filter = r.Limit
				return r
			},
			expErr: true,
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			gotErr := spec.setup(t).ValidateBasic()
			if spec.expErr {
				require.Error(t, gotErr)
				return
			}
			require.NoError(t, gotErr)
		})
	}
}

func TestValidateContractAuthorization(t *testing.T) {
	validGrant, err := NewContractGrant(randBytes(SDKAddrLen), NewMaxCallsLimit(1), NewAllowAllMessagesFilter())
	require.NoError(t, err)
	invalidGrant, err := NewContractGrant(randBytes(SDKAddrLen), NewMaxCallsLimit(1), NewAllowAllMessagesFilter())
	require.NoError(t, err)
	invalidGrant.Limit = nil

	specs := map[string]struct {
		setup  func(t *testing.T) validatable
		expErr bool
	}{
		"contract execution": {
			setup: func(t *testing.T) validatable {
				t.Helper()
				return NewContractMigrationAuthorization(*validGrant)
			},
		},
		"contract execution - duplicate grants": {
			setup: func(t *testing.T) validatable {
				t.Helper()
				return NewContractMigrationAuthorization(*validGrant, *validGrant)
			},
		},
		"contract execution - invalid grant": {
			setup: func(t *testing.T) validatable {
				t.Helper()
				return NewContractMigrationAuthorization(*validGrant, *invalidGrant)
			},
			expErr: true,
		},
		"contract execution - empty grants": {
			setup: func(t *testing.T) validatable {
				t.Helper()
				return NewContractMigrationAuthorization()
			},
			expErr: true,
		},
		"contract migration": {
			setup: func(t *testing.T) validatable {
				t.Helper()
				return NewContractMigrationAuthorization(*validGrant)
			},
		},
		"contract migration - duplicate grants": {
			setup: func(t *testing.T) validatable {
				t.Helper()
				return NewContractMigrationAuthorization(*validGrant, *validGrant)
			},
		},
		"contract migration - invalid grant": {
			setup: func(t *testing.T) validatable {
				t.Helper()
				return NewContractMigrationAuthorization(*validGrant, *invalidGrant)
			},
			expErr: true,
		},
		"contract migration - empty grant": {
			setup: func(t *testing.T) validatable {
				t.Helper()
				return NewContractMigrationAuthorization()
			},
			expErr: true,
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			gotErr := spec.setup(t).ValidateBasic()
			if spec.expErr {
				require.Error(t, gotErr)
				return
			}
			require.NoError(t, gotErr)
		})
	}
}

func TestAcceptGrantedMessage(t *testing.T) {
	myContractAddr := sdk.AccAddress(randBytes(SDKAddrLen))
	otherContractAddr := sdk.AccAddress(randBytes(SDKAddrLen))
	specs := map[string]struct {
		auth      authztypes.Authorization
		msg       sdk.Msg
		expResult authztypes.AcceptResponse
		expErr    *errorsmod.Error
	}{
		"accepted and updated - contract execution": {
			auth: NewContractExecutionAuthorization(mustGrant(myContractAddr, NewMaxCallsLimit(2), NewAllowAllMessagesFilter())),
			msg: &MsgExecuteContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: myContractAddr.String(),
				Msg:      []byte(`{"foo":"bar"}`),
			},
			expResult: authztypes.AcceptResponse{
				Accept:  true,
				Updated: NewContractExecutionAuthorization(mustGrant(myContractAddr, NewMaxCallsLimit(1), NewAllowAllMessagesFilter())),
			},
		},
		"accepted and not updated - limit not touched": {
			auth: NewContractExecutionAuthorization(mustGrant(myContractAddr, NewMaxFundsLimit(sdk.NewCoin(sdk.DefaultBondDenom, sdk.OneInt())), NewAllowAllMessagesFilter())),
			msg: &MsgExecuteContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: myContractAddr.String(),
				Msg:      []byte(`{"foo":"bar"}`),
			},
			expResult: authztypes.AcceptResponse{Accept: true},
		},
		"accepted and removed - single": {
			auth: NewContractExecutionAuthorization(mustGrant(myContractAddr, NewMaxCallsLimit(1), NewAllowAllMessagesFilter())),
			msg: &MsgExecuteContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: myContractAddr.String(),
				Msg:      []byte(`{"foo":"bar"}`),
			},
			expResult: authztypes.AcceptResponse{Accept: true, Delete: true},
		},
		"accepted and updated - multi, one removed": {
			auth: NewContractExecutionAuthorization(
				mustGrant(myContractAddr, NewMaxCallsLimit(1), NewAllowAllMessagesFilter()),
				mustGrant(myContractAddr, NewMaxCallsLimit(1), NewAllowAllMessagesFilter()),
			),
			msg: &MsgExecuteContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: myContractAddr.String(),
				Msg:      []byte(`{"foo":"bar"}`),
			},
			expResult: authztypes.AcceptResponse{
				Accept:  true,
				Updated: NewContractExecutionAuthorization(mustGrant(myContractAddr, NewMaxCallsLimit(1), NewAllowAllMessagesFilter())),
			},
		},
		"accepted and updated - multi, one updated": {
			auth: NewContractExecutionAuthorization(
				mustGrant(otherContractAddr, NewMaxCallsLimit(1), NewAllowAllMessagesFilter()),
				mustGrant(myContractAddr, NewMaxFundsLimit(sdk.NewCoin(sdk.DefaultBondDenom, sdk.NewInt(2))), NewAcceptedMessageKeysFilter("bar")),
				mustGrant(myContractAddr, NewCombinedLimit(2, sdk.NewCoin(sdk.DefaultBondDenom, sdk.NewInt(2))), NewAcceptedMessageKeysFilter("foo")),
			),
			msg: &MsgExecuteContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: myContractAddr.String(),
				Msg:      []byte(`{"foo":"bar"}`),
				Funds:    sdk.NewCoins(sdk.NewCoin(sdk.DefaultBondDenom, sdk.OneInt())),
			},
			expResult: authztypes.AcceptResponse{
				Accept: true,
				Updated: NewContractExecutionAuthorization(
					mustGrant(otherContractAddr, NewMaxCallsLimit(1), NewAllowAllMessagesFilter()),
					mustGrant(myContractAddr, NewMaxFundsLimit(sdk.NewCoin(sdk.DefaultBondDenom, sdk.NewInt(2))), NewAcceptedMessageKeysFilter("bar")),
					mustGrant(myContractAddr, NewCombinedLimit(1, sdk.NewCoin(sdk.DefaultBondDenom, sdk.NewInt(1))), NewAcceptedMessageKeysFilter("foo")),
				),
			},
		},
		"not accepted - no matching contract address": {
			auth: NewContractExecutionAuthorization(mustGrant(myContractAddr, NewMaxCallsLimit(1), NewAllowAllMessagesFilter())),
			msg: &MsgExecuteContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Msg:      []byte(`{"foo":"bar"}`),
			},
			expResult: authztypes.AcceptResponse{Accept: false},
		},
		"not accepted - max calls but tokens": {
			auth: NewContractExecutionAuthorization(mustGrant(myContractAddr, NewMaxCallsLimit(1), NewAllowAllMessagesFilter())),
			msg: &MsgExecuteContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: myContractAddr.String(),
				Msg:      []byte(`{"foo":"bar"}`),
				Funds:    sdk.NewCoins(sdk.NewCoin(sdk.DefaultBondDenom, sdk.OneInt())),
			},
			expResult: authztypes.AcceptResponse{Accept: false},
		},
		"not accepted - funds exceeds limit": {
			auth: NewContractExecutionAuthorization(mustGrant(myContractAddr, NewMaxFundsLimit(sdk.NewCoin(sdk.DefaultBondDenom, sdk.OneInt())), NewAllowAllMessagesFilter())),
			msg: &MsgExecuteContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: myContractAddr.String(),
				Msg:      []byte(`{"foo":"bar"}`),
				Funds:    sdk.NewCoins(sdk.NewCoin(sdk.DefaultBondDenom, sdk.NewInt(2))),
			},
			expResult: authztypes.AcceptResponse{Accept: false},
		},
		"not accepted - no matching filter": {
			auth: NewContractExecutionAuthorization(mustGrant(myContractAddr, NewMaxCallsLimit(1), NewAcceptedMessageKeysFilter("other"))),
			msg: &MsgExecuteContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: myContractAddr.String(),
				Msg:      []byte(`{"foo":"bar"}`),
				Funds:    sdk.NewCoins(sdk.NewCoin(sdk.DefaultBondDenom, sdk.OneInt())),
			},
			expResult: authztypes.AcceptResponse{Accept: false},
		},
		"invalid msg type - contract execution": {
			auth: NewContractExecutionAuthorization(mustGrant(myContractAddr, NewMaxCallsLimit(1), NewAllowAllMessagesFilter())),
			msg: &MsgMigrateContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: myContractAddr.String(),
				CodeID:   1,
				Msg:      []byte(`{"foo":"bar"}`),
			},
			expErr: sdkerrors.ErrInvalidType,
		},
		"payload is empty": {
			auth: NewContractExecutionAuthorization(mustGrant(myContractAddr, NewMaxCallsLimit(1), NewAllowAllMessagesFilter())),
			msg: &MsgExecuteContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: myContractAddr.String(),
			},
			expErr: sdkerrors.ErrInvalidType,
		},
		"payload is invalid": {
			auth: NewContractExecutionAuthorization(mustGrant(myContractAddr, NewMaxCallsLimit(1), NewAllowAllMessagesFilter())),
			msg: &MsgExecuteContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: myContractAddr.String(),
				Msg:      []byte(`not json`),
			},
			expErr: ErrInvalid,
		},
		"invalid grant": {
			auth: NewContractExecutionAuthorization(ContractGrant{Contract: myContractAddr.String()}),
			msg: &MsgExecuteContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: myContractAddr.String(),
				Msg:      []byte(`{"foo":"bar"}`),
			},
			expErr: sdkerrors.ErrNotFound,
		},
		"invalid msg type - contract migration": {
			auth: NewContractMigrationAuthorization(mustGrant(myContractAddr, NewMaxCallsLimit(1), NewAllowAllMessagesFilter())),
			msg: &MsgExecuteContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: myContractAddr.String(),
				Msg:      []byte(`{"foo":"bar"}`),
			},
			expErr: sdkerrors.ErrInvalidType,
		},
		"accepted and updated - contract migration": {
			auth: NewContractMigrationAuthorization(mustGrant(myContractAddr, NewMaxCallsLimit(2), NewAllowAllMessagesFilter())),
			msg: &MsgMigrateContract{
				Sender:   sdk.AccAddress(randBytes(SDKAddrLen)).String(),
				Contract: myContractAddr.String(),
				CodeID:   1,
				Msg:      []byte(`{"foo":"bar"}`),
			},
			expResult: authztypes.AcceptResponse{
				Accept:  true,
				Updated: NewContractMigrationAuthorization(mustGrant(myContractAddr, NewMaxCallsLimit(1), NewAllowAllMessagesFilter())),
			},
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			ctx := sdk.Context{}.WithGasMeter(sdk.NewInfiniteGasMeter())
			gotResult, gotErr := spec.auth.Accept(ctx, spec.msg)
			if spec.expErr != nil {
				require.ErrorIs(t, gotErr, spec.expErr)
				return
			}
			require.NoError(t, gotErr)
			assert.Equal(t, spec.expResult, gotResult)
		})
	}
}

func mustGrant(contract sdk.AccAddress, limit ContractAuthzLimitX, filter ContractAuthzFilterX) ContractGrant {
	g, err := NewContractGrant(contract, limit, filter)
	if err != nil {
		panic(err)
	}
	return *g
}
