package v1beta1

import (
	"time"

	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
)

var _ paramtypes.ParamSet = (*Params)(nil)

var (
	DefaultMaxPendingTime    time.Duration = time.Hour * 24  // day
	DefaultMaxCompletedTime  time.Duration = time.Hour * 168 // week
	PruneCheckBlockFrequency int64         = 10000           // ~17 hours
)

// NewParams creates a new Params instance.
func NewParams() Params {
	return Params{}
}

// DefaultParams returns a default set of parameters.
func DefaultParams() Params {
	return Params{
		MaxPendingTime:           DefaultMaxPendingTime,
		MaxCompletedTime:         DefaultMaxCompletedTime,
		PruneCheckBlockFrequency: PruneCheckBlockFrequency,
	}
}

// ParamSetPairs get the params.ParamSet.
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{}
}

// Validate validates the set of params.
func (p Params) Validate() error {
	return nil
}
