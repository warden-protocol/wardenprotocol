package keeper

import (
	"context"
	"fmt"
	"runtime/debug"

	errorsmod "cosmossdk.io/errors"
	"github.com/cosmos/cosmos-sdk/baseapp"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/shield/object"
	"github.com/warden-protocol/wardenprotocol/warden/x/act/cosmoshield"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

// ApproversEnv is an environment that resolves approvers' addresses to true.
type ApproversEnv []*types.Approver

// Get implements evaluator.Environment.
func (approvers ApproversEnv) Get(name string) (object.Object, bool) {
	for _, s := range approvers {
		if s.Address == name {
			return object.TRUE, true
		}
	}
	return object.FALSE, true
}

var _ shield.Environment = ApproversEnv{}

// TryExecuteAction checks if the action's intent is satisfied and stores the
// result in the database.
func (k Keeper) TryExecuteAction(ctx context.Context, act *types.Action) error {
	ready, err := k.checkActionReady(ctx, *act)
	if err != nil {
		return err
	}

	if ready {
		if err := k.executeAction(ctx, act); err != nil {
			return err
		}
	}

	return nil
}

func (k Keeper) checkActionReady(ctx context.Context, act types.Action) (bool, error) {
	return act.Rule.Eval(ctx, ApproversEnv(act.Approvers))
}

func (k Keeper) executeAction(ctx context.Context, act *types.Action) error {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	cacheCtx, writeCache := prepareHandlerContext(sdkCtx, act.Creator)

	var msg sdk.Msg
	err := k.cdc.UnpackAny(act.Msg, &msg)
	if err != nil {
		return fmt.Errorf("unpacking Action.Msg: %w", err)
	}

	defer telemetry.MeasureSince(telemetry.Now(), sdk.MsgTypeURL(msg))

	handler := k.router.Handler(msg)
	if handler == nil {
		return fmt.Errorf("no handler registered for %s", sdk.MsgTypeURL(msg))
	}

	var res *sdk.Result
	res, err = safeExecuteHandler(cacheCtx, msg, handler)
	if err != nil {
		// set action failed
		sdkCtx.Logger().Error("action execution failed", "action_id", act.Id, "err", err)
		if err := act.SetStatus(sdkCtx, types.ActionStatus_ACTION_STATUS_REVOKED); err != nil {
			return err
		}
		if err := k.ActionKeeper.Set(ctx, *act); err != nil {
			return fmt.Errorf("persisting updated action: %w", err)
		}
		return nil
	}

	// persist message execution
	writeCache()

	// propagate the msg events to the current context
	sdkCtx.EventManager().EmitEvents(res.GetEvents())

	if err := act.SetResult(sdkCtx, res.MsgResponses[0]); err != nil {
		return fmt.Errorf("updating Action.Result: %w", err)
	}

	if err := k.ActionKeeper.Set(ctx, *act); err != nil {
		return fmt.Errorf("persisting updated action: %w", err)
	}

	return nil
}

// safeExecuteHandler executes handler(ctx, msg) and recovers from panic.
func safeExecuteHandler(ctx sdk.Context, msg sdk.Msg, handler baseapp.MsgServiceHandler,
) (res *sdk.Result, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("handling x/act action msg [%s] PANICKED: %v\n%s", msg, r, string(debug.Stack()))
		}
	}()
	res, err = handler(ctx, msg)
	return
}

func prepareHandlerContext(ctx sdk.Context, actionCreator string) (sdk.Context, func()) {
	return sdk.UnwrapSDKContext(ctxWithActionCreator(ctx, actionCreator)).CacheContext()
}

func ctxWithActionCreator(ctx context.Context, actionCreator string) context.Context {
	return context.WithValue(ctx, actionCreatorKey{}, actionCreator)
}

// GetActionCreator returns the original address of the creator of the Action.
// This function is intended to be used in the context of MsgHandlers being
// executed as part of an Action.
func (k Keeper) GetActionCreator(ctx context.Context) string {
	s, ok := ctx.Value(actionCreatorKey{}).(string)
	if !ok {
		return ""
	}
	return s
}

type actionCreatorKey struct{}

// AddAction creates a new action.
// The action is created with the provided creator as the first approver.
// This function also tries to execute the action immediately if it's ready.
func (k Keeper) AddAction(ctx context.Context, creator string, msg sdk.Msg, timeoutHeight uint64) (*types.Action, error) {
	if err := k.validateActionMsgSigners(msg); err != nil {
		return nil, err
	}

	ctx = ctxWithActionCreator(ctx, creator)
	ctx, rule, err := k.rulesRegistry.Get(ctx, msg)
	if err != nil {
		return nil, fmt.Errorf("can't get intent for message: %w", err)
	}

	wrappedMsg, err := codectypes.NewAnyWithValue(msg)
	if err != nil {
		return nil, err
	}

	ctxWithMsg := cosmoshield.NewContext(ctx, msg)
	preprocessedExpr, mentions, err := k.preprocessRule(ctxWithMsg, rule)
	if err != nil {
		return nil, err
	}

	// update the rule of this Action with the preprocessed expression
	rule.Expression = preprocessedExpr

	// create action object
	timestamp := k.getBlockTime(ctx)
	act := &types.Action{
		Status:        types.ActionStatus_ACTION_STATUS_PENDING,
		Approvers:     nil,
		Rule:          rule,
		Mentions:      mentions,
		Msg:           wrappedMsg,
		Creator:       creator,
		TimeoutHeight: timeoutHeight,
		CreatedAt:     timestamp,
		UpdatedAt:     timestamp,
	}

	// add initial approver
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := act.AddApprover(sdkCtx, creator); err != nil {
		return nil, err
	}

	// persist action
	if _, err := k.ActionKeeper.New(ctx, act); err != nil {
		return nil, err
	}

	telemetry.IncrCounter(1, "action", "count")

	// try executing the action immediately
	if err := k.TryExecuteAction(ctx, act); err != nil {
		return nil, err
	}

	return act, nil
}

// assert that the x/act module account is the only signer of the message
func (k Keeper) validateActionMsgSigners(msg sdk.Msg) error {
	signers, _, err := k.cdc.GetMsgV1Signers(msg)
	if err != nil {
		return err
	}
	if len(signers) != 1 {
		return types.ErrInvalidSigner
	}

	if sdk.AccAddress(signers[0]).String() != k.GetModuleAddress() {
		return errorsmod.Wrapf(types.ErrInvalidActionMsgSigner, sdk.AccAddress(signers[0]).String())
	}

	return nil
}
