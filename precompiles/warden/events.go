package warden

import (
	"bytes"
	"fmt"
	"math/big"
	"reflect"
	"strings"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/gogoproto/proto"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	evmoscmn "github.com/evmos/evmos/v20/precompiles/common"
	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
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

func (p Precompile) GetAddKeychainAdminEvent(ctx sdk.Context, adminAddress *common.Address, eventAddKeychainWriter sdk.Event) (*ethtypes.Log, error) {
	// Prepare the event topics
	event := p.ABI.Events[EventTypeAddKeychainAdmin]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	var b bytes.Buffer
	typedEvent := wardentypes.EventAddKeychainAdmin{}
	err := precommon.ParseSdkEvent(eventAddKeychainWriter, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetAdminsCount())))))

	topics[1], err = evmoscmn.MakeTopic(*adminAddress)
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

func (p Precompile) GetAddKeychainWriterEvent(ctx sdk.Context, writerAddres *common.Address, eventAddKeychainWriter sdk.Event) (*ethtypes.Log, error) {
	// Prepare the event topics
	event := p.ABI.Events[EventTypeAddKeychainWriter]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	var b bytes.Buffer
	typedEvent := wardentypes.EventAddKeychainWriter{}
	err := precommon.ParseSdkEvent(eventAddKeychainWriter, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetWritersCount())))))

	topics[1], err = evmoscmn.MakeTopic(*writerAddres)
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

func (p Precompile) GetNewKeyEvent(ctx sdk.Context, _ *common.Address, eventNewKey sdk.Event) (*ethtypes.Log, error) {
	// Prepare the event topics
	event := p.ABI.Events[EventTypeNewKey]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	var b bytes.Buffer
	typedEvent := wardentypes.EventNewKey{}
	err := precommon.ParseSdkEvent(eventNewKey, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetKeyType())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetSpaceId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetKeychainId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetApproveTemplateId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetRejectTemplateId())))))

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetRejectKeyRequestEvent(ctx sdk.Context, _ *common.Address, eventRejectKeyRequest sdk.Event) (*ethtypes.Log, error) {
	// Prepare the event topics
	event := p.ABI.Events[EventRejectKeyRequest]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	var b bytes.Buffer
	typedEvent := wardentypes.EventRejectKeyRequest{}
	err := precommon.ParseSdkEvent(eventRejectKeyRequest, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetId())))))

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetFulfilSignRequestEvent(ctx sdk.Context, _ *common.Address, eventFulfilSignRequest sdk.Event) (*ethtypes.Log, error) {
	// Prepare the event topics
	event := p.ABI.Events[EventFulfilSignRequest]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	var b bytes.Buffer
	typedEvent := wardentypes.EventFulfilSignRequest{}
	err := precommon.ParseSdkEvent(eventFulfilSignRequest, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetId())))))

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetRejectSignRequestEvent(ctx sdk.Context, _ *common.Address, eventRejectSignRequest sdk.Event) (*ethtypes.Log, error) {
	// Prepare the event topics
	event := p.ABI.Events[EventRejectSignRequest]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	var b bytes.Buffer
	typedEvent := wardentypes.EventRejectSignRequest{}
	err := precommon.ParseSdkEvent(eventRejectSignRequest, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetId())))))
	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetNewKeychainEvent(ctx sdk.Context, creator *common.Address, eventNewKeychain sdk.Event) (*ethtypes.Log, error) {
	var err error
	// Prepare the event topics
	event := p.ABI.Events[EventNewKeychain]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	topics[1], err = evmoscmn.MakeTopic(*creator)

	if err != nil {
		return nil, err
	}

	var b bytes.Buffer
	typedEvent := wardentypes.EventNewKeychain{}
	err = precommon.ParseSdkEvent(eventNewKeychain, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetId())))))

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetCreateSpaceEvent(ctx sdk.Context, creator *common.Address, eventCreateSpace sdk.Event) (*ethtypes.Log, error) {
	var err error
	// Prepare the event topics
	event := p.ABI.Events[EventNewSpace]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	topics[1], err = evmoscmn.MakeTopic(*creator)

	if err != nil {
		return nil, err
	}

	var b bytes.Buffer
	typedEvent := wardentypes.EventCreateSpace{}
	err = precommon.ParseSdkEvent(eventCreateSpace, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetOwnersCount())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetApproveAdminTemplateId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetRejectAdminTemplateId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetApproveSignTemplateId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetRejectSignTemplateId())))))

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetRemoveKeychainAdminEvent(ctx sdk.Context, admin *common.Address, eventRemoveKeychainAdmin sdk.Event) (*ethtypes.Log, error) {
	var err error
	// Prepare the event topics
	event := p.ABI.Events[EventRemoveKeychainAdmin]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	topics[1], err = evmoscmn.MakeTopic(*admin)

	if err != nil {
		return nil, err
	}

	var b bytes.Buffer
	typedEvent := wardentypes.EventRemoveKeychainAdmin{}
	err = precommon.ParseSdkEvent(eventRemoveKeychainAdmin, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetAdminsCount())))))

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetUpdateKeychainEvent(ctx sdk.Context, _ *common.Address, eventUpdateKeychain sdk.Event) (*ethtypes.Log, error) {
	// Prepare the event topics
	event := p.ABI.Events[EventUpdateKeychain]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID
	var b bytes.Buffer
	typedEvent := wardentypes.EventUpdateKeychain{}
	// use Marshal/Unmarshal here cause big.Word=uint inside big.Int is not correctly merged in cosmos.gogoproto
	err := precommon.ParseSdkEvent(eventUpdateKeychain, func(m proto.Message) {
		b, _ := proto.Marshal(m)
		typedEvent.Unmarshal(b)
	})
	if err != nil {
		return nil, err
	}
	packedKeychainFees, err := event.Inputs.NonIndexed().Pack(
		typedEvent.GetId(),
		mapSdkKeychainFees(typedEvent.GetKeychainFees()),
	)
	if err != nil {
		return nil, err
	}
	b.Write(packedKeychainFees)

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

func (p Precompile) GetAddSpaceOwnerEvent(ctx sdk.Context, _ *common.Address, addSpaceOwnerEvent sdk.Event) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventAddSpaceOwner]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	var b bytes.Buffer
	for _, attr := range addSpaceOwnerEvent.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")

		switch key {
		case "space_id":
			spaceId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("AddSpaceOwner: invalid space id type")
			}
			var err error
			topics[1], err = evmoscmn.MakeTopic(spaceId)
			if err != nil {
				return nil, err
			}
		case "new_owner":
			b.Write([]byte(val))
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

