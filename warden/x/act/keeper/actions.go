package keeper

import (
	"context"
	"fmt"
	"reflect"
	"runtime/debug"

	"cosmossdk.io/errors"
	"github.com/cosmos/cosmos-sdk/baseapp"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
	"github.com/warden-protocol/wardenprotocol/shield/object"
	"github.com/warden-protocol/wardenprotocol/warden/x/act/cosmoshield"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

// ActionApprovedVotesEnv is an environment that resolves action positive votes addresses to true.
type ActionApprovedVotesEnv []*types.ActionVote

// Get implements positive action vote evaluator.Environment.
func (votes ActionApprovedVotesEnv) Get(name string) (object.Object, bool) {
	for _, s := range votes {
		if s.Participant == name && s.VoteType == types.ActionVoteType_VOTE_TYPE_APPROVED {
			return object.TRUE, true
		}
	}

	return object.FALSE, true
}

// ActionRejectedVotesEnv is an environment that resolves action negative votes addresses to true.
type ActionRejectedVotesEnv []*types.ActionVote

// Get implements negative action vote evaluator.Environment.
func (votes ActionRejectedVotesEnv) Get(name string) (object.Object, bool) {
	for _, s := range votes {
		if s.Participant == name && s.VoteType == types.ActionVoteType_VOTE_TYPE_REJECTED {
			return object.TRUE, true
		}
	}

	return object.FALSE, true
}

// TryExecuteVotedAction checks if the action's expression is satisfied and stores the
// result in the database.
func (k Keeper) TryExecuteVotedAction(ctx context.Context, act *types.Action) error {
	actExpression := types.ActExpression(act.ApproveExpression)

	approved, err := actExpression.EvalExpression(ctx, ActionApprovedVotesEnv(act.Votes))
	if err != nil {
		return err
	}

	if approved {
		return k.executeAction(ctx, act)
	}

	return nil
}

// TryRejectVotedAction checks if the action's reject expression is satisfied and updates its
// status revoked.
func (k Keeper) TryRejectVotedAction(ctx context.Context, act *types.Action) error {
	sdkCtx := sdk.UnwrapSDKContext(ctx)

	actExpression := types.ActExpression(act.RejectExpression)

	rejected, err := actExpression.EvalExpression(ctx, ActionRejectedVotesEnv(act.Votes))
	if err != nil {
		return err
	}

	if rejected {
		if err := act.SetStatus(sdkCtx, types.ActionStatus_ACTION_STATUS_REVOKED); err != nil {
			return err
		}

		if err := k.ActionKeeper.Set(ctx, *act); err != nil {
			return err
		}
	}

	return nil
}

func (k Keeper) executeAction(ctx context.Context, act *types.Action) error {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	cacheCtx, writeCache := prepareHandlerContext(sdkCtx, act.Creator)

	var msg sdk.Msg

	err := k.cdc.UnpackAny(act.Msg, &msg)
	if err != nil {
		return errors.Wrapf(types.ErrInvalidActionMsg, "unpacking Msg: %v", err)
	}

	handler := k.router.Handler(msg)
	if handler == nil {
		return errors.Wrapf(types.ErrNoActionMsgHandler, "%s", sdk.MsgTypeURL(msg))
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
			return err
		}

		return nil
	}

	// persist message execution
	writeCache()

	// propagate the msg events to the current context
	sdkCtx.EventManager().EmitEvents(res.GetEvents())

	if err := act.SetResult(sdkCtx, res.MsgResponses[0]); err != nil {
		return err
	}

	if err := k.ActionKeeper.Set(ctx, *act); err != nil {
		return err
	}

	return nil
}

// safeExecuteHandler executes handler(ctx, msg) and recovers from panic.
func safeExecuteHandler(ctx sdk.Context, msg sdk.Msg, handler baseapp.MsgServiceHandler,
) (res *sdk.Result, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf(
				"handling x/act action msg [%s] PANICKED: %v\n%s",
				msg,
				r,
				string(debug.Stack()),
			)
		}
	}()

	res, err = handler(ctx, msg)

	return res, err
}

