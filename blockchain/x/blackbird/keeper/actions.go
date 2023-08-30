package keeper

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/policy"
	"github.com/qredo/fusionchain/x/blackbird/types"
)

// RegisterActionHandler registers a handler for a specific action type.
// The handler function is called when the action is executed.
func RegisterActionHandler[ResT any](k *Keeper, actionType string, handlerFn func(sdk.Context, *types.Action) (ResT, error)) {
	if _, ok := k.actionHandlers[actionType]; ok {
		// To be safe and prevent mistakes we shouldn't allow to register
		// multiple handlers for the same action type.
		// However, in the current implementation of Cosmos SDK, this is called
		// twice so we'll ignore the second call.

		// panic(fmt.Sprintf("action handler already registered for %s", actionType))
		return
	}
	k.actionHandlers[actionType] = func(ctx sdk.Context, a *types.Action) (any, error) {
		return handlerFn(ctx, a)
	}
}

// TryExecuteAction uses the provided policy function to determine what is the
// policy currently being applied for the action's message.
// If the policy is satisfied, the provided handler function is executed and
// its response returned. If the policy is still not satisfied, nil is returned.
//
// This function should be called:
// - after an action is created
// - every time there is a change in the approvers set
func TryExecuteAction[ReqT sdk.Msg, ResT any](
	k *Keeper,
	cdc codec.BinaryCodec,
	ctx sdk.Context,
	act *types.Action,
	policyFn func(sdk.Context, ReqT) (policy.Policy, error),
	handlerFn func(sdk.Context, ReqT) (*ResT, error),
) (*ResT, error) {
	var m sdk.Msg
	err := cdc.UnpackAny(act.Msg, &m)
	if err != nil {
		return nil, err
	}

	msg, ok := m.(ReqT)
	if !ok {
		return nil, fmt.Errorf("invalid message type, expected %T", new(ReqT))
	}

	pol, err := policyFn(ctx, msg)
	if err != nil {
		return nil, err
	}

	signersSet := policy.BuildApproverSet(act.Approvers)

	// Execute action if policy is satified
	if err := pol.Verify(signersSet); err == nil {
		act.Completed = true
		k.SetAction(ctx, act)
		return handlerFn(ctx, msg)
	}

	return nil, nil
}

// AddAction creates a new action for the provided message with initial approvers.
// Who calls this function should also immediately check if the action can be
// executed with the provided initialApprovers.
func (k Keeper) AddAction(ctx sdk.Context, msg sdk.Msg, initialApprovers ...string) (*types.Action, error) {
	wrappedMsg, err := codectypes.NewAnyWithValue(msg)
	if err != nil {
		return nil, err
	}
	act := types.Action{
		Approvers: initialApprovers,
		Msg:       wrappedMsg,
	}
	k.AppendAction(ctx, &act)
	return &act, nil
}

func (k Keeper) GetActionCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.ActionCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetActionCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.ActionCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteKey, bz)
}

func (k Keeper) GetAction(ctx sdk.Context, actionType string, id uint64) (types.Action, bool) {
	store := k.actionStore(ctx, actionType)
	byteKey := sdk.Uint64ToBigEndian(id)
	bz := store.Get(byteKey)
	if bz == nil {
		return types.Action{}, false
	}
	var action types.Action
	k.cdc.MustUnmarshal(bz, &action)
	return action, true
}

func (k Keeper) AppendAction(ctx sdk.Context, act *types.Action) uint64 {
	count := k.GetActionCount(ctx)
	act.Id = count
	k.SetAction(ctx, act)
	k.SetActionCount(ctx, count+1)
	return count
}

func (k Keeper) SetAction(ctx sdk.Context, action *types.Action) {
	store := k.actionStore(ctx, action.Msg.TypeUrl)
	newValue := k.cdc.MustMarshal(action)
	store.Set(sdk.Uint64ToBigEndian(action.Id), newValue)
}

func (k Keeper) actionStore(ctx sdk.Context, actionType string) prefix.Store {
	actionStore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ActionKey))
	store := prefix.NewStore(actionStore, types.KeyPrefix(actionType+"/"))
	return store
}
