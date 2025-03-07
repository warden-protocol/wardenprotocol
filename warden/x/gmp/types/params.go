package types

import "errors"

func DefaultParams() Params {
	return Params{}
}

func (p Params) Validate() error {
	if p.GmpTimeout < 1 {
		return errors.New("gmp_timeout can not be less than 1")
	}

	if p.GmpChannel == "" {
		return errors.New("gmp_channel can not be empty")
	}

	if p.GmpAddress == "" {
		return errors.New("gmp_address can not be empty")
	}

	if p.FeeRecipient == "" {
		return errors.New("gmp_fee recipient can not be empty")
	}

	return nil
}