func (p Precompile) GetRemoveSpaceOwnerEvent(ctx sdk.Context, removedOwner *common.Address, removeSpaceOwnerEvent sdk.Event) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventRemoveSpaceOwner]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	var b bytes.Buffer
	for _, attr := range removeSpaceOwnerEvent.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")

		switch key {
		case "space_id":
			spaceId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("RemoveSpaceOwner: invalid space id type")
			}
			var err error
			topics[1], err = evmoscmn.MakeTopic(spaceId)
			if err != nil {
				return nil, err
			}
		case "removed_owner":
			b.Write([]byte(val))
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

func (p Precompile) GetNewKeyRequestEvent(ctx sdk.Context, _ *common.Address, newKeyRequestEvent sdk.Event) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventNewKeyRequest]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	//mapKeyType := func(keyType string) (uint8, error) {
	//	switch keyType {
	//	case v1beta3.KeyType_KEY_TYPE_UNSPECIFIED.String():
	//		return uint8(v1beta3.KeyType_KEY_TYPE_UNSPECIFIED), nil
	//	case v1beta3.KeyType_KEY_TYPE_ECDSA_SECP256K1.String():
	//		return uint8(v1beta3.KeyType_KEY_TYPE_ECDSA_SECP256K1), nil
	//	case v1beta3.KeyType_KEY_TYPE_EDDSA_ED25519.String():
	//		return uint8(v1beta3.KeyType_KEY_TYPE_EDDSA_ED25519), nil
	//	default:
	//		return 0, fmt.Errorf("key type is not supported: %v", keyType)
	//	}
	//}

	var b bytes.Buffer

	typedEvent := v1beta3.EventNewKeyRequest{}
	err := precompilescommon.ParseSdkEvent(newKeyRequestEvent, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}

	//keyType, err := mapKeyType(typedEvent.KeyType)
	//if err != nil {
	//	return nil, fmt.Errorf("NewKeyRequest: invalid key type type")
	//}
	//b.Write(cmn.PackNum(reflect.ValueOf(keyType)))

	b.Write(cmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.SpaceId)))))
	b.Write(cmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.KeychainId)))))
	b.Write(cmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.ApproveTemplateId)))))
	b.Write(cmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.RejectTemplateId)))))
	b.Write(cmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.KeyType)))))
	b.Write([]byte(typedEvent.Creator))

	topics[1], err = cmn.MakeTopic(typedEvent.Id)

	if err != nil {
		return nil, err
	}

	for _, attr := range newKeyRequestEvent.Attributes {
		key := attr.GetKey()
		val := strings.Trim(attr.GetValue(), "\"")

		switch key {
		case "id":
			id, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyRequest: invalid id type")
			}
			var err error
			topics[1], err = evmoscmn.MakeTopic(id)
			if err != nil {
				return nil, err
			}
		case "space_id":
			spaceId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyRequest: invalid space id type")
			}
			b.Write(evmoscmn.PackNum(reflect.ValueOf(spaceId)))
		case "keychain_id":
			keychainId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyRequest: invalid keychain id type")
			}
			b.Write(evmoscmn.PackNum(reflect.ValueOf(keychainId)))
		case "approve_template_id":
			approveTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyRequest: invalid approve template id type")
			}
			b.Write(evmoscmn.PackNum(reflect.ValueOf(approveTemplateId)))
		case "reject_template_id":
			rejectTemplateId, success := new(big.Int).SetString(val, 10)
			if !success {
				return nil, fmt.Errorf("NewKeyRequest: invalid reject template id type")
			}
			b.Write(evmoscmn.PackNum(reflect.ValueOf(rejectTemplateId)))
		case "key_type":
			keyType, err := mapKeyType(val)
			if err != nil {
				return nil, fmt.Errorf("NewKeyRequest: invalid key type type")
			}
			b.Write(evmoscmn.PackNum(reflect.ValueOf(keyType)))
		case "creator":
			b.Write([]byte(val))
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

