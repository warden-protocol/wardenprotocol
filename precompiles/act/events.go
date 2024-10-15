package act

import (
	"bytes"
	"fmt"
	"github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	"math/big"
	"reflect"
	"strings"

	sdk "github.com/cosmos/cosmos-sdk/types"
	ethcmn "github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	cmn "github.com/evmos/evmos/v20/precompiles/common"
)

const (
	// EventCreateTemplate defines the event type for the x/act CreateTemplate transaction.
	EventCreateTemplate = "CreateTemplate"
	// EventUpdateTemplate defines the event type for the x/act UpdateTemplate transaction.
	EventUpdateTemplate = "UpdateTemplate"
	// EventActionVoted defines the event type for the x/act VoteForAction transaction.
	EventActionVoted = "ActionVoted"
	// EventCreateAction defines the event type for the x/act NewAction transaction.
	EventCreateAction      = "CreateAction"
	EventActionStateChange = "ActionStateChange"
)

func (p *Precompile) GetCreateTemplateEvent(ctx sdk.Context, writerAddress *ethcmn.Address, sdkEvent sdk.Event) (*ethtypes.Log, error) {
	b, err := parseNewTemplateEvent(sdkEvent)
	if err != nil {
		return nil, err
	}

	topics := make([]ethcmn.Hash, 2)
	event := p.ABI.Events[EventCreateTemplate]
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	topics[1], err = cmn.MakeTopic(*writerAddress)
	if err != nil {
		return nil, err
	}

	ethLog := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &ethLog, nil
}

func parseNewTemplateEvent(sdkEvent sdk.Event) (*bytes.Buffer, error) {
	var b bytes.Buffer

	for _, attr := range sdkEvent.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewTemplateEvent: invalid keychain id type")
			}

			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		}
	}

	return &b, nil
}

func (p *Precompile) GetUpdateTemplateEvent(ctx sdk.Context, writerAddress *ethcmn.Address, sdkEvent sdk.Event) (*ethtypes.Log, error) {
	b, err := parseUpdateTemplateEvent(sdkEvent)
	if err != nil {
		return nil, err
	}

	topics := make([]ethcmn.Hash, 2)
	event := p.ABI.Events[EventUpdateTemplate]
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	topics[1], err = cmn.MakeTopic(*writerAddress)
	if err != nil {
		return nil, err
	}

	ethLog := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &ethLog, nil
}

func parseUpdateTemplateEvent(sdkEvent sdk.Event) (*bytes.Buffer, error) {
	var b bytes.Buffer

	for _, attr := range sdkEvent.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("UpdateTemplateEvent: invalid id type")
			}

			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		}

	}

	return &b, nil
}

func (p *Precompile) GetCreateActionEvent(ctx sdk.Context, writerAddress *ethcmn.Address, sdkEvent sdk.Event) (*ethtypes.Log, error) {
	b, err := parseCreateActionEvent(sdkEvent)
	if err != nil {
		return nil, err
	}

	topics := make([]ethcmn.Hash, 2)
	event := p.ABI.Events[EventCreateAction]
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	topics[1], err = cmn.MakeTopic(*writerAddress)
	if err != nil {
		return nil, err
	}

	ethLog := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &ethLog, nil
}

func parseCreateActionEvent(sdkEvent sdk.Event) (*bytes.Buffer, error) {
	var b bytes.Buffer

	for _, attr := range sdkEvent.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("CreateActionEvent: invalid id type")
			}

			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		}

	}
	return &b, nil
}

func (p *Precompile) GetActionVotedEvent(ctx sdk.Context, writerAddress *ethcmn.Address, sdkEvent sdk.Event) (*ethtypes.Log, error) {
	b, err := parseActionVotedEvent(sdkEvent)
	if err != nil {
		return nil, err
	}

	topics := make([]ethcmn.Hash, 2)
	event := p.ABI.Events[EventActionVoted]
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	topics[1], err = cmn.MakeTopic(*writerAddress)
	if err != nil {
		return nil, err
	}

	ethLog := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &ethLog, nil
}

