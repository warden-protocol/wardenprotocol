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
	cmn "github.com/evmos/evmos/v20/precompiles/common"
	"github.com/evmos/evmos/v20/x/evm/core/vm"
	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
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
	// EventFulfilSignRequest defines the event type for the fulfil branch of x/warden FulfilSignRequest transaction.
	EventFulfilSignRequest = "FulfilSignRequest"
	// EventRejectSignRequest defines the event type for the reject branch of x/warden FulfilSignRequest transaction.
	EventRejectSignRequest = "RejectSignRequest"
	// EventNewKeychain defines the event type for the x/warden NewKeychain transaction.
	EventNewKeychain = "NewKeychain"
	// EventNewSpace defines the event type for the x/warden NewSpace transaction.
	EventNewSpace = "NewSpace"
	// EventRemoveKeychainAdmin defines the event type for the x/warden RemoveKeychainAdmin transaction.
	EventRemoveKeychainAdmin = "RemoveKeychainAdmin"
	// EventUpdateKeychain defines the event type for the x/warden UpdateKeychain transaction.
	EventUpdateKeychain = "UpdateKeychain"
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
			keyType := new(big.Int).SetInt64(int64(wardentypes.KeyType_value[val]))
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
	eventRejectKey := sdkEvents[len(sdkEvents)-1]
	var b bytes.Buffer
	for _, attr := range eventRejectKey.Attributes {
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

func (p Precompile) EmitFulfilSignRequestEvent(ctx sdk.Context, stateDB vm.StateDB) error {
	// Prepare the event topics
	event := p.ABI.Events[EventFulfilSignRequest]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	sdkEvents := ctx.EventManager().Events()
	eventFulfilSign := sdkEvents[len(sdkEvents)-1]
	var b bytes.Buffer
	for _, attr := range eventFulfilSign.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			requestId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("FulfilSignRequestEvent: invalid request id type")
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

func (p Precompile) EmitRejectSignRequestEvent(ctx sdk.Context, stateDB vm.StateDB) error {
	// Prepare the event topics
	event := p.ABI.Events[EventRejectSignRequest]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	sdkEvents := ctx.EventManager().Events()
	eventRejectSign := sdkEvents[len(sdkEvents)-1]
	var b bytes.Buffer
	for _, attr := range eventRejectSign.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			requestId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("RejectSignRequestEvent: invalid request id type")
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

func (p Precompile) EmitNewKeychainEvent(ctx sdk.Context, creator common.Address, stateDB vm.StateDB) error {
	var err error
	// Prepare the event topics
	event := p.ABI.Events[EventNewKeychain]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	topics[1], err = cmn.MakeTopic(creator)

	if err != nil {
		return err
	}

	var b bytes.Buffer
	sdkEvents := ctx.EventManager().Events()
	eventNewKeychain := sdkEvents[len(sdkEvents)-1]
	for _, attr := range eventNewKeychain.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("EventNewKeychain: invalid request id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
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

func (p Precompile) EmitNewSpaceEvent(ctx sdk.Context, creator common.Address, stateDB vm.StateDB) error {
	var err error
	// Prepare the event topics
	event := p.ABI.Events[EventNewSpace]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	topics[1], err = cmn.MakeTopic(creator)

	if err != nil {
		return err
	}

	var b bytes.Buffer
	sdkEvents := ctx.EventManager().Events()
	eventNewSpace := sdkEvents[len(sdkEvents)-1]
	for _, attr := range eventNewSpace.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			spaceId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("EventNewSpace: invalid space id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(spaceId)))
		case "owners_count":
			ownersCount, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("EventNewSpace: invalid owners count type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(ownersCount)))
		case "approve_admin_template_id":
			approveAdminTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("EventNewSpace: invalid approve_admin_template_id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(approveAdminTemplateId)))
		case "reject_admin_template_id":
			rejectAdminTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("EventNewSpace: invalid reject_admin_template_id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(rejectAdminTemplateId)))
		case "approve_sign_template_id":
			approveSignTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("EventNewSpace: invalid approve_sign_template_id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(approveSignTemplateId)))
		case "reject_sign_template_id":
			rejectSignTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("EventNewSpace: invalid reject_sign_template_id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(rejectSignTemplateId)))
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

func (p Precompile) EmitRemoveKeychainAdmin(ctx sdk.Context, admin common.Address, stateDB vm.StateDB) error {
	var err error
	// Prepare the event topics
	event := p.ABI.Events[EventRemoveKeychainAdmin]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	topics[1], err = cmn.MakeTopic(admin)

	if err != nil {
		return err
	}

	var b bytes.Buffer
	sdkEvents := ctx.EventManager().Events()
	eventRemoveKeychainAdmin := sdkEvents[len(sdkEvents)-1]
	for _, attr := range eventRemoveKeychainAdmin.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			spaceId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("RemoveKeychainAdmin: invalid keychain id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(spaceId)))
		case "admins_count":
			adminsCount, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("RemoveKeychainAdmin: invalid admins count type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(adminsCount)))
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

func (p Precompile) EmitUpdateKeychainEvent(ctx sdk.Context, creator common.Address, stateDB vm.StateDB) error {
	// Prepare the event topics
	event := p.ABI.Events[EventUpdateKeychain]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	var b bytes.Buffer
	sdkEvents := ctx.EventManager().Events()
	eventNewKeychain := sdkEvents[len(sdkEvents)-1]
	for _, attr := range eventNewKeychain.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")
		switch key {
		case "id":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return fmt.Errorf("EventUpdateKeychain: invalid request id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
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
