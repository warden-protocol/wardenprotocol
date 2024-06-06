package keeper

import (
	"context"
	"fmt"

	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/shield/object"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) SimulateIntent(goCtx context.Context, req *types.QuerySimulateIntentRequest) (*types.QuerySimulateIntentResponse, error) {
	expr, err := shield.Parse(req.Definition)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, fmt.Sprintf("Failed to parse input definition: %s", err))
	}

	evaluated := shield.Eval(expr, nil)
	if evaluated == nil {
		return nil, status.Error(codes.InvalidArgument, "Failed to evaluate parsed definition")
	} else if evaluated.Type() == object.ERROR_OBJ {
		return nil, status.Error(codes.InvalidArgument, evaluated.Inspect())
	}

	return &types.QuerySimulateIntentResponse{
		Evaluation: evaluated.Inspect(),
	}, nil
}