func (p Precompile) GetNewSignRequestEvent(ctx sdk.Context, _ *common.Address, newSignRequestEvent sdk.Event) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventNewSignRequest]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	var b bytes.Buffer

	typedEvent := v1beta3.EventNewSignRequest{}
	err := precompilescommon.ParseSdkEvent(newSignRequestEvent, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}

	b.Write(cmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.KeyId)))))
	b.Write([]byte(typedEvent.Creator))

	topics[1], err = cmn.MakeTopic(typedEvent.Id)

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

func (p Precompile) GetUpdateKeyEvent(ctx sdk.Context, _ *common.Address, updateKeyEvent sdk.Event) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventUpdateKey]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	var b bytes.Buffer

	typedEvent := v1beta3.EventUpdateKey{}
	err := precompilescommon.ParseSdkEvent(updateKeyEvent, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}

	b.Write(cmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.ApproveTemplateId)))))
	b.Write(cmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.RejectTemplateId)))))

	topics[1], err = cmn.MakeTopic(typedEvent.Id)

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

func (p Precompile) GetUpdateSpaceEvent(ctx sdk.Context, _ *common.Address, updateSpaceEvent sdk.Event) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventUpdateSpace]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	var b bytes.Buffer

	typedEvent := v1beta3.EventUpdateSpace{}
	err := precompilescommon.ParseSdkEvent(updateSpaceEvent, typedEvent.XXX_Merge)
	if err != nil {
		return nil, err
	}

	b.Write(cmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.ApproveAdminTemplateId)))))
	b.Write(cmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.RejectAdminTemplateId)))))
	b.Write(cmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.ApproveSignTemplateId)))))
	b.Write(cmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.RejectSignTemplateId)))))

	topics[1], err = cmn.MakeTopic(typedEvent.SpaceId)

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
