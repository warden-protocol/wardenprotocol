package act

import (
	"bytes"
	"errors"
	"reflect"

	sdk "github.com/cosmos/cosmos-sdk/types"
	cmn "github.com/cosmos/evm/precompiles/common"
	ethcmn "github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"

	"github.com/warden-protocol/wardenprotocol/precompiles/common"
	"github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

const (
	// EventCreateTemplate defines the event type for the x/act CreateTemplate transaction.
	EventCreateTemplate = "CreateTemplate"
	// EventUpdateTemplate defines the event type for the x/act UpdateTemplate transaction.
	EventUpdateTemplate = "UpdateTemplate"
	// EventActionVoted defines the event type for the x/act VoteForAction transaction.
	EventActionVoted = "ActionVoted"
	// EventCreateAction defines the event type for the x/act NewAction transaction.
	EventCreateAction = "CreateAction"
	// EventActionStateChange defines the event type for the x/act action status change.
	EventActionStateChange = "ActionStateChange"
)

// Map EventCreateTemplate to eth CreateTemplate event and write to eth log.
func (p *Precompile) GetCreateTemplateEvent(ctx sdk.Context, writerAddress *ethcmn.Address, sdkEvent sdk.Event) (*ethtypes.Log, error) {
	b, err := parseCreateTemplateEvent(sdkEvent)
	if err != nil {
		return nil, err
	}

	if writerAddress == nil {
		return nil, errors.New("writerAddress is nil")
	}

	topics := make([]ethcmn.Hash, 2)
	event := p.Events[EventCreateTemplate]
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

func parseCreateTemplateEvent(sdkEvent sdk.Event) (*bytes.Buffer, error) {
	var b bytes.Buffer

	typedEvent := v1beta1.EventCreateTemplate{}

	err := common.ParseSdkEventDeprecated(sdkEvent, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}

	b.Write(cmn.PackNum(reflect.ValueOf(typedEvent.Id)))

	return &b, nil
}

// Map EventUpdateTemplate to eth UpdateTemplate event and write to eth log.
func (p *Precompile) GetUpdateTemplateEvent(ctx sdk.Context, writerAddress *ethcmn.Address, sdkEvent sdk.Event) (*ethtypes.Log, error) {
	b, err := parseUpdateTemplateEvent(sdkEvent)
	if err != nil {
		return nil, err
	}

	if writerAddress == nil {
		return nil, errors.New("writerAddress is nil")
	}

	topics := make([]ethcmn.Hash, 2)
	event := p.Events[EventUpdateTemplate]
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

	typedEvent := v1beta1.EventUpdateTemplate{}

	err := common.ParseSdkEventDeprecated(sdkEvent, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}

	b.Write(cmn.PackNum(reflect.ValueOf(typedEvent.Id)))

	return &b, nil
}

// Map EventCreateAction to eth CreateAction event and write to eth log.
func (p *Precompile) GetCreateActionEvent(ctx sdk.Context, writerAddress *ethcmn.Address, sdkEvent sdk.Event) (*ethtypes.Log, error) {
	b, err := parseCreateActionEvent(sdkEvent)
	if err != nil {
		return nil, err
	}

	if writerAddress == nil {
		return nil, errors.New("writerAddress is nil")
	}

	topics := make([]ethcmn.Hash, 2)
	event := p.Events[EventCreateAction]
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

	typedEvent := v1beta1.EventCreateAction{}

	err := common.ParseSdkEventDeprecated(sdkEvent, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}

	b.Write(cmn.PackNum(reflect.ValueOf(typedEvent.Id)))

	return &b, nil
}

// Map EventActionVoted to eth ActionVoted event and write to eth log.
func (p *Precompile) GetActionVotedEvent(ctx sdk.Context, writerAddress *ethcmn.Address, sdkEvent sdk.Event) (*ethtypes.Log, error) {
	b, err := parseActionVotedEvent(sdkEvent)
	if err != nil {
		return nil, err
	}

	if writerAddress == nil {
		return nil, errors.New("writerAddress is nil")
	}

	topics := make([]ethcmn.Hash, 2)
	event := p.Events[EventActionVoted]
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

	typedEvent := v1beta1.EventActionVoted{}

	err := common.ParseSdkEventDeprecated(sdkEvent, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}

	b.Write(cmn.PackNum(reflect.ValueOf(typedEvent.Id)))
	b.Write(cmn.PackNum(reflect.ValueOf(typedEvent.VoteType)))

	return &b, nil
}

// Map EventActionStateChange to eth ActionStateChange event and write to eth log.
func (p *Precompile) GetActionStateChangeEvent(ctx sdk.Context, writerAddress *ethcmn.Address, sdkEvent sdk.Event) (*ethtypes.Log, error) {
	b, err := parseActionStateChangeEvent(sdkEvent)
	if err != nil {
		return nil, err
	}

	if writerAddress == nil {
		return nil, errors.New("writerAddress is nil")
	}

	topics := make([]ethcmn.Hash, 2)
	event := p.Events[EventActionStateChange]
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

	typedEvent := v1beta1.EventActionStateChange{}

	err := common.ParseSdkEventDeprecated(sdkEvent, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}

	b.Write(cmn.PackNum(reflect.ValueOf(typedEvent.Id)))
	b.Write(cmn.PackNum(reflect.ValueOf(typedEvent.PreviousStatus)))
	b.Write(cmn.PackNum(reflect.ValueOf(typedEvent.NewStatus)))

	return &b, nil
}
