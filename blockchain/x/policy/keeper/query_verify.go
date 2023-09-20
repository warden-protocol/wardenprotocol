package keeper

import (
	"context"
	"fmt"

	// "strconv"
	"strings"

	wasmvmtypes "github.com/CosmWasm/wasmvm/types"
	"github.com/qredo/fusionchain/x/policy/types"
	"gitlab.qredo.com/edmund/blackbird/verifier/golang/simple"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type VerificationError struct {
	Kind string `json:"kind,omitempty"`
}

func (e VerificationError) Error() string {
	return fmt.Sprintf("blackbird verification error: %s", e.Kind)
}

func (Keeper) Verify(_ context.Context, req *types.QueryVerifyRequest) (*types.QueryVerifyResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	oracleMap := make(map[string]bool)
	for _, v := range strings.Split(req.Payload, ",") {
		oracleMap[strings.Split(v, ":")[0]] = strings.Split(v, ":")[1] == "1"
	}

	if err := simple.Verify([]byte(req.Policy), nil, nil, nil, oracleMap); err != nil {
		return nil, wasmvmtypes.UnsupportedRequest{Kind: "payload does not meet policy requirements for verification."}
	}

	return &types.QueryVerifyResponse{Result: true}, nil
}
