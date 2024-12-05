package comet

import (
	"context"

	comethttp "github.com/cometbft/cometbft/rpc/client/http"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type C struct {
	cc *comethttp.HTTP
}

func New(endpoint string) (*C, error) {
	cc, err := comethttp.New(endpoint, "/websocket")
	return &C{cc: cc}, err
}

func (c *C) ValidatorAddress() (string, error) {
	status, err := c.cc.Status(context.TODO())
	if err != nil {
		return "", err
	}
	return sdk.ConsAddress(status.ValidatorInfo.Address).String(), nil
}
