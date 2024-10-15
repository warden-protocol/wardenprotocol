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
	// EventAddSpaceOwner defines the event type for the x/warden AddSpaceOwner transaction.
	EventAddSpaceOwner = "AddSpaceOwner"
	// EventRemoveSpaceOwner defines the event type for the x/warden RemoveSpaceOwner transaction.
	EventRemoveSpaceOwner = "RemoveSpaceOwner"
	// EventNewKeyRequest defines the event type for the x/warden NewKeyRequest transaction.
	EventNewKeyRequest = "NewKeyRequest"
	// EventNewSignRequest defines the event type for the x/warden NewSignRequest transaction.
	EventNewSignRequest = "NewSignRequest"
	// EventUpdateKey defines the event type for the x/warden UpdateKey transaction.
	EventUpdateKey = "UpdateKey"
	// EventUpdateSpace defines the event type for the x/warden UpdateSpace transaction.
	EventUpdateSpace = "UpdateSpace"
)

func (p Precompile) GetAddKeychainAdminEvent(ctx sdk.Context, adminAddress *common.Address, _ sdk.Msg) (*ethtypes.Log, error) {
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
				return nil, fmt.Errorf("AddKeychainAdminEvent: invalid keychain id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		case "admins_count":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("AddKeychainAdminEvent: invalid admins count type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		}
	}

	var err error
	topics[1], err = cmn.MakeTopic(*adminAddress)
	if err != nil {
		return nil, err
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetAddKeychainWriterEvent(ctx sdk.Context, writerAddres *common.Address, _ sdk.Msg) (*ethtypes.Log, error) {
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
				return nil, fmt.Errorf("AddKeychainWriterEvent: invalid keychain id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		case "writers_count":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("AddKeychainWriterEvent: invalid writers count type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		}
	}

	var err error
	topics[1], err = cmn.MakeTopic(*writerAddres)
	if err != nil {
		return nil, err
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetNewKeyEvent(ctx sdk.Context) (*ethtypes.Log, error) {
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
				return nil, fmt.Errorf("NewKeyEvent: invalid key id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keyId)))
		case "key_type":
			keyType := new(big.Int).SetInt64(int64(wardentypes.KeyType_value[val]))
			b.Write(cmn.PackNum(reflect.ValueOf(keyType)))
		case "space_id":
			spaceId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyEvent: invalid space id")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(spaceId)))
		case "keychain_id":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyEvent: invalid keychain id")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		case "approve_template_id":
			approveTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyEvent: invalid approve template id")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(approveTemplateId)))
		case "reject_template_id":
			rejectTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyEvent: invalid reject template id")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(rejectTemplateId)))
		}
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetRejectKeyRequestEvent(ctx sdk.Context) (*ethtypes.Log, error) {
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
				return nil, fmt.Errorf("RejectKeyRequestEvent: invalid request id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(requestId)))
		}
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetNewKeyOrRejectKeyRequestEvent(ctx sdk.Context, _ *common.Address, msg sdk.Msg) (*ethtypes.Log, error) {
	msgFulfilKeyRequest := msg.(*wardentypes.MsgFulfilKeyRequest)
	if msgFulfilKeyRequest.Status == wardentypes.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED {
		return p.GetNewKeyEvent(ctx)
	} else {
		return p.GetRejectKeyRequestEvent(ctx)
	}
}

func (p Precompile) GetFulfilSignRequestEvent(ctx sdk.Context) (*ethtypes.Log, error) {
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
				return nil, fmt.Errorf("FulfilSignRequestEvent: invalid request id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(requestId)))
		}
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetRejectSignRequestEvent(ctx sdk.Context) (*ethtypes.Log, error) {
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
				return nil, fmt.Errorf("RejectSignRequestEvent: invalid request id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(requestId)))
		}
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetFulfilOrRejectSignRequestEvent(ctx sdk.Context, _ *common.Address, msg sdk.Msg) (*ethtypes.Log, error) {
	fulfilSignRequestMsg := msg.(*wardentypes.MsgFulfilSignRequest)
	if fulfilSignRequestMsg.Status == wardentypes.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED {
		return p.GetFulfilSignRequestEvent(ctx)
	} else {
		return p.GetRejectSignRequestEvent(ctx)
	}
}

func (p Precompile) GetNewKeychainEvent(ctx sdk.Context, creator *common.Address, _ sdk.Msg) (*ethtypes.Log, error) {
	var err error
	// Prepare the event topics
	event := p.ABI.Events[EventNewKeychain]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	topics[1], err = cmn.MakeTopic(creator)

	if err != nil {
		return nil, err
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
				return nil, fmt.Errorf("EventNewKeychain: invalid request id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		}
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetNewSpaceEvent(ctx sdk.Context, creator *common.Address, _ sdk.Msg) (*ethtypes.Log, error) {
	var err error
	// Prepare the event topics
	event := p.ABI.Events[EventNewSpace]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	topics[1], err = cmn.MakeTopic(creator)

	if err != nil {
		return nil, err
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
				return nil, fmt.Errorf("EventNewSpace: invalid space id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(spaceId)))
		case "owners_count":
			ownersCount, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("EventNewSpace: invalid owners count type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(ownersCount)))
		case "approve_admin_template_id":
			approveAdminTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("EventNewSpace: invalid approve_admin_template_id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(approveAdminTemplateId)))
		case "reject_admin_template_id":
			rejectAdminTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("EventNewSpace: invalid reject_admin_template_id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(rejectAdminTemplateId)))
		case "approve_sign_template_id":
			approveSignTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("EventNewSpace: invalid approve_sign_template_id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(approveSignTemplateId)))
		case "reject_sign_template_id":
			rejectSignTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("EventNewSpace: invalid reject_sign_template_id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(rejectSignTemplateId)))
		}
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetRemoveKeychainAdminEvent(ctx sdk.Context, admin *common.Address, _ sdk.Msg) (*ethtypes.Log, error) {
	var err error
	// Prepare the event topics
	event := p.ABI.Events[EventRemoveKeychainAdmin]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	topics[1], err = cmn.MakeTopic(admin)

	if err != nil {
		return nil, err
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
				return nil, fmt.Errorf("RemoveKeychainAdmin: invalid keychain id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(spaceId)))
		case "admins_count":
			adminsCount, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("RemoveKeychainAdmin: invalid admins count type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(adminsCount)))
		}
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetUpdateKeychainEvent(ctx sdk.Context, creator *common.Address, _ sdk.Msg) (*ethtypes.Log, error) {
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
				return nil, fmt.Errorf("EventUpdateKeychain: invalid request id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		}
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetAddSpaceOwnerEvent(ctx sdk.Context, newOwner *common.Address, _ sdk.Msg) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventAddSpaceOwner]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	var err error
	topics[1], err = cmn.MakeTopic(*newOwner)
	if err != nil {
		return nil, err
	}

	sdkEvents := ctx.EventManager().Events()
	events := sdkEvents[len(sdkEvents)-1]

	var b bytes.Buffer
	for _, attr := range events.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")

		switch key {
		case "space_id":
			spaceId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("AddSpaceOwner: invalid space id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(spaceId)))
		}
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetRemoveSpaceOwnerEvent(ctx sdk.Context, removedOwner *common.Address, _ sdk.Msg) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventRemoveSpaceOwner]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	var err error
	topics[1], err = cmn.MakeTopic(*removedOwner)
	if err != nil {
		return nil, err
	}

	sdkEvents := ctx.EventManager().Events()
	events := sdkEvents[len(sdkEvents)-1]

	var b bytes.Buffer
	for _, attr := range events.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")

		switch key {
		case "space_id":
			spaceId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("RemoveSpaceOwner: invalid space id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(spaceId)))
		}
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetNewKeyRequest(ctx sdk.Context, creator *common.Address, _ sdk.Msg) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventNewKeyRequest]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	var err error
	topics[1], err = cmn.MakeTopic(*creator)
	if err != nil {
		return nil, err
	}

	sdkEvents := ctx.EventManager().Events()
	events := sdkEvents[len(sdkEvents)-1]

	var b bytes.Buffer
	for _, attr := range events.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")

		switch key {
		case "id":
			id, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyRequest: invalid id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(id)))
		case "spaceId":
			spaceId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyRequest: invalid space id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(spaceId)))
		case "keychainId":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyRequest: invalid keychain id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
		case "approveTemplateId":
			approveTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyRequest: invalid approve template id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(approveTemplateId)))
		case "rejectTemplateId":
			rejectTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyRequest: invalid reject template id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(rejectTemplateId)))
		case "keyType":
			keyType, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyRequest: invalid key type type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keyType)))
		}
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetNewSignRequest(ctx sdk.Context, creator *common.Address, _ sdk.Msg) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventNewSignRequest]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	var err error
	topics[1], err = cmn.MakeTopic(*creator)
	if err != nil {
		return nil, err
	}

	sdkEvents := ctx.EventManager().Events()
	events := sdkEvents[len(sdkEvents)-1]

	var b bytes.Buffer
	for _, attr := range events.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")

		switch key {
		case "id":
			id, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewNewSignRequest: invalid id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(id)))
		case "keyId":
			keyId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewNewSignRequest: invalid key id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(keyId)))
		}
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetUpdateKey(ctx sdk.Context, _ sdk.Msg) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventUpdateKey]

	topics := make([]common.Hash, 1)
	topics[0] = event.ID

	sdkEvents := ctx.EventManager().Events()
	events := sdkEvents[len(sdkEvents)-1]

	var b bytes.Buffer
	for _, attr := range events.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")

		switch key {
		case "id":
			id, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyRequest: invalid id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(id)))
		case "approveTemplateId":
			approveTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewUpdateKey: invalid approve template id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(approveTemplateId)))
		case "rejectTemplateId":
			rejectTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewUpdateKey: invalid reject template id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(rejectTemplateId)))
		}
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetUpdateSpace(ctx sdk.Context, _ sdk.Msg) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventUpdateSpace]

	topics := make([]common.Hash, 1)
	topics[0] = event.ID

	sdkEvents := ctx.EventManager().Events()
	events := sdkEvents[len(sdkEvents)-1]

	var b bytes.Buffer
	for _, attr := range events.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")

		switch key {
		case "id":
			id, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyRequest: invalid id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(id)))
		case "approveAdminTemplateId":
			approveAdminTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewUpdateSpace: invalid approve admin template id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(approveAdminTemplateId)))
		case "rejectAdminTemplateId":
			rejectTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewUpdateSpace: invalid reject admin template id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(rejectTemplateId)))
		case "approveSignTemplateId":
			approveAdminTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewUpdateSpace: invalid approve sign template id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(approveAdminTemplateId)))
		case "rejectSignTemplateId":
			rejectTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewUpdateSpace: invalid reject sign template id type")
			}
			b.Write(cmn.PackNum(reflect.ValueOf(rejectTemplateId)))
		}
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}
