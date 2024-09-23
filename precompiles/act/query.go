package act

import (
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/core/vm"
	cmn "github.com/evmos/evmos/v18/precompiles/common"
	actmodulekeeper "github.com/warden-protocol/wardenprotocol/warden/x/act/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

const (
	ActionByIdQuery       = "actionById"
	ActionsQuery          = "actions"
	ActionsByAddressQuery = "actionsByAddress"
	TemplateByIdQuery     = "templateById"
	TemplatesQuery        = "templates"
)

func (p Precompile) ActionByIdQuery(
	ctx sdk.Context,
	_ *vm.Contract,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := actmodulekeeper.NewQueryServerImpl(p.actmodulekeeper)

	req, err := newActionByIdQuery(args)
	if err != nil {
		return nil, err
	}

	res, err := queryServer.ActionById(ctx, req)
	if err != nil {
		return nil, err
	}

	out := new(ActionByIdResponse).FromResponse(res)

	return method.Outputs.Pack(out)
}

func newActionByIdQuery(args []interface{}) (*types.QueryActionByIdRequest, error) {
	if len(args) != 1 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 1, len(args))
	}

	actionId := args[0].(uint64)

	return &types.QueryActionByIdRequest{
		Id: actionId,
	}, nil
}
