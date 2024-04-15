package custom_msg

import (
	"encoding/json"
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

type KeyType string

const (
	KeyType_Unspecified    KeyType = "unspecified"
	KeyType_EcdsaSecp256k1 KeyType = "ecdsa_secp256k1"
	KeyType_EddsaEd25519   KeyType = "eddsa_ed25519"
)

type WardenMsg struct {
	NewKeyRequest *NewKeyRequest `json:"new_key_request,omitempty"`
}

type NewKeyRequest struct {
	Btl        uint64  `json:"btl"`
	IntentId   uint64  `json:"intent_id"`
	KeyType    KeyType `json:"key_type"`
	KeychainID uint64  `json:"keychain_id"`
	SpaceID    uint64  `json:"space_id"`
}

type WardenProtocolMsg struct {
	Warden WardenMsg `json:"warden"`
}

func ParseKeyType(rawKeyType KeyType) (types.KeyType, error) {
	switch rawKeyType {
	case KeyType_Unspecified:
		return types.KeyType_KEY_TYPE_UNSPECIFIED, nil
	case KeyType_EcdsaSecp256k1:
		return types.KeyType_KEY_TYPE_ECDSA_SECP256K1, nil
	case KeyType_EddsaEd25519:
		return types.KeyType_KEY_TYPE_EDDSA_ED25519, nil
	default:
		return 0, fmt.Errorf("unknown key type: %s", rawKeyType)
	}
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
		keyType, err := ParseKeyType(newKeyRequest.KeyType)
		if err != nil {
			return nil, err
		}
		setMsg := types.MsgNewKeyRequest{
			Creator:    sender.String(),
			SpaceId:    newKeyRequest.SpaceID,
			KeychainId: newKeyRequest.KeychainID,
			KeyType:    keyType,
			Btl:        newKeyRequest.Btl,
			IntentId:   newKeyRequest.IntentId,
		}
		return []sdk.Msg{&setMsg}, nil
	default:
		return nil, fmt.Errorf("unknown variant of WardenProtocolMsg")
	}
}
