package v1beta1

import (
	fmt "fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (p *Plugin) IsFreeToUse() bool {
	if len(p.Fees.Values) == 0 {
		return true
	}

	for _, v := range p.Fees.Values {
		if !v.TaskReq.IsZero() {
			return false
		}
	}

	return true
}

func (p *Plugin) IsThirdPartyPlugin() bool {
	return len(p.Creator) != 0
}

func (p *Plugin) CreatorAccAddress() (sdk.AccAddress, error) {
	addr, err := sdk.AccAddressFromBech32(p.Creator)
	if err != nil {
		return nil, fmt.Errorf("failed to convert creator address: %w", err)
	}

	return addr, nil
}
