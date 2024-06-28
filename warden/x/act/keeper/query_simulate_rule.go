package keeper

import (
	"context"
	"fmt"

	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/shield/object"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) SimulateRule(goCtx context.Context, req *types.QuerySimulateRuleRequest) (*types.QuerySimulateRuleResponse, error) {
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

	return &types.QuerySimulateRuleResponse{
		Evaluation: evaluated.Inspect(),
	}, nil
}
