package testdata

import (
	_ "embed"

	typwasmvmtypes "github.com/CosmWasm/wasmvm/types"
	"github.com/cosmos/cosmos-sdk/types"
)

//go:embed reflect.wasm
var reflectContract []byte

func ReflectContractWasm() []byte {
	return reflectContract
}

// ReflectHandleMsg is used to encode handle messages
type ReflectHandleMsg struct {
	Reflect       *ReflectPayload    `json:"reflect_msg,omitempty"`
	ReflectSubMsg *ReflectSubPayload `json:"reflect_sub_msg,omitempty"`
	ChangeOwner   *OwnerPayload      `json:"change_owner,omitempty"`
}

type OwnerPayload struct {
	Owner types.Address `json:"owner"`
}

type ReflectPayload struct {
	Msgs []typwasmvmtypes.CosmosMsg `json:"msgs"`
}

type ReflectSubPayload struct {
	Msgs []typwasmvmtypes.SubMsg `json:"msgs"`
}

// ReflectQueryMsg is used to encode query messages
type ReflectQueryMsg struct {
	Owner        *struct{}   `json:"owner,omitempty"`
	Capitalized  *Text       `json:"capitalized,omitempty"`
	Chain        *ChainQuery `json:"chain,omitempty"`
	SubMsgResult *SubCall    `json:"sub_msg_result,omitempty"`
}

type ChainQuery struct {
	Request *typwasmvmtypes.QueryRequest `json:"request,omitempty"`
}

type Text struct {
	Text string `json:"text"`
}

type SubCall struct {
	ID uint64 `json:"id"`
}

type OwnerResponse struct {
	Owner string `json:"owner,omitempty"`
}

type ChainResponse struct {
	Data []byte `json:"data,omitempty"`
}
