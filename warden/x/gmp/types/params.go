package types

import (
	"fmt"
)

var (
	DefaultGMPAddress   = "axelar1dv4u5k73pzqrxlzujxg3qp8kvc3pje7jtdvu72npnt5zhq05ejcsn5qme5"
	DefaultChannel      = "channel-1"
	DefaultTimeout      = int64(1)
	DefaultFeeRecipient = "axelar1zl3rxpp70lmte2xr6c4lgske2fyuj3hupcsvcd"
)

func DefaultParams() Params {
	return Params{
		GmpAddress:   DefaultGMPAddress,
		GmpChannel:   DefaultChannel,
		GmpTimeout:   DefaultTimeout,
		FeeRecipient: DefaultFeeRecipient,
	}
}

func (p Params) Validate() error {
	if p.GmpTimeout < 1 {
		return fmt.Errorf("timeout can not be less than 1")
	}
	if p.GmpChannel == "" {
		return fmt.Errorf("channel can not be empty")
	}
	if p.GmpAddress == "" {
		return fmt.Errorf("address can not be empty")
	}
	if p.FeeRecipient == "" {
		return fmt.Errorf("fee recipient can not be empty")
	}
	return nil
}
