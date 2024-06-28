package types

import (
	"fmt"
)

// axelar1zl3rxpp70lmte2xr6c4lgske2fyuj3hupcsvcd testnet fee recipient
// axelar1aythygn6z5thymj6tmzfwekzh05ewg3l7d6y89 mainnet fee recipient
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
