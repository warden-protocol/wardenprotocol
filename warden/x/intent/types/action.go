package types

import (
	"fmt"
	time "time"

	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
)

func NewApprover(address string, timestamp time.Time) *Approver {
	return &Approver{
		Address:    address,
		ApprovedAt: timestamp,
	}
}

func (a *Action) SetId(id uint64) { a.Id = id }

func (a *Action) SetResult(result *codectypes.Any) error {
	if a.Status != ActionStatus_ACTION_STATUS_PENDING {
		return fmt.Errorf("cannot set result of action in status: %s", a.Status.String())
	}

	a.Status = ActionStatus_ACTION_STATUS_COMPLETED
	a.Result = result
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
