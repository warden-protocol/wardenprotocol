package v1beta1

import (
	fmt "fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (p *Plugin) CreatorAccAddress() (sdk.AccAddress, error) {
	addr, err := sdk.AccAddressFromBech32(p.Creator)
	if err != nil {
		return nil, fmt.Errorf("failed to convert creator address: %w", err)
	}

	return addr, nil
}
