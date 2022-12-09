package types

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"

	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/stretchr/testify/suite"
)

type ParamsTestSuite struct {
	suite.Suite
}

func TestParamsTestSuite(t *testing.T) {
	suite.Run(t, new(ParamsTestSuite))
}

func (suite *ParamsTestSuite) TestParamKeyTable() {
	suite.Require().IsType(paramtypes.KeyTable{}, ParamKeyTable())
}

func (suite *ParamsTestSuite) TestParamsValidate() {
	testCases := []struct {
		name     string
		params   Params
		expError bool
	}{
		{"default", DefaultParams(), false},
		{
			"valid",
			NewParams(true, 7, 3, 2000000000, int64(544435345345435345), sdk.NewDecWithPrec(20, 4), DefaultMinGasMultiplier),
			false,
		},
		{
			"empty",
			Params{},
			true,
		},
		{
			"base fee change denominator is 0 ",
			NewParams(true, 0, 3, 2000000000, int64(544435345345435345), sdk.NewDecWithPrec(20, 4), DefaultMinGasMultiplier),
			true,
		},
		{
			"invalid: min gas price negative",
			NewParams(true, 7, 3, 2000000000, int64(544435345345435345), sdk.NewDecFromInt(sdk.NewInt(-1)), DefaultMinGasMultiplier),
			true,
		},
		{
			"valid: min gas multiplier zero",
			NewParams(true, 7, 3, 2000000000, int64(544435345345435345), DefaultMinGasPrice, sdk.ZeroDec()),
			false,
		},
		{
			"invalid: min gas multiplier is negative",
			NewParams(true, 7, 3, 2000000000, int64(544435345345435345), DefaultMinGasPrice, sdk.NewDecWithPrec(-5, 1)),
			true,
		},
		{
			"invalid: min gas multiplier bigger than 1",
			NewParams(true, 7, 3, 2000000000, int64(544435345345435345), sdk.NewDecWithPrec(20, 4), sdk.NewDec(2)),
			true,
		},
	}

	for _, tc := range testCases {
		err := tc.params.Validate()

		if tc.expError {
			suite.Require().Error(err, tc.name)
		} else {
			suite.Require().NoError(err, tc.name)
		}
	}
}

func (suite *ParamsTestSuite) TestParamsValidatePriv() {
	suite.Require().Error(validateBool(2))
	suite.Require().NoError(validateBool(true))
	suite.Require().Error(validateBaseFeeChangeDenominator(0))
	suite.Require().Error(validateBaseFeeChangeDenominator(uint32(0)))
	suite.Require().NoError(validateBaseFeeChangeDenominator(uint32(7)))
	suite.Require().Error(validateElasticityMultiplier(""))
	suite.Require().NoError(validateElasticityMultiplier(uint32(2)))
	suite.Require().Error(validateBaseFee(""))
	suite.Require().Error(validateBaseFee(int64(2000000000)))
	suite.Require().Error(validateBaseFee(sdk.NewInt(-2000000000)))
	suite.Require().NoError(validateBaseFee(sdk.NewInt(2000000000)))
	suite.Require().Error(validateEnableHeight(""))
	suite.Require().Error(validateEnableHeight(int64(-544435345345435345)))
	suite.Require().NoError(validateEnableHeight(int64(544435345345435345)))
	suite.Require().Error(validateMinGasPrice(sdk.Dec{}))
	suite.Require().Error(validateMinGasMultiplier(sdk.NewDec(-5)))
	suite.Require().Error(validateMinGasMultiplier(sdk.Dec{}))
	suite.Require().Error(validateMinGasMultiplier(""))
}

func (suite *ParamsTestSuite) TestParamsValidateMinGasPrice() {
	testCases := []struct {
		name     string
		value    interface{}
		expError bool
	}{
		{"default", DefaultParams().MinGasPrice, false},
		{"valid", sdk.NewDecFromInt(sdk.NewInt(1)), false},
		{"invalid - wrong type - bool", false, true},
		{"invalid - wrong type - string", "", true},
		{"invalid - wrong type - int64", int64(123), true},
		{"invalid - wrong type - sdk.Int", sdk.NewInt(1), true},
		{"invalid - is nil", nil, true},
		{"invalid - is negative", sdk.NewDecFromInt(sdk.NewInt(-1)), true},
	}

	for _, tc := range testCases {
		err := validateMinGasPrice(tc.value)

		if tc.expError {
			suite.Require().Error(err, tc.name)
		} else {
			suite.Require().NoError(err, tc.name)
		}
	}
}
