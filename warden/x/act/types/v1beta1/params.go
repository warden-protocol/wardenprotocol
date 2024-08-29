package v1beta1

import (
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"time"
)

var _ paramtypes.ParamSet = (*Params)(nil)

var DefaultMaxPendingTime time.Duration = time.Hour * 24    // day
var DefaultMaxCompletedTime time.Duration = time.Hour * 168 // week

// NewParams creates a new Params instance
func NewParams() Params {
	return Params{}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return Params{
		MaxPendingTime:   DefaultMaxPendingTime,
		MaxCompletedTime: DefaultMaxCompletedTime,
	}
}

// ParamSetPairs get the params.ParamSet
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{}
}

// Validate validates the set of params
func (p Params) Validate() error {
	return nil
}
