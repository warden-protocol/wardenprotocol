package warden

import (
	"bytes"
	"fmt"
	"math/big"
	"reflect"
	"strings"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/core/vm"
	cmn "github.com/evmos/evmos/v18/precompiles/common"
)

const (
	// EventTypeAddKeychainAdmin defines the event type for the x/warden AddKeychainAdmin transaction.
	EventTypeAddKeychainAdmin = "AddKeychainAdmin"
	// EventTypeAddKeychainWriter defines the event type for the x/warden AddKeychainWriter transaction.
	EventTypeAddKeychainWriter = "AddKeychainWriter"
	// EventTypeNewKey defines the event type for the fulfil branch of x/warden FulfilKeyRequest transaction.
	EventTypeNewKey = "NewKey"
	// EventRejectKeyRequest defines the event type for the reject branch of x/warden FulfilKeyRequest transaction.
	EventRejectKeyRequest = "RejectKeyRequest"
)

func (p Precompile) EmitAddKeychainAdminEvent(ctx sdk.Context, stateDB vm.StateDB, adminAddress common.Address) error {
	// Prepare the event topics
	event := p.ABI.Events[EventTypeAddKeychainAdmin]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	sdkEvents := ctx.EventManager().Events()
	eventAddKeychainWriter := sdkEvents[len(sdkEvents)-1]
	var b bytes.Buffer
	for _, attr := range eventAddKeychainWriter.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("AddKeychainAdminEvent: invalid keychain id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		case "admins_count":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("AddKeychainAdminEvent: invalid admins count type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		}
	}

	var err error
	topics[1], err = cmn.MakeTopic(adminAddress)
	if err != nil {
		return err
	}

	stateDB.AddLog(&ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	})

	return nil
}

func (p Precompile) EmitAddKeychainWriterEvent(ctx sdk.Context, stateDB vm.StateDB, writerAddres common.Address) error {
	// Prepare the event topics
	event := p.ABI.Events[EventTypeAddKeychainWriter]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	sdkEvents := ctx.EventManager().Events()
	eventAddKeychainWriter := sdkEvents[len(sdkEvents)-1]
	var b bytes.Buffer
	for _, attr := range eventAddKeychainWriter.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("AddKeychainWriterEvent: invalid keychain id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		case "writers_count":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("AddKeychainWriterEvent: invalid writers count type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		}
	}

	var err error
	topics[1], err = cmn.MakeTopic(writerAddres)
	if err != nil {
		return err
	}

	stateDB.AddLog(&ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	})

	return nil
}

func (p Precompile) EmitNewKeyEvent(ctx sdk.Context, stateDB vm.StateDB) error {
	// Prepare the event topics
	event := p.ABI.Events[EventTypeNewKey]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	sdkEvents := ctx.EventManager().Events()
	eventNewKey := sdkEvents[len(sdkEvents)-1]
	var b bytes.Buffer
	for _, attr := range eventNewKey.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			keyId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("NewKeyEvent: invalid key id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keyId)))
		case "key_type":
			keyType, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("NewKeyEvent: invalid key type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keyType)))
		case "space_id":
			spaceId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("NewKeyEvent: invalid space id")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(spaceId)))
		case "keychain_id":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("NewKeyEvent: invalid keychain id")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		case "approve_template_id":
			approveTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("NewKeyEvent: invalid approve template id")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(approveTemplateId)))
		case "reject_template_id":
			rejectTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("NewKeyEvent: invalid reject template id")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(rejectTemplateId)))
		}
	}

	stateDB.AddLog(&ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	})

	return nil
}

func (p Precompile) EmitRejectKeyRequestEvent(ctx sdk.Context, stateDB vm.StateDB) error {
	// Prepare the event topics
	event := p.ABI.Events[EventRejectKeyRequest]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	sdkEvents := ctx.EventManager().Events()
	eventNewKey := sdkEvents[len(sdkEvents)-1]
	var b bytes.Buffer
	for _, attr := range eventNewKey.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			requestId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("RejectKeyRequestEvent: invalid request id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(requestId)))
		}
	}

	stateDB.AddLog(&ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	})

	return nil
}