func parseActionVotedEvent(sdkEvent sdk.Event) (*bytes.Buffer, error) {
	var b bytes.Buffer

	mapVoteType := func(status string) (int32, error) {
		switch status {
		case v1beta1.ActionVoteType_VOTE_TYPE_UNSPECIFIED.String():
			return int32(v1beta1.ActionVoteType_VOTE_TYPE_UNSPECIFIED), nil
		case v1beta1.ActionVoteType_VOTE_TYPE_APPROVED.String():
			return int32(v1beta1.ActionVoteType_VOTE_TYPE_APPROVED), nil
		case v1beta1.ActionVoteType_VOTE_TYPE_REJECTED.String():
			return int32(v1beta1.ActionVoteType_VOTE_TYPE_REJECTED), nil
		default:
			return -1, fmt.Errorf("cannot map action vote type: %v", status)
		}
	}

	for _, attr := range sdkEvent.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("ActionVotedEvent: invalid keychain id type")
			}

			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))

		case "vote_type":
			value, err := mapVoteType(val)
			if err != nil {
				return nil, fmt.Errorf("ActionVotedEvent: invalid vote_type type")
			}

			b.Write(cmn.PackNum(reflect.ValueOf(value)))
		}

	}
	return &b, nil
}

func (p *Precompile) GetActionStateChangeEvent(ctx sdk.Context, writerAddress *ethcmn.Address, sdkEvent sdk.Event) (*ethtypes.Log, error) {
	b, err := parseActionStateChangeEvent(sdkEvent)
	if err != nil {
		return nil, err
	}

	topics := make([]ethcmn.Hash, 2)
	event := p.ABI.Events[EventActionStateChange]
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	topics[1], err = cmn.MakeTopic(*writerAddress)
	if err != nil {
		return nil, err
	}

	ethLog := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &ethLog, nil
}

func parseActionStateChangeEvent(sdkEvent sdk.Event) (*bytes.Buffer, error) {
	var b bytes.Buffer

	mapActionStatus := func(status string) (int32, error) {
		switch status {
		case v1beta1.ActionStatus_ACTION_STATUS_UNSPECIFIED.String():
			return int32(v1beta1.ActionStatus_ACTION_STATUS_UNSPECIFIED), nil
		case v1beta1.ActionStatus_ACTION_STATUS_PENDING.String():
			return int32(v1beta1.ActionStatus_ACTION_STATUS_PENDING), nil
		case v1beta1.ActionStatus_ACTION_STATUS_COMPLETED.String():
			return int32(v1beta1.ActionStatus_ACTION_STATUS_COMPLETED), nil
		case v1beta1.ActionStatus_ACTION_STATUS_REVOKED.String():
			return int32(v1beta1.ActionStatus_ACTION_STATUS_REVOKED), nil
		case v1beta1.ActionStatus_ACTION_STATUS_TIMEOUT.String():
			return int32(v1beta1.ActionStatus_ACTION_STATUS_TIMEOUT), nil
		default:
			return -1, fmt.Errorf("cannot map action status: %v", status)
		}
	}

	for _, attr := range sdkEvent.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			value, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("ActionStateChangeEvent: invalid id type")
			}

			b.Write(cmn.PackNum(reflect.ValueOf(value)))
		case "previous_status":
			value, err := mapActionStatus(val)
			if err != nil {
				return nil, fmt.Errorf("ActionStateChangeEvent: invalid previous_status type")
			}

			b.Write(cmn.PackNum(reflect.ValueOf(value)))
		case "new_status":
			value, err := mapActionStatus(val)
			if err != nil {
				return nil, fmt.Errorf("ActionStateChangeEvent: invalid new_status type")
			}

			b.Write(cmn.PackNum(reflect.ValueOf(value)))
		}

	}

	return &b, nil
}