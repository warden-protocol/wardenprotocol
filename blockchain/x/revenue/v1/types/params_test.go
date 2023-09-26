package types

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

func TestParamsValidate(t *testing.T) {
	devShares := sdk.NewDecWithPrec(60, 2)
	derivCostCreate := uint64(50)

	testCases := []struct {
		name     string
		params   Params
		expError bool
	}{
		{"default", DefaultParams(), false},
		{
			"valid: enabled",
			NewParams(true, devShares, derivCostCreate),
			false,
		},
		{
			"valid: disabled",
			NewParams(false, devShares, derivCostCreate),
			false,
		},
		{
			"valid: 100% devs",
			Params{true, sdk.NewDecFromInt(sdk.NewInt(1)), derivCostCreate},
			false,
		},
		{
			"empty",
			Params{},
			true,
		},
		{
			"invalid: share > 1",
			Params{true, sdk.NewDecFromInt(sdk.NewInt(2)), derivCostCreate},
			true,
		},
		{
			"invalid: share < 0",
			Params{true, sdk.NewDecFromInt(sdk.NewInt(-1)), derivCostCreate},
			true,
		},
		{
			"invalid: wrong address derivation cost",
			NewParams(true, devShares, 50),
			false,
		},
	}
	for _, tc := range testCases {
		err := tc.params.Validate()

		if tc.expError {
			require.Error(t, err, tc.name)
		} else {
			require.NoError(t, err, tc.name)
		}
	}
}

func TestParamsValidateShares(t *testing.T) {
	testCases := []struct {
		name     string
		value    interface{}
		expError bool
	}{
		{"default", DefaultDeveloperShares, false},
		{"valid", sdk.NewDecFromInt(sdk.NewInt(1)), false},
		{"invalid - wrong type - bool", false, true},
		{"invalid - wrong type - string", "", true},
		{"invalid - wrong type - int64", int64(123), true},
		{"invalid - wrong type - math.Int", sdk.NewInt(1), true},
		{"invalid - is nil", nil, true},
		{"invalid - is negative", sdk.NewDecFromInt(sdk.NewInt(-1)), true},
		{"invalid - is > 1", sdk.NewDecFromInt(sdk.NewInt(2)), true},
	}
	for _, tc := range testCases {
		err := validateShares(tc.value)

		if tc.expError {
			require.Error(t, err, tc.name)
		} else {
			require.NoError(t, err, tc.name)
		}
	}
}

func TestParamsValidateBool(t *testing.T) {
	err := validateBool(DefaultEnableRevenue)
	require.NoError(t, err)
	err = validateBool(true)
	require.NoError(t, err)
	err = validateBool(false)
	require.NoError(t, err)
	err = validateBool("")
	require.Error(t, err)
	err = validateBool(int64(123))
	require.Error(t, err)
}

func TestParamsValidateUint64(t *testing.T) {
	err := validateUint64(DefaultAddrDerivationCostCreate)
	require.NoError(t, err)
	err = validateUint64(uint64(0))
	require.NoError(t, err)
	err = validateUint64(uint64(1))
	require.NoError(t, err)
	err = validateUint64("")
	require.Error(t, err)
	err = validateUint64(int64(123))
	require.Error(t, err)
	err = validateUint64(int64(-1))
	require.Error(t, err)
}
