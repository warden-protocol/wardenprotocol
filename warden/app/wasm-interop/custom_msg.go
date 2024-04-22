package wasm_interop

import (
	"encoding/json"
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

type WardenProtocolMsg struct {
	Warden WardenMsg `json:"warden,omitempty"`
}

type WardenMsg struct {
	NewKeyRequest *NewKeyRequest `json:"new_key_request,omitempty"`
}

type NewKeyRequest struct {
	Btl        uint64        `json:"btl"`
	IntentId   uint64        `json:"intent_id"`
	KeyType    types.KeyType `json:"key_type"`
	KeychainID uint64        `json:"keychain_id"`
	SpaceID    uint64        `json:"space_id"`
}

func EncodeCustomMsg(sender sdk.AccAddress, rawMsg json.RawMessage) ([]sdk.Msg, error) {
	var msg WardenProtocolMsg
	err := json.Unmarshal(rawMsg, &msg)
	if err != nil {
		return nil, err
	}
	switch {
	case msg.Warden.NewKeyRequest != nil:
		newKeyRequest := msg.Warden.NewKeyRequest
		setMsg := types.MsgNewKeyRequest{
			Creator:    sender.String(),
			SpaceId:    newKeyRequest.SpaceID,
			KeychainId: newKeyRequest.KeychainID,
			KeyType:    newKeyRequest.KeyType,
			Btl:        newKeyRequest.Btl,
			IntentId:   newKeyRequest.IntentId,
		}
		return []sdk.Msg{&setMsg}, nil
	default:
		return nil, fmt.Errorf("unknown variant of WardenProtocolMsg")
	}
}
