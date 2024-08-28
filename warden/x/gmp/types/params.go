package types

import (
	"fmt"
)

func DefaultParams() Params {
	return Params{}
}

func (p Params) Validate() error {
	if p.GmpTimeout < 1 {
		return fmt.Errorf("gmp_timeout can not be less than 1")
	}
	if p.GmpChannel == "" {
		return fmt.Errorf("gmp_channel can not be empty")
	}
	if p.GmpAddress == "" {
		return fmt.Errorf("gmp_address can not be empty")
	}
	if p.FeeRecipient == "" {
		return fmt.Errorf("gmp_fee recipient can not be empty")
	}
	return nil
}
