package warden

import (
	"bytes"
	"fmt"
	"math/big"
	"reflect"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/gogoproto/proto"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	evmoscmn "github.com/evmos/evmos/v20/precompiles/common"

	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
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

// GetAddKeychainAdminEvent maps EventAddKeychainAdmin to eth AddKeychainAdmin event and write to eth log
func (p Precompile) GetAddKeychainAdminEvent(ctx sdk.Context, adminAddress *common.Address, eventAddKeychainAdmin sdk.Event) (*ethtypes.Log, error) {
	// Prepare the event topics
	event := p.ABI.Events[EventTypeAddKeychainAdmin]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	typedEvent := wardentypes.EventAddKeychainAdmin{}
	if err := precommon.ParseSdkEvent(eventAddKeychainAdmin, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	packed, err := event.Inputs.NonIndexed().Pack(
		typedEvent.GetId(),
		typedEvent.GetAdminsCount(),
	)
	if err != nil {
		return nil, err
	}

	if topics[1], err = evmoscmn.MakeTopic(*adminAddress); err != nil {
		return nil, fmt.Errorf("failed to make topic for admin address: %w", err)
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        packed,
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

// GetAddKeychainWriterEvent maps EventAddKeychainWriter to eth AddKeychainWriter event and write to eth log
func (p Precompile) GetAddKeychainWriterEvent(ctx sdk.Context, writerAddress *common.Address, eventAddKeychainWriter sdk.Event) (*ethtypes.Log, error) {
	// Prepare the event topics
	event := p.ABI.Events[EventTypeAddKeychainWriter]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	typedEvent := wardentypes.EventAddKeychainWriter{}
	if err := precommon.ParseSdkEvent(eventAddKeychainWriter, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	packed, err := event.Inputs.NonIndexed().Pack(
		typedEvent.GetId(),
		typedEvent.GetWritersCount(),
	)
	if err != nil {
		return nil, err
	}

	topics[1], err = evmoscmn.MakeTopic(*writerAddress)
	if err != nil {
		return nil, err
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        packed,
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

// GetNewKeyEvent maps EventNewKey to eth NewKey event and write to eth log
func (p Precompile) GetNewKeyEvent(ctx sdk.Context, _ *common.Address, eventNewKey sdk.Event) (*ethtypes.Log, error) {
	// Prepare the event topics
	event := p.ABI.Events[EventTypeNewKey]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	typedEvent := wardentypes.EventNewKey{}
	if err := precommon.ParseSdkEvent(eventNewKey, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	packed, err := event.Inputs.NonIndexed().Pack(
		typedEvent.GetId(),
		typedEvent.GetKeyType(),
		typedEvent.GetSpaceId(),
		typedEvent.GetKeychainId(),
		typedEvent.GetApproveTemplateId(),
		typedEvent.GetRejectTemplateId(),
	)

	if err != nil {
		return nil, err
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        packed,
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

// GetRejectKeyRequestEvent maps EventRejectKeyRequest to eth RejectKeyRequest event and write to eth log
func (p Precompile) GetRejectKeyRequestEvent(ctx sdk.Context, _ *common.Address, eventRejectKeyRequest sdk.Event) (*ethtypes.Log, error) {
	// Prepare the event topics
	event := p.ABI.Events[EventRejectKeyRequest]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	typedEvent := wardentypes.EventRejectKeyRequest{}
	if err := precommon.ParseSdkEvent(eventRejectKeyRequest, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	packed, err := event.Inputs.NonIndexed().Pack(
		typedEvent.GetId(),
	)
	if err != nil {
		return nil, err
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        packed,
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

// GetFulfilSignRequestEvent maps EventFulfilSignRequest to eth FulfilSignRequest event and write to eth log
func (p Precompile) GetFulfilSignRequestEvent(ctx sdk.Context, _ *common.Address, eventFulfilSignRequest sdk.Event) (*ethtypes.Log, error) {
	// Prepare the event topics
	event := p.ABI.Events[EventFulfilSignRequest]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	typedEvent := wardentypes.EventFulfilSignRequest{}
	if err := precommon.ParseSdkEvent(eventFulfilSignRequest, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	packed, err := event.Inputs.NonIndexed().Pack(
		typedEvent.GetId(),
	)
	if err != nil {
		return nil, err
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        packed,
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

// GetRejectSignRequestEvent maps EventRejectSignRequest to eth RejectSignRequest event and write to eth log
func (p Precompile) GetRejectSignRequestEvent(ctx sdk.Context, _ *common.Address, eventRejectSignRequest sdk.Event) (*ethtypes.Log, error) {
	// Prepare the event topics
	event := p.ABI.Events[EventRejectSignRequest]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	typedEvent := wardentypes.EventRejectSignRequest{}
	if err := precommon.ParseSdkEvent(eventRejectSignRequest, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	packed, err := event.Inputs.NonIndexed().Pack(
		typedEvent.GetId(),
	)
	if err != nil {
		return nil, err
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        packed,
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

// GetNewKeychainEvent maps EventNewKeychain to eth NewKeychain event and write to eth log
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

	typedEvent := wardentypes.EventNewKeychain{}
	if err = precommon.ParseSdkEvent(eventNewKeychain, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	packed, err := event.Inputs.NonIndexed().Pack(
		typedEvent.GetId(),
	)
	if err != nil {
		return nil, err
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        packed,
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

// GetNewSpaceEvent maps EventNewSpace to eth NewSpace event and writes to eth log
func (p Precompile) GetNewSpaceEvent(ctx sdk.Context, creator *common.Address, eventNewSpace sdk.Event) (*ethtypes.Log, error) {
	var err error
	// Prepare the event topics
	event := p.ABI.Events[EventNewSpace]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	if topics[1], err = evmoscmn.MakeTopic(*creator); err != nil {
		return nil, err
	}

	typedEvent := wardentypes.EventCreateSpace{}
	if err = precommon.ParseSdkEvent(eventNewSpace, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	packed, err := event.Inputs.NonIndexed().Pack(
		typedEvent.GetId(),
		typedEvent.GetOwnersCount(),
		typedEvent.GetApproveAdminTemplateId(),
		typedEvent.GetRejectAdminTemplateId(),
		typedEvent.GetApproveSignTemplateId(),
		typedEvent.GetRejectSignTemplateId(),
	)
	if err != nil {
		return nil, err
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        packed,
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

// GetRemoveKeychainAdminEvent maps EventRemoveKeychainAdmin to eth RemoveKeychainAdmin event and write to eth log
func (p Precompile) GetRemoveKeychainAdminEvent(ctx sdk.Context, admin *common.Address, eventRemoveKeychainAdmin sdk.Event) (*ethtypes.Log, error) {
	var err error
	// Prepare the event topics
	event := p.ABI.Events[EventRemoveKeychainAdmin]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	if topics[1], err = evmoscmn.MakeTopic(*admin); err != nil {
		return nil, err
	}

	var b bytes.Buffer
	typedEvent := wardentypes.EventRemoveKeychainAdmin{}
	if err = precommon.ParseSdkEvent(eventRemoveKeychainAdmin, typedEvent.XXX_Merge); err != nil {
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

// GetUpdateKeychainEvent maps EventUpdateKeychain to eth UpdateKeychain event and write to eth log
func (p Precompile) GetUpdateKeychainEvent(ctx sdk.Context, _ *common.Address, eventUpdateKeychain sdk.Event) (*ethtypes.Log, error) {
	// Prepare the event topics
	event := p.ABI.Events[EventUpdateKeychain]

	topics := make([]common.Hash, 1)
	// The first topic is always the signature of the event.
	topics[0] = event.ID
	var b bytes.Buffer
	typedEvent := wardentypes.EventUpdateKeychain{}
	// use Marshal/Unmarshal here cause big.Word=uint inside big.Int is not correctly merged in cosmos.gogoproto
	var e error
	var marshaled []byte
	if err := precommon.ParseSdkEvent(eventUpdateKeychain, func(m proto.Message) {
		marshaled, e = proto.Marshal(m)
		typedEvent.Unmarshal(marshaled)
	}); err != nil {
		return nil, err
	}

	if e != nil {
		return nil, e
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

// GetAddSpaceOwnerEvent maps EventAddSpaceOwner to eth AddSpaceOwner event and write to eth log
func (p Precompile) GetAddSpaceOwnerEvent(ctx sdk.Context, _ *common.Address, addSpaceOwnerEvent sdk.Event) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventAddSpaceOwner]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	var b bytes.Buffer

	typedEvent := wardentypes.EventAddSpaceOwner{}
	if err := precommon.ParseSdkEvent(addSpaceOwnerEvent, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	newOwner, err := precommon.AddressFromBech32Str(typedEvent.GetNewOwner())
	if err != nil {
		return nil, err
	}

	b.Write(append(make([]byte, 12), newOwner.Bytes()...))

	topics[1], err = evmoscmn.MakeTopic(typedEvent.GetSpaceId())

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

// GetRemoveSpaceOwnerEvent maps EventRemoveSpaceOwner to eth RemoveSpaceOwner event and write to eth log
func (p Precompile) GetRemoveSpaceOwnerEvent(ctx sdk.Context, removedOwner *common.Address, removeSpaceOwnerEvent sdk.Event) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventRemoveSpaceOwner]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	var b bytes.Buffer

	typedEvent := wardentypes.EventRemoveSpaceOwner{}
	if err := precommon.ParseSdkEvent(removeSpaceOwnerEvent, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	removedOwnerAddress, err := precommon.AddressFromBech32Str(typedEvent.GetRemovedOwner())
	if err != nil {
		return nil, err
	}

	b.Write(append(make([]byte, 12), removedOwnerAddress.Bytes()...))

	topics[1], err = evmoscmn.MakeTopic(typedEvent.GetSpaceId())

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

// GetNewKeyRequestEvent maps EventNewKeyRequest to eth NewKeyRequest event and write to eth log
func (p Precompile) GetNewKeyRequestEvent(ctx sdk.Context, _ *common.Address, newKeyRequestEvent sdk.Event) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventNewKeyRequest]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	mapKeyType := func(keyType wardentypes.KeyType) (uint8, error) {
		switch keyType {
		case wardentypes.KeyType_KEY_TYPE_UNSPECIFIED:
			return uint8(wardentypes.KeyType_KEY_TYPE_UNSPECIFIED), nil
		case wardentypes.KeyType_KEY_TYPE_ECDSA_SECP256K1:
			return uint8(wardentypes.KeyType_KEY_TYPE_ECDSA_SECP256K1), nil
		case wardentypes.KeyType_KEY_TYPE_EDDSA_ED25519:
			return uint8(wardentypes.KeyType_KEY_TYPE_EDDSA_ED25519), nil
		default:
			return 0, fmt.Errorf("key type is not supported: %v", keyType)
		}
	}

	var b bytes.Buffer

	typedEvent := wardentypes.EventNewKeyRequest{}
	if err := precommon.ParseSdkEvent(newKeyRequestEvent, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	keyType, err := mapKeyType(typedEvent.GetKeyType())
	if err != nil {
		return nil, fmt.Errorf("NewKeyRequest: invalid key type")
	}

	creatorAddress, err := precommon.AddressFromBech32Str(typedEvent.GetCreator())
	if err != nil {
		return nil, err
	}

	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetSpaceId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetKeychainId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetApproveTemplateId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetRejectTemplateId())))))
	b.Write(evmoscmn.PackNum(reflect.ValueOf(keyType)))
	b.Write(append(make([]byte, 12), creatorAddress.Bytes()...))

	topics[1], err = evmoscmn.MakeTopic(typedEvent.GetId())

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

// GetNewSignRequestEvent maps EventNewSignRequest to eth NewSignRequest event and write to eth log
func (p Precompile) GetNewSignRequestEvent(ctx sdk.Context, _ *common.Address, newSignRequestEvent sdk.Event) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventNewSignRequest]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	var b bytes.Buffer

	typedEvent := wardentypes.EventNewSignRequest{}
	if err := precommon.ParseSdkEvent(newSignRequestEvent, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	creatorAddress, err := precommon.AddressFromBech32Str(typedEvent.GetCreator())
	if err != nil {
		return nil, err
	}

	b.Write(evmoscmn.PackNum(reflect.ValueOf(big.NewInt(int64(typedEvent.GetKeyId())))))
	b.Write(append(make([]byte, 12), creatorAddress.Bytes()...))

	topics[1], err = evmoscmn.MakeTopic(typedEvent.GetId())

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

// GetUpdateKeyEvent maps EventUpdateKey to eth UpdateKey event and write to eth log
func (p Precompile) GetUpdateKeyEvent(ctx sdk.Context, _ *common.Address, updateKeyEvent sdk.Event) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventUpdateKey]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	typedEvent := wardentypes.EventUpdateKey{}
	if err := precommon.ParseSdkEvent(updateKeyEvent, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	packed, err := event.Inputs.NonIndexed().Pack(
		typedEvent.GetApproveTemplateId(),
		typedEvent.GetRejectTemplateId(),
	)
	if err != nil {
		return nil, err
	}

	topics[1], err = evmoscmn.MakeTopic(typedEvent.GetId())

	if err != nil {
		return nil, err
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        packed,
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}

// GetUpdateSpaceEvent maps EventUpdateSpace to eth UpdateSpace event and write to eth log
func (p Precompile) GetUpdateSpaceEvent(ctx sdk.Context, _ *common.Address, updateSpaceEvent sdk.Event) (*ethtypes.Log, error) {
	event := p.ABI.Events[EventUpdateSpace]

	topics := make([]common.Hash, 2)
	topics[0] = event.ID

	typedEvent := wardentypes.EventUpdateSpace{}
	if err := precommon.ParseSdkEvent(updateSpaceEvent, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	packed, err := event.Inputs.NonIndexed().Pack(
		typedEvent.GetApproveAdminTemplateId(),
		typedEvent.GetRejectAdminTemplateId(),
		typedEvent.GetApproveSignTemplateId(),
		typedEvent.GetRejectSignTemplateId(),
	)
	if err != nil {
		return nil, err
	}

	topics[1], err = evmoscmn.MakeTopic(typedEvent.GetSpaceId())

	if err != nil {
		return nil, err
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        packed,
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}
