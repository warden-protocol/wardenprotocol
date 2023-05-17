package keeper

import (
	"context"

	"blackbird/x/blackbird/types"
	// sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/edmund/blackbird/verifier/golang/simple"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"strconv"
	"strings"
)

func (k Keeper) Verify(goCtx context.Context, req *types.QueryVerifyRequest) (*types.QueryVerifyResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	// ctx := sdk.UnwrapSDKContext(goCtx)
	// _ = ctx

	oracleMap := make(map[string]bool)
	for i, v := range strings.Split(req.Payload, ",") {
		if v == "1" {
			oracleMap[strconv.Itoa(i)] = true
		} else {
			oracleMap[strconv.Itoa(i)] = false
		}
	}

	if err := simple.Verify([]byte(req.Policy), nil, nil, nil, oracleMap); err != nil {
		return nil, err
	}

	return &types.QueryVerifyResponse{Result: true}, nil
}
