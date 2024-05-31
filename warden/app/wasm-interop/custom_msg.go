package wasm_interop

import (
	"encoding/json"
	"fmt"

	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

type WardenProtocolMsg struct {
	Warden WardenMsg `json:"warden,omitempty"`
}

type WardenMsg struct {
	NewKeyRequest *NewKeyRequest `json:"new_key_request,omitempty"`
}

type NewKeyRequest struct {
	IntentId      uint64        `json:"intent_id"`
	KeyType       types.KeyType `json:"key_type"`
	KeychainID    uint64        `json:"keychain_id"`
	SpaceID       uint64        `json:"space_id"`
	TimeoutHeight uint64        `json:"timeout_height"`
}

func EncodeCustomMsg(sender sdk.AccAddress, rawMsg json.RawMessage) ([]sdk.Msg, error) {
	var msg WardenProtocolMsg
	err := json.Unmarshal(rawMsg, &msg)
	if err != nil {
		return nil, err
	}
	switch {
	case msg.Warden.NewKeyRequest != nil:
		intentAuthority := authtypes.NewModuleAddress(intenttypes.ModuleName)
		newKeyRequest := msg.Warden.NewKeyRequest
		newKeyMsg := &types.MsgNewKeyRequest{
			Authority:  intentAuthority.String(),
			SpaceId:    newKeyRequest.SpaceID,
			KeychainId: newKeyRequest.KeychainID,
			KeyType:    newKeyRequest.KeyType,
			IntentId:   newKeyRequest.IntentId,
		}
		msgAny, err := codectypes.NewAnyWithValue(newKeyMsg)
		if err != nil {
			return nil, err
		}

		newActionMsg := &intenttypes.MsgNewAction{
			Creator:             sender.String(),
			Message:             msgAny,
			ActionTimeoutHeight: newKeyRequest.TimeoutHeight,
		}
		return []sdk.Msg{newActionMsg}, nil
	default:
		return nil, fmt.Errorf("unknown variant of WardenProtocolMsg")
	}
}
