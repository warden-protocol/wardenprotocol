package wasm_interop

import (
	"encoding/json"
	"fmt"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	acttypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

type WardenProtocolMsg struct {
	Warden WardenMsg `json:"warden,omitempty"`
}

type WardenMsg struct {
	NewKeyRequest  *NewKeyRequest  `json:"new_key_request,omitempty"`
	NewSignRequest *NewSignRequest `json:"new_sign_request,omitempty"`
}

type NewKeyRequest struct {
	RuleId        uint64        `json:"rule_id"`
	KeyType       types.KeyType `json:"key_type"`
	KeychainID    uint64        `json:"keychain_id"`
	SpaceID       uint64        `json:"space_id"`
	TimeoutHeight uint64        `json:"timeout_height"`
}

type NewSignRequest struct {
	KeyId         uint64   `json:"key_id"`
	Input         []byte   `json:"input"`
	Analyzers     []string `json:"analyzers"`
	EncryptionKey []byte   `json:"encryption_key"`
	TimeoutHeight uint64   `json:"timeout_height"`
}

func EncodeCustomMsg(sender sdk.AccAddress, rawMsg json.RawMessage) ([]sdk.Msg, error) {
	var msg WardenProtocolMsg
	err := json.Unmarshal(rawMsg, &msg)
	if err != nil {
		return nil, err
	}
	switch {
	case msg.Warden.NewKeyRequest != nil:
		return handleNewKeyRequest(sender, msg)
	case msg.Warden.NewSignRequest != nil:
		return handleNewSignRequest(sender, msg)
	default:
		return nil, fmt.Errorf("unknown variant of WardenProtocolMsg")
	}
}

func handleNewKeyRequest(sender sdk.AccAddress, msg WardenProtocolMsg) ([]sdk.Msg, error) {
	actAuthority := authtypes.NewModuleAddress(acttypes.ModuleName)
	newKeyRequest := msg.Warden.NewKeyRequest
	newKeyMsg := &types.MsgNewKeyRequest{
		Authority:  actAuthority.String(),
		SpaceId:    newKeyRequest.SpaceID,
		KeychainId: newKeyRequest.KeychainID,
		KeyType:    newKeyRequest.KeyType,
		RuleId:     newKeyRequest.RuleId,
	}
	msgAny, err := codectypes.NewAnyWithValue(newKeyMsg)
	if err != nil {
		return nil, err
	}

	newActionMsg := &acttypes.MsgNewAction{
		Creator:             sender.String(),
		Message:             msgAny,
		ActionTimeoutHeight: newKeyRequest.TimeoutHeight,
	}
	return []sdk.Msg{newActionMsg}, nil
}

func handleNewSignRequest(sender sdk.AccAddress, msg WardenProtocolMsg) ([]sdk.Msg, error) {
	actAuthority := authtypes.NewModuleAddress(acttypes.ModuleName)
	newSignRequest := msg.Warden.NewSignRequest
	newKeyMsg := &types.MsgNewSignRequest{
		Authority:     actAuthority.String(),
		KeyId:         newSignRequest.KeyId,
		Input:         newSignRequest.Input,
		Analyzers:     newSignRequest.Analyzers,
		EncryptionKey: newSignRequest.EncryptionKey,
	}
	msgAny, err := codectypes.NewAnyWithValue(newKeyMsg)
	if err != nil {
		return nil, err
	}

	newActionMsg := &acttypes.MsgNewAction{
		Creator:             sender.String(),
		Message:             msgAny,
		ActionTimeoutHeight: newSignRequest.TimeoutHeight,
	}
	return []sdk.Msg{newActionMsg}, nil
}
