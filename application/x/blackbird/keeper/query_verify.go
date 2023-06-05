package keeper

import (
	"context"

	wasmvmtypes "github.com/CosmWasm/wasmvm/types"
	"gitlab.qredo.com/edmund/blackbird/verifier/golang/simple"
	"gitlab.qredo.com/qrdochain/fusionchain/x/blackbird/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"strconv"
	"strings"
)

func (k Keeper) Verify(goCtx context.Context, req *types.QueryVerifyRequest) (*types.QueryVerifyResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	oracleMap := make(map[string]bool)
	for i, v := range strings.Split(req.Payload, ",") {
		if v == "1" {
			oracleMap[strconv.Itoa(i)] = true
		} else {
			oracleMap[strconv.Itoa(i)] = false
		}
	}

	if err := simple.Verify([]byte(req.Policy), nil, nil, nil, oracleMap); err != nil {
		return nil, wasmvmtypes.UnsupportedRequest{Kind: "Payload does not meet policy requirements for verification."}
	}

	return &types.QueryVerifyResponse{Result: true}, nil
}
