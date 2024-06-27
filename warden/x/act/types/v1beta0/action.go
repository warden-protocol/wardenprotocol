package v1beta0

import (
	"fmt"
	time "time"

	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	proto "github.com/cosmos/gogoproto/proto"
)

func NewMsgActionCreated(act *Action) *MsgActionCreated {
	return &MsgActionCreated{
		Action: act,
	}
}

func NewApprover(address string, timestamp time.Time) *Approver {
	return &Approver{
		Address:    address,
		ApprovedAt: timestamp,
	}
}

func (a *Action) SetId(id uint64) { a.Id = id }

func (a *Action) SetResult(result proto.Message) error {
	if a.Status != ActionStatus_ACTION_STATUS_PENDING {
		return fmt.Errorf("cannot set result of action in status: %s", a.Status.String())
	}

	anyV, err := codectypes.NewAnyWithValue(result)
	if err != nil {
		return err
	}

	a.Status = ActionStatus_ACTION_STATUS_COMPLETED
	a.Result = anyV
	return nil
}

func (a *Action) AddApprover(address string, timestamp time.Time) error {
	if a.Status != ActionStatus_ACTION_STATUS_PENDING {
		return fmt.Errorf("action already completed")
	}

	for _, a := range a.Approvers {
		if a.Address == address {
			return fmt.Errorf("approver already added")
		}
	}

	a.Approvers = append(a.Approvers, NewApprover(address, timestamp))
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
