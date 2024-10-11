package act

import (
	"bytes"
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	cmn "github.com/evmos/evmos/v20/precompiles/common"
	"github.com/evmos/evmos/v20/x/evm/core/vm"
	"math/big"
	"reflect"
	"strconv"
	"strings"
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

func (p *Precompile) EmitCreateTemplateEvent(ctx sdk.Context, stateDB vm.StateDB, writerAddress common.Address) error {
	return p.emitEvent(
		ctx,
		stateDB,
		writerAddress,
		EventCreateTemplate,
		parseNewTemplateEvent)
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

		case "creator":
			address, err := sdk.AccAddressFromBech32(val)
			if err != nil {
				return nil, fmt.Errorf("NewTemplateEvent: invalid writers count type")
			}

			b.Write(cmn.PackNum(reflect.ValueOf(common.Address(address.Bytes()))))
		}
	}

	return &b, nil
}

func (p *Precompile) EmitUpdateTemplateEvent(ctx sdk.Context, stateDB vm.StateDB, writerAddress common.Address) error {
	return p.emitEvent(
		ctx,
		stateDB,
		writerAddress,
		EventUpdateTemplate,
		parseUpdateTemplateEvent)
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

func (p *Precompile) EmitCreateActionEvent(ctx sdk.Context, stateDB vm.StateDB, writerAddress common.Address) error {
	return p.emitEvent(
		ctx,
		stateDB,
		writerAddress,
		EventCreateAction,
		parseCreateActionEvent)
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
		case "creator":
			address, err := sdk.AccAddressFromBech32(val)
			if err != nil {
				return nil, fmt.Errorf("CreateActionEvent: invalid creator type")
			}

			b.Write(cmn.PackNum(reflect.ValueOf(common.Address(address.Bytes()))))
		}

	}
	return &b, nil
}

func (p *Precompile) EmitActionVotedEvent(ctx sdk.Context, stateDB vm.StateDB, writerAddress common.Address) error {
	return p.emitEvent(
		ctx,
		stateDB,
		writerAddress,
		EventActionVoted,
		parseActionVotedEvent)
}

func parseActionVotedEvent(sdkEvent sdk.Event) (*bytes.Buffer, error) {
	var b bytes.Buffer

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
		case "participant":
			address, err := sdk.AccAddressFromBech32(val)
			if err != nil {
				return nil, fmt.Errorf("ActionVotedEvent: invalid participant type")
			}

			b.Write(cmn.PackNum(reflect.ValueOf(common.Address(address.Bytes()))))

		case "vote_type":
			value, err := strconv.ParseInt(val, 10, 32)
			if err != nil {
				return nil, fmt.Errorf("ActionVotedEvent: invalid vote_type type")
			}

			b.Write(cmn.PackNum(reflect.ValueOf(value)))
		}

	}
	return &b, nil
}

func (p *Precompile) EmitActionStateChangeEvent(ctx sdk.Context, stateDB vm.StateDB, writerAddress common.Address) error {
	return p.emitEvent(
		ctx,
		stateDB,
		writerAddress,
		EventActionStateChange,
		parseActionStateChangeEvent)
}

func parseActionStateChangeEvent(sdkEvent sdk.Event) (*bytes.Buffer, error) {
	var b bytes.Buffer

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
			value, err := strconv.ParseInt(val, 10, 32)
			if err != nil {
				return nil, fmt.Errorf("ActionStateChangeEvent: invalid previous_status type")
			}

			b.Write(cmn.PackNum(reflect.ValueOf(value)))
		case "new_status":
			value, err := strconv.ParseInt(val, 10, 32)
			if err != nil {
				return nil, fmt.Errorf("ActionStateChangeEvent: invalid new_status type")
			}

			b.Write(cmn.PackNum(reflect.ValueOf(value)))
		}

	}

	return &b, nil
}

func (p *Precompile) emitEvent(
	ctx sdk.Context,
	stateDB vm.StateDB,
	writerAddress common.Address,
	eventName string,
	eventParser func(sdk.Event) (*bytes.Buffer, error)) error {

	// Prepare the event topics
	event := p.ABI.Events[eventName]
	sdkEvents := ctx.EventManager().Events()

	for _, x := range sdkEvents {
		if x.Type == eventName {
			b, err := eventParser(x)
			if err != nil {
				return err
			}

			topics := make([]common.Hash, 2)
			// The first topic is always the signature of the event.
			topics[0] = event.ID

			topics[1], err = cmn.MakeTopic(writerAddress)
			if err != nil {
				return err
			}

			stateDB.AddLog(&ethtypes.Log{
				Address:     p.Address(),
				Topics:      topics,
				Data:        b.Bytes(),
				BlockNumber: uint64(ctx.BlockHeight()),
			})
		}
	}

	return nil
}
