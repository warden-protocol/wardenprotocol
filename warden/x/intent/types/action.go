package types

import (
	"fmt"
	time "time"

	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func NewApprover(address string, timestamp time.Time) *Approver {
	return &Approver{
		Address:    address,
		ApprovedAt: timestamp,
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
		return fmt.Errorf("cannot set result of action in status: %s", a.Status.String())
	}
	prevStatus := a.Status
	a.Status = status
	return ctx.EventManager().EmitTypedEvent(&EventActionStateChange{
		Id:             a.Id,
		PreviousStatus: prevStatus,
		NewStatus:      status,
	})
}

func (a *Action) AddApprover(ctx sdk.Context, address string, timestamp time.Time) error {
	if a.Status != ActionStatus_ACTION_STATUS_PENDING {
		return fmt.Errorf("action already completed")
	}

	for _, a := range a.Approvers {
		if a.Address == address {
			return fmt.Errorf("approver already added")
		}
	}

	a.Approvers = append(a.Approvers, NewApprover(address, timestamp))

	if err := ctx.EventManager().EmitTypedEvent(&EventApproveAction{
		Id:       a.Id,
		Approver: address,
	}); err != nil {
		return err
	}

	return nil
}

func GetActionMessage[Msg sdk.Msg](cdc codectypes.AnyUnpacker, a Action) (Msg, error) {
	var (
		msg      sdk.Msg
		emptyMsg Msg
	)
	if err := cdc.UnpackAny(a.Msg, &msg); err != nil {
		return emptyMsg, err
	}

	castedMsg, ok := msg.(Msg)
	if !ok {
		return emptyMsg, fmt.Errorf("incorrect message type: %T", castedMsg)
	}

	return castedMsg, nil
}
