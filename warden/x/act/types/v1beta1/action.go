package v1beta1

import (
	"time"

	"cosmossdk.io/errors"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func NewVote(participant string, voteType ActionVoteType, timestamp time.Time) *ActionVote {
	return &ActionVote{
		Participant: participant,
		VotedAt:     timestamp,
		VoteType:    voteType,
	}
}

func (a *Action) SetId(id uint64) { a.Id = id }

func (a *Action) SetResult(ctx sdk.Context, result *codectypes.Any) error {
	if err := a.SetStatus(ctx, ActionStatus_ACTION_STATUS_COMPLETED); err != nil {
		return err
	}

	a.Result = result

	return nil
}

func (a *Action) SetStatus(ctx sdk.Context, status ActionStatus) error {
	if a.Status != ActionStatus_ACTION_STATUS_PENDING {
		return errors.Wrapf(ErrInvalidActionStatusChange, "from %s to %s", a.Status.String(), status.String())
	}

	prevStatus := a.Status
	a.Status = status
	a.UpdatedAt = ctx.BlockTime()

	return ctx.EventManager().EmitTypedEvent(&EventActionStateChange{
		Id:             a.Id,
		PreviousStatus: prevStatus,
		NewStatus:      status,
	})
}

func (a *Action) AddOrUpdateVote(ctx sdk.Context, participant string, voteType ActionVoteType) error {
	if a.Status != ActionStatus_ACTION_STATUS_PENDING {
		return errors.Wrapf(ErrInvalidActionStatus, "can't add a vote to an action that's not pending")
	}

	updated := false

	for i, v := range a.Votes {
		if v.Participant == participant {
			a.Votes[i].VoteType = voteType
			a.Votes[i].VotedAt = ctx.BlockTime()
			updated = true

			break
		}
	}

	if !updated {
		a.Votes = append(a.Votes, NewVote(participant, voteType, ctx.BlockTime()))
	}

	a.UpdatedAt = ctx.BlockTime()

	if err := ctx.EventManager().EmitTypedEvent(&EventActionVoted{
		Id:          a.Id,
		Participant: participant,
		VoteType:    voteType,
	}); err != nil {
		return err
	}

	return nil
}
