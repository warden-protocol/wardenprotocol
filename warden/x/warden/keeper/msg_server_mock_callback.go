package keeper

import (
	"context"
	"encoding/json"
	"fmt"

	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

type FutureMessages struct {
	FutureReady FutureReady `json:"future_ready"`
}

type FutureReady struct {
	Output []byte `json:"output"`
}

func (k msgServer) MockCallback(goCtx context.Context, msg *types.MsgMockCallback) (*types.MsgMockCallbackResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	wasmKeeper := wasmkeeper.NewDefaultPermissionKeeper(k.getWasmKeeper())

	callbackMsg := FutureMessages{
		FutureReady: FutureReady{
			Output: msg.CallbackOutput,
		},
	}
	j, err := json.Marshal(callbackMsg)
	if err != nil {
		return nil, fmt.Errorf("marshalling callback message: %w", err)
	}

	_, err = wasmKeeper.Execute(
		ctx,
		sdk.MustAccAddressFromBech32(msg.Creator),
		k.wardenAuthority,
		j,
		nil,
	)
	if err != nil {
		return nil, fmt.Errorf("executing contract: %w", err)
	}

	return &types.MsgMockCallbackResponse{}, nil
}