func prepareHandlerContext(ctx sdk.Context, actionCreator string) (sdk.Context, func()) {
	return ctxWithActionCreator(ctx, actionCreator).CacheContext()
}

func ctxWithActionCreator(ctx sdk.Context, actionCreator string) sdk.Context {
	return ctx.WithValue(actionCreatorKey{}, actionCreator)
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
//
// nolint:contextcheck // cosmoshield triggers the linter
func (k Keeper) AddAction(
	ctx context.Context,
	creator string,
	msg sdk.Msg,
	timeoutHeight uint64,
	expectedApproveExpression *ast.Expression,
	expectedRejectExpression *ast.Expression,
) (*types.Action, error) {
	if err := k.validateActionMsgSigners(msg); err != nil {
		return nil, err
	}

	ctx = ctxWithActionCreator(sdk.UnwrapSDKContext(ctx), creator)

	ctx, approveTemplate, rejectTemplate, err := k.templatesRegistry.Get(ctx, msg)
	if err != nil {
		return nil, errors.Wrapf(types.ErrNoTemplateRegistryHandler, "%v", err)
	}

	if !reflect.DeepEqual(approveTemplate.Expression, expectedApproveExpression) {
		return nil, types.ErrApproveExpressionNotMatched
	}

	if !reflect.DeepEqual(rejectTemplate.Expression, expectedRejectExpression) {
		return nil, types.ErrRejectExpressionNotMatched
	}

	wrappedMsg, err := codectypes.NewAnyWithValue(msg)
	if err != nil {
		return nil, err
	}

	ctxWithMsg := cosmoshield.NewContext(ctx, msg)

	preprocessedApproveExpr, approveMentions, err := k.preprocessTemplate(
		ctxWithMsg,
		approveTemplate,
	)
	if err != nil {
		return nil, err
	}

	preprocessedRejectExpr, rejectMentions, err := k.preprocessTemplate(ctxWithMsg, rejectTemplate)
	if err != nil {
		return nil, err
	}

	mentions := mergeMentions(approveMentions, rejectMentions)

	// create action object
	timestamp := k.getBlockTime(ctx)
	act := &types.Action{
		Status:            types.ActionStatus_ACTION_STATUS_PENDING,
		Mentions:          mentions,
		Msg:               wrappedMsg,
		Creator:           creator,
		TimeoutHeight:     timeoutHeight,
		CreatedAt:         timestamp,
		UpdatedAt:         timestamp,
		ApproveExpression: *preprocessedApproveExpr,
		RejectExpression:  *preprocessedRejectExpr,
	}

	// add initial approver
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := act.AddOrUpdateVote(sdkCtx, creator, types.ActionVoteType_VOTE_TYPE_APPROVED); err != nil {
		return nil, err
	}

	// persist action
	if _, err := k.ActionKeeper.New(ctx, act); err != nil {
		return nil, err
	}

	// try executing the action immediately
	if err := k.TryExecuteVotedAction(ctx, act); err != nil {
		return nil, err
	}

	return act, nil
}

// assert that the x/act module account is the only signer of the message.
func (k Keeper) validateActionMsgSigners(msg sdk.Msg) error {
	signers, _, err := k.cdc.GetMsgV1Signers(msg)
	if err != nil {
		return err
	}

	if len(signers) != 1 {
		return types.ErrInvalidSigner
	}

	if sdk.AccAddress(signers[0]).String() != k.GetModuleAddress() {
		return errors.Wrapf(types.ErrInvalidActionMsgSigner, "%s", sdk.AccAddress(signers[0]).String())
	}

	return nil
}

func mergeMentions(approveMentions []string, rejectMentions []string) []string {
	mentions := approveMentions

	approveMentionsSet := make(map[string]struct{})

	for _, approveMention := range approveMentions {
		approveMentionsSet[approveMention] = struct{}{}
	}

	for _, rejectMention := range rejectMentions {
		_, exists := approveMentionsSet[rejectMention]
		if !exists {
			mentions = append(mentions, rejectMention)
		}
	}

	return mentions
}
